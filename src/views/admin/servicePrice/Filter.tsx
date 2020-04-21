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
import { fetchServicePriceFilteredAction } from '../../../actions/admin/servicePrice';
import { Filter as IFilter } from '../../../types/admin/servicePrice';
import { fetchListPriceAction } from '../../../actions/admin/price';
import { fetchListServiceAction } from '../../../actions/admin/service';
import { Price } from '../../../types/admin/price';
import { Service } from "../../../types/admin/service";
import { VehicleTypeList } from '../../../types/admin/vehicleType';
import { fetchListVehicleTypeAction } from '../../../actions/admin/subBrandVehicle';
import { OptionsType } from 'react-select'
import ReactSelectAsyncPaginate from 'react-select-async-paginate';
import { Paginator } from '../../../types/paginator';
import { ApiResponse, ApiResponseError, ApiResponseSuccess, ApiResponseList, ApiResponseSuccessList } from '../../../types/api';

type FilterProps = {

}

type Props = LinkDispatchToProps;

type State = {
    districtName: string,
    price: {
        value: number;
        label: string;
    },
    service: {
        value: number;
        label: string;
    },
    vehicleType: {
        value: number;
        label: string;
    },
    filtered: boolean,
    modal_visible: boolean
}

class Filter extends Component<Props, State> {

    state = {
        districtName: '',
        service: {
            value: 0,
            label: ''
        },
        vehicleType: {
            value: 0,
            label: ''
        },
        price: {
            value: 0,
            label: ''
        },
        filtered: false,
        modal_visible: false
    }

    handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();

        let filter: IFilter = {
            districtName: '',
            service: {
                value: 0,
                label: ''
            },
            vehicleType: {
                value: 0,
                label: ''
            },
            price: {
                value: 0,
                label: ''
            },
        }

        if (this.state.modal_visible) {
            filter = {
                ...filter,
                districtName: this.state.districtName,
                service: this.state.service,
                vehicleType: this.state.vehicleType,
                price: this.state.price
            }
        } else {
            filter = {
                ...filter,
                districtName: this.state.districtName
            }
        }

