import axiosService from '../../services/axiosService';
import { Dispatch } from "redux";
import { Paginator } from '../../types/paginator';
import { AppState } from "../../reducers/index";
import {
    TopUp,
    SET_PAGINATOR_TOPUP,
    FETCH_TOPUP_SUCCESS,
    FETCH_TOPUP_ERROR,
    SetPaginatorTopUpActionType,
    FetchTopUpActionType,
    FetchTopUpErrorActionType,
    FetchTopUpSuccessActionType,
    TopUpCreateField,
    TopUpEditField,
    AlertTopUpHideActionType,
    ALERT_TOPUP_HIDE,
    AlertTopUpShowActionType,
    ALERT_TOPUP_SHOW,
    TopUpEditResult,
    TopUpCreateResult,
    TopUpList,
    TopUpShow,
    TopUpApprove,
    Filter,
    SetFilterTopUpActionType,
    SET_FILTER_TOPUP,
    ClearFilterTopUpActionType,
    CLEAR_FILTER_TOPUP
} from '../../types/financialManager/topup';
import { AxiosResponse, AxiosError } from 'axios';
import { ApiResponse, ApiResponseList, ApiResponseError, ApiResponseSuccess, ApiResponseSuccessList } from '../../types/api';
import * as dotenv from 'dotenv';
import { ThunkResult } from '../../types/thunk'
import { OptionObjectNumber, objectToParamsUrl, OptionObjectString } from '../../helpers/utils';
dotenv.config();
import queryString from 'query-string'

export const setPaginateAction = (paginate: Paginator): SetPaginatorTopUpActionType => {
    return {
        type: SET_PAGINATOR_TOPUP,
        paginate: paginate
    }
}

export const setFetchTopUpSuccessAction = (list: TopUpList[]): FetchTopUpSuccessActionType => {
    return {
        type: FETCH_TOPUP_SUCCESS,
        list: list
    }
}

export const setFetchTopUpErrorAction = (): FetchTopUpErrorActionType => {
    return {
        type: FETCH_TOPUP_ERROR
    }
}

export const setAlertTopUpHideAction = (): AlertTopUpHideActionType => {
    return {
        type: ALERT_TOPUP_HIDE
    }
}

export const setAlertTopUpShowAction = (message: string, color: string): AlertTopUpShowActionType => {
    return {
        type: ALERT_TOPUP_SHOW,
        color: color,
        message: message
    };
}

export const clearFilterAction = () : ClearFilterTopUpActionType => {
    return {
        type: CLEAR_FILTER_TOPUP
    }
} 

export const setFilterAction = (filter: Filter) : SetFilterTopUpActionType => {
    return {
        type: SET_FILTER_TOPUP,
        filter: filter
    }
}

export const fetchTopUpAction = (page: number, needApproved: number = 1): ThunkResult<Promise<Boolean>> => {
    return async (dispatch: Dispatch, getState: () => AppState) => {

        const querySearch = queryString.parse(window.location.search);

        const filter: Filter = {
            accountNumber: decodeURIComponent((querySearch.accountNumber as string) || ''),
            name: decodeURIComponent((querySearch.name as string) || ''),
            bankName: decodeURIComponent((querySearch.bankName as string) || ''),
            needApproved: decodeURIComponent((querySearch.needApproved as string) || ''),
            isManual: decodeURIComponent((querySearch.isManual as string) || ''),
        }

        let paramsObject: OptionObjectString = {
            page: page.toString(),
            ...filter
        }

        return await axiosService.get(process.env.REACT_APP_API_URL + `/web/financial-manager/topup/list`, {
                params: paramsObject
            })
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccessList<TopUpList> = response.data;

                dispatch(setFetchTopUpSuccessAction(data.result));

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
                dispatch(setFetchTopUpErrorAction());

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


export const fetchListTopUpAction = (search: string, page: number): ThunkResult<Promise<ApiResponseList<TopUpList>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        let paramsObject: OptionObjectString = {
            page: page.toString(),
            name: search
        }

        const params = objectToParamsUrl(paramsObject)
       
        return axiosService.get(process.env.REACT_APP_API_URL + `/web/financial-manager/topup?${params}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccessList<TopUpList> = response.data;

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

export const createTopUpAction = (topUp: TopUpCreateField): ThunkResult<Promise<ApiResponse<TopUpCreateResult>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.post(process.env.REACT_APP_API_URL + '/web/financial-manager/topup', topUp)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<TopUpCreateResult> = response.data;
                
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

export const findTopUpAction = (id: number): ThunkResult<Promise<ApiResponse<TopUpShow>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.get(process.env.REACT_APP_API_URL + `/web/financial-manager/topup/detail/${id}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<TopUpShow> = response.data;

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

export const editTopUpAction = (topUp: TopUpEditField, id: number): ThunkResult<Promise<ApiResponse<TopUpEditResult>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.patch(process.env.REACT_APP_API_URL + `/web/financial-manager/topup/${id}`, topUp)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<TopUpEditResult> = response.data;
                
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


export const deleteTopUpAction = (id: number): ThunkResult<Promise<ApiResponse<TopUp>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.delete(process.env.REACT_APP_API_URL + `/web/financial-manager/topup/${id}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<TopUp> = response.data;

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

export const approveTopUpAction = (id: number): ThunkResult<Promise<ApiResponse<TopUpApprove>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.post(process.env.REACT_APP_API_URL + `/web/financial-manager/topup/${id}/approved`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<TopUpApprove> = response.data;

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