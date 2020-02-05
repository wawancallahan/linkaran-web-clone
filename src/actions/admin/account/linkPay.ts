import axiosService from '../../../services/axiosService';
import { Dispatch } from "redux";
import { Paginator } from '../../../types/paginator';
import { AppState } from "../../../store/configureStore";
import {
    AccountLinkPay,
    SET_PAGINATOR_ACCOUNT_LINK_PAY,
    FETCH_ACCOUNT_LINK_PAY_SUCCESS,
    FETCH_ACCOUNT_LINK_PAY_ERROR,
    SetPaginatorAccountLinkPayActionType,
    FetchAccountLinkPayActionType,
    FetchAccountLinkPayErrorActionType,
    FetchAccountLinkPaySuccessActionType,
    AccountLinkPayCreate,
    AccountLinkPayEdit,
    AlertAccountLinkPayHideActionType,
    ALERT_ACCOUNT_LINK_PAY_HIDE,
    AlertAccountLinkPayShowActionType,
    ALERT_ACCOUNT_LINK_PAY_SHOW,
    AccountLinkPayCreateResult,
    AccountLinkPayEditResult
} from '../../../types/admin/account/linkPay';
import { AxiosResponse, AxiosError } from 'axios';
import { ApiResponse, ApiResponseList, ApiResponseError, ApiResponseSuccess, ApiResponseSuccessList } from '../../../types/api';
import { ThunkResult } from '../../../types/thunk';
import * as dotenv from 'dotenv';
dotenv.config();

export const setPaginateAction = (paginate: Paginator): SetPaginatorAccountLinkPayActionType => {
    return {
        type: SET_PAGINATOR_ACCOUNT_LINK_PAY,
        paginate: paginate
    }
}

export const setFetchAccountLinkPaySuccessAction = (list: AccountLinkPay[]): FetchAccountLinkPaySuccessActionType => {
    return {
        type: FETCH_ACCOUNT_LINK_PAY_SUCCESS,
        list: list
    }
}

export const setFetchAccountLinkPayErrorAction = (): FetchAccountLinkPayErrorActionType => {
    return {
        type: FETCH_ACCOUNT_LINK_PAY_ERROR
    }
}

export const setAlertAccountLinkPayHideAction = (): AlertAccountLinkPayHideActionType => {
    return {
        type: ALERT_ACCOUNT_LINK_PAY_HIDE
    }
}

export const setAlertAccountLinkPayShowAction = (message: string, color: string): AlertAccountLinkPayShowActionType => {
    return {
        type: ALERT_ACCOUNT_LINK_PAY_SHOW,
        color: color,
        message: message
    };
}

export const fetchAccountLinkPayAction = (page: number) : ThunkResult<Promise<Boolean>> => {
    return async (dispatch: Dispatch, getState: () => AppState) => {
        return await axiosService.get(process.env.REACT_APP_API_URL + `/web/link-pay/list?page=${page}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccessList<AccountLinkPay> = response.data;

                dispatch(setFetchAccountLinkPaySuccessAction(data.result));

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
                dispatch(setFetchAccountLinkPayErrorAction());

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

export const fetchListAccountLinkPayAction = (search: string, page: number): ThunkResult<Promise<ApiResponseList<AccountLinkPay>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.get(process.env.REACT_APP_API_URL + `/web/link-pay/list?page=${page}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccessList<AccountLinkPay> = response.data;

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

export const findAccountLinkPayAction = (id: number): ThunkResult<Promise<ApiResponse<AccountLinkPay>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.get(process.env.REACT_APP_API_URL + `/web/link-pay/${id}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<AccountLinkPay> = response.data;

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

