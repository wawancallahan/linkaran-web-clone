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

import { SubDistrict, FormField, SubDistrictEditField, SubDistrictEditResult } from '../../../../types/admin/region/subDistrict';
import { editSubDistrictAction, setAlertSubDistrictShowAction } from '../../../../actions/admin/region/subDistrict';
import { ApiResponse, ApiResponseError, ApiResponseSuccess, ApiResponseList, ApiResponseSuccessList } from '../../../../types/api';
import { fetchListDistrictAction } from '../../../../actions/admin/region/district';
import { DistrictList } from '../../../../types/admin/region/district';
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
    district: Yup.object().shape({
                label: Yup.string().required("Bidang pilihan district wajib diisi"),
                value: Yup.number().notOneOf([0], 'Bidang pilihan district wajib diisi').required("Bidang pilihan district wajib diisi")
            }),
});

type FormProps = {
    form: FormField,
    setAlertOpen: (open: boolean) => void,
    setAlertMessage: (message: string) => void,
    redirectOnSuccess: () => void,
    id: number
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

    loadDistrictHandler = (search: string, loadedOption: {}, options: {
        page: number
    }) => {
        return this.props.fetchListDistrictAction(search, options.page)
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

    render() {
        return (
            <Formik 
                initialValues={this.props.form}
                
                onSubmit={(values, action) => {
                    this.props.setAlertOpen(false);

                    const subDistrict: SubDistrictEditField = {
                        name: values.name,
                        district: {
                            id: values.district.value
                        }
                    }

                    swal("Apakah anda yakin?", "Data akan diubah!", {
                        icon: "warning",
                        buttons: ["Tutup!", true],
                    }).then((willEdited) => {
                        if (willEdited) {
                            this.props.editSubDistrictAction(subDistrict, this.props.id)
                                .then( (response: ApiResponse<SubDistrictEditResult>) => {
                                    const data: ApiResponseSuccess<SubDistrictEditResult> = response.response!;
                                    this.props.setAlertSubDistrictShowAction('Data Berhasil Diedit', 'success');
                                    this.props.redirectOnSuccess();
                                })
                                .catch( (error: ApiResponse<SubDistrictEditResult>) => {
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
                                        htmlFor="input-district"
                                        >
                                            District
                                        </label>
                                        <ReactSelectAsyncPaginate 
                                            value={FormikProps.values.district}
                                            loadOptions={this.loadDistrictHandler}
                                            onChange={(option) => FormikProps.setFieldValue('district', option)}
                                            onBlur={() => FormikProps.setFieldTouched('district', true)}
                                            additional={{
                                                page: 1
                                            }}
                                            />
                                        <div>
                                            { FormikProps.errors.district && FormikProps.touched.district ? FormikProps.errors.district.value : '' }
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
    editSubDistrictAction: (subDistrict: SubDistrictEditField, id: number) => Promise<ApiResponse<SubDistrictEditResult>>
    setAlertSubDistrictShowAction: (message: string, color: string) => void,
    fetchListDistrictAction: (search: string, page: number) => Promise<ApiResponseList<DistrictList>>,
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: FormProps): LinkDispatchToProps => {
    return {
        editSubDistrictAction: (subDistrict: SubDistrictEditField, id: number) => dispatch(editSubDistrictAction(subDistrict, id)),
        setAlertSubDistrictShowAction: (message: string, color: string) => dispatch(setAlertSubDistrictShowAction(message, color)),
        fetchListDistrictAction: (search: string, page: number) => dispatch(fetchListDistrictAction(search, page)),
    }
}

export default connect(null, mapDispatchToProps)(Form);