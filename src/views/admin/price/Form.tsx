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
import { Price, FormField, PriceCreate, PriceCreateResult } from '../../../types/admin/price';
import { createPriceAction, setAlertPriceShowAction } from '../../../actions/admin/price';
import { ApiResponse, ApiResponseError, ApiResponseSuccess, ApiResponseList, ApiResponseSuccessList } from '../../../types/api';
import { Paginator } from '../../../types/paginator';
import swal from 'sweetalert'

const createSchema = Yup.object().shape({
    basePrice: Yup.string()
            .matches(/^[0-9]*$/, "Wajib Diisi dengan angka")
            .test('len', 'Bidang isian harga dasar tidak boleh lebih dari 255 karakter', (val: any): boolean => {
                if (val) {
                    return val.length <= 255;
                }

                return true;
            })
            .required('Bidang isian harga dasar wajib diisi'),
    perKilometer: Yup.string()
            .matches(/^[0-9]*$/, "Wajib Diisi dengan angka")
            .test('len', 'Bidang isian harga per kilometer tidak boleh lebih dari 255 karakter', (val: any): boolean => {
                if (val) {
                    return val.length <= 255;
                }

                return true;
            })
            .required('Bidang isian harga per kilometer wajib diisi'),
    minKm: Yup.string()
            .matches(/^[0-9]*$/, "Wajib Diisi dengan angka")
            .test('len', 'Bidang isian minimal jarak tempuh tidak boleh lebih dari 255 karakter', (val: any): boolean => {
                if (val) {
                    return val.length <= 255;
                }

                return true;
            })
            .required('Bidang isian minimal jarak tempuh wajib diisi')
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

                    const price: PriceCreate = {
                        basePrice: Number.parseInt(values.basePrice),
                        minKm: Number.parseInt(values.minKm),
                        perKilometer: Number.parseInt(values.perKilometer)
                    }

                    swal("Apakah anda yakin?", "Data akan ditambahkan!", {
                        icon: "warning",
                        buttons: ["Tutup!", true],
                    }).then((willCreated) => {
                        if (willCreated) {
                            this.props.createPriceAction(price)
                                .then( (response: ApiResponse<PriceCreateResult>) => {
                                    const data: ApiResponseSuccess<PriceCreateResult> = response.response!;
                                    this.props.setAlertPriceShowAction('Data Berhasil Ditambah', 'success');
                                    this.props.redirectOnSuccess();
                                })
                                .catch( (error: ApiResponse<PriceCreateResult>) => {
                                    this.props.setAlertOpen(true);
                                    let message = "Gagal Mendapatkan Response";

                                if (error.error) {
                                    message = error.error.metaData.message;
                                }
                            
                                this.props.setAlertMessage(message);

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
                        <FormReactStrap onSubmit={FormikProps.handleSubmit} formMethod="POST">
                            <div className="pl-lg-4">
                                <FormGroup>
                                    <label
                                    className="form-control-label"
                                    htmlFor="input-basePrice"
                                    >
                                        Harga Dasar
                                    </label>
                                    <Input
                                    className="form-control-alternative"
                                    id="input-basePrice"
                                    placeholder="Harga Dasar"
                                    type="text"
                                    name="basePrice"
                                    maxLength={255}
                                    value={FormikProps.values.basePrice}
                                    required
                                    onChange={FormikProps.handleChange}
                                    onBlur={FormikProps.handleBlur}
                                    invalid={ !!(FormikProps.touched.basePrice && FormikProps.errors.basePrice) }
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
                                    <Input
                                    className="form-control-alternative"
                                    id="input-perKilometer"
                                    placeholder="Harga Per Kilometer"
                                    type="text"
                                    name="perKilometer"
                                    maxLength={255}
                                    value={FormikProps.values.perKilometer}
                                    required
                                    onChange={FormikProps.handleChange}
                                    onBlur={FormikProps.handleBlur}
                                    invalid={ !!(FormikProps.touched.perKilometer && FormikProps.errors.perKilometer) }
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
                    );
                })}
            </Formik>
        )
    }
}

type LinkDispatchToProps = {
    createPriceAction: (price: PriceCreate) => Promise<ApiResponse<PriceCreateResult>>
    setAlertPriceShowAction: (message: string, color: string) => void,
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: FormProps): LinkDispatchToProps => {
    return {
        createPriceAction: (price: PriceCreate) => dispatch(createPriceAction(price)),
        setAlertPriceShowAction: (message: string, color: string) => dispatch(setAlertPriceShowAction(message, color)),
    }
}

export default connect(null, mapDispatchToProps)(Form);