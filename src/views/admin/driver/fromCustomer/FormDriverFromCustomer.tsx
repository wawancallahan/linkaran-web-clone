import React, { Component, RefObject } from 'react';

import {
    Button,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
} from 'reactstrap';
import { Formik, getIn, FormikProps } from 'formik';
import { Driver, FormFieldFromCustomer } from '../../../../types/admin/driver';
import DatePicker from 'react-datepicker';
import Dropzone from '../../../../components/Dropzone/Dropzone';
import ReactSelectAsyncPaginate from 'react-select-async-paginate';
import { connect } from 'react-redux';
import { ApiResponse, ApiResponseError, ApiResponseSuccess, ApiResponseList, ApiResponseSuccessList } from '../../../../types/api';

import "react-datepicker/dist/react-datepicker.css";
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../../../../types';
import { Paginator } from '../../../../types/paginator';
import { fetchListCustomerAction } from '../../../../actions/admin/customer';
import { CustomerList } from '../../../../types/admin/customer';
import { fetchListCountryAction } from '../../../../actions/admin/region/country';
import { Country, CountryList } from '../../../../types/admin/region/country';
import { fetchListProvinceAction } from '../../../../actions/admin/region/province';
import { Province, ProvinceList } from '../../../../types/admin/region/province';
import { fetchListDistrictAction } from '../../../../actions/admin/region/district';
import { District, DistrictList } from '../../../../types/admin/region/district';
import { SubDistrict, SubDistrictList } from '../../../../types/admin/region/subDistrict';
import { fetchListSubDistrictAction } from '../../../../actions/admin/region/subDistrict';
import { fetchListVillageAction } from '../../../../actions/admin/region/village';
import { Village, VillageList } from '../../../../types/admin/region/village';

type FormDriverProps = {
    FormikProps: FormikProps<FormFieldFromCustomer>,
};

type Props = FormDriverProps & LinkDispatchToProps;

class FormDriver extends Component<Props> {

