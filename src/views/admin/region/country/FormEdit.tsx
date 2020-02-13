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

import { Country, FormField, CountryEditField, CountryEditResult } from '../../../../types/admin/region/country';
import { editCountryAction, setAlertCountryShowAction } from '../../../../actions/admin/region/country';
import { ApiResponse, ApiResponseError, ApiResponseSuccess } from '../../../../types/api';

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

                    const country: CountryEditField = {
                        name: values.name
                    }

                    this.props.editCountryAction(country, this.props.id)
                        .then( (response: ApiResponse<CountryEditResult>) => {
                            const data: ApiResponseSuccess<CountryEditResult> = response.response!;
                            this.props.setAlertCountryShowAction('Data Berhasil Diedit', 'success');
                            this.props.redirectOnSuccess();
                        })
                        .catch( (error: ApiResponse<CountryEditResult>) => {
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
    editCountryAction: (country: CountryEditField, id: number) => Promise<ApiResponse<CountryEditResult>>
    setAlertCountryShowAction: (message: string, color: string) => void
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: FormProps): LinkDispatchToProps => {
    return {
        editCountryAction: (country: CountryEditField, id: number) => dispatch(editCountryAction(country, id)),
        setAlertCountryShowAction: (message: string, color: string) => dispatch(setAlertCountryShowAction(message, color))
    }
}

export default connect(null, mapDispatchToProps)(Form);