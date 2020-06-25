import * as React from 'react'
import { connect } from 'react-redux'
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
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../../../../../types';
import { fetchVoucherPromoAction, setFilterAction, clearFilterAction } from '../../../../../actions/admin/voucherPromo';
import { Filter as IFilter, FilterKeys } from '../../../../../types/admin/voucherPromo';
import {
    RouteComponentProps,
    withRouter
} from 'react-router-dom';
import { getKeyValue } from '../../../../../helpers/utils';
import { AppState } from '../../../../../store/configureStore';
import ReactSelect, { ValueType } from 'react-select';

type OwnProps = RouteComponentProps

type Props = OwnProps & LinkDispatchToProps & LinkStateToProps;

const Filter: React.FC<Props> = (props) => {

    const [modalVisible, setModalVisible] = React.useState(false)

    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();

        let filter = props.filter as IFilter;

        let currentUrlParams = new URLSearchParams(window.location.search);

        Object.keys(filter).forEach((obj: string, index: number) => {
            currentUrlParams.set(obj, getKeyValue<FilterKeys, IFilter>(obj as FilterKeys)(filter));
        });

        props.history.push(`${window.location.pathname}?${currentUrlParams.toString()}`);

        props.fetchVoucherPromoAction(1);
    }

    
    const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        const id = e.currentTarget.name;
    
        props.setFilterAction({
            ...props.filter,
            [id]: value
        } as IFilter);
    }

    const handleOnSelectChange = (option: {
        value: string,
        label: string
    }, id: string) => {
        props.setFilterAction({
            ...props.filter,
            [id]: option.value
        } as IFilter);
    }

    const clearFilter = () => {
        props.history.push(`${window.location.pathname}`);
        props.fetchVoucherPromoAction(1);
        props.clearFilterVoucherPromoAction();
    }

    const modalOnChange = (visible: boolean) => {
        setModalVisible(visible)
    }

    const updateToOptionSelect = (value: string) => {
        let label = ''

        if (value !== '') {
            switch (value) {
                case '1': label = 'Terbatas'; break
                case '0': label = 'Publik'; break
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
                                placeholder="Nama"
                                type="text"
                                name="name"
                                maxLength={255}
                                value={props.filter.name}
                                onChange={handleOnChange}
                                bsSize="sm"
                            />
                            <InputGroupAddon addonType="append">
                                <Button type="submit" color="primary" size="sm">
                                    <i className="fa fa-search" /> Cari
                                </Button>
                                { props.filtered ? (
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
                                Nama
                            </label>
                            <Input
                            className="form-control-alternative"
                            id="input-name"
                            placeholder="Nama"
                            type="text"
                            name="name"
                            maxLength={255}
                            value={props.filter.name}
                            onChange={handleOnChange}
                            />
                        </FormGroup>
                            
                        <FormGroup>
                            <label
                            className="form-control-label"
                            htmlFor="input-code"
                            >
                                Kode
                            </label>
                            <Input
                            className="form-control-alternative"
                            id="input-code"
                            placeholder="Kode"
                            type="text"
                            name="code"
                            maxLength={255}
                            value={props.filter.code}
                            onChange={handleOnChange}
                            />
                        </FormGroup>

                        <FormGroup>
                            <label
                            className="form-control-label"
                            htmlFor="input-amount"
                            >
                                Nominal Potongan
                            </label>
                            <Input
                            className="form-control-alternative"
                            id="input-amount"
                            placeholder="Nominal Potongan"
                            type="text"
                            name="amount"
                            maxLength={255}
                            value={props.filter.amount}
                            onChange={handleOnChange}
                            />
                        </FormGroup>

                        <FormGroup>
                            <label
                            className="form-control-label"
                            htmlFor="input-quota"
                            >
                                Kouta
                            </label>
                            <Input
                            className="form-control-alternative"
                            id="input-quota"
                            placeholder="Kouta"
                            type="text"
                            name="quota"
                            maxLength={255}
                            value={props.filter.quota}
                            onChange={handleOnChange}
                            />
                        </FormGroup>

                        <FormGroup>
                            <label
                            className="form-control-label"
                            htmlFor="input-minimumPurchase"
                            >
                                Minimal Pembelian
                            </label>
                            <Input
                            className="form-control-alternative"
                            id="input-minimumPurchase"
                            placeholder="Minimal Pembelian"
                            type="text"
                            name="minimumPurchase"
                            maxLength={255}
                            value={props.filter.minimumPurchase}
                            onChange={handleOnChange}
                            />
                        </FormGroup>

                        <FormGroup>
                            <label
                            className="form-control-label"
                            htmlFor="input-quantity"
                            >
                                Jumlah Penggunaan
                            </label>
                            <Input
                            className="form-control-alternative"
                            id="input-quantity"
                            placeholder="Jumlah Penggunaan"
                            type="text"
                            name="quantity"
                            maxLength={255}
                            value={props.filter.quantity}
                            onChange={handleOnChange}
                            />
                        </FormGroup>

                        <FormGroup>
                            <label
                            className="form-control-label"
                            htmlFor="input-isLimited"
                            >
                                Target Penggunaan
                            </label>
                            <ReactSelect 
                                options={[
                                    {value: '1', label: 'Terbatas'},
                                    {value: '0', label: 'Publik'}
                                ]}
                                defaultValue={updateToOptionSelect(props.filter.isLimited)}
                                onChange={(option) => {

                                    const optionSelected = option as {
                                        value: string,
                                        label: string
                                    };

                                    handleOnSelectChange(optionSelected, 'isLimited')
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

type LinkStateToProps = {
    filter: IFilter,
    filtered: boolean
}

const mapStateToProps = (state: AppState): LinkStateToProps => {
    return {
        filter: state.voucherPromo.filter,
        filtered: state.voucherPromo.filtered
    }
}

type LinkDispatchToProps = {
    fetchVoucherPromoAction: (page: number) => Promise<Boolean>,
    setFilterAction: (filter: IFilter) => void,
    clearFilterVoucherPromoAction: () => void
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: OwnProps): LinkDispatchToProps => {
    return {
        fetchVoucherPromoAction: (page: number) => dispatch(fetchVoucherPromoAction(page)),
        setFilterAction: (filter: IFilter) => dispatch(setFilterAction(filter)),
        clearFilterVoucherPromoAction: () => dispatch(clearFilterAction())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Filter));
