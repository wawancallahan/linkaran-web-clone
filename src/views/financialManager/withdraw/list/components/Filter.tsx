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

type OwnProps = {}

type Props = OwnProps & ReturnType<typeof mapStateToProps>

const Filter: React.FC<Props> = (props) => {

    const [modalVisible, setModalVisible] = React.useState(false)
    const [filtered, setFiltered] = React.useState(false);
    const [formField, setFormField] = React.useState<IFilter>({
        name: '',
        accountNumber: '',
        bankName: '',
        needApproved: '0',
        isManual: '0',
        isDecline: '0'
    });

    React.useEffect(() => {
        const querySearch = queryString.parse(props.router.location.search);

        if (Object.keys(querySearch).length > 0) {
            setFiltered(true);
        }

        setFormField({
            name: decodeURIComponent((querySearch.name as string) || ''),
            accountNumber: decodeURIComponent((querySearch.accountNumber as string) || ''),
            bankName: decodeURIComponent((querySearch.bankName as string) || ''),
            needApproved: decodeURIComponent((querySearch.needApproved as string) || '0'),
            isManual: decodeURIComponent((querySearch.isManual as string) || '0'),
            isDecline: decodeURIComponent((querySearch.isDecline as string) || '0'),
        });
    }, []);

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
    }, id: string) => {
        setFormField(prevState => {
            return {
                ...prevState,
                [id]: option.value
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

export default connect(mapStateToProps)(Filter);
