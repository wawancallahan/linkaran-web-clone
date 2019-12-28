import React, { Component, RefObject } from 'react';

import {
    Button,
    FormGroup,
    Input,
} from 'reactstrap';
import { Formik, getIn, FormikProps } from 'formik';
import { Driver, FormField } from '../../../types/admin/driver';
import DatePicker from 'react-datepicker';
import Dropzone from '../../../components/Dropzone/Dropzone';
import ReactSelectAsyncPaginate from 'react-select-async-paginate';
import { connect } from 'react-redux';
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

import "react-datepicker/dist/react-datepicker.css";
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../../../types';
import { Paginator } from '../../../types/paginator';

type FormDriverProps = {
    FormikProps: FormikProps<FormField>,
};

type Props = FormDriverProps & LinkDispatchToProps;

class FormDriver extends Component<Props> {
    
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

        return this.props.fetchListProvinsiAction(search, options.page, this.props.FormikProps.values.negara.value)
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
        return this.props.fetchListKabupatenKotaAction(search, options.page, this.props.FormikProps.values.provinsi.value)
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
        return this.props.fetchListKecamatanAction(search, options.page, this.props.FormikProps.values.kabupaten_kota.value)
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
        return this.props.fetchListKelurahanAction(search, options.page, this.props.FormikProps.values.kecamatan.value)
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
        const { FormikProps } = this.props;

        return (
            <>
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
                    value={FormikProps.values.jenis_kelamin || ''}
                    onChange={FormikProps.handleChange}
                    onBlur={FormikProps.handleBlur}
                    invalid={ !!(FormikProps.touched.jenis_kelamin && FormikProps.errors.jenis_kelamin) }
                    >
                        <option value="">Jenis Kelamin</option>
                        <option value="1">Laki Laki</option>
                        <option value="0">Perempuan</option>
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
                    value={FormikProps.values.no_sim}
                    required
                    onChange={FormikProps.handleChange}
                    onBlur={FormikProps.handleBlur}
                    invalid={ !!(FormikProps.touched.no_sim && FormikProps.errors.no_sim) }
                    />
                    <div>
                        {FormikProps.errors.no_sim && FormikProps.touched.no_sim ? FormikProps.errors.no_sim : ''}
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
                        onFilesAdded(files, FormikProps, 'sim_file_preview', 'sim_file');
                    }} disabled={false} multiple={false} />
                    
                    <div>
                        {FormikProps.errors.sim_file_preview && FormikProps.touched.sim_file_preview ? FormikProps.errors.sim_file_preview : ''}
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
                    <label
                    className="form-control-label"
                    htmlFor="input-rating"
                    >
                        Rating
                    </label>
                    <Input
                    className="form-control-alternative"
                    id="input-rating"
                    placeholder="Rating"
                    type="number"
                    name="rating"
                    min="0"
                    max="10"
                    value={FormikProps.values.rating || ''}
                    required
                    onChange={FormikProps.handleChange}
                    onBlur={FormikProps.handleBlur}
                    invalid={ !!(FormikProps.touched.rating && FormikProps.errors.rating) }
                    />
                    <div>
                        {FormikProps.errors.rating && FormikProps.touched.rating ? FormikProps.errors.rating : ''}
                    </div>
                </FormGroup>
            </>
        )
    }
    
}

interface LinkDispatchToProps {
    fetchListNegaraAction: (search: string, page: number) => Promise<ApiResponseList<Negara>>,
    fetchListProvinsiAction: (search: string, page: number, id: number) => Promise<ApiResponseList<Provinsi>>,
    fetchListKabupatenKotaAction: (search: string, page: number, id: number) => Promise<ApiResponseList<KabupatenKota>>,
    fetchListKecamatanAction: (search: string, page: number, id: number) => Promise<ApiResponseList<Kecamatan>>,
    fetchListKelurahanAction: (search: string, page: number, id: number) => Promise<ApiResponseList<Kelurahan>>
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: FormDriverProps): LinkDispatchToProps => {
    return {
        fetchListNegaraAction: (search: string, page: number) => dispatch(fetchListNegaraAction(search, page)),
        fetchListProvinsiAction: (search: string, page: number, id: number) => dispatch(fetchListProvinsiAction(search, page, id)),
        fetchListKabupatenKotaAction: (search: string, page: number, id: number) => dispatch(fetchListKabupatenKotaAction(search, page, id)),
        fetchListKecamatanAction: (search: string, page: number, id: number) => dispatch(fetchListKecamatanAction(search, page, id)),
        fetchListKelurahanAction: (search: string, page: number, id: number) => dispatch(fetchListKelurahanAction(search, page, id))
    }
}

export default connect(null, mapDispatchToProps)(FormDriver);