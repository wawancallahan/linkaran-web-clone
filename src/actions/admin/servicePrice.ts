import axiosService from '../../services/axiosService';
import { Dispatch } from "redux";
import { Paginator } from '../../types/paginator';
import { AppState } from "../../store/configureStore";
import {
    ServicePrice,
    SET_PAGINATOR_SERVICE_PRICE,
    FETCH_SERVICE_PRICE_SUCCESS,
    FETCH_SERVICE_PRICE_ERROR,
    SetPaginatorServicePriceActionType,
    FetchServicePriceActionType,
    FetchServicePriceErrorActionType,
    FetchServicePriceSuccessActionType,
    ServicePriceCreate,
    ServicePriceEdit,
    AlertServicePriceHideActionType,
    ALERT_SERVICE_PRICE_HIDE,
    AlertServicePriceShowActionType,
    ALERT_SERVICE_PRICE_SHOW,
    ServicePriceEditResult,
    ServicePriceCreateResult
} from '../../types/admin/servicePrice';
import { AxiosResponse, AxiosError } from 'axios';
import { ApiResponse, ApiResponseList, ApiResponseError, ApiResponseSuccess, ApiResponseSuccessList } from '../../types/api';
import { ThunkResult } from '../../types/thunk';
import * as dotenv from 'dotenv';
dotenv.config();

export const setPaginateAction = (paginate: Paginator): SetPaginatorServicePriceActionType => {
    return {
        type: SET_PAGINATOR_SERVICE_PRICE,
        paginate: paginate
    }
}

export const setFetchServicePriceSuccessAction = (list: ServicePrice[]): FetchServicePriceSuccessActionType => {
    return {
        type: FETCH_SERVICE_PRICE_SUCCESS,
        list: list
    }
}

export const setFetchServicePriceErrorAction = (): FetchServicePriceErrorActionType => {
    return {
        type: FETCH_SERVICE_PRICE_ERROR
    }
}

export const setAlertServicePriceHideAction = (): AlertServicePriceHideActionType => {
    return {
        type: ALERT_SERVICE_PRICE_HIDE
    }
}

export const setAlertServicePriceShowAction = (message: string, color: string): AlertServicePriceShowActionType => {
    return {
        type: ALERT_SERVICE_PRICE_SHOW,
        color: color,
        message: message
    };
}

export const fetchServicePriceAction = (page: number) => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        axiosService.get(process.env.REACT_APP_API_URL + `/web/service-price?page=${page}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccessList<ServicePrice> = response.data;

                dispatch(setFetchServicePriceSuccessAction(data.result));

                if (data.metaData.paginate) {
                    const paginate = data.metaData.paginate as Paginator;

                    dispatch(setPaginateAction({
                        total: paginate.itemCount * paginate.pageCount,
                        currentPage: page,
                        itemCount: paginate.itemCount,
                        pageCount: paginate.pageCount
                    }))
                }
            })
            .catch( (error: AxiosError) => {
                dispatch(setFetchServicePriceErrorAction());

                dispatch(setPaginateAction({
                    total: 0,
                    currentPage: 0,
                    itemCount: 0,
                    pageCount: 0
                }))
            })
    }
}

export const fetchListServicePriceAction = (search: string, page: number): ThunkResult<Promise<ApiResponseList<ServicePrice>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.get(process.env.REACT_APP_API_URL + `/web/service-price?page=${page}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccessList<ServicePrice> = response.data;

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

export const createServicePriceAction = (servicePrice: ServicePriceCreate): ThunkResult<Promise<ApiResponse<ServicePriceCreateResult>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {

        const data = new FormData();

        return axiosService.post(process.env.REACT_APP_API_URL + '/web/service-price', data)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<ServicePriceCreateResult> = response.data;
                
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

export const findServicePriceAction = (id: number): ThunkResult<Promise<ApiResponse<ServicePrice>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.get(process.env.REACT_APP_API_URL + `/web/service-price/${id}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<ServicePrice> = response.data;

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

export const editServicePriceAction = (servicePrice: ServicePriceEdit, id: number): ThunkResult<Promise<ApiResponse<ServicePriceEditResult>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.patch(process.env.REACT_APP_API_URL + `/web/service-price/${id}`, servicePrice)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<ServicePriceEditResult> = response.data;
                
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


export const deleteServicePriceAction = (id: number): ThunkResult<Promise<ApiResponse<ServicePrice>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.delete(process.env.REACT_APP_API_URL + `/web/service-price/${id}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<ServicePrice> = response.data;

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
