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
import { AppActions } from '../../../../types';
import { connect } from 'react-redux';

import { Province, FormField, ProvinceCreateField, ProvinceCreateResult } from '../../../../types/admin/region/province';
import { createProvinceAction, setAlertProvinceShowAction } from '../../../../actions/admin/region/province';
import { ApiResponse, ApiResponseError, ApiResponseSuccess, ApiResponseList, ApiResponseSuccessList } from '../../../../types/api';
import { fetchListCountryAction } from '../../../../actions/admin/region/country';
import { CountryList } from '../../../../types/admin/region/country';
import ReactSelectAsyncPaginate from 'react-select-async-paginate';
import { Paginator } from '../../../../types/paginator';
import swal from 'sweetalert'
import BlockUi from '../../../../components/BlockUi/BlockUi'
import { toast, TypeOptions } from 'react-toastify'

const createSchema = Yup.object().shape({
    name: Yup.string()
            .test('len', 'Bidang isian nama tidak boleh lebih dari 255 karakter', (val: any): boolean => {
                if (val) {
                    return val.length <= 255;
                }

                return true;
            })
            .required('Bidang isian nama wajib diiisi'),
    alternativeName: Yup.string()
            .test('len', 'Bidang isian nama alternatif tidak boleh lebih dari 255 karakter', (val: any): boolean => {
                if (val) {
                    return val.length <= 255;
                }

                return true;
            })
            .required('Bidang isian nama alternatif wajib diiisi'),
    country: Yup.object().shape({
                label: Yup.string().required("Bidang pilihan country wajib diisi"),
                value: Yup.number().notOneOf([0], 'Bidang pilihan country wajib diisi').required("Bidang pilihan country wajib diisi")
            }),
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

    loadCountryHandler = (search: string, loadedOption: {}, options: {
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

    render() {
        return (
            <Formik 
                initialValues={this.props.form}
                
                onSubmit={(values, action) => {
                    this.props.setAlertOpen(false);

                    const province: ProvinceCreateField = {
                        name: values.name,
                        alternativeName: values.alternativeName,
                        country: {
                            id: values.country.value
                        }
                    }

                    swal("Apakah anda yakin?", "Data akan ditambahkan!", {
                        icon: "warning",
                        buttons: ["Tutup!", true],
                    }).then((willCreated) => {
                        if (willCreated) {
                            this.props.createProvinceAction(province)
                                .then( (response: ApiResponse<ProvinceCreateResult>) => {
                                    const data: ApiResponseSuccess<ProvinceCreateResult> = response.response!;
                                    this.props.setAlertProvinceShowAction('Data Berhasil Ditambah', 'success');
                                    this.props.redirectOnSuccess();
                                })
                                .catch( (error: ApiResponse<ProvinceCreateResult>) => {
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
                                        htmlFor="input-alternativeName"
                                        >
                                            Nama Alternatif
                                        </label>
                                        <Input
                                        className="form-control-alternative"
                                        id="input-alternativeName"
                                        placeholder="Nama Alternatif"
                                        type="text"
                                        name="alternativeName"
                                        maxLength={255}
                                        value={FormikProps.values.alternativeName}
                                        required
                                        onChange={FormikProps.handleChange}
                                        onBlur={FormikProps.handleBlur}
                                        invalid={ !!(FormikProps.touched.alternativeName && FormikProps.errors.alternativeName) }
                                        />
                                        <div>
                                            {FormikProps.errors.alternativeName && FormikProps.touched.alternativeName ? FormikProps.errors.alternativeName : ''}
                                        </div>
                                    </FormGroup>
                                    <FormGroup>
                                        <label
                                        className="form-control-label"
                                        htmlFor="input-country"
                                        >
                                            Country
                                        </label>
                                        <ReactSelectAsyncPaginate 
                                            value={FormikProps.values.country}
                                            loadOptions={this.loadCountryHandler}
                                            onChange={(option) => FormikProps.setFieldValue('country', option)}
                                            onBlur={() => FormikProps.setFieldTouched('country', true)}
                                            additional={{
                                                page: 1
                                            }}
                                            debounceTimeout={250}
                                            />
                                        <div>
                                            { FormikProps.errors.country && FormikProps.touched.country ? FormikProps.errors.country.value : '' }
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
    createProvinceAction: (province: ProvinceCreateField) => Promise<ApiResponse<ProvinceCreateResult>>
    setAlertProvinceShowAction: (message: string, color: string) => void,
    fetchListCountryAction: (search: string, page: number) => Promise<ApiResponseList<CountryList>>,
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: FormProps): LinkDispatchToProps => {
    return {
        createProvinceAction: (province: ProvinceCreateField) => dispatch(createProvinceAction(province)),
        setAlertProvinceShowAction: (message: string, color: string) => dispatch(setAlertProvinceShowAction(message, color)),
        fetchListCountryAction: (search: string, page: number) => dispatch(fetchListCountryAction(search, page)),
    }
}

export default connect(null, mapDispatchToProps)(Form);