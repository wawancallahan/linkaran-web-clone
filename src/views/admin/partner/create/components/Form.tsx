import * as React from 'react'
import * as Yup from 'yup';
import { Formik, FormikProps, FieldArray } from 'formik';
import {
    Button,
    Form as FormReactStrap,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
} from 'reactstrap';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../../../../../types';
import { connect } from 'react-redux';
import { FormField, PartnerCreateField, PartnerCreateResult } from '../../../../../types/admin/partner';
import { createPartnerAction, setAlertPartnerShowAction } from '../../../../../actions/admin/partner';
import { ApiResponse, ApiResponseSuccess } from '../../../../../types/api';
import swal from 'sweetalert'
import BlockUi from '../../../../../components/BlockUi/BlockUi'
import { toast, TypeOptions } from 'react-toastify'
import { Schema } from './Schema'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

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

    return (
        <Formik 
            initialValues={props.form}
            
            onSubmit={(values, action) => {
                props.setAlertVisible(false);

                let startWorkingTogether = '';

                if (values.startWorkingTogether) {
                    startWorkingTogether = `${values.startWorkingTogether.getFullYear()}-${values.startWorkingTogether.getMonth() + 1}-${values.startWorkingTogether.getDate()}`;
                }

                let endWorkingTogether = '';

                if (values.endWorkingTogether) {
                    endWorkingTogether = `${values.endWorkingTogether.getFullYear()}-${values.endWorkingTogether.getMonth() + 1}-${values.endWorkingTogether.getDate()}`;
                }

                const partner: PartnerCreateField = {
                    name: values.name,
                    email: values.email,
                    phoneNumber: values.phoneNumber,
                    companyName: values.companyName,
                    secret: values.secret,
                    startWorkingTogether: startWorkingTogether,
                    endWorkingTogether: endWorkingTogether,
                    ips: values.ips
                }

                swal("Apakah anda yakin?", "Data akan ditambahkan!", {
                    icon: "warning",
                    buttons: ["Tutup!", true],
                }).then((willCreated) => {
                    if (willCreated) {
                        props.createPartnerAction(partner)
                            .then( (response: ApiResponse<PartnerCreateResult>) => {
                                const data: ApiResponseSuccess<PartnerCreateResult> = response.response!;
                                props.setAlertPartnerShowAction('Data Berhasil Ditambah', 'success');
                                props.redirectOnSuccess();
                            })
                            .catch( (error: ApiResponse<PartnerCreateResult>) => {
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
                                    htmlFor="input-email"
                                    >
                                        Email
                                    </label>
                                    <Input
                                    className="form-control-alternative"
                                    id="input-email"
                                    placeholder="Email"
                                    type="text"
                                    name="email"
                                    maxLength={255}
                                    value={FormikProps.values.email}
                                    required
                                    onChange={FormikProps.handleChange}
                                    onBlur={FormikProps.handleBlur}
                                    invalid={ !!(FormikProps.touched.email && FormikProps.errors.email) }
                                    />
                                    <div>
                                        {FormikProps.errors.email && FormikProps.touched.email ? FormikProps.errors.email : ''}
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                    <label
                                    className="form-control-label"
                                    htmlFor="input-phoneNumber"
                                    >
                                        Nomor Telepon
                                    </label>
                                    <Input
                                    className="form-control-alternative"
                                    id="input-phoneNumber"
                                    placeholder="Nomor Telepon"
                                    type="text"
                                    name="phoneNumber"
                                    maxLength={255}
                                    value={FormikProps.values.phoneNumber}
                                    required
                                    onChange={FormikProps.handleChange}
                                    onBlur={FormikProps.handleBlur}
                                    invalid={ !!(FormikProps.touched.phoneNumber && FormikProps.errors.phoneNumber) }
                                    />
                                    <div>
                                        {FormikProps.errors.phoneNumber && FormikProps.touched.phoneNumber ? FormikProps.errors.phoneNumber : ''}
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                    <label
                                    className="form-control-label"
                                    htmlFor="input-companyName"
                                    >
                                        Nama Perusahaan
                                    </label>
                                    <Input
                                    className="form-control-alternative"
                                    id="input-companyName"
                                    placeholder="Nama Perusahaan"
                                    type="text"
                                    name="companyName"
                                    maxLength={255}
                                    value={FormikProps.values.companyName}
                                    required
                                    onChange={FormikProps.handleChange}
                                    onBlur={FormikProps.handleBlur}
                                    invalid={ !!(FormikProps.touched.companyName && FormikProps.errors.companyName) }
                                    />
                                    <div>
                                        {FormikProps.errors.companyName && FormikProps.touched.companyName ? FormikProps.errors.companyName : ''}
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                    <label
                                    className="form-control-label"
                                    htmlFor="input-secret"
                                    >
                                        Kode Rahasia
                                    </label>
                                    <Input
                                    className="form-control-alternative"
                                    id="input-secret"
                                    placeholder="Kode Rahasia"
                                    type="text"
                                    name="secret"
                                    maxLength={255}
                                    value={FormikProps.values.secret}
                                    required
                                    onChange={FormikProps.handleChange}
                                    onBlur={FormikProps.handleBlur}
                                    invalid={ !!(FormikProps.touched.secret && FormikProps.errors.secret) }
                                    />
                                    <div>
                                        {FormikProps.errors.secret && FormikProps.touched.secret ? FormikProps.errors.secret : ''}
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                    <label
                                    className="form-control-label"
                                    htmlFor="input-startWorkingTogether"
                                    >
                                        Waktu Mulai
                                    </label>
                                    <div>
                                        <DatePicker
                                            selected={FormikProps.values.startWorkingTogether}
                                            onChange={date => FormikProps.setFieldValue('startWorkingTogether', date)}
                                            onBlur={() => FormikProps.setFieldTouched('startWorkingTogether', true)}
                                            dateFormat="yyyy-MM-dd"
                                            className="form-control form-control-alternative"
                                            required
                                            />
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                    <label
                                    className="form-control-label"
                                    htmlFor="input-endWorkingTogether"
                                    >
                                        Waktu Berakhir
                                    </label>
                                    <div>
                                        <DatePicker
                                            selected={FormikProps.values.endWorkingTogether}
                                            onChange={date => FormikProps.setFieldValue('endWorkingTogether', date)}
                                            onBlur={() => FormikProps.setFieldTouched('endWorkingTogether', true)}
                                            dateFormat="yyyy-MM-dd"
                                            className="form-control form-control-alternative"
                                            required
                                            />
                                    </div>
                                </FormGroup>

                                <FormGroup>
                                    <label
                                    className="form-control-label"
                                    htmlFor="input-ips"
                                    >
                                        IP
                                    </label>
                                    <FieldArray
                                        name="ips" 
                                        render={(arrayHelpers) => (
                                            <>
                                                <FormGroup>
                                                    <Button 
                                                        type="button"
                                                        color="primary"
                                                        onClick={() => arrayHelpers.push('')}>
                                                        Tambah IP
                                                    </Button>
                                                </FormGroup>
                                                {FormikProps.values.ips && FormikProps.values.ips.length > 0 ? (
                                                    FormikProps.values.ips.map((ips: string, index: number) => (
                                                        <FormGroup key={index}>
                                                            <InputGroup>
                                                                <Input
                                                                    className="form-control-alternative"
                                                                    id={`input-ips.${index}`}
                                                                    placeholder="IP"
                                                                    type="text"
                                                                    name={`ips.${index}`}
                                                                    maxLength={255}
                                                                    value={FormikProps.values.ips[index]}
                                                                    required
                                                                    onChange={FormikProps.handleChange}
                                                                    onBlur={FormikProps.handleBlur}
                                                                    invalid={ !!(FormikProps.touched.ips && FormikProps.errors.ips &&  FormikProps.errors.ips[index]) }
                                                                />
                                                                <InputGroupAddon addonType="append">
                                                                    <Button type="button" color="danger" onClick={() => arrayHelpers.remove(index)}>-</Button>
                                                                </InputGroupAddon>
                                                            </InputGroup>
                                                            <div>
                                                                {FormikProps.errors.ips && FormikProps.errors.ips[index] && FormikProps.touched.ips ? FormikProps.errors.ips[index] : ''}
                                                            </div>
                                                        </FormGroup>
                                                    ))
                                                ) : null}
                                            </>
                                        )}
                                        />
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
    createPartnerAction: (partner:PartnerCreateField) => Promise<ApiResponse<PartnerCreateResult>>
    setAlertPartnerShowAction: (message: string, color: string) => void
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: OwnProps): LinkDispatchToProps => {
    return {
        createPartnerAction: (partner:PartnerCreateField) => dispatch(createPartnerAction(partner)),
        setAlertPartnerShowAction: (message: string, color: string) => dispatch(setAlertPartnerShowAction(message, color))
    }
}

export default connect(null, mapDispatchToProps)(Form);
