import axiosService from '../../services/axiosService';
import { Dispatch } from "redux";
import { Paginator } from '../../types/paginator';
import { AppState } from "../../store/configureStore";
import {
    Service,
    SET_PAGINATOR_SERVICE,
    FETCH_SERVICE_SUCCESS,
    FETCH_SERVICE_ERROR,
    SetPaginatorServiceActionType,
    FetchServiceActionType,
    FetchServiceErrorActionType,
    FetchServiceSuccessActionType,
    ServiceCreate,
    ServiceEdit,
    AlertServiceHideActionType,
    ALERT_SERVICE_HIDE,
    AlertServiceShowActionType,
    ALERT_SERVICE_SHOW,
    ServiceEditResult,
    ServiceCreateResult
} from '../../types/admin/service';
import { AxiosResponse, AxiosError } from 'axios';
import { ApiResponse, ApiResponseList, ApiResponseError, ApiResponseSuccess, ApiResponseSuccessList } from '../../types/api';
import { ThunkResult } from '../../types/thunk';
import * as dotenv from 'dotenv';
dotenv.config();

export const setPaginateAction = (paginate: Paginator): SetPaginatorServiceActionType => {
    return {
        type: SET_PAGINATOR_SERVICE,
        paginate: paginate
    }
}

export const setFetchServiceSuccessAction = (list: Service[]): FetchServiceSuccessActionType => {
    return {
        type: FETCH_SERVICE_SUCCESS,
        list: list
    }
}

export const setFetchServiceErrorAction = (): FetchServiceErrorActionType => {
    return {
        type: FETCH_SERVICE_ERROR
    }
}

export const setAlertServiceHideAction = (): AlertServiceHideActionType => {
    return {
        type: ALERT_SERVICE_HIDE
    }
}

export const setAlertServiceShowAction = (message: string, color: string): AlertServiceShowActionType => {
    return {
        type: ALERT_SERVICE_SHOW,
        color: color,
        message: message
    };
}

export const fetchServiceAction = (page: number) => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        axiosService.get(process.env.REACT_APP_API_URL + `/web/service?page=${page}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccessList<Service> = response.data;

                dispatch(setFetchServiceSuccessAction(data.result));

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
                dispatch(setFetchServiceErrorAction());

                dispatch(setPaginateAction({
                    total: 0,
                    currentPage: 0,
                    itemCount: 0,
                    pageCount: 0
                }))
            })
    }
}

export const fetchListServiceAction = (search: string, page: number): ThunkResult<Promise<ApiResponseList<Service>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.get(process.env.REACT_APP_API_URL + `/web/service?page=${page}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccessList<Service> = response.data;

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

export const createServiceAction = (servicePrice: ServiceCreate): ThunkResult<Promise<ApiResponse<ServiceCreateResult>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {

        return axiosService.post(process.env.REACT_APP_API_URL + '/web/service', servicePrice)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<ServiceCreateResult> = response.data;
                
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

export const findServiceAction = (id: number): ThunkResult<Promise<ApiResponse<Service>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.get(process.env.REACT_APP_API_URL + `/web/service/${id}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<Service> = response.data;

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

export const editServiceAction = (servicePrice: ServiceEdit, id: number): ThunkResult<Promise<ApiResponse<ServiceEditResult>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.patch(process.env.REACT_APP_API_URL + `/web/service/${id}`, servicePrice)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<ServiceEditResult> = response.data;
                
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


export const deleteServiceAction = (id: number): ThunkResult<Promise<ApiResponse<Service>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.delete(process.env.REACT_APP_API_URL + `/web/service/${id}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<Service> = response.data;

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
