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
import { FormField, BankCreateField, BankCreateResult } from '../../../../../types/admin/bank';
import { createBankAction, setAlertBankShowAction } from '../../../../../actions/admin/bank';
import { ApiResponse, ApiResponseSuccess } from '../../../../../types/api';
import swal from 'sweetalert'
import BlockUi from '../../../../../components/BlockUi/BlockUi'
import { toast, TypeOptions } from 'react-toastify'
import { Schema } from './Schema'

type OwnProps = {
    form: FormField,
    setAlertVisible: React.Dispatch<React.SetStateAction<boolean>>,
    setAlertMessage: React.Dispatch<React.SetStateAction<string>>,
    redirectOnSuccess: () => void
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

    return (
        <Formik 
            initialValues={props.form}
            onSubmit={(values, action) => {
                props.setAlertVisible(false);

                const bank: BankCreateField = {
                    nama: values.nama,
                    bankName: Number.parseInt(values.bankName),
                    accountName: values.accountName,
                    accountNumber: values.accountNumber
                }

                swal("Apakah anda yakin?", "Data akan ditambahkan!", {
                    icon: "warning",
                    buttons: ["Tutup!", true],
                }).then((willCreated) => {
                    if (willCreated) {
                        props.createBankAction(bank)
                            .then( (response: ApiResponse<BankCreateResult>) => {
                                const data: ApiResponseSuccess<BankCreateResult> = response.response!;
                                props.setAlertBankShowAction('Data Berhasil Ditambah', 'success');
                                props.redirectOnSuccess();
                            })
                            .catch( (error: ApiResponse<BankCreateResult>) => {
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

type LinkDispatchToProps = {
    createBankAction: (bank:BankCreateField) => Promise<ApiResponse<BankCreateResult>>
    setAlertBankShowAction: (message: string, color: string) => void
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: OwnProps): LinkDispatchToProps => {
    return {
        createBankAction: (bank:BankCreateField) => dispatch(createBankAction(bank)),
        setAlertBankShowAction: (message: string, color: string) => dispatch(setAlertBankShowAction(message, color))
    }
}

export default connect(null, mapDispatchToProps)(Form);
