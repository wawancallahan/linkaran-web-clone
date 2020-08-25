import * as React from 'react'
import * as Yup from 'yup';
import { Formik, FormikProps } from 'formik';
import {
    Button,
    Form as FormReactStrap,
    FormGroup,
    Input,
} from 'reactstrap';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../../../../../../types';
import { connect } from 'react-redux';
import { FormField, DriverEditField, DriverEditResult } from '../../../../../../types/admin/driver';
import { editDriverAction, setAlertDriverShowAction } from '../../../../../../actions/admin/driver';
import { ApiResponse, ApiResponseSuccess } from '../../../../../../types/api';
import swal from 'sweetalert'
import BlockUi from '../../../../../../components/BlockUi/BlockUi'
import { toast, TypeOptions } from 'react-toastify'
import { Schema } from '../Schema'
import FormDriver from './components/Driver'
import FormKendaraan from './components/Kendaraan'
import FormPertanyaan from './components/Pertanyaan'
import FormStatus from './components/Status'

type OwnProps = {
    form: FormField,
    setAlertVisible: React.Dispatch<React.SetStateAction<boolean>>,
    setAlertMessage: React.Dispatch<React.SetStateAction<string>>,
    redirectOnSuccess: () => void,
    id: number
}

type Props = OwnProps & ReturnType<typeof mapDispatchToProps>

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

    const getchoiceOfActiveWorkHours = (choiceOfActiveWorkHours: string, custom_interval_jam_kerja_start: Date | null, custom_interval_jam_kerja_end: Date | null) => {
        let activeWorks = "00-00";
        
        switch (choiceOfActiveWorkHours) {
            case '0':
                activeWorks = "00-00";
            case '1':
                activeWorks = "06-14";
                break;
            case '2':
                activeWorks = "14-22"
                break;
            case '3':
                activeWorks = "22-06"
                break;
            case '4':
                if (custom_interval_jam_kerja_start) {
                    activeWorks += `${custom_interval_jam_kerja_start.getHours()}:${custom_interval_jam_kerja_start.getMinutes()}-`
                } else {
                    activeWorks += "00-"
                }

                if (custom_interval_jam_kerja_end) {
                    activeWorks += `${custom_interval_jam_kerja_end.getHours()}:${custom_interval_jam_kerja_end.getMinutes()}`
                } else {
                    activeWorks += "00"
                }
                break; 
        }

        return activeWorks;
    }

    return (
        <Formik 
            initialValues={props.form}
            
            onSubmit={(values, action) => {
                props.setAlertVisible(false);

                let tanggal_lahir = '';

                if (values.tanggal_lahir) {
                    tanggal_lahir = `${values.tanggal_lahir.getFullYear()}-${values.tanggal_lahir.getMonth() + 1}-${values.tanggal_lahir.getDate()}`;
                }

                const wasOnceAnOnlineDriver = values.wasOnceAnOnlineDriver == '1' ? true : false;
                const isActivelyBecomingAnotherOnlineDriver = values.isActivelyBecomingAnotherOnlineDriver == '1' ? true : false;
                const isJoiningTheDriverCommunity = values.isJoiningTheDriverCommunity == '1' ? true : false;
                const isJoiningLinkaranAsmainJob = values.isJoiningLinkaranAsmainJob == '1' ? true : false;

                let choiceOfActiveWorkHours = getchoiceOfActiveWorkHours(values.choiceOfActiveWorkHours, values.custom_interval_jam_kerja_start, values.custom_interval_jam_kerja_end);

                const driver: DriverEditField = {
                    alamat_domisili: values.alamat_domisili,
                    tempat_lahir: values.tempat_lahir,
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
                    no_telepon: `${values.no_telepon}`,
                    provinsi: {
                        id: values.provinsi.value
                    },
                    rating: 0,
                    sim_file: null,
                    tanggal_lahir: tanggal_lahir,
                    tipe_kendaraan: {
                        id: values.tipe_kendaraan.value
                    },
                    warna: values.warna,
                    wasOnceAnOnlineDriver: wasOnceAnOnlineDriver,
                    isActivelyBecomingAnotherOnlineDriver: isActivelyBecomingAnotherOnlineDriver,
                    isJoiningTheDriverCommunity: isJoiningTheDriverCommunity,
                    isJoiningLinkaranAsmainJob: isJoiningLinkaranAsmainJob,
                    choiceOfActiveWorkHours: choiceOfActiveWorkHours,
                    isMeried: values.isMeried,
                    driverHelpCenter: values.driverHelpCenter,
                    isActive: values.isActive
                }

                swal("Apakah anda yakin?", "Data akan diubah!", {
                    icon: "warning",
                    buttons: ["Tutup!", true],
                }).then((willEdited) => {
                    if (willEdited) {
                        props.editDriverAction(driver, props.id)
                            .then( (response: ApiResponse<DriverEditResult>) => {
                                const data: ApiResponseSuccess<DriverEditResult> = response.response!;
                                props.setAlertDriverShowAction('Data Berhasil Diedit', 'success');
                                props.redirectOnSuccess();
                            })
                            .catch( (error: ApiResponse<DriverEditResult>) => {
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
                                    <h3>Driver</h3>
                                </FormGroup>

                                <FormDriver form={FormikProps}/>

                                <hr/>

                                <FormGroup>
                                    <h3>Kendaraan</h3>
                                </FormGroup>

                                <FormKendaraan form={FormikProps}/>

                                <FormGroup>
                                    <h3>Pertanyaan</h3>
                                </FormGroup>

                                <FormPertanyaan form={FormikProps}/>   

                                <FormGroup>
                                    <h3>Status</h3>
                                </FormGroup>  

                                <FormStatus form={FormikProps} />                           
                            
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

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: OwnProps) => ({
    editDriverAction: (driver: DriverEditField, id: number) => dispatch(editDriverAction(driver, id)),
    setAlertDriverShowAction: (message: string, color: string) => dispatch(setAlertDriverShowAction(message, color))
});

export default connect(null, mapDispatchToProps)(Form);