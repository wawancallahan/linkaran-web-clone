import * as React from 'react';

import {
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
} from 'reactstrap';
import { FormikProps } from 'formik';
import { FormField } from '../../../../../../../types/admin/driver';
import DatePicker from 'react-datepicker';
import ReactSelectAsyncPaginate from 'react-select-async-paginate';
import { connect } from 'react-redux';
import { ApiResponseList, ApiResponseSuccessList } from '../../../../../../../types/api';
import { ThunkDispatch } from 'redux-thunk';
import Dropzone from '../../../../../../../components/Dropzone/Dropzone';
import { CountryList, Country } from '../../../../../../../types/admin/region/country';
import { ProvinceList, Province } from '../../../../../../../types/admin/region/province';
import { DistrictList, District } from '../../../../../../../types/admin/region/district';
import { SubDistrictList, SubDistrict } from '../../../../../../../types/admin/region/subDistrict';
import { VillageList, Village } from '../../../../../../../types/admin/region/village';
import { fetchListCountryAction } from '../../../../../../../actions/admin/region/country';
import { fetchListProvinceAction } from '../../../../../../../actions/admin/region/province';
import { fetchListDistrictAction } from '../../../../../../../actions/admin/region/district';
import { fetchListSubDistrictAction } from '../../../../../../../actions/admin/region/subDistrict';
import { fetchListVillageAction } from '../../../../../../../actions/admin/region/village';
import { AppActions } from '../../../../../../../types';
import { Paginator } from '../../../../../../../types/paginator';

import "react-datepicker/dist/react-datepicker.css";

type OwnProps = {
    form: FormikProps<FormField>,
};

type Props = OwnProps & ReturnType<typeof mapDispatchToProps>;

