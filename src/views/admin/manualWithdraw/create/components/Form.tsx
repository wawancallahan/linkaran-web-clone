import * as React from 'react'
import * as Yup from 'yup';
import { Formik, FormikProps } from 'formik';
import {
    Button,
    Form as FormReactStrap,
    FormGroup,
    Input
} from 'reactstrap';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../../../../../types';
import { connect } from 'react-redux';
import { FormField, ManualWithDrawCreateField, ManualWithDrawCreateResult } from '../../../../../types/admin/manualWithdraw';
import { createManualWithDrawAction, setAlertManualWithDrawShowAction } from '../../../../../actions/admin/manualWithdraw';
import { ApiResponse, ApiResponseSuccess, ApiResponseList, ApiResponseSuccessList } from '../../../../../types/api';
import swal from 'sweetalert'
import BlockUi from '../../../../../components/BlockUi/BlockUi'
import { toast, TypeOptions } from 'react-toastify'
import { Schema } from './Schema'
import { Paginator } from '../../../../../types/paginator';
import ReactSelectAsyncPaginate from 'react-select-async-paginate';
import { fetchListBankAction } from '../../../../../actions/admin/bank';
import { BankList } from '../../../../../types/admin/bank';
import { fetchListDriverAction } from '../../../../../actions/admin/driver';
import { DriverList } from '../../../../../types/admin/driver';

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

    const onFilesAdded = (files: any[], FormikProps: FormikProps<FormField>, setPreview: any, setValue: any) => {
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

    const loadBankHandler = (search: string, loadedOption: { label: string; value: number; }[], options: {
        page: number
    }) => {
        return props.fetchListBankAction(search, options.page)
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

    const loadDriverHandler = (search: string, loadedOption: { label: string; value: number; }[], options: {
        page: number
    }) => {
        return props.fetchListDriverAction(search, options.page)
            .then((response: ApiResponseList<DriverList>) => {

                const data: ApiResponseSuccessList<DriverList> = response.response!;

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

                    result = data.result.map((item: DriverList) => {
                        return {
                            value: item.id,
                            label: item.user ? `${item.user.phoneNumber} - ${item.user.name}` : ''
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

                const manualWithdraw: ManualWithDrawCreateField = {
                    amount: values.amount,
                    bank: {
                        id: values.bank.value
                    },
                    driverProfile: {
                        id: values.driverProfile.value
                    },
                    bankName: values.bankName,
                    accountName: values.accountName,
                    accountNumber: values.accountNumber
                }

                swal("Apakah anda yakin?", "Data akan ditambahkan!", {
                    icon: "warning",
                    buttons: ["Tutup!", true],
                }).then((willCreated) => {
                    if (willCreated) {
                        props.createManualWithDrawAction(manualWithdraw)
                            .then( (response: ApiResponse<ManualWithDrawCreateResult>) => {
                                const data: ApiResponseSuccess<ManualWithDrawCreateResult> = response.response!;
                                props.setAlertManualWithDrawShowAction('Data Berhasil Ditambah', 'success');
                                props.redirectOnSuccess();
                            })
                            .catch( (error: ApiResponse<ManualWithDrawCreateResult>) => {
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
                                        loadOptions={loadDriverHandler}
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
                                        loadOptions={loadBankHandler}
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
                                    htmlFor="input-bankName"
                                    >
                                        Nama Bank
                                    </label>
                                    <Input
                                    className="form-control-alternative"
                                    id="input-bankName"
                                    placeholder="Nama Bank"
                                    type="text"
                                    name="bankName"
                                    maxLength={255}
                                    value={FormikProps.values.bankName}
                                    required
                                    onChange={FormikProps.handleChange}
                                    onBlur={FormikProps.handleBlur}
                                    invalid={ !!(FormikProps.touched.bankName && FormikProps.errors.bankName) }
                                    />
                                    <div>
                                        {FormikProps.errors.bankName && FormikProps.touched.bankName ? FormikProps.errors.bankName : ''}
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

type LinkDispatchToProps = {
    createManualWithDrawAction: (manualWithdraw: ManualWithDrawCreateField) => Promise<ApiResponse<ManualWithDrawCreateResult>>
    setAlertManualWithDrawShowAction: (message: string, color: string) => void,
    fetchListBankAction: (search: string, page: number) => Promise<ApiResponseList<BankList>>,
    fetchListDriverAction: (search: string, page: number) => Promise<ApiResponseList<DriverList>>
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: OwnProps): LinkDispatchToProps => {
    return {
        createManualWithDrawAction: (manualWithdraw: ManualWithDrawCreateField) => dispatch(createManualWithDrawAction(manualWithdraw)),
        setAlertManualWithDrawShowAction: (message: string, color: string) => dispatch(setAlertManualWithDrawShowAction(message, color)),
        fetchListBankAction: (search: string, page: number) => dispatch(fetchListBankAction(search, page)),
        fetchListDriverAction: (search: string, page: number) => dispatch(fetchListDriverAction(search, page))
    }
}

export default connect(null, mapDispatchToProps)(Form);
