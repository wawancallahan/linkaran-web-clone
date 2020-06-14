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
import { AppActions } from '../../../../../types';
import { connect } from 'react-redux';
import { FormField,UserCreateField,UserCreateResult } from '../../../../../types/admin/user';
import { createUserAction, setAlertUserShowAction } from '../../../../../actions/admin/user';
import { fetchListRoleAction } from '../../../../../actions/admin/role';
import { ApiResponse, ApiResponseSuccess, ApiResponseList, ApiResponseSuccessList } from '../../../../../types/api';
import { Paginator } from '../../../../../types/paginator';
import ReactSelectAsyncPaginate from 'react-select-async-paginate';
import swal from 'sweetalert'
import BlockUi from '../../../../../components/BlockUi/BlockUi'
import { toast, TypeOptions } from 'react-toastify'
import { Schema } from './Schema'
import { Role } from '../../../../../types/admin/role';

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

    const loadRoleHandler = (search: string, loadedOption: { label: string; value: number; }[], options: {
        page: number
    }) => {
        return props.fetchListRoleAction(search, options.page)
            .then((response: ApiResponseList<Role>) => {
    
                const data: ApiResponseSuccessList<Role> = response.response!;
    
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
    
                    result = data.result.map((item: Role) => {
                        return {
                            value: item.id,
                            label: `${item.title}`
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

                let roles: {id: number}[] = values.roles.map((value: {
                    value: number,
                    label: string
                }) => {
                    return {
                        id: value.value
                    }
                })

                const user: UserCreateField = {
                    email: values.email,
                    name: values.name,
                    phoneNumber: values.phoneNumber,
                    roles: roles,
                    telegramuser: values.telegramuser
                }

                swal("Apakah anda yakin?", "Data akan ditambahkan!", {
                    icon: "warning",
                    buttons: ["Tutup!", true],
                }).then((willCreated) => {
                    if (willCreated) {
                        props.createUserAction(user)
                            .then( (response: ApiResponse<UserCreateResult>) => {
                                const data: ApiResponseSuccess<UserCreateResult> = response.response!;
                                
                                props.setAlertUserShowAction('Data Berhasil Ditambah', 'success');
                                props.redirectOnSuccess();
                            })
                            .catch( (error: ApiResponse<UserCreateResult>) => {
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
                                    htmlFor="input-phoneNumber"
                                    >
                                        No Telepon
                                    </label>
                                    <Input
                                    className="form-control-alternative"
                                    id="input-phoneNumber"
                                    placeholder="No Telepon"
                                    type="text"
                                    name="phoneNumber"
                                    maxLength={255}
                                    value={FormikProps.values.phoneNumber}
                                    required
                                    onChange={FormikProps.handleChange}
                                    onBlur={FormikProps.handleBlur}
                                    invalid={ !!(FormikProps.touched.phoneNumber && FormikProps.errors.phoneNumber) }
                                    />
                                    <div>
                                        {FormikProps.errors.phoneNumber && FormikProps.touched.phoneNumber ? FormikProps.errors.phoneNumber : ''}
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                    <label
                                    className="form-control-label"
                                    htmlFor="input-email"
                                    >
                                        Email
                                    </label>
                                    <Input
                                    className="form-control-alternative"
                                    id="input-email"
                                    placeholder="Email"
                                    type="email"
                                    name="email"
                                    maxLength={255}
                                    value={FormikProps.values.email}
                                    required
                                    onChange={FormikProps.handleChange}
                                    onBlur={FormikProps.handleBlur}
                                    invalid={ !!(FormikProps.touched.email && FormikProps.errors.email) }
                                    />
                                    <div>
                                        {FormikProps.errors.email && FormikProps.touched.email ? FormikProps.errors.email : ''}
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                    <label
                                    className="form-control-label"
                                    htmlFor="input-role"
                                    >
                                        Role
                                    </label>
                                    <ReactSelectAsyncPaginate 
                                        value={FormikProps.values.roles}
                                        loadOptions={loadRoleHandler}
                                        onChange={(option) => FormikProps.setFieldValue('roles', option)}
                                        onBlur={() => FormikProps.setFieldTouched('roles', true)}
                                        additional={{
                                            page: 1
                                        }}
                                        debounceTimeout={250}
                                        isMulti
                                        />
                                    <div>
                                        { FormikProps.errors.roles && FormikProps.touched.roles ? FormikProps.errors.roles : '' }
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                    <label
                                    className="form-control-label"
                                    htmlFor="input-telegramuser"
                                    >
                                        Telegram User
                                    </label>
                                    <Input
                                    className="form-control-alternative"
                                    id="input-telegramuser"
                                    placeholder="Telegram User"
                                    type="text"
                                    name="telegramuser"
                                    maxLength={255}
                                    value={FormikProps.values.telegramuser || ''}
                                    onChange={FormikProps.handleChange}
                                    onBlur={FormikProps.handleBlur}
                                    invalid={ !!(FormikProps.touched.telegramuser && FormikProps.errors.telegramuser) }
                                    />
                                    <div>
                                        {FormikProps.errors.telegramuser && FormikProps.touched.telegramuser ? FormikProps.errors.telegramuser : ''}
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
    createUserAction: (user:UserCreateField) => Promise<ApiResponse<UserCreateResult>>
    setAlertUserShowAction: (message: string, color: string) => void,
    fetchListRoleAction: (search: string, page: number) => Promise<ApiResponseList<Role>>
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: OwnProps): LinkDispatchToProps => {
    return {
        createUserAction: (user:UserCreateField) => dispatch(createUserAction(user)),
        setAlertUserShowAction: (message: string, color: string) => dispatch(setAlertUserShowAction(message, color)),
        fetchListRoleAction: (search: string, page: number) => dispatch(fetchListRoleAction(search, page))
    }
}

export default connect(null, mapDispatchToProps)(Form);
