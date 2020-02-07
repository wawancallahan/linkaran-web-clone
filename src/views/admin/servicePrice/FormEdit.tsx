import React, { FormEvent, Component } from 'react';

import * as Yup from 'yup';
import { Formik, getIn, FormikProps } from 'formik';
import {
    Button,
    Form as FormReactStrap,
    FormGroup,
    Input,
} from 'reactstrap';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../../../types';
import { connect } from 'react-redux';
import { ServicePrice, FormField, ServicePriceEdit, ServicePriceEditResult } from '../../../types/admin/servicePrice';
import { editServicePriceAction, setAlertServicePriceShowAction } from '../../../actions/admin/servicePrice';
import { ApiResponse, ApiResponseError, ApiResponseSuccess, ApiResponseList, ApiResponseSuccessList } from '../../../types/api';
import ReactSelectAsyncPaginate from 'react-select-async-paginate';
import { Paginator } from '../../../types/paginator';
import { VehicleTypeList } from '../../../types/admin/vehicleType';
import { fetchListVehicleTypeAction } from '../../../actions/admin/subBrandVehicle';
import { fetchListRegionDistrictAction } from '../../../actions/admin/location';
import { RegionDistrict } from '../../../types/admin/location';
import { fetchListPriceAction } from '../../../actions/admin/price';
import { Price } from '../../../types/admin/price';
import { Service } from "../../../types/admin/service";
import { fetchListServiceAction } from '../../../actions/admin/service';

const createSchema = Yup.object().shape({
    price: Yup.object().shape({
        label: Yup.string().required("Bidang pilihan harga wajib diisi"),
        value: Yup.number().notOneOf([0], 'Bidang pilihan harga wajib diisi').required("Bidang pilihan harga wajib diisi")
    }),
    district: Yup.object().shape({
        label: Yup.string().required("Bidang pilihan wilayah wajib diisi"),
        value: Yup.number().notOneOf([0], 'Bidang pilihan wilayah wajib diisi').required("Bidang pilihan wilayah wajib diisi")
    }),
    service: Yup.object().shape({
        label: Yup.string().required("Bidang pilihan layanan wajib diisi"),
        value: Yup.number().notOneOf([0], 'Bidang pilihan layanan wajib diisi').required("Bidang pilihan layanan wajib diisi")
    }),
    vehicleType: Yup.object().shape({
        label: Yup.string().required("Bidang pilihan jenis kendaraan wajib diisi"),
        value: Yup.number().notOneOf([0], 'Bidang pilihan jenis kendaraan wajib diisi').required("Bidang pilihan jenis kendaraan wajib diisi")
    })
});

type FormProps = {
    form: FormField,
    setAlertOpen: (open: boolean) => void,
    setAlertMessage: (message: string) => void,
    redirectOnSuccess: () => void,
    id: number
}

type Props = LinkDispatchToProps & FormProps;

class Form extends Component<Props> {

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

