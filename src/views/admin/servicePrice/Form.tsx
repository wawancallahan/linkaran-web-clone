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
import {
    fetchListServicePriceAction
} from '../../../actions/admin/servicePrice';
import { ServicePrice, FormField, ServicePriceCreate, ServicePriceCreateResult } from '../../../types/admin/servicePrice';
import { createServicePriceAction, setAlertServicePriceShowAction } from '../../../actions/admin/servicePrice';
import { ApiResponse, ApiResponseError, ApiResponseSuccess, ApiResponseList, ApiResponseSuccessList } from '../../../types/api';
import ReactSelectAsyncPaginate from 'react-select-async-paginate';
import { Paginator } from '../../../types/paginator';
import { VehicleType } from '../../../types/admin/vehicleType';
import { fetchListVehicleTypeAction } from '../../../actions/admin/subBrandVehicle';
import { fetchListKabupatenKotaAction } from '../../../actions/admin/location';
import { KabupatenKota } from '../../../types/admin/location';

const createSchema = Yup.object().shape({
    basePrice: Yup.string()
            .matches(/^[0-9]*$/, "Wajib Diisi dengan angka")
            .test('len', 'Bidang isian harga dasar tidak boleh lebih dari 255 karakter', (val: any): boolean => {
                if (val) {
                    return val.length <= 255;
                }

                return true;
            })
            .required('Bidang isian harga dasar wajib diisi'),
    pricePerKm: Yup.string()
            .matches(/^[0-9]*$/, "Wajib Diisi dengan angka")
            .test('len', 'Bidang isian harga per kilometer tidak boleh lebih dari 255 karakter', (val: any): boolean => {
                if (val) {
                    return val.length <= 255;
                }

                return true;
            })
            .required('Bidang isian harga per kilometer wajib diisi'),
    minKm: Yup.string()
            .matches(/^[0-9]*$/, "Wajib Diisi dengan angka")
            .test('len', 'Bidang isian minimal jarak tempuh tidak boleh lebih dari 255 karakter', (val: any): boolean => {
                if (val) {
                    return val.length <= 255;
                }

                return true;
            })
            .required('Bidang isian minimal jarak tempuh wajib diisi'),
    district: Yup.object().shape({
        label: Yup.string().required("Bidang pilihan wilayah wajib diisi"),
        value: Yup.number().notOneOf([0], 'Bidang pilihan wilayah wajib diisi').required("Bidang pilihan wilayah wajib diisi")
    }),
    service: Yup.object().shape({
        label: Yup.string().required("Bidang pilihan layanan wajib diisi"),
        value: Yup.number().notOneOf([0], 'Bidang pilihan layanan wajib diisi').required("Bidang pilihan layanan wajib diisi")
    }),
    vechicleType: Yup.object().shape({
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

    loadVehicleTypeHandler = (search: string, loadedOption: {}, options: {
        page: number
    }) => {
        return this.props.fetchListVehicleTypeAction(search, options.page)
            .then((response: ApiResponseList<VehicleType>) => {

                const data: ApiResponseSuccessList<VehicleType> = response.response!;

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

                    result = data.result.map((item: VehicleType) => {
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

    loadKabupatenKotaHandler = (search: string, loadedOption: {}, options: {
        page: number
    }) => {
        return this.props.fetchListKabupatenKotaAction(search, options.page)
            .then((response: ApiResponseList<KabupatenKota>) => {

                const data: ApiResponseSuccessList<KabupatenKota> = response.response!;

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

                    result = data.result.map((item: KabupatenKota) => {
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

                    // const servicePrice: ServicePriceCreate = {
                    //     name: values.name,
                    //     servicePrice: {
                    //         id: values.servicePrice.value
                    //     }
                    // }

                    // this.props.createServicePriceAction(servicePrice)
                    //     .then( (response: ApiResponse<ServicePriceCreateResult>) => {
                    //         const data: ApiResponseSuccess<ServicePriceCreateResult> = response.response!;
                    //         this.props.setAlertServicePriceShowAction('Data Berhasil Ditambah', 'success');
                    //         this.props.redirectOnSuccess();
                    //     })
                    //     .catch( (error: ApiResponse<ServicePriceCreateResult>) => {
                    //         this.props.setAlertOpen(true);
                    //         this.props.setAlertMessage(error.error!.metaData.message);
                    //     });
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
                                    htmlFor="input-basePrice"
                                    >
                                        Harga Dasar
                                    </label>
                                    <Input
                                    className="form-control-alternative"
                                    id="input-basePrice"
                                    placeholder="Harga Dasar"
                                    type="text"
                                    name="basePrice"
                                    maxLength={255}
                                    value={FormikProps.values.basePrice}
                                    required
                                    onChange={FormikProps.handleChange}
                                    onBlur={FormikProps.handleBlur}
                                    invalid={ !!(FormikProps.touched.basePrice && FormikProps.errors.basePrice) }
                                    />
                                    <div>
                                        {FormikProps.errors.basePrice && FormikProps.touched.basePrice ? FormikProps.errors.basePrice : ''}
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                    <label
                                    className="form-control-label"
                                    htmlFor="input-pricePerKm"
                                    >
                                        Harga Per Kilometer
                                    </label>
                                    <Input
                                    className="form-control-alternative"
                                    id="input-pricePerKm"
                                    placeholder="Harga Per Kilometer"
                                    type="text"
                                    name="pricePerKm"
                                    maxLength={255}
                                    value={FormikProps.values.pricePerKm}
                                    required
                                    onChange={FormikProps.handleChange}
                                    onBlur={FormikProps.handleBlur}
                                    invalid={ !!(FormikProps.touched.pricePerKm && FormikProps.errors.pricePerKm) }
                                    />
                                    <div>
                                        {FormikProps.errors.pricePerKm && FormikProps.touched.pricePerKm ? FormikProps.errors.pricePerKm : ''}
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                    <label
                                    className="form-control-label"
                                    htmlFor="input-minKm"
                                    >
                                        Minimal Jarak Tempuh
                                    </label>
                                    <Input
                                    className="form-control-alternative"
                                    id="input-minKm"
                                    placeholder="Minimal Jarak Tempuh"
                                    type="text"
                                    name="minKm"
                                    maxLength={255}
                                    value={FormikProps.values.minKm}
                                    required
                                    onChange={FormikProps.handleChange}
                                    onBlur={FormikProps.handleBlur}
                                    invalid={ !!(FormikProps.touched.minKm && FormikProps.errors.minKm) }
                                    />
                                    <div>
                                        {FormikProps.errors.minKm && FormikProps.touched.minKm ? FormikProps.errors.minKm : ''}
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
                                        loadOptions={this.loadVehicleTypeHandler}
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
                                        loadOptions={this.loadVehicleTypeHandler}
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
                                    htmlFor="input-vechicleType"
                                    >
                                        Jenis Kendaraan
                                    </label>
                                    <ReactSelectAsyncPaginate 
                                        value={FormikProps.values.vechicleType}
                                        loadOptions={this.loadVehicleTypeHandler}
                                        onChange={(option) => FormikProps.setFieldValue('vechicleType', option)}
                                        onBlur={() => FormikProps.setFieldTouched('vechicleType', true)}
                                        additional={{
                                            page: 1
                                        }}
                                        />
                                    <div>
                                        { FormikProps.errors.vechicleType && FormikProps.touched.vechicleType ? FormikProps.errors.vechicleType.value : '' }
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
    createServicePriceAction: (servicePrice: ServicePriceCreate) => Promise<ApiResponse<ServicePriceCreateResult>>
    setAlertServicePriceShowAction: (message: string, color: string) => void,
    fetchListServicePriceAction: (search: string, page: number) => Promise<ApiResponseList<ServicePrice>>,
    fetchListVehicleTypeAction: (search: string, page: number) => Promise<ApiResponseList<VehicleType>>,
    fetchListKabupatenKotaAction: (search: string, page: number) => Promise<ApiResponseList<KabupatenKota>>
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: FormProps): LinkDispatchToProps => {
    return {
        createServicePriceAction: (servicePrice: ServicePriceCreate) => dispatch(createServicePriceAction(servicePrice)),
        setAlertServicePriceShowAction: (message: string, color: string) => dispatch(setAlertServicePriceShowAction(message, color)),
        fetchListServicePriceAction: (search: string, page: number) => dispatch(fetchListServicePriceAction(search, page)),
        fetchListVehicleTypeAction: (search: string, page: number) => dispatch(fetchListVehicleTypeAction(search, page)),
        fetchListKabupatenKotaAction: (search: string, page: number) => dispatch(fetchListKabupatenKotaAction(search, page, 1)),
    }
}

export default connect(null, mapDispatchToProps)(Form);