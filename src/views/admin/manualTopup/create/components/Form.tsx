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
import { FormField, ManualTopUpCreateField, ManualTopUpCreateResult } from '../../../../../types/admin/manualTopup';
import { createManualTopUpAction, setAlertManualTopUpShowAction } from '../../../../../actions/admin/manualTopup';
import { ApiResponse, ApiResponseSuccess, ApiResponseList, ApiResponseSuccessList } from '../../../../../types/api';
import swal from 'sweetalert'
import BlockUi from '../../../../../components/BlockUi/BlockUi'
import { toast, TypeOptions } from 'react-toastify'
import { Schema } from './Schema'
import Dropzone from '../../../../../components/Dropzone/Dropzone';
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

                const manualTopup: ManualTopUpCreateField = {
                    amount: values.amount,
                    bank: {
                        id: values.bank.value
                    },
                    driverProfile: {
                        id: values.driverProfile.value
                    },
                    image: values.image,
                    image_preview: values.image_preview
                }

                swal("Apakah anda yakin?", "Data akan ditambahkan!", {
                    icon: "warning",
                    buttons: ["Tutup!", true],
                }).then((willCreated) => {
                    if (willCreated) {
                        props.createManualTopUpAction(manualTopup)
                            .then( (response: ApiResponse<ManualTopUpCreateResult>) => {
                                const data: ApiResponseSuccess<ManualTopUpCreateResult> = response.response!;
                                props.setAlertManualTopUpShowAction('Data Berhasil Ditambah', 'success');
                                props.redirectOnSuccess();
                            })
                            .catch( (error: ApiResponse<ManualTopUpCreateResult>) => {
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
                                    htmlFor="input-upload-photo"
                                    >
                                        Upload Bukti
                                    </label>
                                    <Dropzone onFilesAdded={(files: any[]) => {
                                        onFilesAdded(files, FormikProps, 'image_preview', 'image');
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
                    </BlockUi>
                );
            })}
        </Formik>
    )
}

type LinkDispatchToProps = {
    createManualTopUpAction: (manualTopup: ManualTopUpCreateField) => Promise<ApiResponse<ManualTopUpCreateResult>>
    setAlertManualTopUpShowAction: (message: string, color: string) => void,
    fetchListBankAction: (search: string, page: number) => Promise<ApiResponseList<BankList>>,
    fetchListDriverAction: (search: string, page: number) => Promise<ApiResponseList<DriverList>>
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: OwnProps): LinkDispatchToProps => {
    return {
        createManualTopUpAction: (manualTopup: ManualTopUpCreateField) => dispatch(createManualTopUpAction(manualTopup)),
        setAlertManualTopUpShowAction: (message: string, color: string) => dispatch(setAlertManualTopUpShowAction(message, color)),
        fetchListBankAction: (search: string, page: number) => dispatch(fetchListBankAction(search, page)),
        fetchListDriverAction: (search: string, page: number) => dispatch(fetchListDriverAction(search, page))
    }
}

export default connect(null, mapDispatchToProps)(Form);