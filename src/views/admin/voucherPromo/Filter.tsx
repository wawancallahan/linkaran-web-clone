import React, { Component } from 'react'
import { connect } from 'react-redux'
import { 
    InputGroupAddon, 
    Col, 
    Row, 
    Form, 
    InputGroup, 
    Button, 
    Input,
    Modal,
    FormGroup
} from 'reactstrap'
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../../../types';
import {
    RouteComponentProps,
    withRouter
} from 'react-router-dom';
import { 
    fetchVoucherPromoAction, 
    setFilterAction, 
    clearFilterAction 
} from '../../../actions/admin/voucherPromo';
import { Filter as IFilter, FilterKeys} from '../../../types/admin/voucherPromo';
import { getKeyValue } from '../../../helpers/utils';
import { AppState } from '../../../store/configureStore';
import ReactSelect, { OptionsType, ValueType } from 'react-select'

type FilterProps = RouteComponentProps & {

}

type Props = FilterProps & LinkStateToProps & LinkDispatchToProps;

type State = {
    modal_visible: boolean
}

class Filter extends Component<Props, State> {

    state = {
        modal_visible: false
    }

    handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();
       
        let filter = this.props.filter as IFilter;

        let currentUrlParams = new URLSearchParams(window.location.search);

        Object.keys(filter).forEach((obj: string, index: number) => {
            currentUrlParams.set(obj, getKeyValue<FilterKeys, IFilter>(obj as FilterKeys)(filter));
        });

        this.props.history.push(`${window.location.pathname}?${currentUrlParams.toString()}`);

        this.props.fetchVoucherPromoAction(1);

        this.modalOnChange(false);
    }

    handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        const id = e.currentTarget.name;
    
        this.props.setFilterAction({
            ...this.props.filter,
            [id]: value
        } as IFilter);
    }

    handleOnChangeSelect = (option: {
        value: string,
        label: string
    }, id: string) => {
        this.props.setFilterAction({
            ...this.props.filter,
            [id]: option.value
        } as IFilter);
    }

    clearFilter = () => {
        this.props.history.push(`${window.location.pathname}`);
        this.props.fetchVoucherPromoAction(1);
        this.props.clearFilterVoucherPromoAction();
    }

    modalOnChange = (status: boolean) => {
        this.setState({
            modal_visible: status
        })
    }

    updateToOptionSelect = (value: string) => {
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

    render() {
        return (
            <>
                <Form onSubmit={this.handleOnSubmit}>
                    <Row>
                        <Col xs="auto">
                            <Button type="button" color="primary" size="sm" onClick={() => this.modalOnChange( ! this.state.modal_visible)}>
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
                                    value={this.props.filter.name}
                                    onChange={this.handleOnChange}
                                    bsSize="sm"
                                />
                                <InputGroupAddon addonType="append">
                                    <Button type="submit" color="primary" size="sm">
                                        <i className="fa fa-search" /> Cari
                                    </Button>
                                    { this.props.filtered ? (
                                        <Button
                                            type="button"
                                            color="danger"
                                            size="sm"
                                            onClick={this.clearFilter}
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
                    isOpen={this.state.modal_visible}
                    toggle={() => this.modalOnChange( ! this.state.modal_visible)}
                >
                    <Form onSubmit={this.handleOnSubmit}>
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                            Filter
                            </h5>
                            <button
                                aria-label="Close"
                                className="close"
                                data-dismiss="modal"
                                type="button"
                                onClick={() => this.modalOnChange(false)}
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
                                value={this.props.filter.name}
                                onChange={this.handleOnChange}
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
                                value={this.props.filter.code}
                                onChange={this.handleOnChange}
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
                                value={this.props.filter.amount}
                                onChange={this.handleOnChange}
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
                                value={this.props.filter.quota}
                                onChange={this.handleOnChange}
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
                                value={this.props.filter.minimumPurchase}
                                onChange={this.handleOnChange}
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
                                value={this.props.filter.quantity}
                                onChange={this.handleOnChange}
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
                                    defaultValue={this.updateToOptionSelect(this.props.filter.isLimited)}
                                    onChange={(option) => {

                                        const optionSelected = option as {
                                            value: string,
                                            label: string
                                        };

                                        this.handleOnChangeSelect(optionSelected, 'isLimited')
                                    }}  
                                    />
                            </FormGroup>
                        </div>
                        <div className="modal-footer">
                            <Button
                            color="secondary"
                            data-dismiss="modal"
                            type="button"
                            onClick={() => this.modalOnChange(false)}
                            >
                                Tutup
                            </Button>
                            <Button color="primary">
                                Filter
                            </Button>
                        </div>
                    </Form>
                </Modal>
            </>
        )
    }
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

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: FilterProps): LinkDispatchToProps => {
    return {
        fetchVoucherPromoAction: (page: number) => dispatch(fetchVoucherPromoAction(page)),
        setFilterAction: (filter: IFilter) => dispatch(setFilterAction(filter)),
        clearFilterVoucherPromoAction: () => dispatch(clearFilterAction())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Filter));