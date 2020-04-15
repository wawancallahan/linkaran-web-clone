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

import { Village, FormField, VillageCreateField, VillageCreateResult } from '../../../../types/admin/region/village';
import { createVillageAction, setAlertVillageShowAction } from '../../../../actions/admin/region/village';
import { ApiResponse, ApiResponseError, ApiResponseSuccess, ApiResponseList, ApiResponseSuccessList } from '../../../../types/api';
import { fetchListSubDistrictAction } from '../../../../actions/admin/region/subDistrict';
import { SubDistrictList } from '../../../../types/admin/region/subDistrict';
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
    subDistrict: Yup.object().shape({
                label: Yup.string().required("Bidang pilihan sub district wajib diisi"),
                value: Yup.number().notOneOf([0], 'Bidang pilihan sub district wajib diisi').required("Bidang pilihan sub district wajib diisi")
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

    loadSubDistrictHandler = (search: string, loadedOption: {}, options: {
        page: number
    }) => {
        return this.props.fetchListSubDistrictAction(search, options.page)
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

    render() {
        return (
            <Formik 
                initialValues={this.props.form}
                
                onSubmit={(values, action) => {
                    this.props.setAlertOpen(false);

                    const village: VillageCreateField = {
                        name: values.name,
                        subDistrict: {
                            id: values.subDistrict.value
                        }
                    }

                    swal("Apakah anda yakin?", "Data akan ditambahkan!", {
                        icon: "warning",
                        buttons: ["Tutup!", true],
                    }).then((willCreated) => {
                        if (willCreated) {
                            this.props.createVillageAction(village)
                                .then( (response: ApiResponse<VillageCreateResult>) => {
                                    const data: ApiResponseSuccess<VillageCreateResult> = response.response!;
                                    this.props.setAlertVillageShowAction('Data Berhasil Ditambah', 'success');
                                    this.props.redirectOnSuccess();
                                })
                                .catch( (error: ApiResponse<VillageCreateResult>) => {
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
                                        htmlFor="input-subDistrict"
                                        >
                                            Sub District
                                        </label>
                                        <ReactSelectAsyncPaginate 
                                            value={FormikProps.values.subDistrict}
                                            loadOptions={this.loadSubDistrictHandler}
                                            onChange={(option) => FormikProps.setFieldValue('subDistrict', option)}
                                            onBlur={() => FormikProps.setFieldTouched('subDistrict', true)}
                                            additional={{
                                                page: 1
                                            }}
                                            debounceTimeout={250}
                                            />
                                        <div>
                                            { FormikProps.errors.subDistrict && FormikProps.touched.subDistrict ? FormikProps.errors.subDistrict.value : '' }
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
    createVillageAction: (subVillage: VillageCreateField) => Promise<ApiResponse<VillageCreateResult>>
    setAlertVillageShowAction: (message: string, color: string) => void,
    fetchListSubDistrictAction: (search: string, page: number) => Promise<ApiResponseList<SubDistrictList>>,
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: FormProps): LinkDispatchToProps => {
    return {
        createVillageAction: (subVillage: VillageCreateField) => dispatch(createVillageAction(subVillage)),
        setAlertVillageShowAction: (message: string, color: string) => dispatch(setAlertVillageShowAction(message, color)),
        fetchListSubDistrictAction: (search: string, page: number) => dispatch(fetchListSubDistrictAction(search, page)),
    }
}

export default connect(null, mapDispatchToProps)(Form);