    loadCustomerHandler = (search: string, loadedOption: { label: string; value: number; }[], options: {
        page: number
    }) => {
        return this.props.fetchListCustomerAction(search, options.page)
            .then((response: ApiResponseList<CustomerList>) => {

                const data: ApiResponseSuccessList<CustomerList> = response.response!;

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

                    result = data.result.map((item: CustomerList) => {
                        return {
                            value: item.id,
                            label: `${item.name} - ${item.phoneNumber}`
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
    
    loadNegaraHandler = (search: string, loadedOption: { label: string; value: number; }[], options: {
        page: number
    }) => {
        return this.props.fetchListCountryAction(search, options.page)
            .then((response: ApiResponseList<CountryList>) => {

                const data: ApiResponseSuccessList<CountryList> = response.response!;

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

                    result = data.result.map((item: CountryList) => {
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

    loadProvinsiHandler = (search: string, loadedOption: { label: string; value: number; }[], options: {
        page: number
    }) => {

        if (this.props.FormikProps.values.negara.value && this.props.FormikProps.values.negara.value > 0) {
            return this.props.fetchListProvinceAction(search, options.page, this.props.FormikProps.values.negara.value)
            .then((response: ApiResponseList<ProvinceList>) => {

                const data: ApiResponseSuccessList<ProvinceList> = response.response!;

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

                    result = data.result.map((item: ProvinceList) => {
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


    loadKabupatenKotaHandler = (search: string, loadedOption: { label: string; value: number; }[], options: {
        page: number
    }) => {

        if (this.props.FormikProps.values.provinsi.value && this.props.FormikProps.values.provinsi.value > 0) {
            
            return this.props.fetchListDistrictAction(search, options.page, this.props.FormikProps.values.provinsi.value)
                .then((response: ApiResponseList<DistrictList>) => {

                    const data: ApiResponseSuccessList<DistrictList> = response.response!;

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

                        result = data.result.map((item: DistrictList) => {
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

    loadKecamatanHandler = (search: string, loadedOption: { label: string; value: number; }[], options: {
        page: number
    }) => {
        if (this.props.FormikProps.values.kabupaten_kota.value && this.props.FormikProps.values.kabupaten_kota.value > 0) {
            
            return this.props.fetchListSubDistrictAction(search, options.page, this.props.FormikProps.values.kabupaten_kota.value)
                .then((response: ApiResponseList<SubDistrictList>) => {

                    const data: ApiResponseSuccessList<SubDistrictList> = response.response!;

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

                        result = data.result.map((item: SubDistrictList) => {
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

    loadKelurahanHandler = (search: string, loadedOption: { label: string; value: number; }[], options: {
        page: number
    }) => {
        if (this.props.FormikProps.values.kecamatan.value && this.props.FormikProps.values.kecamatan.value > 0) {
            
            return this.props.fetchListVillageAction(search, options.page, this.props.FormikProps.values.kecamatan.value)
                .then((response: ApiResponseList<VillageList>) => {

                    const data: ApiResponseSuccessList<VillageList> = response.response!;

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

                        result = data.result.map((item: VillageList) => {
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

    onFilesAdded = (files: any[], FormikProps: FormikProps<FormFieldFromCustomer>, setPreview: any, setValue: any) => {
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
                    htmlFor="input-customer"
                    >
                        Customer
                    </label>
                    <ReactSelectAsyncPaginate 
                        value={FormikProps.values.customer}
                        loadOptions={this.loadCustomerHandler}
                        onChange={(option) => {
                            FormikProps.setFieldValue('customer', option)
                        }}
                        onBlur={() => FormikProps.setFieldTouched('customer', true)}
                        additional={{
                            page: 1
                        }}
                        debounceTimeout={250}
                        />
                    <div>
                        { FormikProps.errors.customer && FormikProps.touched.customer ? FormikProps.errors.customer.value : '' }
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
                    value={FormikProps.values.tempat_lahir}
                    required
                    onChange={FormikProps.handleChange}
                    onBlur={FormikProps.handleBlur}
                    invalid={ !!(FormikProps.touched.tempat_lahir && FormikProps.errors.tempat_lahir) }
                    />
                    <div>
                        {FormikProps.errors.tempat_lahir && FormikProps.touched.tempat_lahir ? FormikProps.errors.tempat_lahir : ''}
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
                                defaultChecked={ ! FormikProps.values.isMeried}
                                id="isMeried_no"
                                name="isMeried"
                                type="radio"
                                value="0"
                                onChange={() => {
                                    FormikProps.setFieldValue('isMeried', false, true);
                                }}
                                onBlur={FormikProps.handleBlur}
                            />
                            <label className="custom-control-label" htmlFor="isMeried_no">
                                Belum
                            </label>
                        </div>
                        <div className="custom-control custom-radio mb-3">
                            <input
                                className="custom-control-input"
                                defaultChecked={FormikProps.values.isMeried}
                                id="isMeried_yes"
                                name="isMeried"
                                type="radio"
                                value="1"
                                onChange={() => {
                                    FormikProps.setFieldValue('isMeried', true, true);
                                }}
                                onBlur={FormikProps.handleBlur}
                            />
                            <label className="custom-control-label" htmlFor="isMeried_yes">
                                Sudah
                            </label>
                        </div>
                    </fieldset>
                    <div>
                        {FormikProps.errors.isMeried && FormikProps.touched.isMeried ? FormikProps.errors.isMeried : ''}
                    </div>
                </FormGroup>

                <FormGroup>
                    <label
                    className="form-control-label"
                    htmlFor="input-driverHelpCenter"
                    >
                        Pusat Bantuan Pengemudi
                    </label>
                </FormGroup>
                <FormGroup>
                    <fieldset>
                        <div className="custom-control custom-radio mb-3">
                            <input
                                className="custom-control-input"
                                defaultChecked={ ! FormikProps.values.driverHelpCenter}
                                id="driverHelpCenter_no"
                                name="driverHelpCenter"
                                type="radio"
                                value="0"
                                onChange={() => {
                                    FormikProps.setFieldValue('driverHelpCenter', false, true);
                                }}
                                onBlur={FormikProps.handleBlur}
                            />
                            <label className="custom-control-label" htmlFor="driverHelpCenter_no">
                                Belum
                            </label>
                        </div>
                        <div className="custom-control custom-radio mb-3">
                            <input
                                className="custom-control-input"
                                defaultChecked={FormikProps.values.driverHelpCenter}
                                id="driverHelpCenter_yes"
                                name="driverHelpCenter"
                                type="radio"
                                value="1"
                                onChange={() => {
                                    FormikProps.setFieldValue('driverHelpCenter', true, true);
                                }}
                                onBlur={FormikProps.handleBlur}
                            />
                            <label className="custom-control-label" htmlFor="driverHelpCenter_yes">
                                Sudah
                            </label>
                        </div>
                    </fieldset>
                    <div>
                        {FormikProps.errors.driverHelpCenter && FormikProps.touched.driverHelpCenter ? FormikProps.errors.driverHelpCenter : ''}
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
                    }} disabled={false} multiple={false} previewUrl={FormikProps.values.ktp_file_preview} />
                    
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
                    value={FormikProps.values.alamat_domisili}
                    required
                    onChange={FormikProps.handleChange}
                    onBlur={FormikProps.handleBlur}
                    invalid={ !!(FormikProps.touched.alamat_domisili && FormikProps.errors.alamat_domisili) }
                    />
                    <div>
                        {FormikProps.errors.alamat_domisili && FormikProps.touched.alamat_domisili ? FormikProps.errors.alamat_domisili : ''}
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
                        onChange={(option) => {
                            FormikProps.setFieldValue('negara', option)
                            FormikProps.setFieldValue('provinsi', {
                                value: 0,
                                label: ''
                            })
                            FormikProps.setFieldValue('kabupaten_kota', {
                                value: 0,
                                label: ''
                            })
                            FormikProps.setFieldValue('kecamatan', {
                                value: 0,
                                label: ''
                            })
                            FormikProps.setFieldValue('kelurahan', {
                                value: 0,
                                label: ''
                            })
                        }}
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
                        loadOptions={this.loadProvinsiHandler}
                        onChange={(option) => {
                            FormikProps.setFieldValue('provinsi', option)
                            FormikProps.setFieldValue('kabupaten_kota', {
                                value: 0,
                                label: ''
                            })
                            FormikProps.setFieldValue('kecamatan', {
                                value: 0,
                                label: ''
                            })
                            FormikProps.setFieldValue('kelurahan', {
                                value: 0,
                                label: ''
                            })
                        }}
                        onBlur={() => FormikProps.setFieldTouched('provinsi', true)}
                        additional={{
                            page: 1
                        }}
                        key={JSON.stringify(FormikProps.values.negara.value)}
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
                        loadOptions={this.loadKabupatenKotaHandler}
                        onChange={(option) => {
                            FormikProps.setFieldValue('kabupaten_kota', option)
                            FormikProps.setFieldValue('kecamatan', {
                                value: 0,
                                label: ''
                            })

                            FormikProps.setFieldValue('kelurahan', {
                                value: 0,
                                label: ''
                            })
                        }}
                        onBlur={() => FormikProps.setFieldTouched('kabupaten_kota', true)}
                        additional={{
                            page: 1
                        }}
                        key={JSON.stringify(FormikProps.values.provinsi.value)}
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
                        loadOptions={this.loadKecamatanHandler}
                        onChange={(option) => {
                            FormikProps.setFieldValue('kecamatan', option)
                            FormikProps.setFieldValue('kelurahan', {
                                value: 0,
                                label: ''
                            })
                        }}
                        onBlur={() => FormikProps.setFieldTouched('kecamatan', true)}
                        additional={{
                            page: 1
                        }}
                        key={JSON.stringify(FormikProps.values.kabupaten_kota.value)}
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
                        loadOptions={this.loadKelurahanHandler}
                        onChange={(option) => FormikProps.setFieldValue('kelurahan', option)}
                        onBlur={() => FormikProps.setFieldTouched('kelurahan', true)}
                        additional={{
                            page: 1
                        }}
                        key={JSON.stringify(FormikProps.values.kecamatan.value)}
                        debounceTimeout={250}
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
                    }} disabled={false} multiple={false} previewUrl={FormikProps.values.foto_profil_preview} />
                    
                    <div>
                        {FormikProps.errors.foto_profil_preview && FormikProps.touched.foto_profil_preview ? FormikProps.errors.foto_profil_preview : ''}
                    </div>
                </FormGroup>
            </>
        )
    }
    
}

type LinkDispatchToProps = {
    fetchListCustomerAction: (search: string, page: number) => Promise<ApiResponseList<CustomerList>>,
    fetchListCountryAction: (search: string, page: number) => Promise<ApiResponseList<CountryList>>,
    fetchListProvinceAction: (search: string, page: number, id: number) => Promise<ApiResponseList<ProvinceList>>,
    fetchListDistrictAction: (search: string, page: number, id: number) => Promise<ApiResponseList<DistrictList>>,
    fetchListSubDistrictAction: (search: string, page: number, id: number) => Promise<ApiResponseList<SubDistrictList>>,
    fetchListVillageAction: (search: string, page: number, id: number) => Promise<ApiResponseList<VillageList>>
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: FormDriverProps): LinkDispatchToProps => {
    return {
        fetchListCustomerAction: (search: string, page: number) => dispatch(fetchListCustomerAction(search, page)),
        fetchListCountryAction: (search: string, page: number) => dispatch(fetchListCountryAction(search, page)),
        fetchListProvinceAction: (search: string, page: number, id: number) => dispatch(fetchListProvinceAction(search, page, id)),
        fetchListDistrictAction: (search: string, page: number, id: number) => dispatch(fetchListDistrictAction(search, page, id)),
        fetchListSubDistrictAction: (search: string, page: number, id: number) => dispatch(fetchListSubDistrictAction(search, page, id)),
        fetchListVillageAction: (search: string, page: number, id: number) => dispatch(fetchListVillageAction(search, page, id))
    }
}

export default connect(null, mapDispatchToProps)(FormDriver);