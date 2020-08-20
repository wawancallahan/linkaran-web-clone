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
import { Filter as IFilter } from '../../../../../../types/admin/transaction/application';
import {
    RouteComponentProps,
    withRouter
} from 'react-router-dom';
import { createFormSearch, OptionObjectString } from '../../../../../../helpers/utils';
import moment from 'moment'
import DatePicker from 'react-datepicker';
import ReactSelect, { ValueType } from 'react-select';
import queryString from "query-string";

import "react-datepicker/dist/react-datepicker.css";

type OwnProps = RouteComponentProps

type Props = OwnProps

const Filter: React.FC<Props> = (props) => {

    const [modalVisible, setModalVisible] = React.useState(false)
    const [filtered, setFiltered] = React.useState(false);
    const [formField, setFormField] = React.useState<IFilter>({
        date: null,
        driverName: '',
        numberTransaction: '',
        serviceCode: '',
        statusOrder: '',
        type: 'complete',
        userName: ''
    });

    React.useEffect(() => {
        const querySearch = queryString.parse(props.location.search);

        if (Object.keys(querySearch).length > 0) {
            setFiltered(true);
        }

        const dateQuery = decodeURIComponent((querySearch.date as string) || '');
        const date = moment(dateQuery, "YYYY-MM-DD", true);

        setFormField({
            date: date.isValid() ? date.toDate() : null,
            driverName: decodeURIComponent((querySearch.driverName as string) || ''),
            numberTransaction: decodeURIComponent((querySearch.numberTransaction as string) || ''),
            serviceCode: decodeURIComponent((querySearch.serviceCode as string) || ''),
            statusOrder: decodeURIComponent((querySearch.statusOrder as string) || ''),
            type: decodeURIComponent((querySearch.type as string) || 'complete'),
            userName: decodeURIComponent((querySearch.userName as string) || '')
        });
    }, []);

    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let filter = formField;

        const date = filter.date && moment(filter.date).isValid() ? (
            moment(filter.date).format("YYYY-MM-DD")
        ) : ''

        const newFilter = {
            ...filter,
            date: date
        }

        createFormSearch(props.location.pathname, {
            ...newFilter
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

    const handleOnDateChange = (date: Date | null, id: string) => {
        setFormField(prevState => {
            return {
                ...prevState,
                [id]: date
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
        createFormSearch(props.location.pathname);
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
                                value={formField.numberTransaction}
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
                            value={formField.numberTransaction}
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
                                    selected={formField.date}
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
                            value={formField.userName}
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
                            value={formField.driverName}
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
                                defaultValue={updateToOptionSelectType(formField.type)}
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
                                defaultValue={updateToOptionSelectServiceCode(formField.serviceCode)}
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
                                defaultValue={updateToOptionSelectStatusOrder(formField.statusOrder)}
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

export default withRouter(Filter);
