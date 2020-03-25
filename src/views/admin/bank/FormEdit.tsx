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

import { Bank, FormField, BankEditField, BankEditResult } from '../../../types/admin/bank';
import { editBankAction, setAlertBankShowAction } from '../../../actions/admin/bank';
import { ApiResponse, ApiResponseError, ApiResponseSuccess } from '../../../types/api';
import swal from 'sweetalert'
import BlockUi from '../../../components/BlockUi/BlockUi'
import { toast, TypeOptions } from 'react-toastify'

const createSchema = Yup.object().shape({
    nama: Yup.string()
            .test('len', 'Bidang isian nama tidak boleh lebih dari 255 karakter', (val: any): boolean => {
                if (val) {
                    return val.length <= 255;
                }

                return true;
            })
            .required('Bidang isian nama wajib diiisi'),
    bankName: Yup.string()
            .matches(/^[0-9]*$/, "Wajib Diisi dengan angka")
             .test('len', 'Bidang isian nama bank tidak boleh lebih dari 255 karakter', (val: any): boolean => {
                if (val) {
                    return val.length <= 255;
                }

                return true;
            })

             .required('Bidang isian nama bank wajib diiisi'),
    accountName: Yup.string()
             .test('len', 'Bidang isian nama akun tidak boleh lebih dari 255 karakter', (val: any): boolean => {
                if (val) {
                    return val.length <= 255;
                }

                return true;
            })
             .required('Bidang isian nama akun wajib diiisi'),
    accountNumber: Yup.string()
             .test('len', 'Bidang isian nomor akun tidak boleh lebih dari 255 karakter', (val: any): boolean => {
                if (val) {
                    return val.length <= 255;
                }

                return true;
            })
             .required('Bidang isian nomor akun wajib diiisi'),
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

    toastNotify = (message: string, type: TypeOptions) => {
        toast(message, {
            type: type,
            position: toast.POSITION.TOP_RIGHT,
            draggable: false,
            hideProgressBar: true,
            closeOnClick: false
        })
    }

    render() {
        return (
            <Formik 
                initialValues={this.props.form}
                
                onSubmit={(values, action) => {
                    this.props.setAlertOpen(false);

                    const country: BankEditField = {
                        nama: values.nama,
                        bankName: Number.parseInt(values.bankName),
                        accountName: values.accountName,
                        accountNumber: values.accountNumber
                    }

                    swal("Apakah anda yakin?", "Data akan diubah!", {
                        icon: "warning",
                        buttons: ["Tutup!", true],
                    }).then((willEdited) => {
                        if (willEdited) {
                            this.props.editBankAction(country, this.props.id)
                                    .then( (response: ApiResponse<BankEditResult>) => {
                                        const data: ApiResponseSuccess<BankEditResult> = response.response!;
                                        this.props.setAlertBankShowAction('Data Berhasil Diedit', 'success');
                                        this.props.redirectOnSuccess();
                                    })
                                    .catch( (error: ApiResponse<BankEditResult>) => {
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
                                        htmlFor="input-nama"
                                        >
                                            Nama
                                        </label>
                                        <Input
                                        className="form-control-alternative"
                                        id="input-nama"
                                        placeholder="Nama"
                                        type="text"
                                        name="nama"
                                        maxLength={255}
                                        value={FormikProps.values.nama}
                                        required
                                        onChange={FormikProps.handleChange}
                                        onBlur={FormikProps.handleBlur}
                                        invalid={ !!(FormikProps.touched.nama && FormikProps.errors.nama) }
                                        />
                                        <div>
                                            {FormikProps.errors.nama && FormikProps.touched.nama ? FormikProps.errors.nama : ''}
                                        </div>
                                    </FormGroup>
                                    <FormGroup>
                                        <label
                                        className="form-control-label"
                                        htmlFor="input-bankName"
                                        >
                                            Nama Bank
                                        </label>
                                        <Input
                                        className="form-control-alternative"
                                        id="input-bankName"
                                        placeholder="Nama Bank"
                                        type="text"
                                        name="bankName"
                                        maxLength={255}
                                        value={FormikProps.values.bankName}
                                        required
                                        onChange={FormikProps.handleChange}
                                        onBlur={FormikProps.handleBlur}
                                        invalid={ !!(FormikProps.touched.bankName && FormikProps.errors.bankName) }
                                        />
                                        <div>
                                            {FormikProps.errors.bankName && FormikProps.touched.bankName ? FormikProps.errors.bankName : ''}
                                        </div>
                                    </FormGroup>
                                    <FormGroup>
                                        <label
                                        className="form-control-label"
                                        htmlFor="input-accountName"
                                        >
                                            Nama Akun
                                        </label>
                                        <Input
                                        className="form-control-alternative"
                                        id="input-accountName"
                                        placeholder="Nama Akun"
                                        type="text"
                                        name="accountName"
                                        maxLength={255}
                                        value={FormikProps.values.accountName}
                                        required
                                        onChange={FormikProps.handleChange}
                                        onBlur={FormikProps.handleBlur}
                                        invalid={ !!(FormikProps.touched.accountName && FormikProps.errors.accountName) }
                                        />
                                        <div>
                                            {FormikProps.errors.accountName && FormikProps.touched.accountName ? FormikProps.errors.accountName : ''}
                                        </div>
                                    </FormGroup>
                                    <FormGroup>
                                        <label
                                        className="form-control-label"
                                        htmlFor="input-accountNumber"
                                        >
                                            Nomor Akun
                                        </label>
                                        <Input
                                        className="form-control-alternative"
                                        id="input-accountNumber"
                                        placeholder="Nomor Akun"
                                        type="text"
                                        name="accountNumber"
                                        maxLength={255}
                                        value={FormikProps.values.accountNumber}
                                        required
                                        onChange={FormikProps.handleChange}
                                        onBlur={FormikProps.handleBlur}
                                        invalid={ !!(FormikProps.touched.accountNumber && FormikProps.errors.accountNumber) }
                                        />
                                        <div>
                                            {FormikProps.errors.accountNumber && FormikProps.touched.accountNumber ? FormikProps.errors.accountNumber : ''}
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
    editBankAction: (country: BankEditField, id: number) => Promise<ApiResponse<BankEditResult>>
    setAlertBankShowAction: (message: string, color: string) => void
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: FormProps): LinkDispatchToProps => {
    return {
        editBankAction: (country: BankEditField, id: number) => dispatch(editBankAction(country, id)),
        setAlertBankShowAction: (message: string, color: string) => dispatch(setAlertBankShowAction(message, color))
    }
}

export default connect(null, mapDispatchToProps)(Form);