    loadRegionDistrictHandler = (search: string, loadedOption: {}, options: {
        page: number
    }) => {
        return this.props.fetchListRegionDistrictAction(search, options.page)
            .then((response: ApiResponseList<RegionDistrict>) => {

                const data: ApiResponseSuccessList<RegionDistrict> = response.response!;

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

                    result = data.result.map((item: RegionDistrict) => {
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
            <Formik 
                initialValues={this.props.form}
                
                onSubmit={(values, action) => {
                    this.props.setAlertOpen(false);

                    const servicePrice: ServicePriceEdit = {
                        price: {
                            id: values.price.value
                        },
                        district: {
                            id: values.district.value
                        },
                        service: {
                            id: values.service.value
                        },
                        vehicleType: {
                            id: values.vehicleType.value
                        },
                    }

                    this.props.editServicePriceAction(servicePrice, this.props.id)
                        .then( (response: ApiResponse<ServicePriceEditResult>) => {
                            const data: ApiResponseSuccess<ServicePriceEditResult> = response.response!;
                            this.props.setAlertServicePriceShowAction('Data Berhasil Ditambah', 'success');
                            this.props.redirectOnSuccess();

                        })
                        .catch( (error: ApiResponse<ServicePriceEditResult>) => {
                            this.props.setAlertOpen(true);
                             let message = "Gagal Mendapatkan Response";

                        if (error.error) {
                            message = error.error.metaData.message;
                        }
                    
                        this.props.setAlertMessage(message);

                             action.setSubmitting(false)
                        });
                }}
                validationSchema={createSchema}
            >
                {(FormikProps => {
                    return (
                        <FormReactStrap onSubmit={FormikProps.handleSubmit} formMethod="POST">
                            <div className="pl-lg-4">
                                <FormGroup>
                                    <label
                                    className="form-control-label"
                                    htmlFor="input-price"
                                    >
                                        Harga
                                    </label>
                                    <ReactSelectAsyncPaginate 
                                        value={FormikProps.values.price}
                                        loadOptions={this.loadPriceHandler}
                                        onChange={(option) => FormikProps.setFieldValue('price', option)}
                                        onBlur={() => FormikProps.setFieldTouched('price', true)}
                                        additional={{
                                            page: 1
                                        }}
                                        />
                                    <div>
                                        { FormikProps.errors.price && FormikProps.touched.price ? FormikProps.errors.price.value : '' }
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                    <label
                                    className="form-control-label"
                                    htmlFor="input-district"
                                    >
                                        Wilayah
                                    </label>
                                    <ReactSelectAsyncPaginate 
                                        value={FormikProps.values.district}
                                        loadOptions={this.loadRegionDistrictHandler}
                                        onChange={(option) => FormikProps.setFieldValue('district', option)}
                                        onBlur={() => FormikProps.setFieldTouched('district', true)}
                                        additional={{
                                            page: 1
                                        }}
                                        />
                                    <div>
                                        { FormikProps.errors.district && FormikProps.touched.district ? FormikProps.errors.district.value : '' }
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                    <label
                                    className="form-control-label"
                                    htmlFor="input-service"
                                    >
                                        Layanan
                                    </label>
                                    <ReactSelectAsyncPaginate 
                                        value={FormikProps.values.service}
                                        loadOptions={this.loadServiceHandler}
                                        onChange={(option) => FormikProps.setFieldValue('service', option)}
                                        onBlur={() => FormikProps.setFieldTouched('service', true)}
                                        additional={{
                                            page: 1
                                        }}
                                        />
                                    <div>
                                        { FormikProps.errors.service && FormikProps.touched.service ? FormikProps.errors.service.value : '' }
                                    </div>
                                </FormGroup>    
                                <FormGroup>
                                    <label
                                    className="form-control-label"
                                    htmlFor="input-vehicleType"
                                    >
                                        Jenis Kendaraan
                                    </label>
                                    <ReactSelectAsyncPaginate 
                                        value={FormikProps.values.vehicleType}
                                        loadOptions={this.loadVehicleTypeHandler}
                                        onChange={(option) => FormikProps.setFieldValue('vehicleType', option)}
                                        onBlur={() => FormikProps.setFieldTouched('vehicleType', true)}
                                        additional={{
                                            page: 1
                                        }}
                                        />
                                    <div>
                                        { FormikProps.errors.vehicleType && FormikProps.touched.vehicleType ? FormikProps.errors.vehicleType.value : '' }
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                    <Button type="submit" disabled={FormikProps.isSubmitting} color="success">Simpan</Button>
                                </FormGroup>
                            </div>
                        </FormReactStrap>
                    );
                })}
            </Formik>
        )
    }
}

type LinkDispatchToProps = {
    editServicePriceAction: (servicePrice: ServicePriceEdit, id: number) => Promise<ApiResponse<ServicePriceEditResult>>
    setAlertServicePriceShowAction: (message: string, color: string) => void,
    fetchListPriceAction: (search: string, page: number) => Promise<ApiResponseList<Price>>,
    fetchListVehicleTypeAction: (search: string, page: number) => Promise<ApiResponseList<VehicleTypeList>>,
    fetchListRegionDistrictAction: (search: string, page: number) => Promise<ApiResponseList<RegionDistrict>>,
    fetchListServiceAction: (search: string, page: number) => Promise<ApiResponseList<Service>>,
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: FormProps): LinkDispatchToProps => {
    return {
        editServicePriceAction: (servicePrice: ServicePriceEdit, id: number) => dispatch(editServicePriceAction(servicePrice, id)),
        setAlertServicePriceShowAction: (message: string, color: string) => dispatch(setAlertServicePriceShowAction(message, color)),
        fetchListPriceAction: (search: string, page: number) => dispatch(fetchListPriceAction(search, page)),
        fetchListVehicleTypeAction: (search: string, page: number) => dispatch(fetchListVehicleTypeAction(search, page)),
        fetchListRegionDistrictAction: (search: string, page: number) => dispatch(fetchListRegionDistrictAction(search, page)),
        fetchListServiceAction: (search: string, page: number) => dispatch(fetchListServiceAction(search, page)),
    }
}

export default connect(null, mapDispatchToProps)(Form);