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

import { Restaurant, FormField, RestaurantCreate, RestaurantEdit, RestaurantEditResult } from '../../../types/admin/restaurant';
import { editRestaurantAction, setAlertRestaurantShowAction } from '../../../actions/admin/restaurant';
import { ApiResponse, ApiResponseError, ApiResponseSuccess } from '../../../types/api';

import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";

const createSchema = Yup.object().shape({
    name: Yup.string()
        .max(255, 'Bidang isian nama tidak boleh lebih dari 255 karakter')
        .required('Bidang isian nama wajib diiisi'),
    point: Yup.string()
        .max(255, 'Bidang isian point tidak boleh lebih dari 255 karakter')
        .required('Bidang isian point wajib diiisi'),
    rating: Yup.number()
        .min(0, 'Bidang isian rating tidak boleh kurang dari 0')
        .max(10, 'Bidang isian rating tidak boleh lebih dari 10')
        .required('Bidang isian rating wajib diiisi'),
    openTime: Yup.mixed().required('Bidang isian waktu buka wajib diisi'),
    closeTime: Yup.mixed().required('Bidang isian waktu tutup wajib diisi'),
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

                    const restaurant: RestaurantEdit = {
                        name: values.name,
                        point: values.point,
                        rating: values.rating,
                        openTime: values.openTime!.getHours(),
                        closeTime: values.closeTime!.getHours()
                    }

                    this.props.editRestaurantAction(restaurant, this.props.id)
                        .then( (response: ApiResponse<RestaurantEditResult>) => {
                            const data: ApiResponseSuccess<RestaurantEditResult> = response.response!;
                            this.props.setAlertRestaurantShowAction('Data Berhasil Diedit', 'success');
                            this.props.redirectOnSuccess();
                        })
                        .catch( (error: ApiResponse<Restaurant>) => {
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
                                    htmlFor="input-point"
                                    >
                                        Poin
                                    </label>
                                    <Input
                                    className="form-control-alternative"
                                    id="input-point"
                                    placeholder="Poin"
                                    type="text"
                                    name="point"
                                    maxLength={255}
                                    value={FormikProps.values.point}
                                    required
                                    onChange={FormikProps.handleChange}
                                    onBlur={FormikProps.handleBlur}
                                    invalid={ !!(FormikProps.touched.point && FormikProps.errors.point) }
                                    />
                                    <div>
                                        {FormikProps.errors.point && FormikProps.touched.point ? FormikProps.errors.point : ''}
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                    <label
                                    className="form-control-label"
                                    htmlFor="input-rating"
                                    >
                                        Rating
                                    </label>
                                    <Input
                                    className="form-control-alternative"
                                    id="input-rating"
                                    placeholder="Rating"
                                    type="number"
                                    name="rating"
                                    min="0"
                                    max="10"
                                    value={FormikProps.values.rating}
                                    required
                                    onChange={FormikProps.handleChange}
                                    onBlur={FormikProps.handleBlur}
                                    invalid={ !!(FormikProps.touched.rating && FormikProps.errors.rating) }
                                    />
                                    <div>
                                        {FormikProps.errors.rating && FormikProps.touched.rating ? FormikProps.errors.rating : ''}
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                    <label
                                    className="form-control-label"
                                    htmlFor="input-openTime"
                                    >
                                        Waktu Buka
                                    </label>
                                    <div>
                                        <DatePicker
                                            selected={FormikProps.values.openTime}
                                            onChange={date => FormikProps.setFieldValue('openTime', date)}
                                            onBlur={() => FormikProps.setFieldTouched('openTime', true)}
                                            showTimeSelect
                                            showTimeSelectOnly
                                            timeIntervals={60}
                                            timeCaption="Time"
                                            dateFormat="h:mm aa"
                                            className="form-control form-control-alternative"
                                            required
                                            />
                                    </div>
                                    <div>
                                        {FormikProps.errors.openTime && FormikProps.touched.openTime ? FormikProps.errors.openTime : ''}
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                    <label
                                    className="form-control-label"
                                    htmlFor="input-closeTime"
                                    >
                                        Waktu Tutup
                                    </label>
                                    <div>
                                        <DatePicker
                                            selected={FormikProps.values.closeTime}
                                            onChange={date => FormikProps.setFieldValue('closeTime', date)}
                                            onBlur={() => FormikProps.setFieldTouched('closeTime', true)}
                                            showTimeSelect
                                            showTimeSelectOnly
                                            timeIntervals={60}
                                            timeCaption="Time"
                                            dateFormat="h:mm aa"
                                            className="form-control form-control-alternative"
                                            required
                                            />
                                    </div>
                                    <div>
                                        {FormikProps.errors.closeTime && FormikProps.touched.closeTime ? FormikProps.errors.closeTime : ''}
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
    editRestaurantAction: (restaurant: RestaurantEdit, id: number) => Promise<ApiResponse<RestaurantEditResult>>,
    setAlertRestaurantShowAction: (message: string, color: string) => void
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: FormProps): LinkDispatchToProps => {
    return {
        editRestaurantAction: (restaurant: RestaurantEdit, id: number) => dispatch(editRestaurantAction(restaurant, id)),
        setAlertRestaurantShowAction: (message: string, color: string) => dispatch(setAlertRestaurantShowAction(message, color))
    }
}

export default connect(null, mapDispatchToProps)(Form);