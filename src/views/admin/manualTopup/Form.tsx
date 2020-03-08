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

import { ManualTopUp, FormField, ManualTopUpCreateField, ManualTopUpCreateResult } from '../../../types/admin/manualTopup';
import { createManualTopUpAction, setAlertManualTopUpShowAction } from '../../../actions/admin/manualTopup';
import { ApiResponse, ApiResponseError, ApiResponseSuccess, ApiResponseList, ApiResponseSuccessList } from '../../../types/api';
import { Paginator } from '../../../types/paginator';
import Dropzone from '../../../components/Dropzone/Dropzone'
import { BankList } from '../../../types/admin/bank';
import ReactSelectAsyncPaginate from 'react-select-async-paginate';
import { fetchListBankAction } from '../../../actions/admin/bank';
import { Driver } from '../../../types/admin/driver';
import { fetchListDriverApiAction } from '../../../actions/admin/driver';

const createSchema = Yup.object().shape({
    amount: Yup.string()
    .matches(/^[0-9]*$/, "Wajib Diisi dengan angka") 
    .test('len', 'Bidang isian jumlah tidak boleh lebih dari 255 karakter', (val: any): boolean => {
        if (val) {
            return val.length <= 255;
        }

        return true;
    })
    .required('Bidang isian jumlah wajib diisi'),
    bank: Yup.object().shape({
        label: Yup.string().required("Bidang pilihan bank wajib diisi"),
        value: Yup.number().notOneOf([0], 'Bidang pilihan bank wajib diisi').required("Bidang pilihan bank wajib diisi")
    }),
    driverProfile: Yup.object().shape({
        label: Yup.string().required("Bidang pilihan driver wajib diisi"),
        value: Yup.number().notOneOf([0], 'Bidang pilihan driver wajib diisi').required("Bidang pilihan driver wajib diisi")
    }),
    image_preview: Yup.string()
             .required('Bidang upload bukti wajib diisi')
});

type FormProps = {
    form: FormField,
    setAlertOpen: (open: boolean) => void,
    setAlertMessage: (message: string) => void,
    redirectOnSuccess: () => void
}

type Props = LinkDispatchToProps & FormProps;

class Form extends Component<Props> {

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

    loadBankHandler = (search: string, loadedOption: {}, options: {
        page: number
    }) => {
        return this.props.fetchListBankAction(search, options.page)
            .then((response: ApiResponseList<BankList>) => {

                const data: ApiResponseSuccessList<BankList> = response.response!;

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

                    result = data.result.map((item: BankList) => {
                        return {
                            value: item.id,
                            label: `${item.nama}`
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

    loadDriverHandler = (search: string, loadedOption: {}, options: {
        page: number
    }) => {
        return this.props.fetchListDriverAction(search, options.page)
            .then((response: ApiResponseList<Driver>) => {

                const data: ApiResponseSuccessList<Driver> = response.response!;

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

                    result = data.result.map((item: Driver) => {
                        return {
                            value: item.id,
                            label: `${item.user.name}`
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

                    const manualTopup: ManualTopUpCreateField = {
                        amount: values.amount,
                        bank: values.bank,
                        driverProfile: values.driverProfile,
                        image: values.image,
                        image_preview: values.image_preview
                    }

                    this.props.createManualTopUpAction(manualTopup)
                        .then( (response: ApiResponse<ManualTopUpCreateResult>) => {
                            const data: ApiResponseSuccess<ManualTopUpCreateResult> = response.response!;
                            this.props.setAlertManualTopUpShowAction('Data Berhasil Ditambah', 'success');
                            this.props.redirectOnSuccess();
                        })
                        .catch( (error: ApiResponse<ManualTopUpCreateResult>) => {
                            this.props.setAlertOpen(true);
                            let message = "Gagal Mendapatkan Response";

                            if (error.error) {
                                message = error.error.metaData.message;
                            }
                        
                            this.props.setAlertMessage(message);

                            action.setSubmitting(false)
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
                                    htmlFor="input-amount"
                                    >
                                        Jumlah
                                    </label>
                                    <Input
                                    className="form-control-alternative"
                                    id="input-amount"
                                    placeholder="Jumlah"
                                    type="text"
                                    name="amount"
                                    maxLength={255}
                                    value={FormikProps.values.amount}
                                    required
                                    onChange={FormikProps.handleChange}
                                    onBlur={FormikProps.handleBlur}
                                    invalid={ !!(FormikProps.touched.amount && FormikProps.errors.amount) }
                                    />
                                    <div>
                                        {FormikProps.errors.amount && FormikProps.touched.amount ? FormikProps.errors.amount : ''}
                                    </div>
                                </FormGroup>

                                <FormGroup>
                                    <label
                                    className="form-control-label"
                                    htmlFor="input-driverProfile"
                                    >
                                        Driver
                                    </label>
                                    <ReactSelectAsyncPaginate 
                                        value={FormikProps.values.driverProfile}
                                        loadOptions={this.loadDriverHandler}
                                        onChange={(option) => FormikProps.setFieldValue('driverProfile', option)}
                                        onBlur={() => FormikProps.setFieldTouched('driverProfile', true)}
                                        additional={{
                                            page: 1
                                        }}
                                        />
                                    <div>
                                        { FormikProps.errors.driverProfile && FormikProps.touched.driverProfile ? FormikProps.errors.driverProfile.value : '' }
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                    <label
                                    className="form-control-label"
                                    htmlFor="input-bank"
                                    >
                                        Bank
                                    </label>
                                    <ReactSelectAsyncPaginate 
                                        value={FormikProps.values.bank}
                                        loadOptions={this.loadBankHandler}
                                        onChange={(option) => FormikProps.setFieldValue('bank', option)}
                                        onBlur={() => FormikProps.setFieldTouched('bank', true)}
                                        additional={{
                                            page: 1
                                        }}
                                        />
                                    <div>
                                        { FormikProps.errors.bank && FormikProps.touched.bank ? FormikProps.errors.bank.value : '' }
                                    </div>
                                </FormGroup>

                                <FormGroup>
                                    <label
                                    className="form-control-label"
                                    htmlFor="input-upload-photo"
                                    >
                                        Upload Bukti
                                    </label>
                                    <Dropzone onFilesAdded={(files: any[]) => {
                                        this.onFilesAdded(files, FormikProps, 'image_preview', 'image');
                                    }} disabled={false} multiple={false} />
                                    
                                    <div>
                                        {FormikProps.errors.image_preview && FormikProps.touched.image_preview ? FormikProps.errors.image_preview : ''}
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
    createManualTopUpAction: (manualTopup: ManualTopUpCreateField) => Promise<ApiResponse<ManualTopUpCreateResult>>
    setAlertManualTopUpShowAction: (message: string, color: string) => void,
    fetchListBankAction: (search: string, page: number) => Promise<ApiResponseList<BankList>>,
    fetchListDriverAction: (search: string, page: number) => Promise<ApiResponseList<Driver>>
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: FormProps): LinkDispatchToProps => {
    return {
        createManualTopUpAction: (manualTopup: ManualTopUpCreateField) => dispatch(createManualTopUpAction(manualTopup)),
        setAlertManualTopUpShowAction: (message: string, color: string) => dispatch(setAlertManualTopUpShowAction(message, color)),
        fetchListBankAction: (search: string, page: number) => dispatch(fetchListBankAction(search, page)),
        fetchListDriverAction: (search: string, page: number) => dispatch(fetchListDriverApiAction(search, page))
    }
}

export default connect(null, mapDispatchToProps)(Form);