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

import { Restaurant, FormField, RestaurantCreate, RestaurantCreateResult } from '../../../types/admin/restaurant';
import { createRestaurantAction, setAlertRestaurantShowAction } from '../../../actions/admin/restaurant';
import { ApiResponse, ApiResponseError, ApiResponseSuccess } from '../../../types/api';

import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";

const createSchema = Yup.object().shape({
    name: Yup.string()
             .max(255, 'Bidang isian nama tidak boleh lebih dari 255 karakter')
             .required('Bidang isian nama wajib diiisi'),
    point: Yup.object().shape({
        lat: Yup.string()
                .required('Bidang isian lat wajib diiisi'),
        lng: Yup.string()
                .required('Bidang isian lng wajib diisi')
    }),
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

                    let openTime = '';
                    let closeTime = '';

                    if (values.openTime) {
                        openTime = `${values.openTime.getHours}:${values.openTime.getMinutes}:${values.openTime.getSeconds}`
                    }

                    if (values.closeTime) {
                        closeTime = `${values.closeTime.getHours}:${values.closeTime.getMinutes}:${values.closeTime.getSeconds}`
                    }

                    const point = `${values.point.lat},${values.point.lng}`

                    const restaurant: RestaurantCreate = {
                        name: values.name,
                        address: values.address,
                        point: point,
                        rating: values.rating,
                        image: '',
                        openTime: openTime,
                        closeTime: closeTime
                    }

                    this.props.createRestaurantAction(restaurant)
                        .then( (response: ApiResponse<RestaurantCreateResult>) => {
                            const data: ApiResponseSuccess<RestaurantCreateResult> = response.response!;
                            this.props.setAlertRestaurantShowAction('Data Berhasil Ditambah', 'success');
                            this.props.redirectOnSuccess();
                        })
                        .catch( (error: ApiResponse<RestaurantCreateResult>) => {
                            this.props.setAlertOpen(true);

                            console.log(error)

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
                                    htmlFor="input-address"
                                    >
                                        Alamat
                                    </label>
                                    <Input
                                    className="form-control-alternative"
                                    id="input-address"
                                    placeholder="Alamat"
                                    type="textarea"
                                    name="address"
                                    maxLength={255}
                                    value={FormikProps.values.address}
                                    required
                                    onChange={FormikProps.handleChange}
                                    onBlur={FormikProps.handleBlur}
                                    invalid={ !!(FormikProps.touched.address && FormikProps.errors.address) }
                                    />
                                    <div>
                                        {FormikProps.errors.address && FormikProps.touched.address ? FormikProps.errors.address : ''}
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                    <label
                                    className="form-control-label"
                                    htmlFor="input-point-lat"
                                    >
                                        Lat
                                    </label>
                                    <Input
                                    className="form-control-alternative"
                                    id="input-point-lat"
                                    placeholder="Lat"
                                    type="text"
                                    name="lat"
                                    value={FormikProps.values.point.lat}
                                    required
                                    onChange={e => {
                                        FormikProps.handleChange(e)

                                        let value = e.currentTarget.value

                                        FormikProps.setFieldValue('point.lat', value, true)
                                    }}
                                    onBlur={e => {
                                        FormikProps.handleBlur(e)

                                        let value = e.currentTarget.value

                                        FormikProps.setFieldValue('point.lat', value, true)
                                    }}
                                    invalid={ !!(FormikProps.touched.point && FormikProps.errors.point && FormikProps.touched.point.lat && FormikProps.errors.point.lat) }
                                    />
                                    <div>
                                        {FormikProps.touched.point && FormikProps.errors.point && FormikProps.touched.point.lat && FormikProps.errors.point.lat ? FormikProps.errors.point.lat : ''}
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                    <label
                                    className="form-control-label"
                                    htmlFor="input-point-lng"
                                    >
                                        Lng
                                    </label>
                                    <Input
                                    className="form-control-alternative"
                                    id="input-point-lng"
                                    placeholder="Lng"
                                    type="text"
                                    name="lng"
                                    value={FormikProps.values.point.lng}
                                    required
                                    onChange={e => {
                                        FormikProps.handleChange(e)

                                        let value = e.currentTarget.value

                                        FormikProps.setFieldValue('point.lng', value, true)
                                    }}
                                    onBlur={e => {
                                        FormikProps.handleBlur(e)

                                        let value = e.currentTarget.value

                                        FormikProps.setFieldValue('point.lng', value, true)
                                    }}
                                    invalid={ !!(FormikProps.touched.point && FormikProps.errors.point && FormikProps.touched.point.lng && FormikProps.errors.point.lng) }
                                    />
                                    <div>
                                        {FormikProps.touched.point && FormikProps.errors.point && FormikProps.touched.point.lng && FormikProps.errors.point.lng ? FormikProps.errors.point.lng : ''}
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
    createRestaurantAction: (restaurant: RestaurantCreate) => Promise<ApiResponse<RestaurantCreateResult>>,
    setAlertRestaurantShowAction: (message: string, color: string) => void
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: FormProps): LinkDispatchToProps => {
    return {
        createRestaurantAction: (restaurant: RestaurantCreate) => dispatch(createRestaurantAction(restaurant)),
        setAlertRestaurantShowAction: (message: string, color: string) => dispatch(setAlertRestaurantShowAction(message, color))
    }
}

export default connect(null, mapDispatchToProps)(Form);