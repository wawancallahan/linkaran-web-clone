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

import { TelegramUser, FormField, TelegramUserCreateField, TelegramUserCreateResult } from '../../../types/admin/telegramUser';
import { createTelegramUserAction, setAlertTelegramUserShowAction } from '../../../actions/admin/telegramUser';
import { ApiResponse, ApiResponseError, ApiResponseSuccess } from '../../../types/api';
import swal from 'sweetalert'
import BlockUi from '../../../components/BlockUi/BlockUi'
import { toast, TypeOptions } from 'react-toastify'

const createSchema = Yup.object().shape({
    telegramuser: Yup.string()
            .test('len', 'Bidang isian telegram user tidak boleh lebih dari 255 karakter', (val: any): boolean => {
                if (val) {
                    return val.length <= 255;
                }

                return true;
            })
            .required('Bidang isian telegram user wajib diiisi'),
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

    render() {
        return (
            <Formik 
                initialValues={this.props.form}
                
                onSubmit={(values, action) => {
                    this.props.setAlertOpen(false);

                    const telegramUser: TelegramUserCreateField = {
                        telegramuser: values.telegramuser
                    }

                    swal("Apakah anda yakin?", "Data akan ditambahkan!", {
                        icon: "warning",
                        buttons: ["Tutup!", true],
                    }).then((willCreated) => {
                        if (willCreated) {
                            this.props.createTelegramUserAction(telegramUser)
                                .then( (response: ApiResponse<TelegramUserCreateResult>) => {
                                    const data: ApiResponseSuccess<TelegramUserCreateResult> = response.response!;
                                    this.props.setAlertTelegramUserShowAction('Data Berhasil Ditambah', 'success');
                                    this.props.redirectOnSuccess();
                                })
                                .catch( (error: ApiResponse<TelegramUserCreateResult>) => {
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
                                        htmlFor="input-telegramuser"
                                        >
                                            Telegram User
                                        </label>
                                        <Input
                                        className="form-control-alternative"
                                        id="input-telegramuser"
                                        placeholder="Telegram User"
                                        type="text"
                                        name="telegramuser"
                                        maxLength={255}
                                        value={FormikProps.values.telegramuser}
                                        required
                                        onChange={FormikProps.handleChange}
                                        onBlur={FormikProps.handleBlur}
                                        invalid={ !!(FormikProps.touched.telegramuser && FormikProps.errors.telegramuser) }
                                        />
                                        <div>
                                            {FormikProps.errors.telegramuser && FormikProps.touched.telegramuser ? FormikProps.errors.telegramuser : ''}
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
    createTelegramUserAction: (telegramUser: TelegramUserCreateField) => Promise<ApiResponse<TelegramUserCreateResult>>
    setAlertTelegramUserShowAction: (message: string, color: string) => void
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: FormProps): LinkDispatchToProps => {
    return {
        createTelegramUserAction: (telegramUser: TelegramUserCreateField) => dispatch(createTelegramUserAction(telegramUser)),
        setAlertTelegramUserShowAction: (message: string, color: string) => dispatch(setAlertTelegramUserShowAction(message, color))
    }
}

export default connect(null, mapDispatchToProps)(Form);