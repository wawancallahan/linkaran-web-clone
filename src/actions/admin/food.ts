import axiosService from '../../services/axiosService';
import { Dispatch } from "redux";
import { Paginator } from '../../types/paginator';
import { AppState } from "../../store/configureStore";
import {
    Food,
    SET_PAGINATOR_FOOD,
    FETCH_FOOD_SUCCESS,
    FETCH_FOOD_ERROR,
    SetPaginatorFoodActionType,
    FetchFoodActionType,
    FetchFoodErrorActionType,
    FetchFoodSuccessActionType,
    FoodCreate,
    FoodEdit,
    AlertFoodHideActionType,
    ALERT_FOOD_HIDE,
    AlertFoodShowActionType,
    ALERT_FOOD_SHOW,
    FoodCreateResult,
    FoodEditResult
} from '../../types/admin/food';
import { AxiosResponse, AxiosError } from 'axios';
import { ApiResponse, ApiResponseList, ApiResponseError, ApiResponseSuccess, ApiResponseSuccessList } from '../../types/api';
import { ThunkResult } from '../../types/thunk';

export const setPaginateAction = (paginate: Paginator): SetPaginatorFoodActionType => {
    return {
        type: SET_PAGINATOR_FOOD,
        paginate: paginate
    }
}

export const setFetchFoodSuccessAction = (list: Food[]): FetchFoodSuccessActionType => {
    return {
        type: FETCH_FOOD_SUCCESS,
        list: list
    }
}

export const setFetchFoodErrorAction = (): FetchFoodErrorActionType => {
    return {
        type: FETCH_FOOD_ERROR
    }
}

export const setAlertFoodHideAction = (): AlertFoodHideActionType => {
    return {
        type: ALERT_FOOD_HIDE
    }
}

export const setAlertFoodShowAction = (message: string, color: string): AlertFoodShowActionType => {
    return {
        type: ALERT_FOOD_SHOW,
        color: color,
        message: message
    };
}

export const fetchFoodAction = (page: number) => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        axiosService.get(`/v1/web/food?page=${page}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccessList<Food> = response.data;

                dispatch(setFetchFoodSuccessAction(data.result));

                if (data.metaData.paginate) {
                    dispatch(setPaginateAction({
                        total: data.metaData.paginate.total,
                        currentPage: data.metaData.paginate.currentPage,
                        itemCount: data.metaData.paginate.itemCount,
                        pageCount: data.metaData.paginate.pageCount
                    }))
                }
            })
            .catch( (error: AxiosError) => {
                dispatch(setFetchFoodErrorAction());

                dispatch(setPaginateAction({
                    total: 0,
                    currentPage: 0,
                    itemCount: 0,
                    pageCount: 0
                }))
            })
    }
}

export const createFoodAction = (food: FoodCreate): ThunkResult<Promise<ApiResponse<FoodCreateResult>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.post('/v1/web/food', food)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<FoodCreateResult> = response.data;
                
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

export const findFoodAction = (id: number): ThunkResult<Promise<ApiResponse<Food>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.get(`/v1/web/food/${id}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<Food> = response.data;

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

export const editFoodAction = (food: FoodEdit, id: number): ThunkResult<Promise<ApiResponse<FoodEditResult>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.patch(`/v1/web/food/${id}`, food)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<FoodEditResult> = response.data;
                
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


export const deleteFoodAction = (id: number): ThunkResult<Promise<ApiResponse<Food>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.delete(`/v1/web/food/${id}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<Food> = response.data;

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