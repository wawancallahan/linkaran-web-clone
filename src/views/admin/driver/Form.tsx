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

import { Driver, FormField } from '../../../types/admin/driver';

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
    no_sim: Yup.string()
                .max(255, 'Bidang isian no sim tidak boleh lebih dari 255 karakter')
                .required('Bidang isian no sim wajib diisi'),
    // sim_file: File | null,
    alamat: Yup.string()
                .max(255, 'Bidang isian alamat tidak boleh lebih dari 255 karakter')
                .required('Bidang isian alamat wajib diisi'),
    negara: Yup.string()
                .max(255, 'Bidang isian negara tidak boleh lebih dari 255 karakter')
                .required('Bidang isian negara wajib diisi'),
    provinsi: Yup.string()
                .max(255, 'Bidang isian provinsi tidak boleh lebih dari 255 karakter')
                .required('Bidang isian provinsi wajib diisi'),
    kabupaten_kota: Yup.string()
                .max(255, 'Bidang isian kabupaten/kota tidak boleh lebih dari 255 karakter')
                .required('Bidang isian kabupaten/kota wajib diisi'),
    kecamatan: Yup.string()
                .max(255, 'Bidang isian kecamatan tidak boleh lebih dari 255 karakter')
                .required('Bidang isian kecamatan wajib diisi'),
    kelurahan: Yup.string()
                .max(255, 'Bidang isian kelurahan tidak boleh lebih dari 255 karakter')
                .required('Bidang isian kelurahan wajib diisi'),
    // foto_profil: File | null,
    tipe_kendaraan: Yup.number()
                    .required('Bidang pilihan tipe kendaraan wajib diisi'),
    no_stnk: Yup.string()
                .max(255, 'Bidang isian no stnk tidak boleh lebih dari 255 karakter')
                .required('Bidang isian no stnk wajib diisi'),
    no_polisi: Yup.string()
                    .max(255, 'Bidang isian no polisi tidak boleh lebih dari 255 karakter')
                    .required('Bidang isian no polisi wajib diisi'),
    no_rangka: Yup.string()
                    .max(255, 'Bidang isian no rangka tidak boleh lebih dari 255 karakter')
                    .required('Bidang isian no rangka wajib diisi'),
    merek: Yup.number()
            .required('Bidang pilihan merek wajib diisi'),
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
   
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: FormProps): LinkDispatchToProps => {
    return {
        
    }
}

export default connect(null, mapDispatchToProps)(Form);