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

import { District, FormField, DistrictEditField, DistrictEditResult } from '../../../../types/admin/region/district';
import { editDistrictAction, setAlertDistrictShowAction } from '../../../../actions/admin/region/district';
import { ApiResponse, ApiResponseError, ApiResponseSuccess, ApiResponseList, ApiResponseSuccessList } from '../../../../types/api';
import { fetchListProvinceAction } from '../../../../actions/admin/region/province';
import { ProvinceList } from '../../../../types/admin/region/province';
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
    province: Yup.object().shape({
                label: Yup.string().required("Bidang pilihan province wajib diisi"),
                value: Yup.number().notOneOf([0], 'Bidang pilihan province wajib diisi').required("Bidang pilihan province wajib diisi")
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

    loadProvinceHandler = (search: string, loadedOption: { label: string; value: number; }[], options: {
        page: number
    }) => {
        return this.props.fetchListProvinceAction(search, options.page)
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

    render() {
        return (
            <Formik 
                initialValues={this.props.form}
                
                onSubmit={(values, action) => {
                    this.props.setAlertOpen(false);

                    const district: DistrictEditField = {
                        name: values.name,
                        alternativeName: values.alternativeName,
                        province: {
                            id: values.province.value
                        }
                    }

                    swal("Apakah anda yakin?", "Data akan diubah!", {
                        icon: "warning",
                        buttons: ["Tutup!", true],
                    }).then((willEdited) => {
                        if (willEdited) {
                            this.props.editDistrictAction(district, this.props.id)
                                .then( (response: ApiResponse<DistrictEditResult>) => {
                                    const data: ApiResponseSuccess<DistrictEditResult> = response.response!;
                                    this.props.setAlertDistrictShowAction('Data Berhasil Diedit', 'success');
                                    this.props.redirectOnSuccess();
                                })
                                .catch( (error: ApiResponse<DistrictEditResult>) => {
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
                                        htmlFor="input-province"
                                        >
                                            Provinsi
                                        </label>
                                        <ReactSelectAsyncPaginate 
                                            value={FormikProps.values.province}
                                            loadOptions={this.loadProvinceHandler}
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
}

type LinkDispatchToProps = {
    editDistrictAction: (district: DistrictEditField, id: number) => Promise<ApiResponse<DistrictEditResult>>
    setAlertDistrictShowAction: (message: string, color: string) => void,
    fetchListProvinceAction: (search: string, page: number) => Promise<ApiResponseList<ProvinceList>>,
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: FormProps): LinkDispatchToProps => {
    return {
        editDistrictAction: (district: DistrictEditField, id: number) => dispatch(editDistrictAction(district, id)),
        setAlertDistrictShowAction: (message: string, color: string) => dispatch(setAlertDistrictShowAction(message, color)),
        fetchListProvinceAction: (search: string, page: number) => dispatch(fetchListProvinceAction(search, page)),
    }
}

export default connect(null, mapDispatchToProps)(Form);