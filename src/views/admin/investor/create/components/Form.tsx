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
import { AppActions } from '../../../../../types';
import { connect } from 'react-redux';
import { FormField, InvestorCreateField, InvestorCreateResult } from '../../../../../types/admin/investor';
import { createInvestorAction, setAlertInvestorShowAction } from '../../../../../actions/admin/investor';
import { ApiResponse, ApiResponseSuccess, ApiResponseList, ApiResponseSuccessList } from '../../../../../types/api';
import swal from 'sweetalert'
import BlockUi from '../../../../../components/BlockUi/BlockUi'
import { toast, TypeOptions } from 'react-toastify'
import { Schema } from './Schema'
import ReactSelectAsyncPaginate from 'react-select-async-paginate';
import Dropzone from '../../../../../components/Dropzone/Dropzone';
import { Country, CountryList } from '../../../../../types/admin/region/country';
import { Paginator } from '../../../../../types/paginator';
import { Province, ProvinceList } from '../../../../../types/admin/region/province';
import { District, DistrictList } from '../../../../../types/admin/region/district';
import { SubDistrict, SubDistrictList } from '../../../../../types/admin/region/subDistrict';
import { Village, VillageList } from '../../../../../types/admin/region/village';
import { fetchListCountryAction } from '../../../../../actions/admin/region/country';
import { fetchListProvinceAction } from '../../../../../actions/admin/region/province';
import { fetchListDistrictAction } from '../../../../../actions/admin/region/district';
import { fetchListSubDistrictAction } from '../../../../../actions/admin/region/subDistrict';
import { fetchListVillageAction } from '../../../../../actions/admin/region/village';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

