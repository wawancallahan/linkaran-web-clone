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
    FoodCategory
} from '../../../types/admin/foodCategory';
import {
    fetchListFoodCategoryAction
} from '../../../actions/admin/foodCategory';
import { Food, FormField, FoodCreate, FoodCreateResult } from '../../../types/admin/food';
import { createFoodAction, setAlertFoodShowAction } from '../../../actions/admin/food';
import { ApiResponse, ApiResponseError, ApiResponseSuccess, ApiResponseList, ApiResponseSuccessList } from '../../../types/api';
import ReactSelectAsyncPaginate from 'react-select-async-paginate';
import { Restaurant } from '../../../types/admin/restaurant';
import { fetchListRestaurantAction } from '../../../actions/admin/restaurant';
import { Paginator } from '../../../types/paginator';

const createSchema = Yup.object().shape({
    name: Yup.string()
    .test('len', 'Bidang isian nama tidak boleh lebih dari 255 karakter', (val: any): boolean => {
                if (val) {
                    return val.length <= 255;
                }

                return true;
            })
             .required('Bidang isian nama wajib diisi'),
    price: Yup.number()
            .min(0, 'Bidang isian harga tidak boleh kurang dari 0')
            .required('Bidang isian harga wajib diisi'),
    description: Yup.string()
                    .required('Bidang isian deskripsi wajib diisi'),
    rating: Yup.number()
                .min(0, 'Bidang isian rating tidak boleh kurang dari 0')
                .max(100, 'Bidang isian rating tidak boleh lebih dari 100')
                .required('Bidang isian rating wajib diisi'),
    foodCategory: Yup.object().shape({
        label: Yup.string().required("Bidang pilihan food category wajib diisi"),
        value: Yup.number().notOneOf([0], 'Bidang pilihan food category wajib diisi').required("Bidang pilihan food category wajib diisi")
    }),
    restaurant: Yup.object().shape({
        label: Yup.string().required("Bidang pilihan restaurant wajib diisi"),
        value: Yup.number().notOneOf([0], 'Bidang pilihan restaurant wajib diisi').required("Bidang pilihan restaurant wajib diisi")
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

    loadFoodCategoryHandler = (search: string, loadedOption: {}, options: {
        page: number
    }) => {
        return this.props.fetchListFoodCategoryAction(search, options.page)
            .then((response: ApiResponseList<FoodCategory>) => {

                const data: ApiResponseSuccessList<FoodCategory> = response.response!;

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

                    result = data.result.map((item: FoodCategory) => {
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

    loadRestaurantHandler = (search: string, loadedOption: {}, options: {
        page: number
    }) => {
        return this.props.fetchListRestaurantAction(search, options.page)
            .then((response: ApiResponseList<Restaurant>) => {

                const data: ApiResponseSuccessList<Restaurant> = response.response!;

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

                    result = data.result.map((item: Restaurant) => {
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

                    const food: FoodCreate = {
                        name: values.name,
                        description: values.description,
                        foodCategory: {
                            id: values.foodCategory.value
                        },
                        price: values.price,
                        rating: values.rating,
                        restaurant: {
                            id: values.restaurant.value
                        }
                    }

                    this.props.createFoodAction(food)
                        .then( (response: ApiResponse<FoodCreateResult>) => {
                            const data: ApiResponseSuccess<FoodCreateResult> = response.response!;
                            this.props.setAlertFoodShowAction('Data Berhasil Ditambah', 'success');
                            this.props.redirectOnSuccess();

                            action.setSubmitting(false)
                        })
                        .catch( (error: ApiResponse<FoodCreateResult>) => {
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
                                    htmlFor="input-price"
                                    >
                                        Harga
                                    </label>
                                    <Input
                                    className="form-control-alternative"
                                    id="input-price"
                                    placeholder="Harga"
                                    type="number"
                                    name="price"
                                    maxLength={255}
                                    value={FormikProps.values.price}
                                    required
                                    onChange={FormikProps.handleChange}
                                    onBlur={FormikProps.handleBlur}
                                    invalid={ !!(FormikProps.touched.price && FormikProps.errors.price) }
                                    />
                                    <div>
                                        {FormikProps.errors.price && FormikProps.touched.price ? FormikProps.errors.price : ''}
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                    <label
                                    className="form-control-label"
                                    htmlFor="input-rating"
                                    >
                                        Rating
                                    </label>
                                    <Input
                                    className="form-control-alternative"
                                    id="input-rating"
                                    placeholder="Rating"
                                    type="number"
                                    name="rating"
                                    maxLength={255}
                                    value={FormikProps.values.rating}
                                    required
                                    onChange={FormikProps.handleChange}
                                    onBlur={FormikProps.handleBlur}
                                    invalid={ !!(FormikProps.touched.rating && FormikProps.errors.rating) }
                                    />
                                    <div>
                                        {FormikProps.errors.rating && FormikProps.touched.rating ? FormikProps.errors.rating : ''}
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                    <label
                                    className="form-control-label"
                                    htmlFor="input-description"
                                    >
                                        Deskripsi
                                    </label>
                                    <Input
                                    className="form-control-alternative"
                                    id="input-description"
                                    placeholder="Deskripsi"
                                    type="textarea"
                                    name="description"
                                    maxLength={255}
                                    value={FormikProps.values.description}
                                    required
                                    onChange={FormikProps.handleChange}
                                    onBlur={FormikProps.handleBlur}
                                    invalid={ !!(FormikProps.touched.description && FormikProps.errors.description) }
                                    />
                                    <div>
                                        {FormikProps.errors.description && FormikProps.touched.description ? FormikProps.errors.description : ''}
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                    <label
                                    className="form-control-label"
                                    htmlFor="input-foodCategory"
                                    >
                                        Kategori
                                    </label>
                                    <ReactSelectAsyncPaginate 
                                        value={FormikProps.values.foodCategory}
                                        loadOptions={this.loadFoodCategoryHandler}
                                        onChange={(option) => FormikProps.setFieldValue('foodCategory', option)}
                                        onBlur={() => FormikProps.setFieldTouched('foodCategory', true)}
                                        additional={{
                                            page: 1
                                        }}
                                        />
                                    <div>
                                        { FormikProps.errors.foodCategory && FormikProps.touched.foodCategory ? FormikProps.errors.foodCategory.value : '' }
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                    <label
                                    className="form-control-label"
                                    htmlFor="input-restaurant"
                                    >
                                        Restoran
                                    </label>
                                    <ReactSelectAsyncPaginate 
                                        value={FormikProps.values.restaurant}
                                        loadOptions={this.loadRestaurantHandler}
                                        onChange={(option) => FormikProps.setFieldValue('restaurant', option)}
                                        onBlur={() => FormikProps.setFieldTouched('restaurant', true)}
                                        additional={{
                                            page: 1
                                        }}
                                        />
                                    <div>
                                        { FormikProps.errors.restaurant && FormikProps.touched.restaurant ? FormikProps.errors.restaurant.value : '' }
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
    createFoodAction: (food: FoodCreate) => Promise<ApiResponse<FoodCreateResult>>
    setAlertFoodShowAction: (message: string, color: string) => void,
    fetchListFoodCategoryAction: (search: string, page: number) => Promise<ApiResponseList<FoodCategory>>,
    fetchListRestaurantAction: (search: string, page: number) => Promise<ApiResponseList<Restaurant>>
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: FormProps): LinkDispatchToProps => {
    return {
        createFoodAction: (food: FoodCreate) => dispatch(createFoodAction(food)),
        setAlertFoodShowAction: (message: string, color: string) => dispatch(setAlertFoodShowAction(message, color)),
        fetchListFoodCategoryAction: (search: string, page: number) => dispatch(fetchListFoodCategoryAction(search, page)),
        fetchListRestaurantAction: (search: string, page: number) => dispatch(fetchListRestaurantAction(search, page))
    }
}

export default connect(null, mapDispatchToProps)(Form);