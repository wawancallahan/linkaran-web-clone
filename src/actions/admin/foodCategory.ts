import axiosService from '../../services/axiosService';
import { Dispatch } from "redux";
import { Paginator } from '../../types/paginator';
import { AppState } from "../../store/configureStore";
import {
    FoodCategory,
    SET_PAGINATOR_FOOD_CATEGORY,
    FETCH_FOOD_CATEGORY_SUCCESS,
    FETCH_FOOD_CATEGORY_ERROR,
    SetPaginatorFoodCategoryActionType,
    FetchFoodCategoryActionType,
    FetchFoodCategoryErrorActionType,
    FetchFoodCategorySuccessActionType,
    FoodCategoryCreate,
    FoodCategoryEdit,
    AlertFoodCategoryHideActionType,
    ALERT_FOOD_CATEGORY_HIDE,
    AlertFoodCategoryShowActionType,
    ALERT_FOOD_CATEGORY_SHOW,
    FoodCategoryEditResult,
    FoodCategoryCreateResult
} from '../../types/admin/foodCategory';
import { AxiosResponse, AxiosError } from 'axios';
import { ApiResponse, ApiResponseList, ApiResponseError, ApiResponseSuccess, ApiResponseSuccessList } from '../../types/api';
import { ThunkResult } from '../../types/thunk';

export const setPaginateAction = (paginate: Paginator): SetPaginatorFoodCategoryActionType => {
    return {
        type: SET_PAGINATOR_FOOD_CATEGORY,
        paginate: paginate
    }
}

export const setFetchFoodCategorySuccessAction = (list: FoodCategory[]): FetchFoodCategorySuccessActionType => {
    return {
        type: FETCH_FOOD_CATEGORY_SUCCESS,
        list: list
    }
}

export const setFetchFoodCategoryErrorAction = (): FetchFoodCategoryErrorActionType => {
    return {
        type: FETCH_FOOD_CATEGORY_ERROR
    }
}

export const setAlertFoodCategoryHideAction = (): AlertFoodCategoryHideActionType => {
    return {
        type: ALERT_FOOD_CATEGORY_HIDE
    }
}

export const setAlertFoodCategoryShowAction = (message: string, color: string): AlertFoodCategoryShowActionType => {
    return {
        type: ALERT_FOOD_CATEGORY_SHOW,
        color: color,
        message: message
    };
}

export const fetchFoodCategoryAction = (page: number) => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        axiosService.get(`/api_linkaran/v1/web/food-category?page=${page}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccessList<FoodCategory> = response.data;

                dispatch(setFetchFoodCategorySuccessAction(data.result));

                if (data.metaData.paginate) {
                    const paginate = data.metaData.paginate as Paginator;

                    dispatch(setPaginateAction({
                        total: paginate.total,
                        currentPage: paginate.currentPage,
                        itemCount: paginate.itemCount,
                        pageCount: paginate.pageCount
                    }))
                }
            })
            .catch( (error: AxiosError) => {
                dispatch(setFetchFoodCategoryErrorAction());

                dispatch(setPaginateAction({
                    total: 0,
                    currentPage: 0,
                    itemCount: 0,
                    pageCount: 0
                }))
            })
    }
}

export const fetchListFoodCategoryAction = (search: string, page: number): ThunkResult<Promise<ApiResponseList<FoodCategory>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.get(`/api_linkaran/v1/web/food-category?page=${page}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccessList<FoodCategory> = response.data;

                return Promise.resolve({
                    response: data,
                    error: null
                });
            })
            .catch( (error: AxiosError) => {
                 if (error.response) {
                    if (error.response.status == 500) {
                        const errorResponse: ApiResponseError = {
                            metaData: {
                                isError: true,
                                message: error.message,
                                statusCode: 500
                            },
                            result: null
                        }
    
                        return Promise.reject({
                            response: null,
                            error: errorResponse
                        });
                    } else {
                        return Promise.reject({
                            response: null,
                            error: error.response.data
                        });
                    }
                } else {

                    const errorResponse: ApiResponseError = {
                        metaData: {
                            isError: true,
                            message: error.message,
                            statusCode: 500
                        },
                        result: null
                    }

                    return Promise.reject({
                        response: null,
                        error: errorResponse
                    });
                }
            })
    }
}

