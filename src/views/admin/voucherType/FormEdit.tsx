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

import { VoucherType, FormField, VoucherTypeCreate, VoucherTypeEdit, VoucherTypeEditResult } from '../../../types/admin/voucherType';
import { editVoucherTypeAction, setAlertVoucherTypeShowAction } from '../../../actions/admin/voucherType';
import { ApiResponse, ApiResponseError, ApiResponseSuccess } from '../../../types/api';
import swal from 'sweetalert'

const createSchema = Yup.object().shape({
    name: Yup.string()
    .test('len', 'Bidang isian nama tidak boleh lebih dari 255 karakter', (val: any): boolean => {
                if (val) {
                    return val.length <= 255;
                }

                return true;
            })
             .required('Bidang isian nama wajib diiisi')
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

    render() {
        return (
            <Formik 
                initialValues={this.props.form}
                
                onSubmit={(values, action) => {
                    this.props.setAlertOpen(false);

                    const voucherType: VoucherTypeEdit = {
                        name: values.name
                    }

                    swal("Apakah anda yakin?", "Data akan diubah!", {
                        icon: "warning",
                        buttons: ["Tutup!", true],
                    }).then((willEdited) => {
                        if (willEdited) {
                            this.props.editVoucherTypeAction(voucherType, this.props.id)
                                .then( (response: ApiResponse<VoucherTypeEditResult>) => {
                                    const data: ApiResponseSuccess<VoucherTypeEditResult> = response.response!;
                                    this.props.setAlertVoucherTypeShowAction('Data Berhasil Diedit', 'success');
                                    this.props.redirectOnSuccess();
                                })
                                .catch( (error: ApiResponse<VoucherTypeEditResult>) => {
                                    this.props.setAlertOpen(true);
                                    let message = "Gagal Mendapatkan Response";

                                if (error.error) {
                                    message = error.error.metaData.message;
                                }
                            
                                this.props.setAlertMessage(message);

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
                        <FormReactStrap onSubmit={FormikProps.handleSubmit} formMethod="POST">
                            <div className="pl-lg-4">
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
    editVoucherTypeAction: (voucherType: VoucherTypeEdit, id: number) => Promise<ApiResponse<VoucherTypeEditResult>>
    setAlertVoucherTypeShowAction: (message: string, color: string) => void
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: FormProps): LinkDispatchToProps => {
    return {
        editVoucherTypeAction: (voucherType: VoucherTypeEdit, id: number) => dispatch(editVoucherTypeAction(voucherType, id)),
        setAlertVoucherTypeShowAction: (message: string, color: string) => dispatch(setAlertVoucherTypeShowAction(message, color))
    }
}

export default connect(null, mapDispatchToProps)(Form);