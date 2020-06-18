import * as React from 'react'
import * as Yup from 'yup';
import { Formik, FormikProps } from 'formik';
import {
    Button,
    Form as FormReactStrap,
    FormGroup,
    Input,
} from 'reactstrap';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../../../../../types';
import { connect } from 'react-redux';
import { FormField, ServicePriceEditField, ServicePriceEditResult } from '../../../../../types/admin/servicePrice';
import { editServicePriceAction, setAlertServicePriceShowAction } from '../../../../../actions/admin/servicePrice';
import { ApiResponse, ApiResponseSuccess, ApiResponseList, ApiResponseSuccessList } from '../../../../../types/api';
import swal from 'sweetalert'
import BlockUi from '../../../../../components/BlockUi/BlockUi'
import { toast, TypeOptions } from 'react-toastify'
import { Schema } from './Schema'
import ReactSelectAsyncPaginate from 'react-select-async-paginate';
import { Paginator } from '../../../../../types/paginator';
import { PriceList } from '../../../../../types/admin/price';
import { fetchListPriceAction } from '../../../../../actions/admin/price';
import { VehicleTypeList } from '../../../../../types/admin/vehicleType';
import { fetchListVehicleTypeAction } from '../../../../../actions/admin/vehicleType';
import { DistrictList } from '../../../../../types/admin/region/district';
import { fetchListDistrictAction } from '../../../../../actions/admin/region/district';
import { ServiceList } from '../../../../../types/admin/service';
import { fetchListServiceAction } from '../../../../../actions/admin/service';

type OwnProps = {
    form: FormField,
    setAlertVisible: React.Dispatch<React.SetStateAction<boolean>>,
    setAlertMessage: React.Dispatch<React.SetStateAction<string>>,
    redirectOnSuccess: () => void,
    id: number
}

type Props = OwnProps & LinkDispatchToProps

