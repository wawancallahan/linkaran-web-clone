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
import { AppActions } from '../../../../types';
import {
    RouteComponentProps,
    withRouter
} from 'react-router-dom';
import { 
    fetchApplicationAction, 
    setFilterAction, 
    clearFilterAction 
} from '../../../../actions/admin/transaction/application';
import { Filter as IFilter, FilterOmit, FilterKeys} from '../../../../types/admin/transaction/application';
import { getKeyValue } from '../../../../helpers/utils';
import { AppState } from '../../../../store/configureStore';
import ReactSelect, { OptionsType, ValueType } from 'react-select'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment'

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

        const date = filter.date && moment(filter.date).isValid() ? (
            moment(filter.date).format("YYYY-MM-DD")
        ) : ''

        let newFilter = {
            ...filter,
            date: date
        }

        let filterOmit = newFilter as FilterOmit;

        let currentUrlParams = new URLSearchParams(window.location.search);

        Object.keys(filterOmit).forEach((obj: string, index: number) => {
            currentUrlParams.set(obj, getKeyValue<FilterKeys, FilterOmit>(obj as FilterKeys)(filterOmit));
        });

        this.props.history.push(`${window.location.pathname}?${currentUrlParams.toString()}`);

        this.props.fetchApplicationAction(1);

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

    handleOnDateChange = (date: Date | null, id: string) => {
        this.props.setFilterAction({
            ...this.props.filter,
            [id]: date
        } as IFilter);
    }

    clearFilter = () => {
        this.props.history.push(`${window.location.pathname}`);
        this.props.fetchApplicationAction(1);
        this.props.clearFilterApplicationAction();
    }

    modalOnChange = (status: boolean) => {
        this.setState({
            modal_visible: status
        })
    }

    updateToOptionSelectType = (value: string) => {
        let label = ''

        if (value !== '') {
            switch (value) {
                case 'complete': label = 'Complete'; break
                case 'inorder': label = 'In Order'; break
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

    updateToOptionSelectServiceCode = (value: string) => {
        let label = ''

        if (value !== '') {
            switch (value) {
                case 'link-send': label = 'Link Send'; break
                case 'link-food': label = 'Link Food'; break
                case 'link-ride': label = 'Link Ride'; break
                case 'link-car': label = 'Link Car'; break
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

    updateToOptionSelectStatusOrder = (value: string) => {
        let label = ''

        if (value !== '') {
            switch (value) {
                case 'find-driver': label = 'Find Driver'; break
                case 'driver-found': label = 'Driver Found'; break
                case 'driver-arrived': label = 'Driver Arrived'; break
                case 'driver-take-order': label = 'Driver Take Order'; break
                case 'complete': label = 'Complete'; break
                case 'cancel': label = 'Cancel'; break
                case 'expired': label = 'Expired'; break
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
                                    id="input-numberTransaction"
                                    placeholder="No. Transaksi"
                                    type="text"
                                    name="numberTransaction"
                                    maxLength={255}
                                    value={this.props.filter.numberTransaction}
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
                                htmlFor="input-numberTransaction"
                                >
                                    No. Transaksi
                                </label>
                                <Input
                                className="form-control-alternative"
                                id="input-numberTransaction"
                                placeholder="No. Transaksi"
                                type="text"
                                name="numberTransaction"
                                maxLength={255}
                                value={this.props.filter.numberTransaction}
                                onChange={this.handleOnChange}
                                />
                            </FormGroup>

                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-date"
                                >
                                    Tanggal
                                </label>
                                <div>
                                    <DatePicker
                                        selected={this.props.filter.date}
                                        onChange={(date) => this.handleOnDateChange(date, 'date')}
                                        dateFormat="yyyy-MM-dd"
                                        className="form-control form-control-alternative"
                                        />
                                </div>
                            </FormGroup>

                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-userName"
                                >
                                    Pelanggan
                                </label>
                                <Input
                                className="form-control-alternative"
                                id="input-userName"
                                placeholder="Pelanggan"
                                type="text"
                                name="userName"
                                maxLength={255}
                                value={this.props.filter.userName}
                                onChange={this.handleOnChange}
                                />
                            </FormGroup>

                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-driverName"
                                >
                                    Driver
                                </label>
                                <Input
                                className="form-control-alternative"
                                id="input-driverName"
                                placeholder="Driver"
                                type="text"
                                name="driverName"
                                maxLength={255}
                                value={this.props.filter.driverName}
                                onChange={this.handleOnChange}
                                />
                            </FormGroup>

                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-type"
                                >
                                    Tipe
                                </label>
                                <ReactSelect 
                                    options={[
                                        {value: 'complete', label: 'Complete'},
                                        {value: 'inorder', label: 'In Order'},
                                    ]}
                                    defaultValue={this.updateToOptionSelectType(this.props.filter.type)}
                                    onChange={(option) => {

                                        const optionSelected = option as {
                                            value: string,
                                            label: string
                                        };

                                        this.handleOnChangeSelect(optionSelected, 'type')
                                    }}  
                                    />
                            </FormGroup>
                            
                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-serviceCode"
                                >
                                    Layanan
                                </label>
                                <ReactSelect 
                                    options={[
                                        {value: 'link-ride', label: 'Link Ride'},
                                        {value: 'link-car', label: 'Link Car'},
                                        {value: 'link-food', label: 'Link Food'},
                                        {value: 'link-send', label: 'Link Send'}
                                    ]}
                                    defaultValue={this.updateToOptionSelectServiceCode(this.props.filter.serviceCode)}
                                    onChange={(option) => {

                                        const optionSelected = option as {
                                            value: string,
                                            label: string
                                        };

                                        this.handleOnChangeSelect(optionSelected, 'serviceCode')
                                    }}  
                                    />
                            </FormGroup>

                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-statusOrder"
                                >
                                    Status Order
                                </label>
                                <ReactSelect 
                                    options={[
                                        {value: 'find-driver', label: 'Find Driver'},
                                        {value: 'driver-found', label: 'Driver Found'},
                                        {value: 'driver-arrived', label: 'Driver Arrived'},
                                        {value: 'driver-take-order', label: 'Driver Take Order'},
                                        {value: 'complete', label: 'Complete'},
                                        {value: 'cancel', label: 'Cancel'},
                                        {value: 'expired', label: 'Expired'}
                                    ]}
                                    defaultValue={this.updateToOptionSelectStatusOrder(this.props.filter.statusOrder)}
                                    onChange={(option) => {

                                        const optionSelected = option as {
                                            value: string,
                                            label: string
                                        };

                                        this.handleOnChangeSelect(optionSelected, 'statusOrder')
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

interface LinkStateToProps {
    filter: IFilter,
    filtered: boolean
}

const mapStateToProps = (state: AppState): LinkStateToProps => {
    return {
        filter: state.transactionApplication.filter,
        filtered: state.transactionApplication.filtered
    }
}

interface LinkDispatchToProps {
    fetchApplicationAction: (page: number) => Promise<Boolean>,
    setFilterAction: (filter: IFilter) => void,
    clearFilterApplicationAction: () => void
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: FilterProps): LinkDispatchToProps => {
    return {
        fetchApplicationAction: (page: number) => dispatch(fetchApplicationAction(page)),
        setFilterAction: (filter: IFilter) => dispatch(setFilterAction(filter)),
        clearFilterApplicationAction: () => dispatch(clearFilterAction())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Filter));