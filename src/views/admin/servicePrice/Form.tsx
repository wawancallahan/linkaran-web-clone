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
import { ServicePrice, FormField, ServicePriceCreateField, ServicePriceCreateResult } from '../../../types/admin/servicePrice';
import { createServicePriceAction, setAlertServicePriceShowAction } from '../../../actions/admin/servicePrice';
import { ApiResponse, ApiResponseError, ApiResponseSuccess, ApiResponseList, ApiResponseSuccessList } from '../../../types/api';
import ReactSelectAsyncPaginate from 'react-select-async-paginate';
import { Paginator } from '../../../types/paginator';
import { VehicleTypeList } from '../../../types/admin/vehicleType';
import { fetchListVehicleTypeAction } from '../../../actions/admin/vehicleType';
import { fetchListPriceAction } from '../../../actions/admin/price';
import { fetchListServiceAction } from '../../../actions/admin/service';
import { PriceList } from '../../../types/admin/price';
import { ServiceList } from "../../../types/admin/service";
import { fetchListDistrictAction } from '../../../actions/admin/region/district';
import { DistrictList } from '../../../types/admin/region/district';
import swal from 'sweetalert'
import BlockUi from '../../../components/BlockUi/BlockUi'
import { toast, TypeOptions } from 'react-toastify'

const createSchema = Yup.object().shape({
    price: Yup.object().shape({
        label: Yup.string().required("Bidang pilihan harga wajib diisi"),
        value: Yup.number().notOneOf([0], 'Bidang pilihan harga wajib diisi').required("Bidang pilihan harga wajib diisi")
    }),
    driverPaymentDeductions: Yup.string()
        .matches(/^[0-9]*$/, "Wajib Diisi dengan angka")
        .test('len', 'Bidang isian pengurangan pembayaran driver tidak boleh lebih dari 255 karakter', (val: any): boolean => {
            if (val) {
                return val.length <= 255;
            }

            return true;
        })
        .required('Bidang isian pengurangan pembayaran driver wajib diisi'),
    servicePaymentDeductions: Yup.string()
        .matches(/^[0-9]*$/, "Wajib Diisi dengan angka")
        .test('len', 'Bidang isian pengurangan pembayaran layanan tidak boleh lebih dari 255 karakter', (val: any): boolean => {
            if (val) {
                return val.length <= 255;
            }

            return true;
        })
        .required('Bidang isian pengurangan pembayaran layanan wajib diisi'),
    maxDriverDistanceRadius: Yup.string()
        .matches(/^[0-9]*$/, "Wajib Diisi dengan angka")
        .test('len', 'Bidang isian radius maksimal jarak driver tidak boleh lebih dari 255 karakter', (val: any): boolean => {
            if (val) {
                return val.length <= 255;
            }

            return true;
        })
        .required('Bidang isian radius maksimal jarak driver wajib diisi'),
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
    redirectOnSuccess: () => void
}

type Props = LinkDispatchToProps & FormProps;

class Form extends Component<Props> {

    toastNotify = (message: string, type: TypeOptions) => {
        toast(message, {
            type: type,
            position: toast.POSITION.TOP_RIGHT,
            draggable: false,
            hideProgressBar: true,
            closeOnClick: false
        })
    }

    loadServiceHandler = (search: string, loadedOption: { label: string; value: number; }[], options: {
        page: number
    }) => {
        return this.props.fetchListServiceAction(search, options.page)
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

    loadPriceHandler = (search: string, loadedOption: { label: string; value: number; }[], options: {
        page: number
    }) => {
        return this.props.fetchListPriceAction(search, options.page)
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

    loadVehicleTypeHandler = (search: string, loadedOption: { label: string; value: number; }[], options: {
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

    loadRegionDistrictHandler = (search: string, loadedOption: { label: string; value: number; }[], options: {
        page: number
    }) => {
        return this.props.fetchListDistrictAction(search, options.page)
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


    render() {
        return (
            <Formik 
                initialValues={this.props.form}
                
                onSubmit={(values, action) => {
                    this.props.setAlertOpen(false);

                    const servicePrice: ServicePriceCreateField = {
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

                    swal("Apakah anda yakin?", "Data akan ditambahkan!", {
                        icon: "warning",
                        buttons: ["Tutup!", true],
                    }).then((willCreated) => {
                        if (willCreated) {
                            this.props.createServicePriceAction(servicePrice)
                                .then( (response: ApiResponse<ServicePriceCreateResult>) => {
                                    const data: ApiResponseSuccess<ServicePriceCreateResult> = response.response!;
                                    this.props.setAlertServicePriceShowAction('Data Berhasil Ditambah', 'success');
                                    this.props.redirectOnSuccess();

                                })
                                .catch( (error: ApiResponse<ServicePriceCreateResult>) => {
                                    let message = "Gagal Mendapatkan Response";

                                    if (error.error) {
                                        message = error.error.metaData.message;
                                    }

                                    this.toastNotify(message, "error");

                                    action.setSubmitting(false)
                                });
                        } else {
                            action.setSubmitting(false)
                        }
                    });
                }}
                validationSchema={createSchema}
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
                                            loadOptions={this.loadPriceHandler}
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
                                            loadOptions={this.loadRegionDistrictHandler}
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
                                            loadOptions={this.loadServiceHandler}
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
                                            loadOptions={this.loadVehicleTypeHandler}
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
}

type LinkDispatchToProps = {
    createServicePriceAction: (servicePrice: ServicePriceCreateField) => Promise<ApiResponse<ServicePriceCreateResult>>
    setAlertServicePriceShowAction: (message: string, color: string) => void,
    fetchListPriceAction: (search: string, page: number) => Promise<ApiResponseList<PriceList>>,
    fetchListVehicleTypeAction: (search: string, page: number) => Promise<ApiResponseList<VehicleTypeList>>,
    fetchListDistrictAction: (search: string, page: number) => Promise<ApiResponseList<DistrictList>>,
    fetchListServiceAction: (search: string, page: number) => Promise<ApiResponseList<ServiceList>>,
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: FormProps): LinkDispatchToProps => {
    return {
        createServicePriceAction: (servicePrice: ServicePriceCreateField) => dispatch(createServicePriceAction(servicePrice)),
        setAlertServicePriceShowAction: (message: string, color: string) => dispatch(setAlertServicePriceShowAction(message, color)),
        fetchListPriceAction: (search: string, page: number) => dispatch(fetchListPriceAction(search, page)),
        fetchListVehicleTypeAction: (search: string, page: number) => dispatch(fetchListVehicleTypeAction(search, page)),
        fetchListDistrictAction: (search: string, page: number) => dispatch(fetchListDistrictAction(search, page)),
        fetchListServiceAction: (search: string, page: number) => dispatch(fetchListServiceAction(search, page)),
    }
}

export default connect(null, mapDispatchToProps)(Form);