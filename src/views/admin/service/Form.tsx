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
import { Service, FormField, ServiceCreate, ServiceCreateResult } from '../../../types/admin/service';
import { createServiceAction, setAlertServiceShowAction } from '../../../actions/admin/service';
import { ApiResponse, ApiResponseError, ApiResponseSuccess, ApiResponseList, ApiResponseSuccessList } from '../../../types/api';
import { Paginator } from '../../../types/paginator';
import swal from 'sweetalert'
import BlockUi from '../../../components/BlockUi/BlockUi'
import { toast, TypeOptions } from 'react-toastify'

const createSchema = Yup.object().shape({
    name: Yup.string()
            .test('len', 'Bidang isian nama tidak boleh lebih dari 255 karakter', (val: any): boolean => {
                if (val) {
                    return val.length <= 255;
                }

                return true;
            })
            .required('Bidang isian nama wajib diisi'),
    code: Yup.string()
            .test('len', 'Bidang isian kode tidak boleh lebih dari 255 karakter', (val: any): boolean => {
                if (val) {
                    return val.length <= 255;
                }

                return true;
            })
            .required('Bidang isian kode wajib diisi'),
    maxServiceDistanceInKm: Yup.number()
                                .min(0, "Bidang isian minimal jarak tidak boleh kurang dari 0")
                                .required('Bidang isian minimal jarak wajib diisi')
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

    render() {
        return (
            <Formik 
                initialValues={this.props.form}
                
                onSubmit={(values, action) => {
                    this.props.setAlertOpen(false);

                    const service: ServiceCreate = {
                        name: values.name,
                        code: values.code,
                        canBeMultiple: values.canBeMultiple == '1',
                        passangerWithDriver: values.passangerWithDriver == '1',
                        maxServiceDistanceInKm: values.maxServiceDistanceInKm
                    }

                    swal("Apakah anda yakin?", "Data akan ditambahkan!", {
                        icon: "warning",
                        buttons: ["Tutup!", true],
                    }).then((willCreated) => {
                        if (willCreated) {
                            this.props.createServiceAction(service)
                                .then( (response: ApiResponse<ServiceCreateResult>) => {
                                    const data: ApiResponseSuccess<ServiceCreateResult> = response.response!;
                                    this.props.setAlertServiceShowAction('Data Berhasil Ditambah', 'success');
                                    this.props.redirectOnSuccess();

                                })
                                .catch( (error: ApiResponse<ServiceCreateResult>) => {
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
                            <FormReactStrap onSubmit={FormikProps.handleSubmit} formMethod="POST">
                                <div className="pl-lg-4">
                                    <FormGroup>
                                        <label
                                        className="form-control-label"
                                        htmlFor="input-code"
                                        >
                                            Kode
                                        </label>
                                        <Input
                                        className="form-control-alternative"
                                        id="input-code"
                                        placeholder="Kode"
                                        type="text"
                                        name="code"
                                        maxLength={255}
                                        value={FormikProps.values.code}
                                        required
                                        onChange={FormikProps.handleChange}
                                        onBlur={FormikProps.handleBlur}
                                        invalid={ !!(FormikProps.touched.code && FormikProps.errors.code) }
                                        />
                                        <div>
                                            {FormikProps.errors.code && FormikProps.touched.code ? FormikProps.errors.code : ''}
                                        </div>
                                    </FormGroup>
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
                                        htmlFor="input-canBeMultiple"
                                        >
                                            Dapat Lebih Dari 1
                                        </label>
                                    </FormGroup>

                                    <FormGroup>
                                        <fieldset>
                                            <div className="custom-control custom-radio mb-3">
                                                <input
                                                    className="custom-control-input"
                                                    defaultChecked
                                                    id="canBeMultiple_no"
                                                    name="canBeMultiple"
                                                    type="radio"
                                                    value="0"
                                                    onChange={FormikProps.handleChange}
                                                    onBlur={FormikProps.handleBlur}
                                                />
                                                <label className="custom-control-label" htmlFor="canBeMultiple_no">
                                                    Tidak
                                                </label>
                                            </div>
                                            <div className="custom-control custom-radio mb-3">
                                                <input
                                                    className="custom-control-input"
                                                    id="canBeMultiple_yes"
                                                    name="canBeMultiple"
                                                    type="radio"
                                                    value="1"
                                                    onChange={FormikProps.handleChange}
                                                    onBlur={FormikProps.handleBlur}
                                                />
                                                <label className="custom-control-label" htmlFor="canBeMultiple_yes">
                                                    Ya
                                                </label>
                                            </div>
                                        </fieldset>
                                        <div>
                                            {FormikProps.errors.canBeMultiple && FormikProps.touched.canBeMultiple ? FormikProps.errors.canBeMultiple : ''}
                                        </div>
                                    </FormGroup>

                                    <FormGroup>
                                        <label
                                        className="form-control-label"
                                        htmlFor="input-passangerWithDriver"
                                        >
                                            Penumpang Dengan Driver
                                        </label>
                                    </FormGroup>

                                    <FormGroup>
                                        <fieldset>
                                            <div className="custom-control custom-radio mb-3">
                                                <input
                                                    className="custom-control-input"
                                                    defaultChecked
                                                    id="passangerWithDriver_no"
                                                    name="passangerWithDriver"
                                                    type="radio"
                                                    value="0"
                                                    onChange={FormikProps.handleChange}
                                                    onBlur={FormikProps.handleBlur}
                                                />
                                                <label className="custom-control-label" htmlFor="passangerWithDriver_no">
                                                    Tidak
                                                </label>
                                            </div>
                                            <div className="custom-control custom-radio mb-3">
                                                <input
                                                    className="custom-control-input"
                                                    id="passangerWithDriver_yes"
                                                    name="passangerWithDriver"
                                                    type="radio"
                                                    value="1"
                                                    onChange={FormikProps.handleChange}
                                                    onBlur={FormikProps.handleBlur}
                                                />
                                                <label className="custom-control-label" htmlFor="passangerWithDriver_yes">
                                                    Ya
                                                </label>
                                            </div>
                                        </fieldset>
                                        <div>
                                            {FormikProps.errors.passangerWithDriver && FormikProps.touched.passangerWithDriver ? FormikProps.errors.passangerWithDriver : ''}
                                        </div>
                                    </FormGroup>

                                    <FormGroup>
                                        <label
                                        className="form-control-label"
                                        htmlFor="input-maxServiceDistanceInKm"
                                        >
                                            Maksimal Jarak (KM)
                                        </label>
                                        <Input
                                        className="form-control-alternative"
                                        id="input-maxServiceDistanceInKm"
                                        placeholder=" Maksimal Jarak (KM)"
                                        type="number"
                                        name="maxServiceDistanceInKm"
                                        maxLength={255}
                                        value={FormikProps.values.maxServiceDistanceInKm}
                                        required
                                        onChange={FormikProps.handleChange}
                                        onBlur={FormikProps.handleBlur}
                                        invalid={ !!(FormikProps.touched.maxServiceDistanceInKm && FormikProps.errors.maxServiceDistanceInKm) }
                                        />
                                        <div>
                                            {FormikProps.errors.maxServiceDistanceInKm && FormikProps.touched.maxServiceDistanceInKm ? FormikProps.errors.maxServiceDistanceInKm : ''}
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
}

type LinkDispatchToProps = {
    createServiceAction: (service: ServiceCreate) => Promise<ApiResponse<ServiceCreateResult>>
    setAlertServiceShowAction: (message: string, color: string) => void
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: FormProps): LinkDispatchToProps => {
    return {
        createServiceAction: (service: ServiceCreate) => dispatch(createServiceAction(service)),
        setAlertServiceShowAction: (message: string, color: string) => dispatch(setAlertServiceShowAction(message, color))
    }
}

export default connect(null, mapDispatchToProps)(Form);