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
import { AppActions } from '../../../../../../types';
import { connect } from 'react-redux';
import { FormField, CountryEditField, CountryEditResult } from '../../../../../../types/admin/region/country';
import { editCountryAction, setAlertCountryShowAction } from '../../../../../../actions/admin/region/country';
import { ApiResponse, ApiResponseSuccess } from '../../../../../../types/api';
import swal from 'sweetalert'
import BlockUi from '../../../../../../components/BlockUi/BlockUi'
import { toast, TypeOptions } from 'react-toastify'
import { Schema } from './Schema'

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

    return (
        <Formik 
            initialValues={props.form}
            
            onSubmit={(values, action) => {
                props.setAlertVisible(false);

                const country: CountryEditField = {
                    name: values.name
                }

                swal("Apakah anda yakin?", "Data akan diubah!", {
                    icon: "warning",
                    buttons: ["Tutup!", true],
                }).then((willEdited) => {
                    if (willEdited) {
                        props.editCountryAction(country, props.id)
                            .then( (response: ApiResponse<CountryEditResult>) => {
                                const data: ApiResponseSuccess<CountryEditResult> = response.response!;
                                props.setAlertCountryShowAction('Data Berhasil Diedit', 'success');
                                props.redirectOnSuccess();
                            })
                            .catch( (error: ApiResponse<CountryEditResult>) => {
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
                    </BlockUi>
                );
            })}
        </Formik>
    )
}

type LinkDispatchToProps = {
    editCountryAction: (country: CountryEditField, id: number) => Promise<ApiResponse<CountryEditResult>>
    setAlertCountryShowAction: (message: string, color: string) => void
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: OwnProps): LinkDispatchToProps => {
    return {
        editCountryAction: (country: CountryEditField, id: number) => dispatch(editCountryAction(country, id)),
        setAlertCountryShowAction: (message: string, color: string) => dispatch(setAlertCountryShowAction(message, color))
    }
}

export default connect(null, mapDispatchToProps)(Form);