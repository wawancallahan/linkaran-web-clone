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
    RestaurantEdit
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

export const fetchRestaurantAction = (page: number) => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        axiosService.get('/v1/web/restaurant')
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccessList<Restaurant> = response.data;

                dispatch(setFetchRestaurantSuccessAction(data.result));

                dispatch(setPaginateAction({
                    activePage: 1,
                    itemCount: data.result.length,
                    pageCount: 1
                }))
            })
            .catch( (error: AxiosError) => {
                dispatch(setFetchRestaurantErrorAction());

                dispatch(setPaginateAction({
                    activePage: 0,
                    itemCount: 0,
                    pageCount: 0
                }))
            })
    }
}

export const createRestaurantAction = (restaurant: RestaurantCreate): ThunkResult<Promise<ApiResponse<Restaurant>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.post('/v1/web/restaurant', restaurant)
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

export const findRestaurantAction = (id: number): ThunkResult<Promise<ApiResponse<Restaurant>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.get(`/v1/web/restaurant/${id}`)
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

export const editRestaurantAction = (restaurant: RestaurantEdit, id: number): ThunkResult<Promise<ApiResponse<Restaurant>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.patch(`/v1/web/restaurant/${id}`, restaurant)
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


export const deleteRestaurantAction = (id: number): ThunkResult<Promise<ApiResponseList<Restaurant>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.delete(`/v1/web/restaurant/${id}`)
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
