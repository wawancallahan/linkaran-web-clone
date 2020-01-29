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

import { Investor, FormField, InvestorCreate, InvestorCreateResult } from '../../../types/admin/investor';
import {
    setAlertInvestorShowAction,
    setAlertInvestorHideAction,
    createInvestorAction
} from '../../../actions/admin/investor';
import { ApiResponse, ApiResponseError, ApiResponseSuccess, ApiResponseList, ApiResponseSuccessList } from '../../../types/api';

import {
    fetchListKabupatenKotaAction,
    fetchListKecamatanAction,
    fetchListKelurahanAction,
    fetchListNegaraAction,
    fetchListProvinsiAction
} from '../../../actions/admin/location';
import {
    Negara,
    KabupatenKota,
    Kecamatan,
    Kelurahan,
    Provinsi
} from '../../../types/admin/location';

import Dropzone from '../../../components/Dropzone/Dropzone';
import ReactSelectAsyncPaginate from 'react-select-async-paginate';
import DatePicker from 'react-datepicker';

import { Paginator } from '../../../types/paginator';
import "react-datepicker/dist/react-datepicker.css";

const createSchema = Yup.object().shape({
    nama: Yup.string()
                .length(255, 'Bidang isian nama tidak boleh lebih dari 255 karakter')
                .required('Bidang isian nama wajib diisi'),
    no_telepon: Yup.string()
                .required('Bidang isian no telepon wajib diisi'),
    email: Yup.string()
                .email('Bidang isian harus berupa email')
                .required('Bidang isian email wajib diisi'),
    jenis_kelamin: Yup.string()
                      .oneOf(['L', 'P'], 'Bidang pilihan jenis kelamin wajib diisi')
                      .required('Bidang pilihan jenis kelamin wajib diisi'),
    no_ktp: Yup.string()
    .test('len', 'Bidang isian no ktp tidak boleh lebih dari 255 karakter', (val: any): boolean => {
                if (val) {
                    return val.length <= 255;
                }

                return true;
            })
                .required('Bidang isian no ktp wajib diisi'),
    // ktp_file: File | null,
    ktp_file_preview: Yup.string()
                        .required('Bidang upload ktp wajib diisi'),
    foto_profil_preview: Yup.string()
                        .required('Bidang upload foto profil wajib diisi'),
    alamat: Yup.string()
    .test('len', 'Bidang isian alamat tidak boleh lebih dari 255 karakter', (val: any): boolean => {
                if (val) {
                    return val.length <= 255;
                }

                return true;
            })
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
    nomor_asosiasi_lingkungan: Yup.string()
                .required('Bidang isian Nomor Asosiasi Lingkungan seat wajib diisi'),
    nomor_asosiasi_warga_negara: Yup.string()
                .required('Bidang isian Nomor Asosiasi Warga Negara seat wajib diisi')
});

type FormProps = {
    form: FormField,
    setAlertOpen: (open: boolean) => void,
    setAlertMessage: (message: string) => void,
    redirectOnSuccess: () => void
}

type Props = LinkDispatchToProps & FormProps;

class Form extends Component<Props> {

    loadNegaraHandler = (search: string, loadedOption: {}, options: {
        page: number
    }) => {
        return this.props.fetchListNegaraAction(search, options.page)
            .then((response: ApiResponseList<Negara>) => {

                const data: ApiResponseSuccessList<Negara> = response.response!;

                let result: {
                    value: number,
                    label: string
                }[] = [];

                let hasMore = false;

                if ( ! data.metaData.isError) {

                    if (data.metaData.paginate) {
                        const paginate = data.metaData.paginate as Paginator;
                        hasMore = paginate.pageCount > options.page;
                    }

                    result = data.result.map((item: Negara) => {
                        return {
                            value: item.id,
                            label: `${item.name}`
                        };
                    });
                }

                return {
                    options: result,
                    hasMore: hasMore,
                    additional: {
                      page: options.page + 1,
                    },
                };
            });
    }

