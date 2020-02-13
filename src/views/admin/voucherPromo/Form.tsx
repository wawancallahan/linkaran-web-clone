import React, { FormEvent, Component } from 'react';

import * as Yup from 'yup';
import { Formik, getIn, FormikProps } from 'formik';
import {
    Button,
    Form as FormReactStrap,
    FormGroup,
    Input,
    Row,
    Col
} from 'reactstrap';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../../../types';
import { connect } from 'react-redux';

import { VoucherPromo, FormField, VoucherPromoCreate, VoucherPromoCreateResult } from '../../../types/admin/voucherPromo';
import { createVoucherPromoAction, setAlertVoucherPromoShowAction } from '../../../actions/admin/voucherPromo';
import { ApiResponse, ApiResponseError, ApiResponseSuccess, ApiResponseList, ApiResponseSuccessList } from '../../../types/api';
import Dropzone from '../../../components/Dropzone/Dropzone';
import DatePicker from 'react-datepicker';
import { Paginator } from '../../../types/paginator';

import { Service } from "../../../types/admin/service";
import { fetchListServiceAction } from '../../../actions/admin/service';
import ReactSelectAsyncPaginate from 'react-select-async-paginate';
import { fetchListVoucherTypeAction } from '../../../actions/admin/voucherType';
import { VoucherType } from '../../../types/admin/voucherType';
import { getOnlyDateFromDate, getTimeFromDate } from '../../../helpers/parseData';

