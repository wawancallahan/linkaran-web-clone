import axiosService from '../../services/axiosService';
import { Dispatch } from "redux";
import { Paginator } from '../../types/paginator';
import { AppState } from "../../store/configureStore";
import {
    Restaurant,
    SET_PAGINATOR_RESTAURANT,
    FETCH_RESTAURANT_SUCCESS,
    FETCH_RESTAURANT_ERROR,
    SetPaginatorRestaurantActionType,
    FetchRestaurantActionType,
    FetchRestaurantErrorActionType,
    FetchRestaurantSuccessActionType,
    RestaurantCreate,
    RestaurantEdit,
    AlertRestaurantHideActionType,
    ALERT_RESTAURANT_HIDE,
    AlertRestaurantShowActionType,
    ALERT_RESTAURANT_SHOW,
    RestaurantEditResult,
    RestaurantCreateResult
} from '../../types/admin/restaurant';
import { AxiosResponse, AxiosError } from 'axios';
import { ApiResponse, ApiResponseList, ApiResponseError, ApiResponseSuccess, ApiResponseSuccessList } from '../../types/api';
import { ThunkResult } from '../../types/thunk';

export const setPaginateAction = (paginate: Paginator): SetPaginatorRestaurantActionType => {
    return {
        type: SET_PAGINATOR_RESTAURANT,
        paginate: paginate
    }
}

export const setFetchRestaurantSuccessAction = (list: Restaurant[]): FetchRestaurantSuccessActionType => {
    return {
        type: FETCH_RESTAURANT_SUCCESS,
        list: list
    }
}

export const setFetchRestaurantErrorAction = (): FetchRestaurantErrorActionType => {
    return {
        type: FETCH_RESTAURANT_ERROR
    }
}

export const setAlertRestaurantHideAction = (): AlertRestaurantHideActionType => {
    return {
        type: ALERT_RESTAURANT_HIDE
    }
}

export const setAlertRestaurantShowAction = (message: string, color: string): AlertRestaurantShowActionType => {
    return {
        type: ALERT_RESTAURANT_SHOW,
        color: color,
        message: message
    };
}

export const fetchRestaurantAction = (page: number) => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        axiosService.get(`/api_linkaran/v1/web/restaurant?page=${page}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccessList<Restaurant> = response.data;

                dispatch(setFetchRestaurantSuccessAction(data.result));

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
                dispatch(setFetchRestaurantErrorAction());

                dispatch(setPaginateAction({
                    total: 0,
                    currentPage: 0,
                    itemCount: 0,
                    pageCount: 0
                }))
            })
    }
}

export const fetchListRestaurantAction = (search: string, page: number): ThunkResult<Promise<ApiResponseList<Restaurant>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.get(`/api_linkaran/v1/web/restaurant?page=${page}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccessList<Restaurant> = response.data;

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

export const createRestaurantAction = (restaurant: RestaurantCreate): ThunkResult<Promise<ApiResponse<RestaurantCreateResult>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.post('/api_linkaran/v1/web/restaurant', restaurant)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<RestaurantCreateResult> = response.data;
                
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

export const findRestaurantAction = (id: number): ThunkResult<Promise<ApiResponse<Restaurant>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.get(`/api_linkaran/v1/web/restaurant/${id}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<Restaurant> = response.data;

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

export const editRestaurantAction = (restaurant: RestaurantEdit, id: number): ThunkResult<Promise<ApiResponse<RestaurantEditResult>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.patch(`/api_linkaran/v1/web/restaurant/${id}`, restaurant)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<RestaurantEditResult> = response.data;
                
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


export const deleteRestaurantAction = (id: number): ThunkResult<Promise<ApiResponse<Restaurant>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.delete(`/api_linkaran/v1/web/restaurant/${id}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<Restaurant> = response.data;

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
