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

import { User, FormField, UserCreate } from '../../../types/admin/user';
import { createUserAction } from '../../../actions/admin/user';
import { ApiResponse, ApiResponseError, ApiResponseSuccess } from '../../../types/api';

const createSchema = Yup.object().shape({
    name: Yup.string()
             .max(255, 'Bidang isian nama tidak boleh lebih dari 255 karakter')
             .required('Bidang isian nama wajib diiisi'),
    phoneNumber: Yup.string()
                    .required('Bidang isian no telepon wajib diiisi'),
    email: Yup.string()
                .email('Bidang isian harus berupa email')
                .required('Bidang isian email wajib diiisi'),
});

type FormProps = {
    form: FormField,
    setAlertOpen: (open: boolean) => void,
    setAlertMessage: (message: string) => void,
    redirectOnSuccess: () => void
}

type Props = LinkDispatchToProps & FormProps;

class Form extends Component<Props> {


    render() {
        return (
            <Formik 
                initialValues={this.props.form}
                
                onSubmit={(values, action) => {
                    this.props.setAlertOpen(false);

                    const user: UserCreate = {
                        email: values.email,
                        name: values.name,
                        phoneNumber: values.phoneNumber
                    }

                    this.props.createUserAction(user)
                        .then( (response: ApiResponse<User>) => {
                            const data: ApiResponseSuccess<User> = response.response!;
                            
                            this.props.redirectOnSuccess();
                        })
                        .catch( (error: ApiResponse<User>) => {
                            this.props.setAlertOpen(true);
                            this.props.setAlertMessage(error.error!.metaData.message);
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
                                    <label
                                    className="form-control-label"
                                    htmlFor="input-phoneNumber"
                                    >
                                        No Telepon
                                    </label>
                                    <Input
                                    className="form-control-alternative"
                                    id="input-phoneNumber"
                                    placeholder="No Telepon"
                                    type="text"
                                    name="phoneNumber"
                                    maxLength={255}
                                    value={FormikProps.values.phoneNumber}
                                    required
                                    onChange={FormikProps.handleChange}
                                    onBlur={FormikProps.handleBlur}
                                    invalid={ !!(FormikProps.touched.phoneNumber && FormikProps.errors.phoneNumber) }
                                    />
                                    <div>
                                        {FormikProps.errors.phoneNumber && FormikProps.touched.phoneNumber ? FormikProps.errors.phoneNumber : ''}
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                    <label
                                    className="form-control-label"
                                    htmlFor="input-email"
                                    >
                                        Email
                                    </label>
                                    <Input
                                    className="form-control-alternative"
                                    id="input-email"
                                    placeholder="Email"
                                    type="email"
                                    name="email"
                                    maxLength={255}
                                    value={FormikProps.values.email}
                                    required
                                    onChange={FormikProps.handleChange}
                                    onBlur={FormikProps.handleBlur}
                                    invalid={ !!(FormikProps.touched.email && FormikProps.errors.email) }
                                    />
                                    <div>
                                        {FormikProps.errors.email && FormikProps.touched.email ? FormikProps.errors.email : ''}
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
    createUserAction: (user: UserCreate) => Promise<ApiResponse<User>>
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: FormProps): LinkDispatchToProps => {
    return {
        createUserAction: (user: UserCreate) => dispatch(createUserAction(user))
    }
}

export default connect(null, mapDispatchToProps)(Form);