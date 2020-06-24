import * as React from 'react'
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
    Form as FormReactStrap,
} from 'reactstrap';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../../../../../../types';
import { connect } from 'react-redux';
import { FormField, RestaurantCreateField, RestaurantCreateResult, OperatingTime as OperationTimeInterface } from '../../../../../../types/admin/restaurant';
import { createRestaurantAction, setAlertRestaurantShowAction } from '../../../../../../actions/admin/restaurant';
import { ApiResponse, ApiResponseSuccess } from '../../../../../../types/api';
import swal from 'sweetalert'
import BlockUi from '../../../../../../components/BlockUi/BlockUi'
import { toast, TypeOptions } from 'react-toastify'
import { Schema } from '../Schema'
import Information from './components/Information'
import Operational from './components/Operational'

type OwnProps = {
    form: FormField,
    setAlertVisible: React.Dispatch<React.SetStateAction<boolean>>,
    setAlertMessage: React.Dispatch<React.SetStateAction<string>>,
    redirectOnSuccess: () => void
}

type Props = OwnProps & LinkDispatchToProps

const Form: React.FC<Props> = (props) => {
    const toastNotify = (message: string, type: TypeOptions) => {
        toast(message, {
            type: type,
            position: toast.POSITION.TOP_RIGHT,
            draggable: false,
            hideProgressBar: true,
            closeOnClick: false
        })
    }

    const dayNotClosed = (day: number, isClosed: boolean, dateStart: string | null, dateEnd: string | null) : OperationTimeInterface => {
        
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

    return (
        <Formik 
            initialValues={props.form}
            
            onSubmit={(values, action) => {
                props.setAlertVisible(false);

                const operatingTime: OperationTimeInterface[] = [];

                const mondayOperationTime: OperationTimeInterface = dayNotClosed(
                    1, values.monday_isClosed, values.monday_start, values.monday_end
                )

                const tuesdayOperationTime: OperationTimeInterface = dayNotClosed(
                    2, values.tuesday_isClosed, values.tuesday_start, values.tuesday_end
                )

                const wednesdayOperationTime: OperationTimeInterface = dayNotClosed(
                    3, values.wednesday_isClosed, values.wednesday_start, values.wednesday_end
                )

                const thursdayOperationTime: OperationTimeInterface = dayNotClosed(
                    4, values.thursday_isClosed, values.thursday_start, values.thursday_end
                )

                const fridayOperationTime: OperationTimeInterface = dayNotClosed(
                    5, values.friday_isClosed, values.friday_start, values.friday_end
                )

                const saturdayOperationTime: OperationTimeInterface = dayNotClosed(
                    6, values.saturday_isClosed, values.saturday_start, values.saturday_end
                )

                const sundayOperationTime: OperationTimeInterface = dayNotClosed(
                    7, values.sunday_isClosed, values.sunday_start, values.sunday_end
                )

                operatingTime.push(mondayOperationTime)
                operatingTime.push(tuesdayOperationTime)
                operatingTime.push(wednesdayOperationTime)
                operatingTime.push(thursdayOperationTime)
                operatingTime.push(fridayOperationTime)
                operatingTime.push(saturdayOperationTime)
                operatingTime.push(sundayOperationTime)

                const restaurant: RestaurantCreateField = {
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
                        props.createRestaurantAction(restaurant)
                            .then( (response: ApiResponse<RestaurantCreateResult>) => {
                                const data: ApiResponseSuccess<RestaurantCreateResult> = response.response!;
                                props.setAlertRestaurantShowAction('Data Berhasil Ditambah', 'success');
                                props.redirectOnSuccess();
                            })
                            .catch( (error: ApiResponse<RestaurantCreateResult>) => {
                                let message = "Gagal Mendapatkan Response";

                                if (error.error) {
                                    message = error.error.metaData.message;
                                }

                                toastNotify(message, "error");

                                action.setSubmitting(false)
                            });
                    } else {
                        action.setSubmitting(false)
                    }
                });
            }}
            validationSchema={Schema}
        >
            {(FormikProps => {
                return (
                    <BlockUi blocking={FormikProps.isSubmitting}>
                        <FormReactStrap onSubmit={FormikProps.handleSubmit} formMethod="POST" type="multipart/form-data">
                            <Information form={FormikProps} />
                            <Operational form={FormikProps} />
                        </FormReactStrap>
                    </BlockUi>
                );
            })}
        </Formik>
    )
}

type LinkDispatchToProps = {
    createRestaurantAction: (price:RestaurantCreateField) => Promise<ApiResponse<RestaurantCreateResult>>
    setAlertRestaurantShowAction: (message: string, color: string) => void
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: OwnProps): LinkDispatchToProps => {
    return {
        createRestaurantAction: (price:RestaurantCreateField) => dispatch(createRestaurantAction(price)),
        setAlertRestaurantShowAction: (message: string, color: string) => dispatch(setAlertRestaurantShowAction(message, color))
    }
}

export default connect(null, mapDispatchToProps)(Form);