    loadProvinsiHandler = (search: string, loadedOption: {}, options: {
        page: number
    }) => {

        return this.props.fetchListProvinsiAction(search, options.page, this.props.form.negara.value)
            .then((response: ApiResponseList<Provinsi>) => {

                const data: ApiResponseSuccessList<Provinsi> = response.response!;

                let result: {
                    value: number,
                    label: string
                }[] = [];

                let hasMore = false;

                if ( ! data.metaData.isError) {

                    if (data.metaData.paginate) {
                        const paginate = data.metaData.paginate as Paginator;
                        hasMore = paginate.pageCount > options.page;
                    }

                    result = data.result.map((item: Provinsi) => {
                        return {
                            value: item.id,
                            label: `${item.name}`
                        };
                    });
                }

                return {
                    options: result,
                    hasMore: hasMore,
                    additional: {
                      page: options.page + 1,
                    },
                };
            });
    }


    loadKabupatenKotaHandler = (search: string, loadedOption: {}, options: {
        page: number
    }) => {
        return this.props.fetchListKabupatenKotaAction(search, options.page, this.props.form.provinsi.value)
            .then((response: ApiResponseList<KabupatenKota>) => {

                const data: ApiResponseSuccessList<KabupatenKota> = response.response!;

                let result: {
                    value: number,
                    label: string
                }[] = [];

                let hasMore = false;

                if ( ! data.metaData.isError) {

                    if (data.metaData.paginate) {
                        const paginate = data.metaData.paginate as Paginator;
                        hasMore = paginate.pageCount > options.page;
                    }

                    result = data.result.map((item: KabupatenKota) => {
                        return {
                            value: item.id,
                            label: `${item.name}`
                        };
                    });
                }

                return {
                    options: result,
                    hasMore: hasMore,
                    additional: {
                      page: options.page + 1,
                    },
                };
            });
    }

    loadKecamatanHandler = (search: string, loadedOption: {}, options: {
        page: number
    }) => {
        return this.props.fetchListKecamatanAction(search, options.page, this.props.form.kabupaten_kota.value)
            .then((response: ApiResponseList<Kecamatan>) => {

                const data: ApiResponseSuccessList<Kecamatan> = response.response!;

                let result: {
                    value: number,
                    label: string
                }[] = [];

                let hasMore = false;

                if ( ! data.metaData.isError) {

                    if (data.metaData.paginate) {
                        const paginate = data.metaData.paginate as Paginator;
                        hasMore = paginate.pageCount > options.page;
                    }

                    result = data.result.map((item: Kecamatan) => {
                        return {
                            value: item.id,
                            label: `${item.name}`
                        };
                    });
                }

                return {
                    options: result,
                    hasMore: hasMore,
                    additional: {
                      page: options.page + 1,
                    },
                };
            });
    }

    loadKelurahanHandler = (search: string, loadedOption: {}, options: {
        page: number
    }) => {
        return this.props.fetchListKelurahanAction(search, options.page, this.props.form.kecamatan.value)
            .then((response: ApiResponseList<Kelurahan>) => {

                const data: ApiResponseSuccessList<Kelurahan> = response.response!;

                let result: {
                    value: number,
                    label: string
                }[] = [];

                let hasMore = false;

                if ( ! data.metaData.isError) {

                    if (data.metaData.paginate) {
                        const paginate = data.metaData.paginate as Paginator;
                        hasMore = paginate.pageCount > options.page;
                    }

                    result = data.result.map((item: Kelurahan) => {
                        return {
                            value: item.id,
                            label: `${item.name}`
                        };
                    });
                }

                return {
                    options: result,
                    hasMore: hasMore,
                    additional: {
                      page: options.page + 1,
                    },
                };
            });
    }

    onFilesAdded = (files: any[], FormikProps: FormikProps<FormField>, setPreview: any, setValue: any) => {
        const file: {
            lastModified: number,
            name: string,
            preview: string,
            size: number,
            type: string
        } = files.length > 0 ? files[0] : null;
    
        if (file) {
            FormikProps.setFieldValue(setPreview, file.preview, true);
            FormikProps.setFieldValue(setValue, file);
        }
    }

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