        this.props.fetchServicePriceFilteredAction(filter).then(() => {
            this.setState({
                filtered: true,
                modal_visible: false
            })
        });
    }

    handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        const id = e.currentTarget.name;
    
        this.setState({
            ...this.state,
            [id]: value
        });
    }

    clearFilter = () => {
        let filter: IFilter = {
            districtName: '',
            service: {
                value: 0,
                label: ''
            },
            vehicleType: {
                value: 0,
                label: ''
            },
            price: {
                value: 0,
                label: ''
            },
        }

        this.props.fetchServicePriceFilteredAction(filter).then(() => {
            this.setState({
                districtName: '',
                service: {
                    value: 0,
                    label: ''
                },
                vehicleType: {
                    value: 0,
                    label: ''
                },
                price: {
                    value: 0,
                    label: ''
                },
                filtered: false
            })
        });
    }

    modalOnChange = (status: boolean) => {
        this.setState({
            modal_visible: status
        })
    }

    loadServiceHandler = (search: string, loadedOption: {}, options: {
        page: number
    }) => {
        return this.props.fetchListServiceAction(search, options.page)
            .then((response: ApiResponseList<Service>) => {

                const data: ApiResponseSuccessList<Service> = response.response!;

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

                    result = data.result.map((item: Service) => {
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

    loadPriceHandler = (search: string, loadedOption: {}, options: {
        page: number
    }) => {
        return this.props.fetchListPriceAction(search, options.page)
            .then((response: ApiResponseList<Price>) => {

                const data: ApiResponseSuccessList<Price> = response.response!;

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

                    result = data.result.map((item: Price) => {
                        return {
                            value: item.id,
                            label: `${item.basePrice}`
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

    loadVehicleTypeHandler = (search: string, loadedOption: {}, options: {
        page: number
    }) => {
        return this.props.fetchListVehicleTypeAction(search, options.page)
            .then((response: ApiResponseList<VehicleTypeList>) => {

                const data: ApiResponseSuccessList<VehicleTypeList> = response.response!;

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

                    result = data.result.map((item: VehicleTypeList) => {
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
                                    id="input-districtName"
                                    placeholder="Kabupaten/ Kota"
                                    type="text"
                                    name="districtName"
                                    maxLength={255}
                                    value={this.state.districtName}
                                    onChange={this.handleOnChange}
                                    bsSize="sm"
                                />
                                <InputGroupAddon addonType="append">
                                    <Button type="submit" color="primary" size="sm">
                                        <i className="fa fa-search" /> Cari
                                    </Button>
                                    { this.state.filtered ? (
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
                                htmlFor="input-districtName"
                                >
                                    Kabupaten/ Kota
                                </label>
                                <Input
                                className="form-control-alternative"
                                id="input-districtName"
                                placeholder="Kabupaten/ Kota"
                                type="text"
                                name="districtName"
                                maxLength={255}
                                value={this.state.districtName}
                                onChange={this.handleOnChange}
                                />
                            </FormGroup>

                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-provinceName"
                                >
                                    Harga
                                </label>
                                <ReactSelectAsyncPaginate 
                                    value={this.state.price}
                                    loadOptions={this.loadPriceHandler}
                                    onChange={(option) => {
                                        if (option) {
                                            this.setState({
                                                vehicleType: {
                                                    ...this.state.vehicleType,
                                                    ...(option as OptionsType<{
                                                        value: number;
                                                        label: string;
                                                    }>)
                                                }
                                            })
                                        }
                                    }}
                                    additional={{
                                        page: 1
                                    }}
                                    debounceTimeout={250}
                                />
                            </FormGroup>

                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-service"
                                >
                                    Layanan
                                </label>
                                <ReactSelectAsyncPaginate 
                                    value={this.state.service}
                                    loadOptions={this.loadServiceHandler}
                                    onChange={(option) => {
                                        if (option) {
                                            this.setState({
                                                vehicleType: {
                                                    ...this.state.vehicleType,
                                                    ...(option as OptionsType<{
                                                        value: number;
                                                        label: string;
                                                    }>)
                                                }
                                            })
                                        }
                                    }}
                                    additional={{
                                        page: 1
                                    }}
                                    debounceTimeout={250}
                                />
                            </FormGroup>

                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-vehicleType"
                                >
                                    Jenis Kendaraan
                                </label>
                                <ReactSelectAsyncPaginate 
                                    value={this.state.vehicleType}
                                    loadOptions={this.loadVehicleTypeHandler}
                                    onChange={(option) => {
                                        if (option) {
                                            this.setState({
                                                vehicleType: {
                                                    ...this.state.vehicleType,
                                                    ...(option as OptionsType<{
                                                        value: number;
                                                        label: string;
                                                    }>)
                                                }
                                            })
                                        }
                                    }}
                                    additional={{
                                        page: 1
                                    }}
                                    debounceTimeout={250}
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

interface LinkDispatchToProps {
    fetchServicePriceFilteredAction: (filter: IFilter) => Promise<Boolean>,
    fetchListPriceAction: (search: string, page: number) => Promise<ApiResponseList<Price>>,
    fetchListVehicleTypeAction: (search: string, page: number) => Promise<ApiResponseList<VehicleTypeList>>,
    fetchListServiceAction: (search: string, page: number) => Promise<ApiResponseList<Service>>,
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: FilterProps): LinkDispatchToProps => {
    return {
        fetchServicePriceFilteredAction: (filter: IFilter) => dispatch(fetchServicePriceFilteredAction(filter)),
        fetchListPriceAction: (search: string, page: number) => dispatch(fetchListPriceAction(search, page)),
        fetchListVehicleTypeAction: (search: string, page: number) => dispatch(fetchListVehicleTypeAction(search, page)),
        fetchListServiceAction: (search: string, page: number) => dispatch(fetchListServiceAction(search, page)),
    }
}

export default connect(null, mapDispatchToProps)(Filter);