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
import { FormField, DistrictCreateField, DistrictCreateResult } from '../../../../../../types/admin/region/district';
import { createDistrictAction, setAlertDistrictShowAction } from '../../../../../../actions/admin/region/district';
import { ApiResponse, ApiResponseSuccess, ApiResponseList, ApiResponseSuccessList } from '../../../../../../types/api';
import swal from 'sweetalert'
import BlockUi from '../../../../../../components/BlockUi/BlockUi'
import { toast, TypeOptions } from 'react-toastify'
import { Schema } from './Schema'
import { ProvinceList } from '../../../../../../types/admin/region/province';
import { fetchListProvinceAction } from '../../../../../../actions/admin/region/province';
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

    const loadProvinceHandler = (search: string, loadedOption: { label: string; value: number; }[], options: {
        page: number
    }) => {
        return props.fetchListProvinceAction(search, options.page)
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

    return (
        <Formik 
            initialValues={props.form}
            onSubmit={(values, action) => {
                props.setAlertVisible(false);

                const district: DistrictCreateField = {
                    name: values.name,
                    alternativeName: values.alternativeName,
                    province: {
                        id: values.province.value
                    }
                }

                swal("Apakah anda yakin?", "Data akan ditambahkan!", {
                    icon: "warning",
                    buttons: ["Tutup!", true],
                }).then((willCreated) => {
                    if (willCreated) {
                        props.createDistrictAction(district)
                            .then( (response: ApiResponse<DistrictCreateResult>) => {
                                const data: ApiResponseSuccess<DistrictCreateResult> = response.response!;
                                props.setAlertDistrictShowAction('Data Berhasil Ditambah', 'success');
                                props.redirectOnSuccess();
                            })
                            .catch( (error: ApiResponse<DistrictCreateResult>) => {
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
                                    htmlFor="input-province"
                                    >
                                        Provinsi
                                    </label>
                                    <ReactSelectAsyncPaginate 
                                        value={FormikProps.values.province}
                                        loadOptions={loadProvinceHandler}
                                        onChange={(option) => FormikProps.setFieldValue('province', option)}
                                        onBlur={() => FormikProps.setFieldTouched('province', true)}
                                        additional={{
                                            page: 1
                                        }}
                                        debounceTimeout={250}
                                        />
                                    <div>
                                        { FormikProps.errors.province && FormikProps.touched.province ? FormikProps.errors.province.value : '' }
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
    createDistrictAction: (district: DistrictCreateField) => Promise<ApiResponse<DistrictCreateResult>>
    setAlertDistrictShowAction: (message: string, color: string) => void,
    fetchListProvinceAction: (search: string, page: number) => Promise<ApiResponseList<ProvinceList>>,
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: OwnProps): LinkDispatchToProps => {
    return {
        createDistrictAction: (district: DistrictCreateField) => dispatch(createDistrictAction(district)),
        setAlertDistrictShowAction: (message: string, color: string) => dispatch(setAlertDistrictShowAction(message, color)),
        fetchListProvinceAction: (search: string, page: number) => dispatch(fetchListProvinceAction(search, page)),
    }
}

export default connect(null, mapDispatchToProps)(Form);
