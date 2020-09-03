import * as React from 'react'
import { 
    InputGroupAddon, 
    Col, 
    Row, 
    Form, 
    InputGroup, 
    Button, 
    Input,
    FormGroup,
    Modal
} from 'reactstrap'
import { Filter as IFilter } from '../../../../../types/financialManager/withdraw';
import { createFormSearch, OptionObjectString } from '../../../../../helpers/utils';
import ReactSelect, { ValueType } from 'react-select';
import queryString from "query-string";
import { connect } from 'react-redux';
import { AppState } from '../../../../../reducers';
import ReactSelectAsyncPaginate from 'react-select-async-paginate';
import { ApiResponseList, ApiResponseSuccessList, ApiResponse } from '../../../../../types/api';
import { SelectType } from '../../../../../types/select';
import { UserShow, UserList } from '../../../../../types/admin/user';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../../../../../types';
import { findUserAction, fetchListUserAction } from '../../../../../actions/admin/user';
import { Paginator } from '../../../../../types/paginator';

type OwnProps = {}

type Props = OwnProps & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

const Filter: React.FC<Props> = (props) => {

    const [modalVisible, setModalVisible] = React.useState(false)
    const [filtered, setFiltered] = React.useState(false);
    const [formField, setFormField] = React.useState<IFilter>({
        name: '',
        accountNumber: '',
        bankName: '',
        needApproved: '',
        isManual: '',
        isDecline: '',
        approvedById: ''
    });

    const [approvedBySelected, setApprovedBySelected] = React.useState<SelectType>({
        label: '',
        value: 0
    });

    React.useEffect(() => {
        const querySearch = queryString.parse(props.router.location.search);

        if (Object.keys(querySearch).length > 0) {
            setFiltered(true);
        }

        const approvedById = decodeURIComponent((querySearch.approvedById as string) || '')

        setFormField({
            name: decodeURIComponent((querySearch.name as string) || ''),
            accountNumber: decodeURIComponent((querySearch.accountNumber as string) || ''),
            bankName: decodeURIComponent((querySearch.bankName as string) || ''),
            needApproved: decodeURIComponent((querySearch.needApproved as string) || ''),
            isManual: decodeURIComponent((querySearch.isManual as string) || ''),
            isDecline: decodeURIComponent((querySearch.isDecline as string) || ''),
            approvedById: approvedById,
        });

        const findApprovedBy = async () => {
            if (approvedById) {
                await props.findUserAction(Number.parseInt(approvedById))
                    .then((response: ApiResponse<UserShow>) => {
                        const data: UserShow = response.response!.result;

                        setApprovedBySelected({
                            value: data.id,
                            label: data.name
                        })
                    });
            }
        }

        findApprovedBy()  
    }, []);

    const loadApprovedByHandler = (search: string, loadedOption: { label: string; value: number; }[], options: {
        page: number
    }) => {
        return props.fetchListUserAction(search, options.page)
            .then((response: ApiResponseList<UserList>) => {

                const data: ApiResponseSuccessList<UserList> = response.response!;

                let result: {
                    value: number,
                    label: string
                }[] = [];

                let hasMore = false;

                if ( ! data.metaData.isError) {

                    if (data.metaData.paginate) {
                        const paginate = data.metaData.paginate as Paginator;
                        hasMore = paginate.pageCount > options.page;
                    }

                    result = data.result.map((item: UserList) => {
                        return {
                            value: item.id,
                            label: `${item.name}`
                        };
                    });
                }

                return {
                    options: result,
                    hasMore: hasMore,
                    additional: {
                      page: options.page + 1,
                    },
                };
            });
    }

    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let filter = formField;

        createFormSearch(props.router.location.pathname, {
            ...filter
        } as OptionObjectString);
    }

    
    const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        const id = e.currentTarget.name;
    
        setFormField(prevState => {
            return {
                ...prevState,
                [id]: value
            }
        });
    }

    
    const handleOnSelectChange = (option: {
        value: string,
        label: string
    } | null, id: string) => {
        setFormField(prevState => {
            return {
                ...prevState,
                [id]: option !== null ? option.value : ''
            }
        });
    }

    const clearFilter = () => {
        createFormSearch(props.router.location.pathname);
    }

    const modalOnChange = (visible: boolean) => {
        setModalVisible(visible)
    }

    const updateToOptionSelect = (value: string) => {
        let label = ''

        if (value !== '') {
            switch (value) {
                case '1': label = 'Ya'; break
                case '0': label = 'Tidak'; break
            }
        }
        
        return {
            value: value,
            label: label
        } as ValueType<{
            value: string,
            label: string
        }>
    }

    return (
        <React.Fragment>
            <Form onSubmit={handleOnSubmit}>
                <Row>
                    <Col xs="auto">
                        <Button type="button" color="primary" size="sm" onClick={() => modalOnChange( ! modalVisible)}>
                            <i className="fa fa-filter" />
                        </Button>
                    </Col>
                    <Col>
                        <InputGroup>
                            <Input 
                                className=""
                                id="input-name"
                                placeholder="Nama Akun"
                                type="text"
                                name="name"
                                maxLength={255}
                                value={formField.name}
                                onChange={handleOnChange}
                                bsSize="sm"
                            />
                            <InputGroupAddon addonType="append">
                                <Button type="submit" color="primary" size="sm">
                                    <i className="fa fa-search" /> Cari
                                </Button>
                                { filtered ? (
                                    <Button
                                        type="button"
                                        color="danger"
                                        size="sm"
                                        onClick={clearFilter}
                                        >
                                        <i className="fa fa-times" /> Reset
                                    </Button> ) : null
                                }
                            </InputGroupAddon>
                        </InputGroup>
                    </Col>
                </Row>
            </Form>
            <Modal
                className="modal-dialog-centered"
                isOpen={modalVisible}
                toggle={() => modalOnChange( ! modalVisible)}
            >
                <Form onSubmit={handleOnSubmit}>
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                        Filter
                        </h5>
                        <button
                            aria-label="Close"
                            className="close"
                            data-dismiss="modal"
                            type="button"
                            onClick={() => modalOnChange(false)}
                        >
                        <span aria-hidden={true}>×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <FormGroup>
                            <label
                            className="form-control-label"
                            htmlFor="input-name"
                            >
                                Nama Akun
                            </label>
                            <Input
                            className="form-control-alternative"
                            id="input-name"
                            placeholder="Nama Akun"
                            type="text"
                            name="name"
                            maxLength={255}
                            value={formField.name}
                            onChange={handleOnChange}
                            />
                        </FormGroup>

                        <FormGroup>
                            <label
                            className="form-control-label"
                            htmlFor="input-accountNumber"
                            >
                                Nomor Akun
                            </label>
                            <Input
                            className="form-control-alternative"
                            id="input-accountNumber"
                            placeholder="Nomor Akun"
                            type="text"
                            name="accountNumber"
                            maxLength={255}
                            value={formField.accountNumber}
                            onChange={handleOnChange}
                            />
                        </FormGroup>

                        <FormGroup>
                            <label
                            className="form-control-label"
                            htmlFor="input-bankName"
                            >
                                Nama Bank
                            </label>
                            <Input
                            className="form-control-alternative"
                            id="input-bankName"
                            placeholder="Nama Bank"
                            type="text"
                            name="bankName"
                            maxLength={255}
                            value={formField.bankName}
                            onChange={handleOnChange}
                            />
                        </FormGroup>

                        <FormGroup>
                            <label
                            className="form-control-label"
                            htmlFor="input-approvedBy"
                            >
                                Disetujui Oleh
                            </label>
                            <ReactSelectAsyncPaginate 
                                value={approvedBySelected}
                                loadOptions={loadApprovedByHandler}
                                onChange={(option) => {
                                    if (option !== null) {
                                        setApprovedBySelected(option as SelectType)
                                    } else {
                                        setApprovedBySelected({
                                            value: 0,
                                            label: ''
                                        } as SelectType);
                                    }
                                }}
                                additional={{
                                    page: 1
                                }}
                                debounceTimeout={250}
                                isClearable
                                />
                        </FormGroup>

                        <FormGroup>
                            <label
                            className="form-control-label"
                            htmlFor="input-needApproved"
                            >
                                Butuh Persetujuan
                            </label>
                            <ReactSelect 
                                options={[
                                    {value: '1', label: 'Ya'},
                                    {value: '0', label: 'Tidak'}
                                ]}
                                defaultValue={updateToOptionSelect(formField.needApproved)}
                                onChange={(option) => {

                                    const optionSelected = option as {
                                        value: string,
                                        label: string
                                    };

                                    handleOnSelectChange(optionSelected, 'needApproved')
                                }}  
                                isClearable
                                />
                        </FormGroup>

                        <FormGroup>
                            <label
                            className="form-control-label"
                            htmlFor="input-isManual"
                            >
                                Manual
                            </label>
                            <ReactSelect 
                                options={[
                                    {value: '1', label: 'Ya'},
                                    {value: '0', label: 'Tidak'}
                                ]}
                                defaultValue={updateToOptionSelect(formField.isManual)}
                                onChange={(option) => {

                                    const optionSelected = option as {
                                        value: string,
                                        label: string
                                    };

                                    handleOnSelectChange(optionSelected, 'isManual')
                                }}  
                                isClearable
                                />
                        </FormGroup>

                        <FormGroup>
                            <label
                            className="form-control-label"
                            htmlFor="input-isDecline"
                            >
                                Dibatalkan
                            </label>
                            <ReactSelect 
                                options={[
                                    {value: '1', label: 'Ya'},
                                    {value: '0', label: 'Tidak'}
                                ]}
                                defaultValue={updateToOptionSelect(formField.isDecline)}
                                onChange={(option) => {

                                    const optionSelected = option as {
                                        value: string,
                                        label: string
                                    };

                                    handleOnSelectChange(optionSelected, 'isDecline')
                                }}
                                isClearable
                                />
                        </FormGroup>
                    </div>
                    <div className="modal-footer">
                        <Button
                        color="secondary"
                        data-dismiss="modal"
                        type="button"
                        onClick={() => modalOnChange(false)}
                        >
                            Tutup
                        </Button>
                        <Button color="primary">
                            Filter
                        </Button>
                    </div>
                </Form>
            </Modal>
        </React.Fragment>
    )
}

const mapStateToProps = (state: AppState) => ({
    router: state.router
});

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, any, AppActions>, OwnProps: OwnProps) => ({
    fetchListUserAction: (search: string, page: number) => dispatch(fetchListUserAction(search, page)),
    findUserAction: (id: number) => dispatch(findUserAction(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