const Driver: React.FC<Props> = (props) => {

    const { form } = props

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
    }) => {

        if (form.values.negara.value && form.values.negara.value > 0) {
            return props.fetchListProvinceAction(search, options.page, form.values.negara.value)
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
    }) => {

        if (form.values.provinsi.value && form.values.provinsi.value > 0) {
            
            return props.fetchListDistrictAction(search, options.page, form.values.provinsi.value)
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
    }) => {
        if (form.values.kabupaten_kota.value && form.values.kabupaten_kota.value > 0) {
            
            return props.fetchListSubDistrictAction(search, options.page, form.values.kabupaten_kota.value)
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
    }) => {
        if (form.values.kecamatan.value && form.values.kecamatan.value > 0) {
            
            return props.fetchListVillageAction(search, options.page, form.values.kecamatan.value)
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
        <React.Fragment>
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
                value={form.values.nama}
                required
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                invalid={ !!(form.touched.nama && form.errors.nama) }
                />
                <div>
                    {form.errors.nama && form.touched.nama ? form.errors.nama : ''}
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
                    value={form.values.no_telepon}
                    required
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    invalid={ !!(form.touched.no_telepon && form.errors.no_telepon) }
                    />
                <div>
                    {form.errors.no_telepon && form.touched.no_telepon ? form.errors.no_telepon : ''}
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
                value={form.values.email}
                required
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                invalid={ !!(form.touched.email && form.errors.email) }
                />
                <div>
                    {form.errors.email && form.touched.email ? form.errors.email : ''}
                </div>
            </FormGroup>

            <FormGroup>
                <label
                className="form-control-label"
                htmlFor="input-tempat_lahir"
                >
                    Tempat Lahir
                </label>
                <Input
                className="form-control-alternative"
                id="input-tempat_lahir"
                placeholder="Tempat Lahir"
                type="text"
                name="tempat_lahir"
                maxLength={255}
                value={form.values.tempat_lahir}
                required
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                invalid={ !!(form.touched.tempat_lahir && form.errors.tempat_lahir) }
                />
                <div>
                    {form.errors.tempat_lahir && form.touched.tempat_lahir ? form.errors.tempat_lahir : ''}
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
                    selected={form.values.tanggal_lahir}
                    onChange={date => form.setFieldValue('tanggal_lahir', date)}
                    onBlur={() => form.setFieldTouched('tanggal_lahir', true)}
                    dateFormat="yyyy-MM-dd"
                    className="form-control form-control-alternative"
                    required
                    />
                </div>
                <div>
                    {form.errors.tanggal_lahir && form.touched.tanggal_lahir ? form.errors.tanggal_lahir : ''}
                </div>
            </FormGroup>


            <FormGroup>
                <label
                className="form-control-label"
                htmlFor="input-isMeried"
                >
                    Apakah Anda Pernah Menikah?
                </label>
            </FormGroup>
            <FormGroup>
                <fieldset>
                    <div className="custom-control custom-radio mb-3">
                        <input
                            className="custom-control-input"
                            defaultChecked={ ! form.values.isMeried}
                            id="isMeried_no"
                            name="isMeried"
                            type="radio"
                            value="0"
                            onChange={() => {
                                form.setFieldValue('isMeried', false, true);
                            }}
                            onBlur={form.handleBlur}
                        />
                        <label className="custom-control-label" htmlFor="isMeried_no">
                            Belum
                        </label>
                    </div>
                    <div className="custom-control custom-radio mb-3">
                        <input
                            className="custom-control-input"
                            defaultChecked={form.values.isMeried}
                            id="isMeried_yes"
                            name="isMeried"
                            type="radio"
                            value="1"
                            onChange={() => {
                                form.setFieldValue('isMeried', true, true);
                            }}
                            onBlur={form.handleBlur}
                        />
                        <label className="custom-control-label" htmlFor="isMeried_yes">
                            Sudah
                        </label>
                    </div>
                </fieldset>
                <div>
                    {form.errors.isMeried && form.touched.isMeried ? form.errors.isMeried : ''}
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
                value={form.values.no_ktp}
                required
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                invalid={ !!(form.touched.no_ktp && form.errors.no_ktp) }
                />
                <div>
                    {form.errors.no_ktp && form.touched.no_ktp ? form.errors.no_ktp : ''}
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
                value={form.values.jenis_kelamin || ''}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                invalid={ !!(form.touched.jenis_kelamin && form.errors.jenis_kelamin) }
                >
                    <option value="">Jenis Kelamin</option>
                    <option value="1">Laki Laki</option>
                    <option value="0">Perempuan</option>
                </Input>
                <div>
                    {form.errors.jenis_kelamin && form.touched.jenis_kelamin ? form.errors.jenis_kelamin : ''}
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
                    onFilesAdded(files, form, 'ktp_file_preview', 'ktp_file');
                }} disabled={false} multiple={false} previewUrl={form.values.ktp_file_preview} />
                
                <div>
                    {form.errors.ktp_file_preview && form.touched.ktp_file_preview ? form.errors.ktp_file_preview : ''}
                </div>
            </FormGroup>

            {/* <FormGroup>
                <label
                className="form-control-label"
                htmlFor="input-no_sim"
                >
                    No SIM
                </label>
                <Input
                className="form-control-alternative"
                id="input-no_sim"
                placeholder="No SIM"
                type="text"
                name="no_sim"
                maxLength={255}
                value={form.values.no_sim}
                required
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                invalid={ !!(form.touched.no_sim && form.errors.no_sim) }
                />
                <div>
                    {form.errors.no_sim && form.touched.no_sim ? form.errors.no_sim : ''}
                </div>
            </FormGroup>

            <FormGroup>
                <label
                className="form-control-label"
                htmlFor="input-upload-sim"
                >
                    Upload SIM
                </label>
                <Dropzone onFilesAdded={(files: any[]) => {
                    onFilesAdded(files, form, 'sim_file_preview', 'sim_file');
                }} disabled={false} multiple={false} />
                
                <div>
                    {form.errors.sim_file_preview && form.touched.sim_file_preview ? form.errors.sim_file_preview : ''}
                </div>
            </FormGroup> */}

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
                value={form.values.alamat}
                required
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                invalid={ !!(form.touched.alamat && form.errors.alamat) }
                />
                <div>
                    {form.errors.alamat && form.touched.alamat ? form.errors.alamat : ''}
                </div>
            </FormGroup>

            <FormGroup>
                <label
                className="form-control-label"
                htmlFor="input-alamat_domisili"
                >
                    Alamat Domisili
                </label>
                <Input
                className="form-control-alternative"
                id="input-alamat_domisili"
                placeholder="Alamat Domisili"
                type="textarea"
                name="alamat_domisili"
                maxLength={255}
                value={form.values.alamat_domisili}
                required
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                invalid={ !!(form.touched.alamat_domisili && form.errors.alamat_domisili) }
                />
                <div>
                    {form.errors.alamat_domisili && form.touched.alamat_domisili ? form.errors.alamat_domisili : ''}
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
                    value={form.values.negara}
                    loadOptions={loadNegaraHandler}
                    onChange={(option) => {
                        form.setFieldValue('negara', option)
                        form.setFieldValue('provinsi', {
                            value: 0,
                            label: ''
                        })
                        form.setFieldValue('kabupaten_kota', {
                            value: 0,
                            label: ''
                        })
                        form.setFieldValue('kecamatan', {
                            value: 0,
                            label: ''
                        })
                        form.setFieldValue('kelurahan', {
                            value: 0,
                            label: ''
                        })
                    }}
                    onBlur={() => form.setFieldTouched('negara', true)}
                    additional={{
                        page: 1
                    }}
                    debounceTimeout={250}
                    />
                <div>
                    { form.errors.negara && form.touched.negara ? form.errors.negara.value : '' }
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
                    value={form.values.provinsi}
                    loadOptions={loadProvinsiHandler}
                    onChange={(option) => {
                        form.setFieldValue('provinsi', option)
                        form.setFieldValue('kabupaten_kota', {
                            value: 0,
                            label: ''
                        })
                        form.setFieldValue('kecamatan', {
                            value: 0,
                            label: ''
                        })
                        form.setFieldValue('kelurahan', {
                            value: 0,
                            label: ''
                        })
                    }}
                    onBlur={() => form.setFieldTouched('provinsi', true)}
                    additional={{
                        page: 1
                    }}
                    key={JSON.stringify(form.values.negara.value)}
                    debounceTimeout={250}
                    />
                <div>
                    { form.errors.provinsi && form.touched.provinsi ? form.errors.provinsi.value : '' }
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
                    value={form.values.kabupaten_kota}
                    loadOptions={loadKabupatenKotaHandler}
                    onChange={(option) => {
                        form.setFieldValue('kabupaten_kota', option)
                        form.setFieldValue('kecamatan', {
                            value: 0,
                            label: ''
                        })

                        form.setFieldValue('kelurahan', {
                            value: 0,
                            label: ''
                        })
                    }}
                    onBlur={() => form.setFieldTouched('kabupaten_kota', true)}
                    additional={{
                        page: 1
                    }}
                    key={JSON.stringify(form.values.provinsi.value)}
                    debounceTimeout={250}
                    />
                <div>
                    { form.errors.kabupaten_kota && form.touched.kabupaten_kota ? form.errors.kabupaten_kota.value : '' }
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
                    value={form.values.kecamatan}
                    loadOptions={loadKecamatanHandler}
                    onChange={(option) => {
                        form.setFieldValue('kecamatan', option)
                        form.setFieldValue('kelurahan', {
                            value: 0,
                            label: ''
                        })
                    }}
                    onBlur={() => form.setFieldTouched('kecamatan', true)}
                    additional={{
                        page: 1
                    }}
                    key={JSON.stringify(form.values.kabupaten_kota.value)}
                    debounceTimeout={250}
                    />
                <div>
                    { form.errors.kecamatan && form.touched.kecamatan ? form.errors.kecamatan.value : '' }
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
                    value={form.values.kelurahan}
                    loadOptions={loadKelurahanHandler}
                    onChange={(option) => form.setFieldValue('kelurahan', option)}
                    onBlur={() => form.setFieldTouched('kelurahan', true)}
                    additional={{
                        page: 1
                    }}
                    key={JSON.stringify(form.values.kecamatan.value)}
                    debounceTimeout={250}
                    />
                <div>
                    { form.errors.kelurahan && form.touched.kelurahan ? form.errors.kelurahan.value : '' }
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
                    onFilesAdded(files, form, 'foto_profil_preview', 'foto_profil');
                }} disabled={false} multiple={false} previewUrl={form.values.foto_profil_preview} />
                
                <div>
                    {form.errors.foto_profil_preview && form.touched.foto_profil_preview ? form.errors.foto_profil_preview : ''}
                </div>
            </FormGroup>
        </React.Fragment>
    )
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: OwnProps) => ({
    fetchListCountryAction: (search: string, page: number) => dispatch(fetchListCountryAction(search, page)),
    fetchListProvinceAction: (search: string, page: number, id: number) => dispatch(fetchListProvinceAction(search, page, id)),
    fetchListDistrictAction: (search: string, page: number, id: number) => dispatch(fetchListDistrictAction(search, page, id)),
    fetchListSubDistrictAction: (search: string, page: number, id: number) => dispatch(fetchListSubDistrictAction(search, page, id)),
    fetchListVillageAction: (search: string, page: number, id: number) => dispatch(fetchListVillageAction(search, page, id))
});

export default connect(null, mapDispatchToProps)(Driver);