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

import { Driver, FormField, DriverEdit, DriverEditResult } from '../../../types/admin/driver';
import {
    setAlertDriverShowAction,
    setAlertDriverHideAction,
    editDriverAction
} from '../../../actions/admin/driver';
import { ApiResponse, ApiResponseError, ApiResponseSuccess } from '../../../types/api';

import FormDriver from './FormDriver';
import FormKendaraan from './FormKendaraan';

const createSchema = Yup.object().shape({
    nama: Yup.string()
                .max(255, 'Bidang isian nama tidak boleh lebih dari 255 karakter')
                .required('Bidang isian nama wajib diisi'),
    no_telepon: Yup.string()
                .required('Bidang isian no telepon wajib diisi'),
    email: Yup.string()
                .email('Bidang isian harus berupa email')
                .required('Bidang isian email wajib diisi'),
    jenis_kelamin: Yup.number()
                      .oneOf([0, 1], 'Bidang pilihan jenis kelamin wajib diisi')
                      .required('Bidang pilihan jenis kelamin wajib diisi'),
    no_ktp: Yup.string()
                .max(255, 'Bidang isian no ktp tidak boleh lebih dari 255 karakter')
                .required('Bidang isian no ktp wajib diisi'),
    // ktp_file: File | null,
    ktp_file_preview: Yup.string()
                        .required('Bidang upload ktp wajib diisi'),
    foto_profil_preview: Yup.string()
                        .required('Bidang upload foto profil wajib diisi'),
    // no_sim: Yup.string()
    //             .max(255, 'Bidang isian no sim tidak boleh lebih dari 255 karakter')
    //             .required('Bidang isian no sim wajib diisi'),
    // sim_file: File | null,
    alamat: Yup.string()
                .max(255, 'Bidang isian alamat tidak boleh lebih dari 255 karakter')
                .required('Bidang isian alamat wajib diisi'),
    negara: Yup.object().shape({
        label: Yup.string().required("Bidang pilihan negara wajib diisi"),
        value: Yup.number().notOneOf([0], 'Bidang pilihan negara wajib diisi').required("Bidang pilihan negara wajib diisi")
    }),
    provinsi: Yup.object().shape({
        label: Yup.string().required("Bidang pilihan provinsi wajib diisi"),
        value: Yup.number().notOneOf([0], 'Bidang pilihan provinsi wajib diisi').required("Bidang pilihan provinsi wajib diisi")
    }),
    kabupaten_kota: Yup.object().shape({
        label: Yup.string().required("Bidang pilihan kabupaten/kota wajib diisi"),
        value: Yup.number().notOneOf([0], 'Bidang pilihan kabupaten/kota wajib diisi').required("Bidang pilihan kabupaten/kota wajib diisi")
    }),
    kecamatan: Yup.object().shape({
        label: Yup.string().required("Bidang pilihan kecamatan wajib diisi"),
        value: Yup.number().notOneOf([0], 'Bidang pilihan kecamatan wajib diisi').required("Bidang pilihan kecamatan wajib diisi")
    }),
    kelurahan: Yup.object().shape({
        label: Yup.string().required("Bidang pilihan kelurahan wajib diisi"),
        value: Yup.number().notOneOf([0], 'Bidang pilihan kelurahan wajib diisi').required("Bidang pilihan kelurahan wajib diisi")
    }),
    rating: Yup.number().required('Bidang isian rating wajib diiisi'),
    // foto_profil: File | null,
    tipe_kendaraan: Yup.object().shape({
        label: Yup.string().required("Bidang pilihan tipe kendaraan wajib diisi"),
        value: Yup.number().notOneOf([0], 'Bidang pilihan tipe kendaraan wajib diisi').required("Bidang pilihan tipe kendaraan wajib diisi")
    }),
    merek: Yup.object().shape({
        label: Yup.string().required("Bidang pilihan merek wajib diisi"),
        value: Yup.number().notOneOf([0], 'Bidang pilihan merek wajib diisi').required("Bidang pilihan merek wajib diisi")
    }),
    no_stnk: Yup.string()
                .max(255, 'Bidang isian no stnk tidak boleh lebih dari 255 karakter')
                .required('Bidang isian no stnk wajib diisi'),
    no_polisi: Yup.string()
                    .max(255, 'Bidang isian no polisi tidak boleh lebih dari 255 karakter')
                    .required('Bidang isian no polisi wajib diisi'),
    no_rangka: Yup.string()
                    .max(255, 'Bidang isian no rangka tidak boleh lebih dari 255 karakter')
                    .required('Bidang isian no rangka wajib diisi'),
    jumlah_seat: Yup.number()
                .min(1, 'Bidang isian jumal seat minimal 1')
                .required('Bidang isian jumlah seat wajib diisi'),
    warna: Yup.string()
                .max(255, 'Bidang isian warna tidak boleh lebih dari 255 karakter')
                .required('Bidang isian warna wajib diisi'),
    keterangan: Yup.string()
                    .max(255, 'Bidang isian keterangan tidak boleh lebih dari 255 karakter')
                    .required('Bidang isian keterangan wajib diisi') 
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


    render() {
        return (
            <Formik 
                initialValues={this.props.form}
                
                onSubmit={(values, action) => {
                    this.props.setAlertOpen(false);

                    let tanggal_lahir = '';

                    if (values.tanggal_lahir) {
                        tanggal_lahir = `${values.tanggal_lahir.getFullYear()}-${values.tanggal_lahir.getMonth() + 1}-${values.tanggal_lahir.getDate()}`;
                    }

                    const driver: DriverEdit = {
                        alamat: values.alamat,
                        email: values.email,
                        foto_profil: values.foto_profil,
                        jenis_kelamin: values.jenis_kelamin!,
                        jumlah_seat: values.jumlah_seat!,
                        kabupaten_kota: {
                            id: values.kabupaten_kota.value
                        },
                        kecamatan: {
                            id: values.kecamatan.value
                        },
                        kelurahan: {
                            id: values.kelurahan.value
                        },
                        keterangan: values.keterangan,
                        ktp_file: values.ktp_file,
                        merek: {
                            id: values.merek.value
                        },
                        nama: values.nama,
                        negara: {
                            id: values.negara.value
                        },
                        no_ktp: values.no_ktp,
                        no_polisi: values.no_polisi,
                        no_rangka: values.no_rangka,
                        no_sim: '',
                        no_stnk: values.no_stnk,
                        no_telepon: values.no_telepon,
                        provinsi: {
                            id: values.provinsi.value
                        },
                        rating: values.rating!,
                        sim_file: null,
                        tanggal_lahir: tanggal_lahir,
                        tipe_kendaraan: {
                            id: values.tipe_kendaraan.value
                        },
                        warna: values.warna
                    }

                    this.props.editDriverAction(driver, this.props.id)
                    .then( (response: ApiResponse<DriverEditResult>) => {
                        const data: ApiResponseSuccess<DriverEditResult> = response.response!;
                        this.props.setAlertDriverShowAction('Data Berhasil Diedit', 'success');
                        this.props.redirectOnSuccess();
                    })
                    .catch( (error: ApiResponse<DriverEditResult>) => {
                        this.props.setAlertOpen(true);
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
                                    <h3>Driver</h3>
                                </FormGroup>

                                <FormDriver FormikProps={FormikProps}/>

                                <hr/>

                                <FormGroup>
                                    <h3>Kendaraan</h3>
                                </FormGroup>

                                <FormKendaraan FormikProps={FormikProps}/>                            
                               
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
    editDriverAction: (driver: DriverEdit, id: number) => Promise<ApiResponse<DriverEditResult>>
    setAlertDriverShowAction: (message: string, color: string) => void,
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: FormProps): LinkDispatchToProps => {
    return {
        editDriverAction: (driver: DriverEdit, id: number) => dispatch(editDriverAction(driver, id)),
        setAlertDriverShowAction: (message: string, color: string) => dispatch(setAlertDriverShowAction(message, color)),
    }
}

export default connect(null, mapDispatchToProps)(Form);