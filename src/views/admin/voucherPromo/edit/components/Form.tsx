import * as React from 'react'
import * as Yup from 'yup';
import { Formik, FormikProps, FieldArray } from 'formik';
import {
    Button,
    Form as FormReactStrap,
    FormGroup,
    Input,
    Row,
    Col,
} from 'reactstrap';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../../../../../types';
import { connect } from 'react-redux';
import { FormField, VoucherPromoEditField, VoucherPromoEditResult } from '../../../../../types/admin/voucherPromo';
import { editVoucherPromoAction, setAlertVoucherPromoShowAction } from '../../../../../actions/admin/voucherPromo';
import { ApiResponse, ApiResponseSuccess, ApiResponseList, ApiResponseSuccessList } from '../../../../../types/api';
import ReactSelectAsyncPaginate from 'react-select-async-paginate';
import { Paginator } from '../../../../../types/paginator';
import swal from 'sweetalert'
import BlockUi from '../../../../../components/BlockUi/BlockUi'
import { toast, TypeOptions } from 'react-toastify'
import { Schema } from './Schema'
import { getOnlyDateFromDate, getTimeFromDate } from '../../../../../helpers/utils';
import Dropzone from '../../../../../components/Dropzone/Dropzone';
import { SelectType } from '../../../../../types/select';
import DatePicker from 'react-datepicker';
import { ServiceList } from '../../../../../types/admin/service';
import { VoucherTypeList } from '../../../../../types/admin/voucherType';
import { RestaurantList } from '../../../../../types/admin/restaurant';
import { fetchListServiceAction } from '../../../../../actions/admin/service';
import { fetchListVoucherTypeAction } from '../../../../../actions/admin/voucherType';
import { fetchListRestaurantAction } from '../../../../../actions/admin/restaurant';
import NumberFormat, { NumberFormatValues } from 'react-number-format';
import "react-datepicker/dist/react-datepicker.css";

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

    const loadVoucherTypeHandler = (search: string, loadedOption: { label: string; value: number; }[], options: {
        page: number
    }) => {
        return props.fetchListVoucherTypeAction(search, options.page)
            .then((response: ApiResponseList<VoucherTypeList>) => {

                const data: ApiResponseSuccessList<VoucherTypeList> = response.response!;

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

                    result = data.result.map((item: VoucherTypeList) => {
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

    const loadRestaurantHandler = (search: string, loadedOption: { label: string; value: number; }[], options: {
        page: number
    }) => {
        return props.fetchListRestaurantAction(search, options.page)
            .then((response: ApiResponseList<RestaurantList>) => {

                const data: ApiResponseSuccessList<RestaurantList> = response.response!;

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

                    result = data.result.map((item: RestaurantList) => {
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

    const onFilesAdded = (files: any[], FormikProps: FormikProps<FormField>, setPreview: any, setValue: any) => {
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

    return (
        <Formik 
            initialValues={props.form}
            onSubmit={(values, action) => {
                props.setAlertVisible(false);

                let isLimited: boolean = false

                if (values.isLimited == '1') isLimited = true

                let isAutoSet: boolean = false

                if (values.isAutoSet == '1') isAutoSet = true

                let startDateTime = ''
                let endDateTime = ''

                if (values.startDateTime) {
                    startDateTime = `${getOnlyDateFromDate(values.startDateTime)} ${getTimeFromDate(values.startDateTime)}`
                }

                if (values.endDateTime) {
                    endDateTime = `${getOnlyDateFromDate(values.endDateTime)} ${getTimeFromDate(values.endDateTime)}`
                }

                const voucherPromo: VoucherPromoEditField = {
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
                    type: {
                        id: values.voucherType.value
                    },
                    service: values.service,
                    isAutoSet: isAutoSet,
                    restaurants: values.restaurants.filter((value: any) => {
                        return typeof value === 'object' && value !== null;
                    }).map((value: SelectType) => {
                        return value.value
                    })
                }

                swal("Apakah anda yakin?", "Data akan diubah!", {
                    icon: "warning",
                    buttons: ["Tutup!", true],
                }).then((willEdited) => {
                    if (willEdited) {
                        props.editVoucherPromoAction(voucherPromo, props.id)
                            .then( (response: ApiResponse<VoucherPromoEditResult>) => {
                                const data: ApiResponseSuccess<VoucherPromoEditResult> = response.response!;
                                
                                props.setAlertVoucherPromoShowAction('Data Berhasil Diedit', 'success');
                                props.redirectOnSuccess();
                            })
                            .catch( (error: ApiResponse<VoucherPromoEditResult>) => {
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
                                    htmlFor="input-voucherType"
                                    >
                                        Tipe Voucher
                                    </label>
                                    <ReactSelectAsyncPaginate 
                                        value={FormikProps.values.voucherType}
                                        loadOptions={loadVoucherTypeHandler}
                                        onChange={(option) => FormikProps.setFieldValue('voucherType', option)}
                                        onBlur={() => FormikProps.setFieldTouched('voucherType', true)}
                                        additional={{
                                            page: 1
                                        }}
                                        debounceTimeout={250}
                                        />
                                    <div>
                                        { FormikProps.errors.voucherType && FormikProps.touched.voucherType ? FormikProps.errors.voucherType.value : '' }
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
                                    <NumberFormat
                                        className="form-control form-control-alternative"
                                        id="input-amount"
                                        placeholder="Nominal Potongan"
                                        name="amount"
                                        maxLength={255}
                                        decimalScale={0}
                                        thousandSeparator={true}
                                        value={FormikProps.values.amount}
                                        isNumericString={true}
                                        required
                                        allowNegative={false}
                                        onValueChange={(values: NumberFormatValues) => {
                                            FormikProps.setFieldValue('amount', values.value)
                                        }}
                                        onBlur={FormikProps.handleBlur}
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
                                    <NumberFormat
                                        className="form-control form-control-alternative"
                                        id="input-minimumPurchase"
                                        placeholder="Minimal Pembelian"
                                        name="minimumPurchase"
                                        maxLength={255}
                                        decimalScale={0}
                                        thousandSeparator={true}
                                        value={FormikProps.values.minimumPurchase}
                                        isNumericString={true}
                                        required
                                        allowNegative={false}
                                        onValueChange={(values: NumberFormatValues) => {
                                            FormikProps.setFieldValue('minimumPurchase', values.value)
                                        }}
                                        onBlur={FormikProps.handleBlur}
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
                                        onFilesAdded(files, FormikProps, 'image_preview', 'image');
                                    }} disabled={false} multiple={false} previewUrl={FormikProps.values.image_preview} />
                                    
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
                                                defaultChecked={FormikProps.values.isLimited == '0'}
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
                                                defaultChecked={FormikProps.values.isLimited == '1'}
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
                                    htmlFor="input-isAutoSet"
                                    >
                                        Auto Set
                                    </label>
                                </FormGroup>

                                <FormGroup>
                                    <fieldset>
                                        <div className="custom-control custom-radio mb-3">
                                            <input
                                                className="custom-control-input"
                                                defaultChecked={FormikProps.values.isAutoSet == '0'}
                                                id="isAutoSet_no"
                                                name="isAutoSet"
                                                type="radio"
                                                value="0"
                                                onChange={FormikProps.handleChange}
                                                onBlur={FormikProps.handleBlur}
                                            />
                                            <label className="custom-control-label" htmlFor="isAutoSet_no">
                                                Tidak
                                            </label>
                                        </div>
                                        <div className="custom-control custom-radio mb-3">
                                            <input
                                                className="custom-control-input"
                                                defaultChecked={FormikProps.values.isAutoSet == '1'}
                                                id="isAutoSet_yes"
                                                name="isAutoSet"
                                                type="radio"
                                                value="1"
                                                onChange={FormikProps.handleChange}
                                                onBlur={FormikProps.handleBlur}
                                            />
                                            <label className="custom-control-label" htmlFor="isAutoSet_yes">
                                                Ya
                                            </label>
                                        </div>
                                    </fieldset>
                                    <div>
                                        {FormikProps.errors.isAutoSet && FormikProps.touched.isAutoSet ? FormikProps.errors.isAutoSet : ''}
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
                                        isMulti
                                        />
                                    <div>
                                        { FormikProps.errors.service && FormikProps.touched.service ? FormikProps.errors.service : '' }
                                    </div>
                                </FormGroup>  

                                <FormGroup>
                                    <label
                                    className="form-control-label"
                                    htmlFor="input-restaurants"
                                    >
                                        Restoran
                                    </label>
                                    <FieldArray
                                        name="restaurants" 
                                        render={(arrayHelpers) => (
                                            <>
                                                <FormGroup>
                                                    <Button 
                                                        type="button"
                                                        color="primary"
                                                        onClick={() => arrayHelpers.push('')}>
                                                        Tambah Restoran
                                                    </Button>
                                                </FormGroup>

                                                {FormikProps.values.restaurants && FormikProps.values.restaurants.length > 0 ? (
                                                    FormikProps.values.restaurants.map((restaurant: SelectType, index: number) => (
                                                        <FormGroup key={index}>
                                                            <Row>
                                                                <Col xs={8}>
                                                                    <ReactSelectAsyncPaginate 
                                                                        value={restaurant}
                                                                        name={`restaurants.${index}`}
                                                                        loadOptions={loadRestaurantHandler}
                                                                        onChange={(option) => {
                                                                            FormikProps.setFieldValue(`restaurants.${index}`, option)
                                                                        }}
                                                                        onBlur={() => {
                                                                            FormikProps.setFieldTouched(`restaurants.${index}`, true)
                                                                        }}
                                                                        additional={{
                                                                            page: 1
                                                                        }}
                                                                        debounceTimeout={250}
                                                                        />
                                                                </Col>
                                                                <Col xs={4}>
                                                                    <Button type="button" color="danger" onClick={() => arrayHelpers.remove(index)}>-</Button>
                                                                </Col>
                                                            </Row>
                                                                
                                                            <div>
                                                                {FormikProps.errors.restaurants && FormikProps.errors.restaurants[index] && FormikProps.touched.restaurants ? FormikProps.errors.restaurants[index] : ''}
                                                            </div>
                                                        </FormGroup>
                                                    ))
                                                ) : null}
                                            </>
                                        )}
                                        />
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
    editVoucherPromoAction: (voucherPromo: VoucherPromoEditField, id: number) => Promise<ApiResponse<VoucherPromoEditResult>>
    setAlertVoucherPromoShowAction: (message: string, color: string) => void,
    fetchListServiceAction: (search: string, page: number) => Promise<ApiResponseList<ServiceList>>,
    fetchListVoucherTypeAction: (search: string, page: number) => Promise<ApiResponseList<VoucherTypeList>>,
    fetchListRestaurantAction: (search: string, page: number) => Promise<ApiResponseList<RestaurantList>>
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: OwnProps): LinkDispatchToProps => {
    return {
        editVoucherPromoAction: (voucherPromo: VoucherPromoEditField, id: number) => dispatch(editVoucherPromoAction(voucherPromo, id)),
        setAlertVoucherPromoShowAction: (message: string, color: string) => dispatch(setAlertVoucherPromoShowAction(message, color)),
        fetchListServiceAction: (search: string, page: number) => dispatch(fetchListServiceAction(search, page)),
        fetchListVoucherTypeAction: (search: string, page: number) => dispatch(fetchListVoucherTypeAction(search, page)),
        fetchListRestaurantAction: (search: string, page: number) => dispatch(fetchListRestaurantAction(search, page))
    }
}

export default connect(null, mapDispatchToProps)(Form);