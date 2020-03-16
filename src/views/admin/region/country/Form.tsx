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
import { AppActions } from '../../../../types';
import { connect } from 'react-redux';

import { Country, FormField, CountryCreateField, CountryCreateResult } from '../../../../types/admin/region/country';
import { createCountryAction, setAlertCountryShowAction } from '../../../../actions/admin/region/country';
import { ApiResponse, ApiResponseError, ApiResponseSuccess } from '../../../../types/api';
import swal from 'sweetalert'
import BlockUi from '../../../../components/BlockUi/BlockUi'
import { toast, TypeOptions } from 'react-toastify'

const createSchema = Yup.object().shape({
    name: Yup.string()
            .test('len', 'Bidang isian nama tidak boleh lebih dari 255 karakter', (val: any): boolean => {
                if (val) {
                    return val.length <= 255;
                }

                return true;
            })
            .required('Bidang isian nama wajib diiisi'),
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

                    const country: CountryCreateField = {
                        name: values.name
                    }

                    swal("Apakah anda yakin?", "Data akan ditambahkan!", {
                        icon: "warning",
                        buttons: ["Tutup!", true],
                    }).then((willCreated) => {
                        if (willCreated) {
                            this.props.createCountryAction(country)
                                .then( (response: ApiResponse<CountryCreateResult>) => {
                                    const data: ApiResponseSuccess<CountryCreateResult> = response.response!;
                                    this.props.setAlertCountryShowAction('Data Berhasil Ditambah', 'success');
                                    this.props.redirectOnSuccess();
                                })
                                .catch( (error: ApiResponse<CountryCreateResult>) => {
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
}

type LinkDispatchToProps = {
    createCountryAction: (country: CountryCreateField) => Promise<ApiResponse<CountryCreateResult>>
    setAlertCountryShowAction: (message: string, color: string) => void
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: FormProps): LinkDispatchToProps => {
    return {
        createCountryAction: (country: CountryCreateField) => dispatch(createCountryAction(country)),
        setAlertCountryShowAction: (message: string, color: string) => dispatch(setAlertCountryShowAction(message, color))
    }
}

export default connect(null, mapDispatchToProps)(Form);