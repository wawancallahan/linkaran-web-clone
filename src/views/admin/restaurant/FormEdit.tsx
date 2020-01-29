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

import { Restaurant, FormField, RestaurantEdit, RestaurantEditResult, OperatingTime as OperationTimeInterface } from '../../../types/admin/restaurant';
import { editRestaurantAction, setAlertRestaurantShowAction } from '../../../actions/admin/restaurant';
import { ApiResponse, ApiResponseError, ApiResponseSuccess } from '../../../types/api';

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
    photo_preview: Yup.string()
        .required('Bidang upload foto wajib diisi')
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

    dayNotClosed = (day: number, isClosed: boolean, dateStart: Date | null, dateEnd: Date | null) : OperationTimeInterface => {
        
        let openTime = "00:00"
        let closeTime = "00:00"

        if ( ! isClosed) {

            if (dateStart) {
                let hours = dateStart.getHours().toString();

                if (Number.parseInt(hours) < 10) {
                    hours = `0${hours}`
                }

                let minutes = dateStart.getMinutes().toString();
            
                if (Number.parseInt(minutes) < 10) {
                    minutes = `0${minutes}`
                }

                openTime = `${hours}:${minutes}`
            }

            if (dateEnd) {
                let hours = dateEnd.getHours().toString();
                
                if (Number.parseInt(hours) < 10) {
                    hours = `0${hours}`
                }

                let minutes = dateEnd.getMinutes().toString();
            
                if (Number.parseInt(minutes) < 10) {
                    minutes = `0${minutes}`
                }

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
                        operatingTime: operatingTime
                    }

                    this.props.editRestaurantAction(restaurant, this.props.id)
                        .then( (response: ApiResponse<RestaurantEditResult>) => {
                            const data: ApiResponseSuccess<RestaurantEditResult> = response.response!;
                            this.props.setAlertRestaurantShowAction('Data Berhasil Diedit', 'success');
                            this.props.redirectOnSuccess();

                            action.setSubmitting(false)
                        })
                        .catch( (error: ApiResponse<RestaurantEditResult>) => {
                            this.props.setAlertOpen(true);
                            this.props.setAlertMessage(error.error!.metaData.message);

                            action.setSubmitting(false)
                        });
                }}
                validationSchema={createSchema}
            >
                {(FormikProps => {
                    return (
                        <FormReactStrap onSubmit={FormikProps.handleSubmit} formMethod="POST" type="multipart/form-data">
                            <FormInformation FormikProps={FormikProps} />
                            <FormOperational FormikProps={FormikProps} />
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