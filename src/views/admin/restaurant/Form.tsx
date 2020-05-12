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

import { Restaurant, FormField, RestaurantCreate, RestaurantCreateResult, OperatingTime as OperationTimeInterface } from '../../../types/admin/restaurant';
import { createRestaurantAction, setAlertRestaurantShowAction } from '../../../actions/admin/restaurant';
import { ApiResponse, ApiResponseError, ApiResponseSuccess } from '../../../types/api';

import Dropzone from '../../../components/Dropzone/Dropzone';
import DatePicker from 'react-datepicker';
import swal from 'sweetalert'
import BlockUi from '../../../components/BlockUi/BlockUi'
import { toast, TypeOptions } from 'react-toastify'

import "react-datepicker/dist/react-datepicker.css";
import FormInformation from './FormInformation';
import FormOperational from './FormOperational';

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
             .required('Bidang isian rating wajib diiisi'),
    photo_preview: Yup.string().nullable(),
    district: Yup.object().shape({
                label: Yup.string().required("Bidang pilihan district wajib diisi"),
                value: Yup.number().notOneOf([0], 'Bidang pilihan district wajib diisi').required("Bidang pilihan district wajib diisi")
            }),
    phoneNumber: Yup.string()
            .matches(/^[0-9]*$/, "Wajib Diisi dengan angka")
            .test('len', 'Bidang isian no telepon tidak boleh lebih dari 16 karakter', (val: any): boolean => {
                if (val) {
                    return val.length <= 16;
                }

                return true;
            })
            .required('Bidang isian no telepon wajib diisi'),
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

    dayNotClosed = (day: number, isClosed: boolean, dateStart: string | null, dateEnd: string | null) : OperationTimeInterface => {
        
        let openTime = "00:00"
        let closeTime = "00:00"

        if ( ! isClosed) {

            if (dateStart) {
                const [hours, minutes] = dateStart.split(":")

                openTime = `${hours}:${minutes}`
            }

            if (dateEnd) {
                const [hours, minutes] = dateEnd.split(":")

                closeTime = `${hours}:${minutes}`
            }
        }

        return {
            isClosed: isClosed,
            openTime: openTime,
            closeTime: closeTime,
            day: day
        }
    }

    render() {
        
        return (
            <Formik 
                initialValues={this.props.form}
                
                onSubmit={(values, action) => {
                    this.props.setAlertOpen(false);

                    const operatingTime: OperationTimeInterface[] = [];

                    const mondayOperationTime: OperationTimeInterface = this.dayNotClosed(
                        1, values.monday_isClosed, values.monday_start, values.monday_end
                    )

                    const tuesdayOperationTime: OperationTimeInterface = this.dayNotClosed(
                        2, values.tuesday_isClosed, values.tuesday_start, values.tuesday_end
                    )

                    const wednesdayOperationTime: OperationTimeInterface = this.dayNotClosed(
                        3, values.wednesday_isClosed, values.wednesday_start, values.wednesday_end
                    )

                    const thursdayOperationTime: OperationTimeInterface = this.dayNotClosed(
                        4, values.thursday_isClosed, values.thursday_start, values.thursday_end
                    )

                    const fridayOperationTime: OperationTimeInterface = this.dayNotClosed(
                        5, values.friday_isClosed, values.friday_start, values.friday_end
                    )

                    const saturdayOperationTime: OperationTimeInterface = this.dayNotClosed(
                        6, values.saturday_isClosed, values.saturday_start, values.saturday_end
                    )

                    const sundayOperationTime: OperationTimeInterface = this.dayNotClosed(
                        7, values.sunday_isClosed, values.sunday_start, values.sunday_end
                    )

                    operatingTime.push(mondayOperationTime)
                    operatingTime.push(tuesdayOperationTime)
                    operatingTime.push(wednesdayOperationTime)
                    operatingTime.push(thursdayOperationTime)
                    operatingTime.push(fridayOperationTime)
                    operatingTime.push(saturdayOperationTime)
                    operatingTime.push(sundayOperationTime)

                    const restaurant: RestaurantCreate = {
                        name: values.name,
                        address: values.address,
                        point: {
                            lat: values.point.lat,
                            lng: values.point.lng
                        },
                        rating: values.rating,
                        photo_preview: values.photo_preview,
                        photo: values.photo,
                        operatingTime: operatingTime,
                        district: {
                            id: values.district.value
                        },
                        phoneNumber: values.phoneNumber,
                        registered: values.registered == '1'
                    }

                    swal("Apakah anda yakin?", "Data akan ditambahkan!", {
                        icon: "warning",
                        buttons: ["Tutup!", true],
                    }).then((willCreated) => {
                        if (willCreated) {
                            this.props.createRestaurantAction(restaurant)
                                .then( (response: ApiResponse<RestaurantCreateResult>) => {
                                    const data: ApiResponseSuccess<RestaurantCreateResult> = response.response!;
                                    this.props.setAlertRestaurantShowAction('Data Berhasil Ditambah', 'success');
                                    this.props.redirectOnSuccess();
                                })
                                .catch( (error: ApiResponse<RestaurantCreateResult>) => {
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
                            <FormReactStrap onSubmit={FormikProps.handleSubmit} formMethod="POST" type="multipart/form-data">
                                <FormInformation FormikProps={FormikProps} />
                                <FormOperational FormikProps={FormikProps} />
                            </FormReactStrap>
                        </BlockUi>
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