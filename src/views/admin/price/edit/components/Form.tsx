import * as React from 'react'
import * as Yup from 'yup';
import { Formik, FormikProps, FieldArray } from 'formik';
import {
    Button,
    Form as FormReactStrap,
    FormGroup,
    Input,
} from 'reactstrap';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../../../../../types';
import { connect } from 'react-redux';
import { FormField, PriceEditField, PriceEditResult } from '../../../../../types/admin/price';
import { editPriceAction, setAlertPriceShowAction } from '../../../../../actions/admin/price';
import { ApiResponse, ApiResponseSuccess } from '../../../../../types/api';
import swal from 'sweetalert'
import BlockUi from '../../../../../components/BlockUi/BlockUi'
import { toast, TypeOptions } from 'react-toastify'
import { Schema } from './Schema'
import NumberFormat, { NumberFormatValues } from 'react-number-format';

type OwnProps = {
    form: FormField,
    setAlertVisible: React.Dispatch<React.SetStateAction<boolean>>,
    setAlertMessage: React.Dispatch<React.SetStateAction<string>>,
    redirectOnSuccess: () => void,
    id: number
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

    return (
        <Formik 
            initialValues={props.form}
            
            onSubmit={(values, action) => {
                props.setAlertVisible(false);

                const price: PriceEditField = {
                    basePrice: Number.parseInt(values.basePrice),
                    minKm: Number.parseInt(values.minKm),
                    perKilometer: Number.parseInt(values.perKilometer)
                }

                swal("Apakah anda yakin?", "Data akan diubah!", {
                    icon: "warning",
                    buttons: ["Tutup!", true],
                }).then((willEdited) => {
                    if (willEdited) {
                        props.editPriceAction(price, props.id)
                            .then( (response: ApiResponse<PriceEditResult>) => {
                                const data: ApiResponseSuccess<PriceEditResult> = response.response!;
                                props.setAlertPriceShowAction('Data Berhasil Ditambah', 'success');
                                props.redirectOnSuccess();

                            })
                            .catch( (error: ApiResponse<PriceEditResult>) => {
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
                        <FormReactStrap onSubmit={FormikProps.handleSubmit} formMethod="POST">
                            <div className="pl-lg-4">
                                <FormGroup>
                                    <label
                                    className="form-control-label"
                                    htmlFor="input-basePrice"
                                    >
                                        Harga Dasar
                                    </label>
                                    <NumberFormat
                                        className="form-control form-control-alternative"
                                        id="input-basePrice"
                                        placeholder="Harga Dasar"
                                        name="basePrice"
                                        maxLength={255}
                                        decimalScale={0}
                                        thousandSeparator={true}
                                        value={FormikProps.values.basePrice}
                                        isNumericString={true}
                                        required
                                        allowNegative={false}
                                        onValueChange={(values: NumberFormatValues) => {
                                            FormikProps.setFieldValue('basePrice', values.value)
                                        }}
                                        onBlur={FormikProps.handleBlur}
                                    />
                                    <div>
                                        {FormikProps.errors.basePrice && FormikProps.touched.basePrice ? FormikProps.errors.basePrice : ''}
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                    <label
                                    className="form-control-label"
                                    htmlFor="input-perKilometer"
                                    >
                                        Harga Per Kilometer
                                    </label>
                                    <NumberFormat
                                        className="form-control form-control-alternative"
                                        id="input-perKilometer"
                                        placeholder="Harga Per Kilometer"
                                        name="perKilometer"
                                        maxLength={255}
                                        decimalScale={0}
                                        thousandSeparator={true}
                                        value={FormikProps.values.perKilometer}
                                        isNumericString={true}
                                        required
                                        allowNegative={false}
                                        onValueChange={(values: NumberFormatValues) => {
                                            FormikProps.setFieldValue('perKilometer', values.value)
                                        }}
                                        onBlur={FormikProps.handleBlur}
                                    />
                                    <div>
                                        {FormikProps.errors.perKilometer && FormikProps.touched.perKilometer ? FormikProps.errors.perKilometer : ''}
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                    <label
                                    className="form-control-label"
                                    htmlFor="input-minKm"
                                    >
                                        Minimal Jarak Tempuh
                                    </label>
                                    <Input
                                    className="form-control-alternative"
                                    id="input-minKm"
                                    placeholder="Minimal Jarak Tempuh"
                                    type="text"
                                    name="minKm"
                                    maxLength={255}
                                    value={FormikProps.values.minKm}
                                    required
                                    onChange={FormikProps.handleChange}
                                    onBlur={FormikProps.handleBlur}
                                    invalid={ !!(FormikProps.touched.minKm && FormikProps.errors.minKm) }
                                    />
                                    <div>
                                        {FormikProps.errors.minKm && FormikProps.touched.minKm ? FormikProps.errors.minKm : ''}
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                    <Button type="submit" disabled={FormikProps.isSubmitting} color="success">Simpan</Button>
                                </FormGroup>
                            </div>
                        </FormReactStrap>
                    </BlockUi>
                );
            })}
        </Formik>
    )
}

type LinkDispatchToProps = {
    editPriceAction: (price: PriceEditField, id: number) => Promise<ApiResponse<PriceEditResult>>
    setAlertPriceShowAction: (message: string, color: string) => void
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: OwnProps): LinkDispatchToProps => {
    return {
        editPriceAction: (price: PriceEditField, id: number) => dispatch(editPriceAction(price, id)),
        setAlertPriceShowAction: (message: string, color: string) => dispatch(setAlertPriceShowAction(message, color))
    }
}

export default connect(null, mapDispatchToProps)(Form);