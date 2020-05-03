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

import { ManualWithDraw, FormField, ManualWithDrawCreateField, ManualWithDrawCreateResult } from '../../../types/admin/manualWithdraw';
import { createManualWithDrawAction, setAlertManualWithDrawShowAction } from '../../../actions/admin/manualWithdraw';
import { ApiResponse, ApiResponseError, ApiResponseSuccess, ApiResponseList, ApiResponseSuccessList } from '../../../types/api';
import { Paginator } from '../../../types/paginator';
import Dropzone from '../../../components/Dropzone/Dropzone'
import { BankList } from '../../../types/admin/bank';
import ReactSelectAsyncPaginate from 'react-select-async-paginate';
import { fetchListBankAction } from '../../../actions/admin/bank';
import { Driver } from '../../../types/admin/driver';
import { fetchListDriverAction } from '../../../actions/admin/driver';
import swal from 'sweetalert'
import BlockUi from '../../../components/BlockUi/BlockUi' 
import { toast, TypeOptions } from 'react-toastify'

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
    accountName: Yup.string()
             .test('len', 'Bidang isian nama akun tidak boleh lebih dari 255 karakter', (val: any): boolean => {
                if (val) {
                    return val.length <= 255;
                }

                return true;
            })
             .required('Bidang isian nama akun wajib diiisi'),
    accountNumber: Yup.string()
             .test('len', 'Bidang isian nomor akun tidak boleh lebih dari 255 karakter', (val: any): boolean => {
                if (val) {
                    return val.length <= 255;
                }

                return true;
            })
             .required('Bidang isian nomor akun wajib diiisi'),
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
                            label: `${item.user.phoneNumber} - ${item.user.name}`
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

                    const manualWithdraw: ManualWithDrawCreateField = {
                        amount: values.amount,
                        bank: values.bank,
                        driverProfile: values.driverProfile,
                        accountName: values.accountName,
                        accountNumber: values.accountNumber
                    }

                    swal("Apakah anda yakin?", "Data akan ditambahkan!", {
                        icon: "warning",
                        buttons: ["Tutup!", true],
                    }).then((willCreated) => {
                        if (willCreated) {
                            this.props.createManualWithDrawAction(manualWithdraw)
                                .then( (response: ApiResponse<ManualWithDrawCreateResult>) => {
                                    const data: ApiResponseSuccess<ManualWithDrawCreateResult> = response.response!;
                                    this.props.setAlertManualWithDrawShowAction('Data Berhasil Ditambah', 'success');
                                    this.props.redirectOnSuccess();
                                })
                                .catch( (error: ApiResponse<ManualWithDrawCreateResult>) => {
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
                                            debounceTimeout={250}
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
                                            debounceTimeout={250}
                                            />
                                        <div>
                                            { FormikProps.errors.bank && FormikProps.touched.bank ? FormikProps.errors.bank.value : '' }
                                        </div>
                                    </FormGroup>

                                    <FormGroup>
                                        <label
                                        className="form-control-label"
                                        htmlFor="input-accountName"
                                        >
                                            Nama Akun
                                        </label>
                                        <Input
                                        className="form-control-alternative"
                                        id="input-accountName"
                                        placeholder="Nama Akun"
                                        type="text"
                                        name="accountName"
                                        maxLength={255}
                                        value={FormikProps.values.accountName}
                                        required
                                        onChange={FormikProps.handleChange}
                                        onBlur={FormikProps.handleBlur}
                                        invalid={ !!(FormikProps.touched.accountName && FormikProps.errors.accountName) }
                                        />
                                        <div>
                                            {FormikProps.errors.accountName && FormikProps.touched.accountName ? FormikProps.errors.accountName : ''}
                                        </div>
                                    </FormGroup>
                                    <FormGroup>
                                        <label
                                        className="form-control-label"
                                        htmlFor="input-accountNumber"
                                        >
                                            Nomor Akun
                                        </label>
                                        <Input
                                        className="form-control-alternative"
                                        id="input-accountNumber"
                                        placeholder="Nomor Akun"
                                        type="text"
                                        name="accountNumber"
                                        maxLength={255}
                                        value={FormikProps.values.accountNumber}
                                        required
                                        onChange={FormikProps.handleChange}
                                        onBlur={FormikProps.handleBlur}
                                        invalid={ !!(FormikProps.touched.accountNumber && FormikProps.errors.accountNumber) }
                                        />
                                        <div>
                                            {FormikProps.errors.accountNumber && FormikProps.touched.accountNumber ? FormikProps.errors.accountNumber : ''}
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
    createManualWithDrawAction: (manualWithdraw: ManualWithDrawCreateField) => Promise<ApiResponse<ManualWithDrawCreateResult>>
    setAlertManualWithDrawShowAction: (message: string, color: string) => void,
    fetchListBankAction: (search: string, page: number) => Promise<ApiResponseList<BankList>>,
    fetchListDriverAction: (search: string, page: number) => Promise<ApiResponseList<Driver>>
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: FormProps): LinkDispatchToProps => {
    return {
        createManualWithDrawAction: (manualWithdraw: ManualWithDrawCreateField) => dispatch(createManualWithDrawAction(manualWithdraw)),
        setAlertManualWithDrawShowAction: (message: string, color: string) => dispatch(setAlertManualWithDrawShowAction(message, color)),
        fetchListBankAction: (search: string, page: number) => dispatch(fetchListBankAction(search, page)),
        fetchListDriverAction: (search: string, page: number) => dispatch(fetchListDriverAction(search, page))
    }
}

export default connect(null, mapDispatchToProps)(Form);