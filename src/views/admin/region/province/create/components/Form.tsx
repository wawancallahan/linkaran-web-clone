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
import { FormField, ProvinceCreateField, ProvinceCreateResult } from '../../../../../../types/admin/region/province';
import { createProvinceAction, setAlertProvinceShowAction } from '../../../../../../actions/admin/region/province';
import { ApiResponse, ApiResponseSuccess, ApiResponseList, ApiResponseSuccessList } from '../../../../../../types/api';
import swal from 'sweetalert'
import BlockUi from '../../../../../../components/BlockUi/BlockUi'
import { toast, TypeOptions } from 'react-toastify'
import { Schema } from './Schema'
import { fetchListCountryAction } from '../../../../../../actions/admin/region/country';
import { CountryList } from '../../../../../../types/admin/region/country';
import ReactSelectAsyncPaginate from 'react-select-async-paginate';
import { Paginator } from '../../../../../../types/paginator';

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

    const loadCountryHandler = (search: string, loadedOption: { label: string; value: number; }[], options: {
        page: number
    }) => {
        return props.fetchListCountryAction(search, options.page)
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

    return (
        <Formik 
            initialValues={props.form}
            
            onSubmit={(values, action) => {
                props.setAlertVisible(false);

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
                        props.createProvinceAction(province)
                            .then( (response: ApiResponse<ProvinceCreateResult>) => {
                                const data: ApiResponseSuccess<ProvinceCreateResult> = response.response!;
                                props.setAlertProvinceShowAction('Data Berhasil Ditambah', 'success');
                                props.redirectOnSuccess();
                            })
                            .catch( (error: ApiResponse<ProvinceCreateResult>) => {
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
                                        loadOptions={loadCountryHandler}
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

type LinkDispatchToProps = {
    createProvinceAction: (province: ProvinceCreateField) => Promise<ApiResponse<ProvinceCreateResult>>
    setAlertProvinceShowAction: (message: string, color: string) => void,
    fetchListCountryAction: (search: string, page: number) => Promise<ApiResponseList<CountryList>>,
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: OwnProps): LinkDispatchToProps => {
    return {
        createProvinceAction: (province: ProvinceCreateField) => dispatch(createProvinceAction(province)),
        setAlertProvinceShowAction: (message: string, color: string) => dispatch(setAlertProvinceShowAction(message, color)),
        fetchListCountryAction: (search: string, page: number) => dispatch(fetchListCountryAction(search, page)),
    }
}

export default connect(null, mapDispatchToProps)(Form);
