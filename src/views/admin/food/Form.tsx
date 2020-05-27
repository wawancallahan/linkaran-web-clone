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
    FoodCategoryList
} from '../../../types/admin/foodCategory';
import {
    fetchListFoodCategoryAction
} from '../../../actions/admin/foodCategory';
import { Food, FormField, FoodCreateField, FoodCreateResult, FoodStatusEnum } from '../../../types/admin/food';
import { createFoodAction, setAlertFoodShowAction } from '../../../actions/admin/food';
import { ApiResponse, ApiResponseError, ApiResponseSuccess, ApiResponseList, ApiResponseSuccessList } from '../../../types/api';
import ReactSelect from 'react-select'
import ReactSelectAsyncPaginate from 'react-select-async-paginate';
import { Restaurant } from '../../../types/admin/restaurant';
import { fetchListRestaurantAction } from '../../../actions/admin/restaurant';
import { Paginator } from '../../../types/paginator';
import Dropzone from '../../../components/Dropzone/Dropzone'
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
        label: Yup.string().required("Bidang pilihan kategori makanan wajib diisi"),
        value: Yup.number().notOneOf([0], 'Bidang pilihan kategori makanan wajib diisi').required("Bidang pilihan kategori makanan wajib diisi")
    }),
    restaurant: Yup.object().shape({
        label: Yup.string().required("Bidang pilihan restaurant wajib diisi"),
        value: Yup.number().notOneOf([0], 'Bidang pilihan restaurant wajib diisi').required("Bidang pilihan restaurant wajib diisi")
    }),
    status: Yup.object().shape({
        label: Yup.string().required("Bidang pilihan restaurant wajib diisi"),
        value: Yup.string().required("Bidang pilihan restaurant wajib diisi")
    }),
    image_preview: Yup.string().nullable()
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

    loadFoodCategoryHandler = (search: string, loadedOption: { label: string; value: number; }[], options: {
        page: number
    }) => {
        return this.props.fetchListFoodCategoryAction(search, options.page)
            .then((response: ApiResponseList<FoodCategoryList>) => {

                const data: ApiResponseSuccessList<FoodCategoryList> = response.response!;

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

                    result = data.result.map((item: FoodCategoryList) => {
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

    loadRestaurantHandler = (search: string, loadedOption: { label: string; value: number; }[], options: {
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

                    const food: FoodCreateField = {
                        name: values.name,
                        description: values.description,
                        foodCategory: {
                            id: values.foodCategory.value
                        },
                        price: values.price,
                        rating: values.rating,
                        restaurant: {
                            id: values.restaurant.value
                        },
                        image_preview: values.image_preview,
                        image: values.image,
                        status: values.status.value as FoodStatusEnum
                    }

                    swal("Apakah anda yakin?", "Data akan ditambahkan!", {
                        icon: "warning",
                        buttons: ["Tutup!", true],
                    }).then((willCreated) => {
                        if (willCreated) {
                            this.props.createFoodAction(food)
                                .then( (response: ApiResponse<FoodCreateResult>) => {
                                    const data: ApiResponseSuccess<FoodCreateResult> = response.response!;
                                    this.props.setAlertFoodShowAction('Data Berhasil Ditambah', 'success');
                                    this.props.redirectOnSuccess();
                                })
                                .catch( (error: ApiResponse<FoodCreateResult>) => {
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
                                            debounceTimeout={250}
                                            />
                                        <div>
                                            { FormikProps.errors.restaurant && FormikProps.touched.restaurant ? FormikProps.errors.restaurant.value : '' }
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
                                            debounceTimeout={250}
                                            />
                                        <div>
                                            { FormikProps.errors.foodCategory && FormikProps.touched.foodCategory ? FormikProps.errors.foodCategory.value : '' }
                                        </div>
                                    </FormGroup>

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
                                        htmlFor="input-status"
                                        >
                                            Status
                                        </label>
                                        <ReactSelect 
                                            options={[
                                                {value: FoodStatusEnum.AVAILABLE, label: FoodStatusEnum.AVAILABLE},
                                                {value: FoodStatusEnum.NOT_AVAILABLE , label: FoodStatusEnum.NOT_AVAILABLE},
                                                {value: FoodStatusEnum.OUT_OF_STOCK , label: FoodStatusEnum.OUT_OF_STOCK}
                                            ]}
                                            defaultValue={FormikProps.values.status}
                                            onChange={(option) => {

                                                const optionSelected = option as {
                                                    value: string,
                                                    label: string
                                                };

                                                FormikProps.setFieldValue('status', optionSelected)
                                            }}  
                                            onBlur={() => FormikProps.setFieldTouched('status', true)}
                                            />
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
                                        htmlFor="input-upload-photo"
                                        >
                                            Upload Gambar
                                        </label>

                                        <Dropzone onFilesAdded={(files: any[]) => {
                                            this.onFilesAdded(files, FormikProps, 'image_preview', 'image');
                                        }} disabled={false} multiple={false} removeFile={true} onClickRemove={(file, index) => {
                                            FormikProps.setFieldValue('image_preview', '');
                                            FormikProps.setFieldValue('image', null)
                                        }}/>

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
}

type LinkDispatchToProps = {
    createFoodAction: (food: FoodCreateField) => Promise<ApiResponse<FoodCreateResult>>
    setAlertFoodShowAction: (message: string, color: string) => void,
    fetchListFoodCategoryAction: (search: string, page: number) => Promise<ApiResponseList<FoodCategoryList>>,
    fetchListRestaurantAction: (search: string, page: number) => Promise<ApiResponseList<Restaurant>>
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: FormProps): LinkDispatchToProps => {
    return {
        createFoodAction: (food: FoodCreateField) => dispatch(createFoodAction(food)),
        setAlertFoodShowAction: (message: string, color: string) => dispatch(setAlertFoodShowAction(message, color)),
        fetchListFoodCategoryAction: (search: string, page: number) => dispatch(fetchListFoodCategoryAction(search, page)),
        fetchListRestaurantAction: (search: string, page: number) => dispatch(fetchListRestaurantAction(search, page))
    }
}

export default connect(null, mapDispatchToProps)(Form);