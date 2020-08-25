import * as React from 'react'
import * as Yup from 'yup';
import { Formik, FormikProps } from 'formik';
import {
    Button,
    Form as FormReactStrap,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
} from 'reactstrap';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../../../../../types';
import { connect } from 'react-redux';
import { FormField, ManualWithDrawEditField, ManualWithDrawEditResult } from '../../../../../types/admin/manualWithdraw';
import { editManualWithDrawAction, setAlertManualWithDrawShowAction } from '../../../../../actions/admin/manualWithdraw';
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
import NumberFormat, { NumberFormatValues } from 'react-number-format';

type OwnProps = {
    form: FormField,
    setAlertVisible: React.Dispatch<React.SetStateAction<boolean>>,
    setAlertMessage: React.Dispatch<React.SetStateAction<string>>,
    redirectOnSuccess: () => void,
    id: number
}

type Props = OwnProps & ReturnType<typeof mapDispatchToProps>

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

                const manualWithdraw: ManualWithDrawEditField = {
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

                swal("Apakah anda yakin?", "Data akan diubah!", {
                    icon: "warning",
                    buttons: ["Tutup!", true],
                }).then((willEdited) => {
                    if (willEdited) {
                        props.editManualWithDrawAction(manualWithdraw, props.id)
                            .then( (response: ApiResponse<ManualWithDrawEditResult>) => {
                                const data: ApiResponseSuccess<ManualWithDrawEditResult> = response.response!;
                                props.setAlertManualWithDrawShowAction('Data Berhasil Diedit', 'success');
                                props.redirectOnSuccess();
                            })
                            .catch( (error: ApiResponse<ManualWithDrawEditResult>) => {
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
                                    <NumberFormat
                                        className="form-control form-control-alternative"
                                        id="input-amount"
                                        placeholder="Jumlah"
                                        name="amount"
                                        maxLength={255}
                                        decimalScale={0}
                                        thousandSeparator={true}
                                        value={FormikProps.values.amount}
                                        isNumericString={true}
                                        required
                                        allowNegative={false}
                                        onValueChange={(values: NumberFormatValues) => {
                                            FormikProps.setFieldValue('amount', values.value)
                                        }}
                                        onBlur={FormikProps.handleBlur}
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

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: OwnProps) => ({
    editManualWithDrawAction: (manualWithdraw: ManualWithDrawEditField, id: number) => dispatch(editManualWithDrawAction(manualWithdraw, id)),
    setAlertManualWithDrawShowAction: (message: string, color: string) => dispatch(setAlertManualWithDrawShowAction(message, color)),
    fetchListBankAction: (search: string, page: number) => dispatch(fetchListBankAction(search, page)),
    fetchListDriverAction: (search: string, page: number) => dispatch(fetchListDriverAction(search, page))
});

export default connect(null, mapDispatchToProps)(Form);