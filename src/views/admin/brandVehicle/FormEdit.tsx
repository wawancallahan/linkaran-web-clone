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

import { BrandVehicle, FormField, BrandVehicleCreate, BrandVehicleEdit, BrandVehicleEditResult } from '../../../types/admin/brandVehicle';
import { editBrandVehicleAction, setAlertBrandVehicleShowAction } from '../../../actions/admin/brandVehicle';
import { ApiResponse, ApiResponseError, ApiResponseSuccess } from '../../../types/api';

const createSchema = Yup.object().shape({
    name: Yup.string()
             .max(255, 'Bidang isian nama tidak boleh lebih dari 255 karakter')
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

                    const brandVehicle: BrandVehicleEdit = {
                        name: values.name
                    }

                    this.props.editBrandVehicleAction(brandVehicle, this.props.id)
                        .then( (response: ApiResponse<BrandVehicleEditResult>) => {
                            const data: ApiResponseSuccess<BrandVehicleEditResult> = response.response!;
                            this.props.setAlertBrandVehicleShowAction('Data Berhasil Diedit', 'success');
                            this.props.redirectOnSuccess();
                        })
                        .catch( (error: ApiResponse<BrandVehicleEditResult>) => {
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
    editBrandVehicleAction: (brandVehicle: BrandVehicleEdit, id: number) => Promise<ApiResponse<BrandVehicleEditResult>>
    setAlertBrandVehicleShowAction: (message: string, color: string) => void
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: FormProps): LinkDispatchToProps => {
    return {
        editBrandVehicleAction: (brandVehicle: BrandVehicleEdit, id: number) => dispatch(editBrandVehicleAction(brandVehicle, id)),
        setAlertBrandVehicleShowAction: (message: string, color: string) => dispatch(setAlertBrandVehicleShowAction(message, color))
    }
}

export default connect(null, mapDispatchToProps)(Form);