type OwnProps = {
    form: FormField,
    setAlertVisible: React.Dispatch<React.SetStateAction<boolean>>,
    setAlertMessage: React.Dispatch<React.SetStateAction<string>>,
    redirectOnSuccess: () => void
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

    const loadNegaraHandler = (search: string, loadedOption: { label: string; value: number; }[], options: {
        page: number
    }) => {
        return props.fetchListCountryAction(search, options.page)
            .then((response: ApiResponseList<Country>) => {

                const data: ApiResponseSuccessList<Country> = response.response!;

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

                    result = data.result.map((item: Country) => {
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

    const loadProvinsiHandler = (search: string, loadedOption: { label: string; value: number; }[], options: {
        page: number
    }, FormikProps: FormikProps<FormField>) => {

        if (FormikProps.values.negara.value && FormikProps.values.negara.value > 0) {
            return props.fetchListProvinceAction(search, options.page, FormikProps.values.negara.value)
            .then((response: ApiResponseList<Province>) => {

                const data: ApiResponseSuccessList<Province> = response.response!;

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

                    result = data.result.map((item: Province) => {
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

        return new Promise((resolve, reject) => {
            resolve();
        }).then(() => {
            return {
                options: [],
                hasMore: false,
                additional: {
                    page: 1,
                },
            };
        })
    }


    const loadKabupatenKotaHandler = (search: string, loadedOption: { label: string; value: number; }[], options: {
        page: number
    }, FormikProps: FormikProps<FormField>) => {

        if (FormikProps.values.provinsi.value && FormikProps.values.provinsi.value > 0) {
            
            return props.fetchListDistrictAction(search, options.page, FormikProps.values.provinsi.value)
                .then((response: ApiResponseList<District>) => {

                    const data: ApiResponseSuccessList<District> = response.response!;

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

                        result = data.result.map((item: District) => {
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

        return new Promise((resolve, reject) => {
                resolve();
            }).then(() => {
                return {
                    options: [],
                    hasMore: false,
                    additional: {
                        page: 1,
                    },
                };
            })
    }

    const loadKecamatanHandler = (search: string, loadedOption: { label: string; value: number; }[], options: {
        page: number
    }, FormikProps: FormikProps<FormField>) => {
        if (FormikProps.values.kabupaten_kota.value && FormikProps.values.kabupaten_kota.value > 0) {
            
            return props.fetchListSubDistrictAction(search, options.page, FormikProps.values.kabupaten_kota.value)
                .then((response: ApiResponseList<SubDistrict>) => {

                    const data: ApiResponseSuccessList<SubDistrict> = response.response!;

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

                        result = data.result.map((item: SubDistrict) => {
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

        return new Promise((resolve, reject) => {
            resolve();
        }).then(() => {
            return {
                options: [],
                hasMore: false,
                additional: {
                    page: 1,
                },
            };
        })
    }

    const loadKelurahanHandler = (search: string, loadedOption: { label: string; value: number; }[], options: {
        page: number
    }, FormikProps: FormikProps<FormField>) => {
        if (FormikProps.values.kecamatan.value && FormikProps.values.kecamatan.value > 0) {
            
            return props.fetchListVillageAction(search, options.page, FormikProps.values.kecamatan.value)
                .then((response: ApiResponseList<Village>) => {

                    const data: ApiResponseSuccessList<Village> = response.response!;

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

                        result = data.result.map((item: Village) => {
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

        return new Promise((resolve, reject) => {
            resolve();
        }).then(() => {
            return {
                options: [],
                hasMore: false,
                additional: {
                    page: 1,
                },
            };
        })
    }

    const onFilesAdded = (files: any[], FormikProps: FormikProps<FormField>, setPreview: any, setValue: any) => {
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

    return (
        <Formik 
            initialValues={props.form}
            
            onSubmit={(values, action) => {
                props.setAlertVisible(false);

                let tanggal_lahir = '';

                if (values.tanggal_lahir) {
                    tanggal_lahir = `${values.tanggal_lahir.getFullYear()}-${values.tanggal_lahir.getMonth() + 1}-${values.tanggal_lahir.getDate()}`;
                }

                const investor: InvestorCreateField = {
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

                swal("Apakah anda yakin?", "Data akan ditambahkan!", {
                    icon: "warning",
                    buttons: ["Tutup!", true],
                }).then((willCreated) => {
                    if (willCreated) {
                        props.createInvestorAction(investor)
                            .then( (response: ApiResponse<InvestorCreateResult>) => {
                                const data: ApiResponseSuccess<InvestorCreateResult> = response.response!;
                                props.setAlertInvestorShowAction('Data Berhasil Ditambah', 'success');
                                props.redirectOnSuccess();
                            })
                            .catch( (error: ApiResponse<InvestorCreateResult>) => {
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
                                        onFilesAdded(files, FormikProps, 'ktp_file_preview', 'ktp_file');
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
                                            loadOptions={loadNegaraHandler}
                                            onChange={(option) => FormikProps.setFieldValue('negara', option)}
                                            onBlur={() => FormikProps.setFieldTouched('negara', true)}
                                            additional={{
                                                page: 1
                                            }}
                                            debounceTimeout={250}
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
                                        loadOptions={(inputValue: string, prevOptions: {
                                            label: string;
                                            value: number;
                                        }[], additional: {
                                            page: number;
                                        }) => loadProvinsiHandler(inputValue, prevOptions, additional, FormikProps)}
                                        onChange={(option) => FormikProps.setFieldValue('provinsi', option)}
                                        onBlur={() => FormikProps.setFieldTouched('provinsi', true)}
                                        additional={{
                                            page: 1
                                        }}
                                        debounceTimeout={250}
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
                                        loadOptions={(inputValue: string, prevOptions: {
                                            label: string;
                                            value: number;
                                        }[], additional: {
                                            page: number;
                                        }) => loadKabupatenKotaHandler(inputValue, prevOptions, additional, FormikProps)}
                                        onChange={(option) => FormikProps.setFieldValue('kabupaten_kota', option)}
                                        onBlur={() => FormikProps.setFieldTouched('kabupaten_kota', true)}
                                        additional={{
                                            page: 1
                                        }}
                                        debounceTimeout={250}
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
                                        loadOptions={(inputValue: string, prevOptions: {
                                            label: string;
                                            value: number;
                                        }[], additional: {
                                            page: number;
                                        }) => loadKecamatanHandler(inputValue, prevOptions, additional, FormikProps)}
                                        onChange={(option) => FormikProps.setFieldValue('kecamatan', option)}
                                        onBlur={() => FormikProps.setFieldTouched('kecamatan', true)}
                                        additional={{
                                            page: 1
                                        }}
                                        debounceTimeout={250}
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
                                        loadOptions={(inputValue: string, prevOptions: {
                                            label: string;
                                            value: number;
                                        }[], additional: {
                                            page: number;
                                        }) => loadKelurahanHandler(inputValue, prevOptions, additional, FormikProps)}
                                        onChange={(option) => FormikProps.setFieldValue('kelurahan', option)}
                                        onBlur={() => FormikProps.setFieldTouched('kelurahan', true)}
                                        additional={{
                                            page: 1
                                        }}
                                        debounceTimeout={250}
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
                                        onFilesAdded(files, FormikProps, 'foto_profil_preview', 'foto_profil');
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
                    </BlockUi>
                );
            })}
        </Formik>
    )
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: OwnProps) => ({
    createInvestorAction: (investor:InvestorCreateField) => dispatch(createInvestorAction(investor)),
    setAlertInvestorShowAction: (message: string, color: string) => dispatch(setAlertInvestorShowAction(message, color)),
    fetchListCountryAction: (search: string, page: number) => dispatch(fetchListCountryAction(search, page)),
    fetchListProvinceAction: (search: string, page: number, id: number) => dispatch(fetchListProvinceAction(search, page, id)),
    fetchListDistrictAction: (search: string, page: number, id: number) => dispatch(fetchListDistrictAction(search, page, id)),
    fetchListSubDistrictAction: (search: string, page: number, id: number) => dispatch(fetchListSubDistrictAction(search, page, id)),
    fetchListVillageAction: (search: string, page: number, id: number) => dispatch(fetchListVillageAction(search, page, id))
});

export default connect(null, mapDispatchToProps)(Form);