export const createFoodCategoryAction = (foodCategory: FoodCategoryCreate): ThunkResult<Promise<ApiResponse<FoodCategoryCreateResult>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.post('/api_linkaran/v1/web/food-category', foodCategory)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<FoodCategoryCreateResult> = response.data;
                
                return Promise.resolve({
                    response: data,
                    error: null
                });
            })
            .catch( (error: AxiosError) => {
                 if (error.response) {
                    if (error.response.status == 500) {
                        const errorResponse: ApiResponseError = {
                            metaData: {
                                isError: true,
                                message: error.message,
                                statusCode: 500
                            },
                            result: null
                        }
    
                        return Promise.reject({
                            response: null,
                            error: errorResponse
                        });
                    } else {
                        return Promise.reject({
                            response: null,
                            error: error.response.data
                        });
                    }
                } else {

                    const errorResponse: ApiResponseError = {
                        metaData: {
                            isError: true,
                            message: error.message,
                            statusCode: 500
                        },
                        result: null
                    }

                    return Promise.reject({
                        response: null,
                        error: errorResponse
                    });
                }
            })
    }
}

export const findFoodCategoryAction = (id: number): ThunkResult<Promise<ApiResponse<FoodCategory>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.get(`/api_linkaran/v1/web/food-category/${id}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<FoodCategory> = response.data;

                return Promise.resolve({
                    response: data,
                    error: null
                });
            })
            .catch( (error: AxiosError) => {
                 if (error.response) {
                    if (error.response.status == 500) {
                        const errorResponse: ApiResponseError = {
                            metaData: {
                                isError: true,
                                message: error.message,
                                statusCode: 500
                            },
                            result: null
                        }
    
                        return Promise.reject({
                            response: null,
                            error: errorResponse
                        });
                    } else {
                        return Promise.reject({
                            response: null,
                            error: error.response.data
                        });
                    }
                } else {

                    const errorResponse: ApiResponseError = {
                        metaData: {
                            isError: true,
                            message: error.message,
                            statusCode: 500
                        },
                        result: null
                    }

                    return Promise.reject({
                        response: null,
                        error: errorResponse
                    });
                }
            })
    }
}

export const editFoodCategoryAction = (foodCategory: FoodCategoryEdit, id: number): ThunkResult<Promise<ApiResponse<FoodCategoryEditResult>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.patch(`/api_linkaran/v1/web/food-category/${id}`, foodCategory)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<FoodCategoryEditResult> = response.data;
                
                return Promise.resolve({
                    response: data,
                    error: null
                });
            })
            .catch( (error: AxiosError) => {
                 if (error.response) {
                    if (error.response.status == 500) {
                        const errorResponse: ApiResponseError = {
                            metaData: {
                                isError: true,
                                message: error.message,
                                statusCode: 500
                            },
                            result: null
                        }
    
                        return Promise.reject({
                            response: null,
                            error: errorResponse
                        });
                    } else {
                        return Promise.reject({
                            response: null,
                            error: error.response.data
                        });
                    }
                } else {

                    const errorResponse: ApiResponseError = {
                        metaData: {
                            isError: true,
                            message: error.message,
                            statusCode: 500
                        },
                        result: null
                    }

                    return Promise.reject({
                        response: null,
                        error: errorResponse
                    });
                }
            })
    }
}


export const deleteFoodCategoryAction = (id: number): ThunkResult<Promise<ApiResponse<FoodCategory>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.delete(`/api_linkaran/v1/web/food-category/${id}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<FoodCategory> = response.data;

                return Promise.resolve({
                    response: data,
                    error: null
                });
            })
            .catch( (error: AxiosError) => {
                 if (error.response) {
                    if (error.response.status == 500) {
                        const errorResponse: ApiResponseError = {
                            metaData: {
                                isError: true,
                                message: error.message,
                                statusCode: 500
                            },
                            result: null
                        }
    
                        return Promise.reject({
                            response: null,
                            error: errorResponse
                        });
                    } else {
                        return Promise.reject({
                            response: null,
                            error: error.response.data
                        });
                    }
                } else {

                    const errorResponse: ApiResponseError = {
                        metaData: {
                            isError: true,
                            message: error.message,
                            statusCode: 500
                        },
                        result: null
                    }

                    return Promise.reject({
                        response: null,
                        error: errorResponse
                    });
                }
            })
    }
}
