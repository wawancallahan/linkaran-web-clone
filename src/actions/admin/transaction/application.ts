import axiosService from '../../../services/axiosService';
import { Dispatch } from "redux";
import { Paginator } from '../../../types/paginator';
import { AppState } from "../../../store/configureStore";
import {
    Application,
    SET_PAGINATOR_APPLICATION,
    FETCH_APPLICATION_SUCCESS,
    FETCH_APPLICATION_ERROR,
    SetPaginatorApplicationActionType,
    FetchApplicationActionType,
    FetchApplicationErrorActionType,
    FetchApplicationSuccessActionType,
    ApplicationCreate,
    ApplicationEdit,
    AlertApplicationHideActionType,
    ALERT_APPLICATION_HIDE,
    AlertApplicationShowActionType,
    ALERT_APPLICATION_SHOW,
    ApplicationCreateResult,
    ApplicationEditResult
} from '../../../types/admin/transaction/application';
import { AxiosResponse, AxiosError } from 'axios';
import { ApiResponse, ApiResponseList, ApiResponseError, ApiResponseSuccess, ApiResponseSuccessList } from '../../../types/api';
import { ThunkResult } from '../../../types/thunk';
import * as dotenv from 'dotenv';
dotenv.config();

export const setPaginateAction = (paginate: Paginator): SetPaginatorApplicationActionType => {
    return {
        type: SET_PAGINATOR_APPLICATION,
        paginate: paginate
    }
}

export const setFetchApplicationSuccessAction = (list: Application[]): FetchApplicationSuccessActionType => {
    return {
        type: FETCH_APPLICATION_SUCCESS,
        list: list
    }
}

export const setFetchApplicationErrorAction = (): FetchApplicationErrorActionType => {
    return {
        type: FETCH_APPLICATION_ERROR
    }
}

export const setAlertApplicationHideAction = (): AlertApplicationHideActionType => {
    return {
        type: ALERT_APPLICATION_HIDE
    }
}

export const setAlertApplicationShowAction = (message: string, color: string): AlertApplicationShowActionType => {
    return {
        type: ALERT_APPLICATION_SHOW,
        color: color,
        message: message
    };
}

export const fetchApplicationAction = (page: number, type: string) : ThunkResult<Promise<Boolean>> => {
    return async (dispatch: Dispatch, getState: () => AppState) => {
        return await axiosService.get(process.env.REACT_APP_API_URL + `/web/transaction?page=${page}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccessList<Application> = response.data;

                dispatch(setFetchApplicationSuccessAction(data.result));

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
                dispatch(setFetchApplicationErrorAction());

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

export const fetchListApplicationAction = (search: string, page: number): ThunkResult<Promise<ApiResponseList<Application>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.get(process.env.REACT_APP_API_URL + `/web/transaction?page=${page}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccessList<Application> = response.data;

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

export const findApplicationAction = (id: number): ThunkResult<Promise<ApiResponse<Application>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.get(process.env.REACT_APP_API_URL + `/web/link-pay/transaction/${id}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<Application> = response.data;

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

