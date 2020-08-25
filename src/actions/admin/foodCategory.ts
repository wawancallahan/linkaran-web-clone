import axiosService from '../../services/axiosService';
import { Dispatch } from "redux";
import { Paginator } from '../../types/paginator';
import { AppState } from "../../reducers";
import {
    FoodCategory,
    SET_PAGINATOR_FOOD_CATEGORY,
    FETCH_FOOD_CATEGORY_SUCCESS,
    FETCH_FOOD_CATEGORY_ERROR,
    SetPaginatorFoodCategoryActionType,
    FetchFoodCategoryActionType,
    FetchFoodCategoryErrorActionType,
    FetchFoodCategorySuccessActionType,
    FoodCategoryCreateField,
    FoodCategoryEditField,
    AlertFoodCategoryHideActionType,
    ALERT_FOOD_CATEGORY_HIDE,
    AlertFoodCategoryShowActionType,
    ALERT_FOOD_CATEGORY_SHOW,
    FoodCategoryEditResult,
    FoodCategoryCreateResult,
    Filter,
    SetFilterFoodCategoryActionType,
    SET_FILTER_FOOD_CATEGORY,
    ClearFilterFoodCategoryActionType,
    CLEAR_FILTER_FOOD_CATEGORY,
    FoodCategoryList,
    FoodCategoryShow
} from '../../types/admin/foodCategory';
import { AxiosResponse, AxiosError } from 'axios';
import { ApiResponse, ApiResponseList, ApiResponseError, ApiResponseSuccess, ApiResponseSuccessList } from '../../types/api';
import { ThunkResult } from '../../types/thunk';
import * as dotenv from 'dotenv';
import { OptionObjectString } from '../../helpers/utils';
dotenv.config();
import queryString from 'query-string'

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

export const clearFilterAction = () : ClearFilterFoodCategoryActionType => {
    return {
        type: CLEAR_FILTER_FOOD_CATEGORY
    }
} 

export const setFilterAction = (filter: Filter) : SetFilterFoodCategoryActionType => {
    return {
        type: SET_FILTER_FOOD_CATEGORY,
        filter: filter
    }
}

export const fetchFoodCategoryAction = (page: number) : ThunkResult<Promise<Boolean>> => {
    return async (dispatch: Dispatch, getState: () => AppState) => {
        
        const querySearch = queryString.parse(window.location.search);

        const filter: Filter = {
            name: decodeURIComponent((querySearch.name as string) || '')
        }

        let paramsObject: OptionObjectString = {
            page: page.toString(),
            ...filter
        }
        
        return await axiosService.get(process.env.REACT_APP_API_URL + `/web/food-category`, {
                params: paramsObject
            })
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccessList<FoodCategoryList> = response.data;

                dispatch(setFetchFoodCategorySuccessAction(data.result));

                if (data.metaData.paginate) {
                    const paginate = data.metaData.paginate as Paginator;

                    dispatch(setPaginateAction({
                        total: paginate.itemCount * paginate.pageCount,
                        currentPage: page,
                        itemCount: paginate.itemCount,
                        pageCount: paginate.pageCount
                    }))
                }

                return Promise.resolve(true);
            })
            .catch( (error: AxiosError) => {
                dispatch(setFetchFoodCategoryErrorAction());

                dispatch(setPaginateAction({
                    total: 0,
                    currentPage: 0,
                    itemCount: 0,
                    pageCount: 0
                }))

                return Promise.resolve(true);
            })
    }
}

export const fetchListFoodCategoryAction = (search: string, page: number): ThunkResult<Promise<ApiResponseList<FoodCategoryList>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        
        let paramsObject: OptionObjectString = {
            page: page.toString(),
            name: search
        }
        
        return axiosService.get(process.env.REACT_APP_API_URL + `/web/food-category`, {
                params: paramsObject
            })
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccessList<FoodCategoryList> = response.data;

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

export const createFoodCategoryAction = (foodCategory: FoodCategoryCreateField): ThunkResult<Promise<ApiResponse<FoodCategoryCreateResult>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.post(process.env.REACT_APP_API_URL + '/web/food-category', foodCategory)
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

export const findFoodCategoryAction = (id: number): ThunkResult<Promise<ApiResponse<FoodCategoryShow>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.get(process.env.REACT_APP_API_URL + `/web/food-category/${id}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<FoodCategoryShow> = response.data;

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

export const editFoodCategoryAction = (foodCategory: FoodCategoryEditField, id: number): ThunkResult<Promise<ApiResponse<FoodCategoryEditResult>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.patch(process.env.REACT_APP_API_URL + `/web/food-category/${id}`, foodCategory)
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
        return axiosService.delete(process.env.REACT_APP_API_URL + `/web/food-category/${id}`)
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
