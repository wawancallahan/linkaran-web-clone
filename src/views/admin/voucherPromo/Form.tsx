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

import { VoucherPromo, FormField, VoucherPromoCreate, VoucherPromoCreateResult } from '../../../types/admin/voucherPromo';
import { createVoucherPromoAction, setAlertVoucherPromoShowAction } from '../../../actions/admin/voucherPromo';
import { ApiResponse, ApiResponseError, ApiResponseSuccess } from '../../../types/api';
import Dropzone from '../../../components/Dropzone/Dropzone';
import DatePicker from 'react-datepicker';

const createSchema = Yup.object().shape({
});

type FormProps = {
    form: FormField,
    setAlertOpen: (open: boolean) => void,
    setAlertMessage: (message: string) => void,
    redirectOnSuccess: () => void
}

type Props = LinkDispatchToProps & FormProps;

class Form extends Component<Props> {

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

                    // const voucherPromo: VoucherPromoCreate = {
                    //     email: values.email,
                    //     name: values.name,
                    //     phoneNumber: values.phoneNumber
                    // }

                    // this.props.createVoucherPromoAction(voucherPromo)
                    //     .then( (response: ApiResponse<VoucherPromoCreateResult>) => {
                    //         const data: ApiResponseSuccess<VoucherPromoCreateResult> = response.response!;
                            
                    //         this.props.setAlertVoucherPromoShowAction('Data Berhasil Ditambah', 'success');
                    //         this.props.redirectOnSuccess();

                    // action.setSubmitting(false)
                    //     })
                    //     .catch( (error: ApiResponse<VoucherPromoCreateResult>) => {
                    //         this.props.setAlertOpen(true);
                    //          let message = "Gagal Mendapatkan Response";

                        if (error.error) {
                            message = error.error.metaData.message;
                        }
                    
                        this.props.setAlertMessage(message);

                    //  action.setSubmitting(false)
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
                                        this.onFilesAdded(files, FormikProps, 'fileImagePreview', 'fileImage');
                                    }} disabled={false} multiple={false} />
                                    
                                    <div>
                                        {FormikProps.errors.fileImagePreview && FormikProps.touched.fileImagePreview ? FormikProps.errors.fileImagePreview : ''}
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                    <label
                                    className="form-control-label"
                                    htmlFor="input-startDateTime"
                                    >
                                        Periode Awal
                                    </label>
                                    <div>
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
                                <FormGroup>
                                    <label
                                    className="form-control-label"
                                    htmlFor="input-endDateTime"
                                    >
                                        Periode Akhir
                                    </label>
                                    <div>
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
    setAlertVoucherPromoShowAction: (message: string, color: string) => void
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: FormProps): LinkDispatchToProps => {
    return {
        createVoucherPromoAction: (voucherPromo: VoucherPromoCreate) => dispatch(createVoucherPromoAction(voucherPromo)),
        setAlertVoucherPromoShowAction: (message: string, color: string) => dispatch(setAlertVoucherPromoShowAction(message, color))
    }
}

export default connect(null, mapDispatchToProps)(Form);