const Form: React.FC<Props> = (props) => {

    const toastNotify = (message: string, type: TypeOptions) => {
        toast(message, {
            type: type,
            position: toast.POSITION.TOP_RIGHT,
            draggable: false,
            hideProgressBar: true,
            closeOnClick: false
        })
    }

    const loadServiceHandler = (search: string, loadedOption: { label: string; value: number; }[], options: {
        page: number
    }) => {
        return props.fetchListServiceAction(search, options.page)
            .then((response: ApiResponseList<ServiceList>) => {

                const data: ApiResponseSuccessList<ServiceList> = response.response!;

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

                    result = data.result.map((item: ServiceList) => {
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

    const loadPriceHandler = (search: string, loadedOption: { label: string; value: number; }[], options: {
        page: number
    }) => {
        return props.fetchListPriceAction(search, options.page)
            .then((response: ApiResponseList<PriceList>) => {

                const data: ApiResponseSuccessList<PriceList> = response.response!;

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

                    result = data.result.map((item: PriceList) => {
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

    const loadVehicleTypeHandler = (search: string, loadedOption: { label: string; value: number; }[], options: {
        page: number
    }) => {
        return props.fetchListVehicleTypeAction(search, options.page)
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

    const loadRegionDistrictHandler = (search: string, loadedOption: { label: string; value: number; }[], options: {
        page: number
    }) => {
        return props.fetchListDistrictAction(search, options.page)
            .then((response: ApiResponseList<DistrictList>) => {

                const data: ApiResponseSuccessList<DistrictList> = response.response!;

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

                    result = data.result.map((item: DistrictList) => {
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

    return (
        <Formik 
            initialValues={props.form}
            
            onSubmit={(values, action) => {
                props.setAlertVisible(false);

                const servicePrice: ServicePriceEditField = {
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
                    driverPaymentDeductions: Number.parseInt(values.driverPaymentDeductions),
                    servicePaymentDeductions: Number.parseInt(values.servicePaymentDeductions),
                    maxDriverDistanceRadius: Number.parseInt(values.maxDriverDistanceRadius),
                }

                swal("Apakah anda yakin?", "Data akan diubah!", {
                    icon: "warning",
                    buttons: ["Tutup!", true],
                }).then((willEdited) => {
                    if (willEdited) {
                        props.editServicePriceAction(servicePrice, props.id)
                            .then( (response: ApiResponse<ServicePriceEditResult>) => {
                                const data: ApiResponseSuccess<ServicePriceEditResult> = response.response!;
                                props.setAlertServicePriceShowAction('Data Berhasil Ditambah', 'success');
                                props.redirectOnSuccess();

                            })
                            .catch( (error: ApiResponse<ServicePriceEditResult>) => {
                                let message = "Gagal Mendapatkan Response";

                                if (error.error) {
                                    message = error.error.metaData.message;
                                }

                                toastNotify(message, "error");

                                action.setSubmitting(false)
                            });
                    } else {
                        action.setSubmitting(false)
                    }
                });
            }}
            validationSchema={Schema}
        >
            {(FormikProps => {
                return (
                    <BlockUi blocking={FormikProps.isSubmitting}>
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
                                        loadOptions={loadPriceHandler}
                                        onChange={(option) => FormikProps.setFieldValue('price', option)}
                                        onBlur={() => FormikProps.setFieldTouched('price', true)}
                                        additional={{
                                            page: 1
                                        }}
                                        debounceTimeout={250}
                                        />
                                    <div>
                                        { FormikProps.errors.price && FormikProps.touched.price ? FormikProps.errors.price.value : '' }
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                    <label
                                    className="form-control-label"
                                    htmlFor="input-driverPaymentDeductions"
                                    >
                                        Pengurangan Pembayaran driver
                                    </label>
                                    <Input
                                    className="form-control-alternative"
                                    id="input-driverPaymentDeductions"
                                    placeholder="Pengurangan Pembayaran driver"
                                    type="text"
                                    name="driverPaymentDeductions"
                                    maxLength={255}
                                    value={FormikProps.values.driverPaymentDeductions}
                                    required
                                    onChange={FormikProps.handleChange}
                                    onBlur={FormikProps.handleBlur}
                                    invalid={ !!(FormikProps.touched.driverPaymentDeductions && FormikProps.errors.driverPaymentDeductions) }
                                    />
                                    <div>
                                        {FormikProps.errors.driverPaymentDeductions && FormikProps.touched.driverPaymentDeductions ? FormikProps.errors.driverPaymentDeductions : ''}
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                    <label
                                    className="form-control-label"
                                    htmlFor="input-servicePaymentDeductions"
                                    >
                                        Pengurangan Pembayaran Layanan
                                    </label>
                                    <Input
                                    className="form-control-alternative"
                                    id="input-servicePaymentDeductions"
                                    placeholder="Pengurangan Pembayaran Layanan"
                                    type="text"
                                    name="servicePaymentDeductions"
                                    maxLength={255}
                                    value={FormikProps.values.servicePaymentDeductions}
                                    required
                                    onChange={FormikProps.handleChange}
                                    onBlur={FormikProps.handleBlur}
                                    invalid={ !!(FormikProps.touched.servicePaymentDeductions && FormikProps.errors.servicePaymentDeductions) }
                                    />
                                    <div>
                                        {FormikProps.errors.servicePaymentDeductions && FormikProps.touched.servicePaymentDeductions ? FormikProps.errors.servicePaymentDeductions : ''}
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                    <label
                                    className="form-control-label"
                                    htmlFor="input-maxDriverDistanceRadius"
                                    >
                                        Radius Maksimal Jarak Driver
                                    </label>
                                    <Input
                                    className="form-control-alternative"
                                    id="input-maxDriverDistanceRadius"
                                    placeholder="Radius Maksimal Jarak Driver"
                                    type="text"
                                    name="maxDriverDistanceRadius"
                                    maxLength={255}
                                    value={FormikProps.values.maxDriverDistanceRadius}
                                    required
                                    onChange={FormikProps.handleChange}
                                    onBlur={FormikProps.handleBlur}
                                    invalid={ !!(FormikProps.touched.maxDriverDistanceRadius && FormikProps.errors.maxDriverDistanceRadius) }
                                    />
                                    <div>
                                        {FormikProps.errors.maxDriverDistanceRadius && FormikProps.touched.maxDriverDistanceRadius ? FormikProps.errors.maxDriverDistanceRadius : ''}
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
                                        loadOptions={loadRegionDistrictHandler}
                                        onChange={(option) => FormikProps.setFieldValue('district', option)}
                                        onBlur={() => FormikProps.setFieldTouched('district', true)}
                                        additional={{
                                            page: 1
                                        }}
                                        debounceTimeout={250}
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
                                        loadOptions={loadServiceHandler}
                                        onChange={(option) => FormikProps.setFieldValue('service', option)}
                                        onBlur={() => FormikProps.setFieldTouched('service', true)}
                                        additional={{
                                            page: 1
                                        }}
                                        debounceTimeout={250}
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
                                        loadOptions={loadVehicleTypeHandler}
                                        onChange={(option) => FormikProps.setFieldValue('vehicleType', option)}
                                        onBlur={() => FormikProps.setFieldTouched('vehicleType', true)}
                                        additional={{
                                            page: 1
                                        }}
                                        debounceTimeout={250}
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
                    </BlockUi>
                );
            })}
        </Formik>
    )
}

type LinkDispatchToProps = {
    editServicePriceAction: (service: ServicePriceEditField, id: number) => Promise<ApiResponse<ServicePriceEditResult>>
    setAlertServicePriceShowAction: (message: string, color: string) => void,
    fetchListPriceAction: (search: string, page: number) => Promise<ApiResponseList<PriceList>>,
    fetchListVehicleTypeAction: (search: string, page: number) => Promise<ApiResponseList<VehicleTypeList>>,
    fetchListDistrictAction: (search: string, page: number) => Promise<ApiResponseList<DistrictList>>,
    fetchListServiceAction: (search: string, page: number) => Promise<ApiResponseList<ServiceList>>,
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: OwnProps): LinkDispatchToProps => {
    return {
        editServicePriceAction: (service: ServicePriceEditField, id: number) => dispatch(editServicePriceAction(service, id)),
        setAlertServicePriceShowAction: (message: string, color: string) => dispatch(setAlertServicePriceShowAction(message, color)),
        fetchListPriceAction: (search: string, page: number) => dispatch(fetchListPriceAction(search, page)),
        fetchListVehicleTypeAction: (search: string, page: number) => dispatch(fetchListVehicleTypeAction(search, page)),
        fetchListDistrictAction: (search: string, page: number) => dispatch(fetchListDistrictAction(search, page)),
        fetchListServiceAction: (search: string, page: number) => dispatch(fetchListServiceAction(search, page)),
    }
}

export default connect(null, mapDispatchToProps)(Form);