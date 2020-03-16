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

import { User, FormField, UserCreate, UserCreateResult } from '../../../types/admin/user';
import { Role } from '../../../types/admin/role'
import { createUserAction, setAlertUserShowAction } from '../../../actions/admin/user';
import { fetchListRoleAction } from '../../../actions/admin/role';
import { ApiResponse, ApiResponseError, ApiResponseSuccess, ApiResponseList, ApiResponseSuccessList } from '../../../types/api';
import { Paginator } from '../../../types/paginator';
import ReactSelectAsyncPaginate from 'react-select-async-paginate';
import swal from 'sweetalert'
import BlockUi from '../../../components/BlockUi/BlockUi'
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
    phoneNumber: Yup.string()
                    .required('Bidang isian no telepon wajib diiisi'),
    email: Yup.string()
                .email('Bidang isian harus berupa email')
                .required('Bidang isian email wajib diiisi'),
    roles: Yup.array()
                .min(1, "Bidang pilihan role wajib diisi")
                .of(
                    Yup.object().shape({
                        label: Yup.string().required('Bidang pilihan role wajib diisi'),
                        value: Yup.number().notOneOf([0], 'Bidang pilihan role wajib diisi').required('Bidang pilihan role wajib diisi')
                    })
                ),
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
    
    loadRoleHandler = (search: string, loadedOption: {}, options: {
        page: number
    }) => {
        return this.props.fetchListRoleAction(search, options.page)
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


    render() {
        return (
            <Formik 
                initialValues={this.props.form}
                
                onSubmit={(values, action) => {
                    this.props.setAlertOpen(false);

                    let roles: {id: number}[] = values.roles.map((value: {
                        value: number,
                        label: string
                    }) => {
                        return {
                            id: value.value
                        }
                    })

                    const user: UserCreate = {
                        email: values.email,
                        name: values.name,
                        phoneNumber: values.phoneNumber,
                        roles: roles
                    }

                    swal("Apakah anda yakin?", "Data akan ditambahkan!", {
                        icon: "warning",
                        buttons: ["Tutup!", true],
                    }).then((willCreated) => {
                        if (willCreated) {
                            this.props.createUserAction(user)
                                .then( (response: ApiResponse<UserCreateResult>) => {
                                    const data: ApiResponseSuccess<UserCreateResult> = response.response!;
                                    
                                    this.props.setAlertUserShowAction('Data Berhasil Ditambah', 'success');
                                    this.props.redirectOnSuccess();
                                })
                                .catch( (error: ApiResponse<UserCreateResult>) => {
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
                                            loadOptions={this.loadRoleHandler}
                                            onChange={(option) => FormikProps.setFieldValue('roles', option)}
                                            onBlur={() => FormikProps.setFieldTouched('roles', true)}
                                            additional={{
                                                page: 1
                                            }}
                                            isMulti
                                            />
                                        <div>
                                            { FormikProps.errors.roles && FormikProps.touched.roles ? FormikProps.errors.roles : '' }
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
    createUserAction: (user: UserCreate) => Promise<ApiResponse<UserCreateResult>>,
    setAlertUserShowAction: (message: string, color: string) => void,
    fetchListRoleAction: (search: string, page: number) => Promise<ApiResponseList<Role>>
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: FormProps): LinkDispatchToProps => {
    return {
        createUserAction: (user: UserCreate) => dispatch(createUserAction(user)),
        setAlertUserShowAction: (message: string, color: string) => dispatch(setAlertUserShowAction(message, color)),
        fetchListRoleAction: (search: string, page: number) => dispatch(fetchListRoleAction(search, page))
    }
}

export default connect(null, mapDispatchToProps)(Form);