const createSchema = Yup.object().shape({
    name: Yup.string()
            .test('len', 'Bidang isian nama tidak boleh lebih dari 255 karakter', (val: any): boolean => {
                if (val) {
                    return val.length <= 255;
                }

                return true;
            })
            .required('Bidang isian nama wajib diisi'),
    code: Yup.string()
            .test('len', 'Bidang isian kode tidak boleh lebih dari 255 karakter', (val: any): boolean => {
                if (val) {
                    return val.length <= 255;
                }

                return true;
            })
            .required('Bidang isian kode wajib diisi'),
    description: Yup.string()
            .test('len', 'Bidang isian deskripsi tidak boleh lebih dari 255 karakter', (val: any): boolean => {
                if (val) {
                    return val.length <= 255;
                }

                return true;
            })
            .required('Bidang isian deskripsi wajib diisi'),
    amount: Yup.string()
            .matches(/^[0-9]*$/, "Wajib Diisi dengan angka")
            .test('len', 'Bidang isian nominal tidak boleh lebih dari 255 karakter', (val: any): boolean => {
                if (val) {
                    return val.length <= 255;
                }

                return true;
            })
            .required('Bidang isian nominal wajib diisi'),
    minimumPurchase: Yup.string()
            .matches(/^[0-9]*$/, "Wajib Diisi dengan angka")
            .test('len', 'Bidang isian minimal pembelian tidak boleh lebih dari 255 karakter', (val: any): boolean => {
                if (val) {
                    return val.length <= 255;
                }

                return true;
            })
            .required('Bidang isian minimal pembelian wajib diisi'),
    quota: Yup.string()
            .matches(/^[0-9]*$/, "Wajib Diisi dengan angka")
            .test('len', 'Bidang isian kouta tidak boleh lebih dari 255 karakter', (val: any): boolean => {
                if (val) {
                    return val.length <= 255;
                }

                return true;
            })
            .required('Bidang isian kouta wajib diisi'),
    quantity: Yup.string()
            .matches(/^[0-9]*$/, "Wajib Diisi dengan angka")
            .test('len', 'Bidang isian jumlah penggunaan tidak boleh lebih dari 255 karakter', (val: any): boolean => {
                if (val) {
                    return val.length <= 255;
                }

                return true;
            })
            .required('Bidang isian jumlah penggunaan wajib diisi'),
    image_preview: Yup.string()
             .required('Bidang upload foto wajib diisi'),
    service: Yup.array()
            .min(1, "Bidang pilihan layanan wajib diisi")
            .of(
                Yup.object().shape({
                    label: Yup.string().required('Bidang pilihan layanan wajib diisi'),
                    value: Yup.number().notOneOf([0], 'Bidang pilihan layanan wajib diisi').required('Bidang pilihan layanan wajib diisi')
                })
            ),
    type: Yup.object().shape({
        label: Yup.string().required("Bidang pilihan tipe voucher wajib diisi"),
        value: Yup.number().notOneOf([0], 'Bidang pilihan tipe voucher wajib diisi').required("Bidang pilihan brand vehicle wajib diisi")
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

    loadVoucherTypeHandler = (search: string, loadedOption: {}, options: {
        page: number
    }) => {
        return this.props.fetchListVoucherTypeAction(search, options.page)
            .then((response: ApiResponseList<VoucherType>) => {

                const data: ApiResponseSuccessList<VoucherType> = response.response!;

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

                    result = data.result.map((item: VoucherType) => {
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

    onFilesAdded = (files: any[], FormikProps: FormikProps<FormField>, setPreview: any, setValue: any) => {
        const file: {
            lastModified: number,
            name: string,
            preview: string,
            size: number,
            type: string
        } = files.length > 0 ? files[0] : null;
    
        if (file) {
            FormikProps.setFieldValue(setPreview, file.preview, true);
            FormikProps.setFieldValue(setValue, file);
        }
    }

    render() {
        return (
            <Formik 
                initialValues={this.props.form}
                onSubmit={(values, action) => {
                    this.props.setAlertOpen(false);

                    let isLimited: boolean = false

                    if (values.isLimited == '1') isLimited = true

                    let startDateTime = ''
                    let endDateTime = ''

                    if (values.startDateTime) {
                        startDateTime = `${getOnlyDateFromDate(values.startDateTime)} ${getTimeFromDate(values.startDateTime)}`
                    }

                    if (values.endDateTime) {
                        endDateTime = `${getOnlyDateFromDate(values.endDateTime)} ${getTimeFromDate(values.endDateTime)}`
                    }

                    const voucherPromo: VoucherPromoCreate = {
                        name: values.name,
                        code: values.code,
                        description: values.description,
                        amount: values.amount,
                        quantity: values.quantity,
                        quota: values.quota,
                        isLimited: isLimited,
                        minimumPurchase: values.minimumPurchase,
                        image: values.image,
                        image_preview: values.image_preview,
                        startDateTime: startDateTime,
                        endDateTime: endDateTime,
                        type: values.type,
                        service: values.service
                    }

                    this.props.createVoucherPromoAction(voucherPromo)
                        .then( (response: ApiResponse<VoucherPromoCreateResult>) => {
                            const data: ApiResponseSuccess<VoucherPromoCreateResult> = response.response!;
                            
                            this.props.setAlertVoucherPromoShowAction('Data Berhasil Ditambah', 'success');
                            this.props.redirectOnSuccess();
                        })
                        .catch( (error: ApiResponse<VoucherPromoCreateResult>) => {
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
                                    htmlFor="input-type"
                                    >
                                        Tipe Voucher
                                    </label>
                                    <ReactSelectAsyncPaginate 
                                        value={FormikProps.values.type}
                                        loadOptions={this.loadVoucherTypeHandler}
                                        onChange={(option) => FormikProps.setFieldValue('type', option)}
                                        onBlur={() => FormikProps.setFieldTouched('type', true)}
                                        additional={{
                                            page: 1
                                        }}
                                        />
                                    <div>
                                        { FormikProps.errors.type && FormikProps.touched.type ? FormikProps.errors.type : '' }
                                    </div>
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
                                    value={FormikProps.values.code}
                                    required
                                    onChange={FormikProps.handleChange}
                                    onBlur={FormikProps.handleBlur}
                                    invalid={ !!(FormikProps.touched.code && FormikProps.errors.code) }
                                    />
                                    <div>
                                        {FormikProps.errors.code && FormikProps.touched.code ? FormikProps.errors.code : ''}
                                    </div>
                                </FormGroup>
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
                                    value={FormikProps.values.name}
                                    required
                                    onChange={FormikProps.handleChange}
                                    onBlur={FormikProps.handleBlur}
                                    invalid={ !!(FormikProps.touched.name && FormikProps.errors.name) }
                                    />
                                    <div>
                                        {FormikProps.errors.name && FormikProps.touched.name ? FormikProps.errors.name : ''}
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                    <label
                                    className="form-control-label"
                                    htmlFor="input-description"
                                    >
                                        Deskripsi
                                    </label>
                                    <Input
                                    className="form-control-alternative"
                                    id="input-description"
                                    placeholder="Deskripsi"
                                    type="textarea"
                                    name="description"
                                    maxLength={255}
                                    value={FormikProps.values.description}
                                    required
                                    onChange={FormikProps.handleChange}
                                    onBlur={FormikProps.handleBlur}
                                    invalid={ !!(FormikProps.touched.description && FormikProps.errors.description) }
                                    />
                                    <div>
                                        {FormikProps.errors.description && FormikProps.touched.description ? FormikProps.errors.description : ''}
                                    </div>
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
                                    value={FormikProps.values.amount}
                                    required
                                    onChange={FormikProps.handleChange}
                                    onBlur={FormikProps.handleBlur}
                                    invalid={ !!(FormikProps.touched.amount && FormikProps.errors.amount) }
                                    />
                                    <div>
                                        {FormikProps.errors.amount && FormikProps.touched.amount ? FormikProps.errors.amount : ''}
                                    </div>
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
                                    value={FormikProps.values.minimumPurchase}
                                    required
                                    onChange={FormikProps.handleChange}
                                    onBlur={FormikProps.handleBlur}
                                    invalid={ !!(FormikProps.touched.minimumPurchase && FormikProps.errors.minimumPurchase) }
                                    />
                                    <div>
                                        {FormikProps.errors.minimumPurchase && FormikProps.touched.minimumPurchase ? FormikProps.errors.minimumPurchase : ''}
                                    </div>
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
                                    value={FormikProps.values.quota}
                                    required
                                    onChange={FormikProps.handleChange}
                                    onBlur={FormikProps.handleBlur}
                                    invalid={ !!(FormikProps.touched.quota && FormikProps.errors.quota) }
                                    />
                                    <div>
                                        {FormikProps.errors.quota && FormikProps.touched.quota ? FormikProps.errors.quota : ''}
                                    </div>
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
                                    value={FormikProps.values.quantity}
                                    required
                                    onChange={FormikProps.handleChange}
                                    onBlur={FormikProps.handleBlur}
                                    invalid={ !!(FormikProps.touched.quantity && FormikProps.errors.quantity) }
                                    />
                                    <div>
                                        {FormikProps.errors.quantity && FormikProps.touched.quantity ? FormikProps.errors.quantity : ''}
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                    <label
                                    className="form-control-label"
                                    htmlFor="input-file-image"
                                    >
                                        Gambar
                                    </label>
                                    <Dropzone onFilesAdded={(files: any[]) => {
                                        this.onFilesAdded(files, FormikProps, 'image_preview', 'image');
                                    }} disabled={false} multiple={false} />
                                    
                                    <div>
                                        {FormikProps.errors.image_preview && FormikProps.touched.image_preview ? FormikProps.errors.image_preview : ''}
                                    </div>
                                </FormGroup>

                                <Row>
                                    <Col>
                                        <FormGroup>
                                            <label
                                            className="form-control-label"
                                            htmlFor="input-startDateTime"
                                            >
                                                Periode Awal
                                            </label>
                                            <div className="react-datepicker-w100">
                                            <DatePicker
                                                selected={FormikProps.values.startDateTime}
                                                onChange={date => FormikProps.setFieldValue('startDateTime', date)}
                                                onBlur={() => FormikProps.setFieldTouched('startDateTime', true)}
                                                dateFormat="yyyy-MM-dd hh:mm"
                                                showTimeSelect
                                                className="form-control form-control-alternative"
                                                required
                                                />
                                            </div>
                                            <div>
                                                {FormikProps.errors.startDateTime && FormikProps.touched.startDateTime ? FormikProps.errors.startDateTime : ''}
                                            </div>
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup>
                                            <label
                                            className="form-control-label"
                                            htmlFor="input-endDateTime"
                                            >
                                                Periode Akhir
                                            </label>
                                                <div className="react-datepicker-w100">
                                                <DatePicker
                                                    selected={FormikProps.values.endDateTime}
                                                    onChange={date => FormikProps.setFieldValue('endDateTime', date)}
                                                    onBlur={() => FormikProps.setFieldTouched('endDateTime', true)}
                                                    dateFormat="yyyy-MM-dd hh:mm"
                                                    showTimeSelect
                                                    className="form-control form-control-alternative"
                                                    required
                                                    />
                                                </div>
                                            <div>
                                                {FormikProps.errors.endDateTime && FormikProps.touched.endDateTime ? FormikProps.errors.endDateTime : ''}
                                            </div>
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <FormGroup>
                                    <label
                                    className="form-control-label"
                                    htmlFor="input-isLimited"
                                    >
                                        Target Penggunaan
                                    </label>
                                </FormGroup>

                                <FormGroup>
                                    <fieldset>
                                        <div className="custom-control custom-radio mb-3">
                                            <input
                                                className="custom-control-input"
                                                defaultChecked
                                                id="isLimited_no"
                                                name="isLimited"
                                                type="radio"
                                                value="0"
                                                onChange={FormikProps.handleChange}
                                                onBlur={FormikProps.handleBlur}
                                            />
                                            <label className="custom-control-label" htmlFor="isLimited_no">
                                                Public
                                            </label>
                                        </div>
                                        <div className="custom-control custom-radio mb-3">
                                            <input
                                                className="custom-control-input"
                                                id="isLimited_yes"
                                                name="isLimited"
                                                type="radio"
                                                value="1"
                                                onChange={FormikProps.handleChange}
                                                onBlur={FormikProps.handleBlur}
                                            />
                                            <label className="custom-control-label" htmlFor="isLimited_yes">
                                                Terbatas
                                            </label>
                                        </div>
                                    </fieldset>
                                    <div>
                                        {FormikProps.errors.isLimited && FormikProps.touched.isLimited ? FormikProps.errors.isLimited : ''}
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
                                        isMulti
                                        />
                                    <div>
                                        { FormikProps.errors.service && FormikProps.touched.service ? FormikProps.errors.service : '' }
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
    createVoucherPromoAction: (voucherPromo: VoucherPromoCreate) => Promise<ApiResponse<VoucherPromoCreateResult>>,
    setAlertVoucherPromoShowAction: (message: string, color: string) => void,
    fetchListServiceAction: (search: string, page: number) => Promise<ApiResponseList<Service>>,
    fetchListVoucherTypeAction: (search: string, page: number) => Promise<ApiResponseList<VoucherType>>,
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: FormProps): LinkDispatchToProps => {
    return {
        createVoucherPromoAction: (voucherPromo: VoucherPromoCreate) => dispatch(createVoucherPromoAction(voucherPromo)),
        setAlertVoucherPromoShowAction: (message: string, color: string) => dispatch(setAlertVoucherPromoShowAction(message, color)),
        fetchListServiceAction: (search: string, page: number) => dispatch(fetchListServiceAction(search, page)),
        fetchListVoucherTypeAction: (search: string, page: number) => dispatch(fetchListVoucherTypeAction(search, page)),
    }
}

export default connect(null, mapDispatchToProps)(Form);