                    const investor: InvestorCreate = {
                        alamat: values.alamat,
                        email: values.email,
                        foto_profil: values.foto_profil,
                        jenis_kelamin: values.jenis_kelamin,
                        tanggal_lahir: tanggal_lahir,
                        kabupaten_kota: {
                            id: values.kabupaten_kota.value
                        },
                        kecamatan: {
                            id: values.kecamatan.value
                        },
                        kelurahan: {
                            id: values.kelurahan.value
                        },
                        ktp_file: values.ktp_file,
                        nama: values.nama,
                        negara: {
                            id: values.negara.value
                        },
                        no_ktp: values.no_ktp,
                        no_telepon: values.no_telepon,
                        provinsi: {
                            id: values.provinsi.value
                        },
                        nomor_asosiasi_lingkungan: values.nomor_asosiasi_lingkungan,
                        nomor_asosiasi_warga_negara: values.nomor_asosiasi_warga_negara
                    }

                    this.props.createInvestorAction(investor)
                    .then( (response: ApiResponse<InvestorCreateResult>) => {
                        const data: ApiResponseSuccess<InvestorCreateResult> = response.response!;
                        this.props.setAlertInvestorShowAction('Data Berhasil Ditambah', 'success');
                        this.props.redirectOnSuccess();

                        action.setSubmitting(false)
                    })
                    .catch( (error: ApiResponse<InvestorCreateResult>) => {
                        this.props.setAlertOpen(true);
                        this.props.setAlertMessage(error.error!.metaData.message);

                        action.setSubmitting(false)
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
                                    htmlFor="input-nama"
                                    >
                                        Nama
                                    </label>
                                    <Input
                                    className="form-control-alternative"
                                    id="input-nama"
                                    placeholder="Nama"
                                    type="text"
                                    name="nama"
                                    maxLength={255}
                                    value={FormikProps.values.nama}
                                    required
                                    onChange={FormikProps.handleChange}
                                    onBlur={FormikProps.handleBlur}
                                    invalid={ !!(FormikProps.touched.nama && FormikProps.errors.nama) }
                                    />
                                    <div>
                                        {FormikProps.errors.nama && FormikProps.touched.nama ? FormikProps.errors.nama : ''}
                                    </div>
                                </FormGroup>

                                <FormGroup>
                                    <label
                                    className="form-control-label"
                                    htmlFor="input-no_telepon"
                                    >
                                        No Telepon
                                    </label>
                                    <Input
                                    className="form-control-alternative"
                                    id="input-no_telepon"
                                    placeholder="No Telepon"
                                    type="text"
                                    name="no_telepon"
                                    maxLength={255}
                                    value={FormikProps.values.no_telepon}
                                    required
                                    onChange={FormikProps.handleChange}
                                    onBlur={FormikProps.handleBlur}
                                    invalid={ !!(FormikProps.touched.no_telepon && FormikProps.errors.no_telepon) }
                                    />
                                    <div>
                                        {FormikProps.errors.no_telepon && FormikProps.touched.no_telepon ? FormikProps.errors.no_telepon : ''}
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
                                    type="email"
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
                                    htmlFor="input-tanggal-lahir"
                                    >
                                        Tanggal Lahir
                                    </label>
                                    <div>
                                    <DatePicker
                                        selected={FormikProps.values.tanggal_lahir}
                                        onChange={date => FormikProps.setFieldValue('tanggal_lahir', date)}
                                        onBlur={() => FormikProps.setFieldTouched('tanggal_lahir', true)}
                                        dateFormat="yyyy-MM-dd"
                                        className="form-control form-control-alternative"
                                        required
                                        />
                                    </div>
                                    <div>
                                        {FormikProps.errors.tanggal_lahir && FormikProps.touched.tanggal_lahir ? FormikProps.errors.tanggal_lahir : ''}
                                    </div>
                                </FormGroup>


                                <FormGroup>
                                    <label
                                    className="form-control-label"
                                    htmlFor="input-no-ktp"
                                    >
                                        No KTP
                                    </label>
                                    <Input
                                    className="form-control-alternative"
                                    id="input-no_ktp"
                                    placeholder="No KTP"
                                    type="text"
                                    name="no_ktp"
                                    maxLength={255}
                                    value={FormikProps.values.no_ktp}
                                    required
                                    onChange={FormikProps.handleChange}
                                    onBlur={FormikProps.handleBlur}
                                    invalid={ !!(FormikProps.touched.no_ktp && FormikProps.errors.no_ktp) }
                                    />
                                    <div>
                                        {FormikProps.errors.no_ktp && FormikProps.touched.no_ktp ? FormikProps.errors.no_ktp : ''}
                                    </div>
                                </FormGroup>

                                <FormGroup>
                                    <label
                                    className="form-control-label"
                                    htmlFor="input-jenis-kelamin"
                                    >
                                        Jenis Kelamin
                                    </label>
                                    <Input
                                    className="form-control-alternative"
                                    id="input-jenis_kelamin"
                                    placeholder="Jenis Kelamin"
                                    type="select"
                                    name="jenis_kelamin"
                                    value={FormikProps.values.jenis_kelamin}
                                    onChange={FormikProps.handleChange}
                                    onBlur={FormikProps.handleBlur}
                                    invalid={ !!(FormikProps.touched.jenis_kelamin && FormikProps.errors.jenis_kelamin) }
                                    >
                                        <option value="">Jenis Kelamin</option>
                                        <option value="L">Laki Laki</option>
                                        <option value="P">Perempuan</option>
                                    </Input>
                                    <div>
                                        {FormikProps.errors.jenis_kelamin && FormikProps.touched.jenis_kelamin ? FormikProps.errors.jenis_kelamin : ''}
                                    </div>
                                </FormGroup>

                                <FormGroup>
                                    <label
                                    className="form-control-label"
                                    htmlFor="input-upload-ktp"
                                    >
                                        Upload KTP
                                    </label>
                                    <Dropzone onFilesAdded={(files: any[]) => {
                                        this.onFilesAdded(files, FormikProps, 'ktp_file_preview', 'ktp_file');
                                    }} disabled={false} multiple={false} />
                                    
                                    <div>
                                        {FormikProps.errors.ktp_file_preview && FormikProps.touched.ktp_file_preview ? FormikProps.errors.ktp_file_preview : ''}
                                    </div>
                                </FormGroup>

                                <FormGroup>
                                    <label
                                    className="form-control-label"
                                    htmlFor="input-alamat"
                                    >
                                        Alamat
                                    </label>
                                    <Input
                                    className="form-control-alternative"
                                    id="input-alamat"
                                    placeholder="Alamat"
                                    type="textarea"
                                    name="alamat"
                                    maxLength={255}
                                    value={FormikProps.values.alamat}
                                    required
                                    onChange={FormikProps.handleChange}
                                    onBlur={FormikProps.handleBlur}
                                    invalid={ !!(FormikProps.touched.alamat && FormikProps.errors.alamat) }
                                    />
                                    <div>
                                        {FormikProps.errors.alamat && FormikProps.touched.alamat ? FormikProps.errors.alamat : ''}
                                    </div>
                                </FormGroup>

                                <FormGroup>
                                    <label
                                    className="form-control-label"
                                    htmlFor="input-negara"
                                    >
                                        Negara
                                    </label>
                                    <ReactSelectAsyncPaginate 
                                            value={FormikProps.values.negara}
                                            loadOptions={this.loadNegaraHandler}
                                            onChange={(option) => FormikProps.setFieldValue('negara', option)}
                                            onBlur={() => FormikProps.setFieldTouched('negara', true)}
                                            additional={{
                                                page: 1
                                            }}
                                        />
                                    <div>
                                        { FormikProps.errors.negara && FormikProps.touched.negara ? FormikProps.errors.negara.value : '' }
                                    </div>
                                </FormGroup>

                                <FormGroup>
                                    <label
                                    className="form-control-label"
                                    htmlFor="input-provinsi"
                                    >
                                        Provinsi
                                    </label>
                                    <ReactSelectAsyncPaginate 
                                        value={FormikProps.values.provinsi}
                                        loadOptions={this.loadProvinsiHandler}
                                        onChange={(option) => FormikProps.setFieldValue('provinsi', option)}
                                        onBlur={() => FormikProps.setFieldTouched('provinsi', true)}
                                        additional={{
                                            page: 1
                                        }}
                                        />
                                    <div>
                                        { FormikProps.errors.provinsi && FormikProps.touched.provinsi ? FormikProps.errors.provinsi.value : '' }
                                    </div>
                                </FormGroup>

                                <FormGroup>
                                    <label
                                    className="form-control-label"
                                    htmlFor="input-kabupaten_kota"
                                    >
                                        Kabupaten/ Kota
                                    </label>
                                    <ReactSelectAsyncPaginate 
                                        value={FormikProps.values.kabupaten_kota}
                                        loadOptions={this.loadKabupatenKotaHandler}
                                        onChange={(option) => FormikProps.setFieldValue('kabupaten_kota', option)}
                                        onBlur={() => FormikProps.setFieldTouched('kabupaten_kota', true)}
                                        additional={{
                                            page: 1
                                        }}
                                        />
                                    <div>
                                        { FormikProps.errors.kabupaten_kota && FormikProps.touched.kabupaten_kota ? FormikProps.errors.kabupaten_kota.value : '' }
                                    </div>
                                </FormGroup>

                                <FormGroup>
                                    <label
                                    className="form-control-label"
                                    htmlFor="input-kecamatan"
                                    >
                                        Kecamatan
                                    </label>
                                    <ReactSelectAsyncPaginate 
                                        value={FormikProps.values.kecamatan}
                                        loadOptions={this.loadKecamatanHandler}
                                        onChange={(option) => FormikProps.setFieldValue('kecamatan', option)}
                                        onBlur={() => FormikProps.setFieldTouched('kecamatan', true)}
                                        additional={{
                                            page: 1
                                        }}
                                        />
                                    <div>
                                        { FormikProps.errors.kecamatan && FormikProps.touched.kecamatan ? FormikProps.errors.kecamatan.value : '' }
                                    </div>
                                </FormGroup>

                                <FormGroup>
                                    <label
                                    className="form-control-label"
                                    htmlFor="input-kelurahan"
                                    >
                                        Kelurahan
                                    </label>
                                    <ReactSelectAsyncPaginate 
                                        value={FormikProps.values.kelurahan}
                                        loadOptions={this.loadKelurahanHandler}
                                        onChange={(option) => FormikProps.setFieldValue('kelurahan', option)}
                                        onBlur={() => FormikProps.setFieldTouched('kelurahan', true)}
                                        additional={{
                                            page: 1
                                        }}
                                        />
                                    <div>
                                        { FormikProps.errors.kelurahan && FormikProps.touched.kelurahan ? FormikProps.errors.kelurahan.value : '' }
                                    </div>
                                </FormGroup>

                                <FormGroup>
                                    <label
                                    className="form-control-label"
                                    htmlFor="input-nomor_asosiasi_lingkungan"
                                    >
                                        Nomor Asosiasi Lingkungan
                                    </label>
                                    <Input
                                    className="form-control-alternative"
                                    id="input-nomor_asosiasi_lingkungan"
                                    placeholder="Nama"
                                    type="text"
                                    name="nomor_asosiasi_lingkungan"
                                    maxLength={255}
                                    value={FormikProps.values.nomor_asosiasi_lingkungan}
                                    required
                                    onChange={FormikProps.handleChange}
                                    onBlur={FormikProps.handleBlur}
                                    invalid={ !!(FormikProps.touched.nomor_asosiasi_lingkungan && FormikProps.errors.nomor_asosiasi_lingkungan) }
                                    />
                                    <div>
                                        {FormikProps.errors.nomor_asosiasi_lingkungan && FormikProps.touched.nomor_asosiasi_lingkungan ? FormikProps.errors.nomor_asosiasi_lingkungan : ''}
                                    </div>
                                </FormGroup>

                                <FormGroup>
                                    <label
                                    className="form-control-label"
                                    htmlFor="input-nomor_asosiasi_warga_negara"
                                    >
                                        Nomor Asosiasi Warga Negara
                                    </label>
                                    <Input
                                    className="form-control-alternative"
                                    id="input-nomor_asosiasi_warga_negara"
                                    placeholder="Nomor Asosiasi Warga Negara"
                                    type="text"
                                    name="nomor_asosiasi_warga_negara"
                                    maxLength={255}
                                    value={FormikProps.values.nomor_asosiasi_warga_negara}
                                    required
                                    onChange={FormikProps.handleChange}
                                    onBlur={FormikProps.handleBlur}
                                    invalid={ !!(FormikProps.touched.nomor_asosiasi_warga_negara && FormikProps.errors.nomor_asosiasi_warga_negara) }
                                    />
                                    <div>
                                        {FormikProps.errors.nomor_asosiasi_warga_negara && FormikProps.touched.nomor_asosiasi_warga_negara ? FormikProps.errors.nomor_asosiasi_warga_negara : ''}
                                    </div>
                                </FormGroup>

                                <FormGroup>
                                    <label
                                    className="form-control-label"
                                    htmlFor="input-foto-profil"
                                    >
                                        Upload Foto Profil
                                    </label>
                                    <Dropzone onFilesAdded={(files: any[]) => {
                                        this.onFilesAdded(files, FormikProps, 'foto_profil_preview', 'foto_profil');
                                    }} disabled={false} multiple={false} />
                                    
                                    <div>
                                        {FormikProps.errors.foto_profil_preview && FormikProps.touched.foto_profil_preview ? FormikProps.errors.foto_profil_preview : ''}
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
    createInvestorAction: (investor: InvestorCreate) => Promise<ApiResponse<InvestorCreateResult>>
    setAlertInvestorShowAction: (message: string, color: string) => void,
    fetchListNegaraAction: (search: string, page: number) => Promise<ApiResponseList<Negara>>,
    fetchListProvinsiAction: (search: string, page: number, id: number) => Promise<ApiResponseList<Provinsi>>,
    fetchListKabupatenKotaAction: (search: string, page: number, id: number) => Promise<ApiResponseList<KabupatenKota>>,
    fetchListKecamatanAction: (search: string, page: number, id: number) => Promise<ApiResponseList<Kecamatan>>,
    fetchListKelurahanAction: (search: string, page: number, id: number) => Promise<ApiResponseList<Kelurahan>>
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: FormProps): LinkDispatchToProps => {
    return {
        createInvestorAction: (investor: InvestorCreate) => dispatch(createInvestorAction(investor)),
        setAlertInvestorShowAction: (message: string, color: string) => dispatch(setAlertInvestorShowAction(message, color)),
        fetchListNegaraAction: (search: string, page: number) => dispatch(fetchListNegaraAction(search, page)),
        fetchListProvinsiAction: (search: string, page: number, id: number) => dispatch(fetchListProvinsiAction(search, page, id)),
        fetchListKabupatenKotaAction: (search: string, page: number, id: number) => dispatch(fetchListKabupatenKotaAction(search, page, id)),
        fetchListKecamatanAction: (search: string, page: number, id: number) => dispatch(fetchListKecamatanAction(search, page, id)),
        fetchListKelurahanAction: (search: string, page: number, id: number) => dispatch(fetchListKelurahanAction(search, page, id))
    }
}

export default connect(null, mapDispatchToProps)(Form);