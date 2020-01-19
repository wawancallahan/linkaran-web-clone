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
import Dropzone from '../../../components/Dropzone/Dropzone';
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";

const createSchema = Yup.object().shape({
    name: Yup.string()
        .max(255, 'Bidang isian nama tidak boleh lebih dari 255 karakter')
        .required('Bidang isian nama wajib diiisi'),
    address: Yup.string()
        .required('Bidang isian alamat wajib diiisi'),
    point: Yup.object().shape({
    lat: Yup.string()
        .required('Bidang isian lat wajib diiisi'),
    lng: Yup.string()
        .required('Bidang isian lng wajib diisi')
    }),
    rating: Yup.number()
        .min(0, 'Bidang isian rating tidak boleh kurang dari 0')
        .max(100, 'Bidang isian rating tidak boleh lebih dari 100')
        .required('Bidang isian rating wajib diiisi'),
    photo_preview: Yup.string()
        .required('Bidang upload foto wajib diisi'),
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

    onFilesAdded = (files: any[], FormikProps: FormikProps<FormField>, setPreview: any, setValue: any) => {
        const file: {
            lastModified: number,
            name: string,
            preview: string,
            size: number,
            type: string
        } = files.length > 0 ? files[0] : null;
    
        if (file) {
            FormikProps.setFieldValue(setPreview, file.preview, true);
            FormikProps.setFieldValue(setValue, file);
        }
    }

    render() {
        return (
            <Formik 
                initialValues={this.props.form}
                
                onSubmit={(values, action) => {
                    this.props.setAlertOpen(false);

                    let openTime = '';
                    let closeTime = '';

                    if (values.openTime) {
                        let hours = values.openTime.getHours().toString();

                        if (Number.parseInt(hours) < 10) {
                            hours = `0${hours}`
                        }

                        let minutes = values.openTime.getMinutes().toString();
                     
                        if (Number.parseInt(minutes) < 10) {
                            minutes = `0${minutes}`
                        }

                        openTime = `${hours}:${minutes}`
                    }

                    if (values.closeTime) {
                        let hours = values.closeTime.getHours().toString();
                        
                        if (Number.parseInt(hours) < 10) {
                            hours = `0${hours}`
                        }

                        let minutes = values.closeTime.getMinutes().toString();
                     
                        if (Number.parseInt(minutes) < 10) {
                            minutes = `0${minutes}`
                        }

                        closeTime = `${hours}:${minutes}`
                    }

                    const restaurant: RestaurantEdit = {
                        name: values.name,
                        address: values.address,
                        point: {
                            lat: values.point.lat,
                            lng: values.point.lng
                        },
                        rating: values.rating,
                        photo_preview: values.photo_preview,
                        photo: values.photo,
                        openTime: openTime,
                        closeTime: closeTime
                    }

                    this.props.editRestaurantAction(restaurant, this.props.id)
                        .then( (response: ApiResponse<RestaurantEditResult>) => {
                            const data: ApiResponseSuccess<RestaurantEditResult> = response.response!;
                            this.props.setAlertRestaurantShowAction('Data Berhasil Diedit', 'success');
                            this.props.redirectOnSuccess();
                        })
                        .catch( (error: ApiResponse<RestaurantEditResult>) => {
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
                                    max="100"
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
                                    <label
                                    className="form-control-label"
                                    htmlFor="input-upload-photo"
                                    >
                                        Upload Gambar
                                    </label>
                                    <Dropzone onFilesAdded={(files: any[]) => {
                                        this.onFilesAdded(files, FormikProps, 'photo_preview', 'photo');
                                    }} disabled={false} multiple={false} />
                                    
                                    <div>
                                        {FormikProps.errors.photo_preview && FormikProps.touched.photo_preview ? FormikProps.errors.photo_preview : ''}
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