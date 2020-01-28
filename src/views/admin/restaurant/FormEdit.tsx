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
    .test('len', 'Bidang isian nama tidak boleh lebih dari 255 karakter', (val: any): boolean => {
                if (val) {
                    return val.length <= 255;
                }

                return true;
            })
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
                    // const restaurant: RestaurantEdit = {
                    //     name: values.name,
                    //     address: values.address,
                    //     point: {
                    //         lat: values.point.lat,
                    //         lng: values.point.lng
                    //     },
                    //     rating: values.rating,
                    //     photo_preview: values.photo_preview,
                    //     photo: values.photo,
                    //     openTime: openTime,
                    //     closeTime: closeTime
                    // }

                    // this.props.editRestaurantAction(restaurant, this.props.id)
                    //     .then( (response: ApiResponse<RestaurantEditResult>) => {
                    //         const data: ApiResponseSuccess<RestaurantEditResult> = response.response!;
                    //         this.props.setAlertRestaurantShowAction('Data Berhasil Diedit', 'success');
                    //         this.props.redirectOnSuccess();
                    //     })
                    //     .catch( (error: ApiResponse<RestaurantEditResult>) => {
                    //         this.props.setAlertOpen(true);

                    //         console.log(error)

                    //         this.props.setAlertMessage(error.error!.metaData.message);
                    //     });
                }}
                validationSchema={createSchema}
            >
                {(FormikProps => {
                    return (
                        <FormReactStrap onSubmit={FormikProps.handleSubmit} formMethod="POST">
                            <div className="pl-lg-4">
                                
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