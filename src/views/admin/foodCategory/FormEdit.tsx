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

import { FoodCategory, FormField, FoodCategoryCreate, FoodCategoryEdit, FoodCategoryEditResult } from '../../../types/admin/foodCategory';
import { editFoodCategoryAction, setAlertFoodCategoryShowAction } from '../../../actions/admin/foodCategory';
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

                    const foodCategory: FoodCategoryEdit = {
                        name: values.name
                    }

                    this.props.editFoodCategoryAction(foodCategory, this.props.id)
                        .then( (response: ApiResponse<FoodCategoryEditResult>) => {
                            const data: ApiResponseSuccess<FoodCategoryEditResult> = response.response!;
                            this.props.setAlertFoodCategoryShowAction('Data Berhasil Diedit', 'success');
                            this.props.redirectOnSuccess();
                        })
                        .catch( (error: ApiResponse<FoodCategoryEditResult>) => {
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
    editFoodCategoryAction: (foodCategory: FoodCategoryEdit, id: number) => Promise<ApiResponse<FoodCategoryEditResult>>
    setAlertFoodCategoryShowAction: (message: string, color: string) => void
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: FormProps): LinkDispatchToProps => {
    return {
        editFoodCategoryAction: (foodCategory: FoodCategoryEdit, id: number) => dispatch(editFoodCategoryAction(foodCategory, id)),
        setAlertFoodCategoryShowAction: (message: string, color: string) => dispatch(setAlertFoodCategoryShowAction(message, color))
    }
}

export default connect(null, mapDispatchToProps)(Form);