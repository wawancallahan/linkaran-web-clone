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
import { AppActions } from '../../../../../../types';
import { fetchApplicationAction, setFilterAction, clearFilterAction } from '../../../../../../actions/admin/transaction/application';
import { Filter as IFilter, FilterKeys, FilterOmit } from '../../../../../../types/admin/transaction/application';
import {
    RouteComponentProps,
    withRouter
} from 'react-router-dom';
import { getKeyValue } from '../../../../../../helpers/utils';
import { AppState } from '../../../../../../store/configureStore';
import moment from 'moment'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import ReactSelect, { ValueType } from 'react-select';

type OwnProps = RouteComponentProps

type Props = OwnProps & LinkDispatchToProps & LinkStateToProps;

const Filter: React.FC<Props> = (props) => {

    const [modalVisible, setModalVisible] = React.useState(false)

    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();

        let filter = props.filter as IFilter;

        const date = props.filter.date && moment(props.filter.date).isValid() ? (
            moment(props.filter.date).format("YYYY-MM-DD")
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

        props.history.push(`${window.location.pathname}?${currentUrlParams.toString()}`);

        props.fetchApplicationAction(1);

        modalOnChange(false);
    }

    
    const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        const id = e.currentTarget.name;
    
        props.setFilterAction({
            ...props.filter,
            [id]: value
        } as IFilter);
    }

    const handleOnDateChange = (date: Date | null, id: string) => {
        props.setFilterAction({
            ...props.filter,
            [id]: date
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
        props.fetchApplicationAction(1);
        props.clearFilterApplicationAction();
    }

    const modalOnChange = (visible: boolean) => {
        setModalVisible(visible)
    }

    const updateToOptionSelectType = (value: string) => {
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

    const updateToOptionSelectServiceCode = (value: string) => {
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

    const updateToOptionSelectStatusOrder = (value: string) => {
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
                                id="input-numberTransaction"
                                placeholder="No. Transaksi"
                                type="text"
                                name="numberTransaction"
                                maxLength={255}
                                value={props.filter.numberTransaction}
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
                            value={props.filter.numberTransaction}
                            onChange={handleOnChange}
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
                                    selected={props.filter.date}
                                    onChange={(date) => handleOnDateChange(date, 'date')}
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
                            value={props.filter.userName}
                            onChange={handleOnChange}
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
                            value={props.filter.driverName}
                            onChange={handleOnChange}
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
                                defaultValue={updateToOptionSelectType(props.filter.type)}
                                onChange={(option) => {

                                    const optionSelected = option as {
                                        value: string,
                                        label: string
                                    };

                                    handleOnSelectChange(optionSelected, 'type')
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
                                    {value: 'linkride', label: 'Link Ride'},
                                    {value: 'linkcar', label: 'Link Car'},
                                    {value: 'linkfood', label: 'Link Food'},
                                    {value: 'linksend', label: 'Link Send'}
                                ]}
                                defaultValue={updateToOptionSelectServiceCode(props.filter.serviceCode)}
                                onChange={(option) => {

                                    const optionSelected = option as {
                                        value: string,
                                        label: string
                                    };

                                    handleOnSelectChange(optionSelected, 'serviceCode')
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
                                defaultValue={updateToOptionSelectStatusOrder(props.filter.statusOrder)}
                                onChange={(option) => {

                                    const optionSelected = option as {
                                        value: string,
                                        label: string
                                    };

                                    handleOnSelectChange(optionSelected, 'statusOrder')
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
        filter: state.transactionApplication.filter,
        filtered: state.transactionApplication.filtered
    }
}

type LinkDispatchToProps = {
    fetchApplicationAction: (page: number) => Promise<Boolean>,
    setFilterAction: (filter: IFilter) => void,
    clearFilterApplicationAction: () => void
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: OwnProps): LinkDispatchToProps => {
    return {
        fetchApplicationAction: (page: number) => dispatch(fetchApplicationAction(page)),
        setFilterAction: (filter: IFilter) => dispatch(setFilterAction(filter)),
        clearFilterApplicationAction: () => dispatch(clearFilterAction())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Filter));
