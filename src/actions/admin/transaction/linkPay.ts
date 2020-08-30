import axiosService from '../../../services/axiosService';
import { Dispatch } from "redux";
import { Paginator } from '../../../types/paginator';
import { AppState } from "../../../reducers";
import {
    LinkPay,
    LinkPayList,
    LinkPayShow,
    SET_PAGINATOR_LINK_PAY,
    FETCH_LINK_PAY_SUCCESS,
    FETCH_LINK_PAY_ERROR,
    SetPaginatorLinkPayActionType,
    FetchLinkPayActionType,
    FetchLinkPayErrorActionType,
    FetchLinkPaySuccessActionType,
    AlertLinkPayHideActionType,
    ALERT_LINK_PAY_HIDE,
    AlertLinkPayShowActionType,
    ALERT_LINK_PAY_SHOW
} from '../../../types/admin/transaction/linkPay';
import { AxiosResponse, AxiosError } from 'axios';
import { ApiResponse, ApiResponseList, ApiResponseError, ApiResponseSuccess, ApiResponseSuccessList } from '../../../types/api';
import { ThunkResult } from '../../../types/thunk';
import * as dotenv from 'dotenv';
dotenv.config();

export const setPaginateAction = (paginate: Paginator): SetPaginatorLinkPayActionType => {
    return {
        type: SET_PAGINATOR_LINK_PAY,
        paginate: paginate
    }
}

export const setFetchLinkPaySuccessAction = (list: LinkPay[]): FetchLinkPaySuccessActionType => {
    return {
        type: FETCH_LINK_PAY_SUCCESS,
        list: list
    }
}

export const setFetchLinkPayErrorAction = (): FetchLinkPayErrorActionType => {
    return {
        type: FETCH_LINK_PAY_ERROR
    }
}

export const setAlertLinkPayHideAction = (): AlertLinkPayHideActionType => {
    return {
        type: ALERT_LINK_PAY_HIDE
    }
}

export const setAlertLinkPayShowAction = (message: string, color: string): AlertLinkPayShowActionType => {
    return {
        type: ALERT_LINK_PAY_SHOW,
        color: color,
        message: message
    };
}

export const fetchLinkPayAction = (page: number) : ThunkResult<Promise<Boolean>> => {
    return async (dispatch: Dispatch, getState: () => AppState) => {
        return await axiosService.get(process.env.REACT_APP_API_URL + `/web/link-pay/transaction/list?page=${page}`)
            .then( (response: AxiosResponse) => {
                
                const data: ApiResponseSuccessList<LinkPayList> = response.data;

                dispatch(setFetchLinkPaySuccessAction(data.result));

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
                dispatch(setFetchLinkPayErrorAction());

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

export const fetchListLinkPayAction = (search: string, page: number): ThunkResult<Promise<ApiResponseList<LinkPay>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.get(process.env.REACT_APP_API_URL + `/web/link-pay/transaction/list?page=${page}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccessList<LinkPay> = response.data;

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

export const findLinkPayAction = (id: number): ThunkResult<Promise<ApiResponse<LinkPayShow>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.get(process.env.REACT_APP_API_URL + `/web/link-pay/transaction/${id}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<LinkPayShow> = response.data;

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

