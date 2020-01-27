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
import { AppActions } from '../../../types';
import { connect } from 'react-redux';

import {
    BrandVehicle
} from '../../../types/admin/brandVehicle';
import {
    fetchListBrandVehicleAction
} from '../../../actions/admin/brandVehicle';
import { SubBrandVehicle, FormField, SubBrandVehicleCreate, SubBrandVehicleCreateResult } from '../../../types/admin/subBrandVehicle';
import { createSubBrandVehicleAction, setAlertSubBrandVehicleShowAction } from '../../../actions/admin/subBrandVehicle';
import { ApiResponse, ApiResponseError, ApiResponseSuccess, ApiResponseList, ApiResponseSuccessList } from '../../../types/api';
import ReactSelectAsyncPaginate from 'react-select-async-paginate';
import { Paginator } from '../../../types/paginator';

const createSchema = Yup.object().shape({
    name: Yup.string()
    .test('len', 'Bidang isian nama tidak boleh lebih dari 255 karakter', (val: any): boolean => {
                if (val) {
                    return val.length <= 255;
                }

                return true;
            })
             .required('Bidang isian nama wajib diiisi'),
    brandVehicle: Yup.object().shape({
        label: Yup.string().required("Bidang pilihan brand vehicle wajib diisi"),
        value: Yup.number().notOneOf([0], 'Bidang pilihan brand vehicle wajib diisi').required("Bidang pilihan brand vehicle wajib diisi")
    })
});

type FormProps = {
    form: FormField,
    setAlertOpen: (open: boolean) => void,
    setAlertMessage: (message: string) => void,
    redirectOnSuccess: () => void
}

type Props = LinkDispatchToProps & FormProps;

class Form extends Component<Props> {

    loadBrandVehicleHandler = (search: string, loadedOption: {}, options: {
        page: number
    }) => {
        return this.props.fetchListBrandVehicleAction(search, options.page)
            .then((response: ApiResponseList<BrandVehicle>) => {

                const data: ApiResponseSuccessList<BrandVehicle> = response.response!;

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

                    result = data.result.map((item: BrandVehicle) => {
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

                    const subBrandVehicle: SubBrandVehicleCreate = {
                        name: values.name,
                        brandVehicle: {
                            id: values.brandVehicle.value
                        }
                    }

                    this.props.createSubBrandVehicleAction(subBrandVehicle)
                        .then( (response: ApiResponse<SubBrandVehicleCreateResult>) => {
                            const data: ApiResponseSuccess<SubBrandVehicleCreateResult> = response.response!;
                            this.props.setAlertSubBrandVehicleShowAction('Data Berhasil Ditambah', 'success');
                            this.props.redirectOnSuccess();
                        })
                        .catch( (error: ApiResponse<SubBrandVehicleCreateResult>) => {
                            this.props.setAlertOpen(true);
                            this.props.setAlertMessage(error.error!.metaData.message);
                        });
                }}
                validationSchema={createSchema}
            >
                {(FormikProps => {
                    return (
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
                                    htmlFor="input-brandVehicle"
                                    >
                                        Brand Vehicle
                                    </label>
                                    <ReactSelectAsyncPaginate 
                                        value={FormikProps.values.brandVehicle}
                                        loadOptions={this.loadBrandVehicleHandler}
                                        onChange={(option) => FormikProps.setFieldValue('brandVehicle', option)}
                                        onBlur={() => FormikProps.setFieldTouched('brandVehicle', true)}
                                        additional={{
                                            page: 1
                                        }}
                                        />
                                    <div>
                                        { FormikProps.errors.brandVehicle && FormikProps.touched.brandVehicle ? FormikProps.errors.brandVehicle.value : '' }
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                    <Button type="submit" disabled={FormikProps.isSubmitting} color="success">Simpan</Button>
                                </FormGroup>
                            </div>
                        </FormReactStrap>
                    );
                })}
            </Formik>
        )
    }
}

type LinkDispatchToProps = {
    createSubBrandVehicleAction: (subBrandVehicle: SubBrandVehicleCreate) => Promise<ApiResponse<SubBrandVehicleCreateResult>>
    setAlertSubBrandVehicleShowAction: (message: string, color: string) => void,
    fetchListBrandVehicleAction: (search: string, page: number) => Promise<ApiResponseList<BrandVehicle>>
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: FormProps): LinkDispatchToProps => {
    return {
        createSubBrandVehicleAction: (subBrandVehicle: SubBrandVehicleCreate) => dispatch(createSubBrandVehicleAction(subBrandVehicle)),
        setAlertSubBrandVehicleShowAction: (message: string, color: string) => dispatch(setAlertSubBrandVehicleShowAction(message, color)),
        fetchListBrandVehicleAction: (search: string, page: number) => dispatch(fetchListBrandVehicleAction(search, page))
    }
}

export default connect(null, mapDispatchToProps)(Form);