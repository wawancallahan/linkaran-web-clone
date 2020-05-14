import axiosService from '../../services/axiosService';
import { Dispatch } from "redux";
import { Paginator } from '../../types/paginator';
import { AppState } from "../../store/configureStore";
import {
    WithDraw,
    SET_PAGINATOR_WITHDRAW,
    FETCH_WITHDRAW_SUCCESS,
    FETCH_WITHDRAW_ERROR,
    SetPaginatorWithDrawActionType,
    FetchWithDrawActionType,
    FetchWithDrawErrorActionType,
    FetchWithDrawSuccessActionType,
    WithDrawCreateField,
    WithDrawEditField,
    AlertWithDrawHideActionType,
    ALERT_WITHDRAW_HIDE,
    AlertWithDrawShowActionType,
    ALERT_WITHDRAW_SHOW,
    WithDrawEditResult,
    WithDrawCreateResult,
    WithDrawList,
    WithDrawShow,
    WithDrawApprove,
    Filter,
    SetFilterWithDrawActionType,
    SET_FILTER_WITHDRAW,
    ClearFilterWithDrawActionType,
    CLEAR_FILTER_WITHDRAW
} from '../../types/financialManager/withdraw';
import { AxiosResponse, AxiosError } from 'axios';
import { ApiResponse, ApiResponseList, ApiResponseError, ApiResponseSuccess, ApiResponseSuccessList } from '../../types/api';
import * as dotenv from 'dotenv';
import { ThunkResult } from '../../types/thunk'
import { OptionObjectNumber, objectToParamsUrl, OptionObjectString } from '../../helpers/utils';
dotenv.config();
import queryString from 'query-string'

export const setPaginateAction = (paginate: Paginator): SetPaginatorWithDrawActionType => {
    return {
        type: SET_PAGINATOR_WITHDRAW,
        paginate: paginate
    }
}

export const setFetchWithDrawSuccessAction = (list: WithDrawList[]): FetchWithDrawSuccessActionType => {
    return {
        type: FETCH_WITHDRAW_SUCCESS,
        list: list
    }
}

export const setFetchWithDrawErrorAction = (): FetchWithDrawErrorActionType => {
    return {
        type: FETCH_WITHDRAW_ERROR
    }
}

export const setAlertWithDrawHideAction = (): AlertWithDrawHideActionType => {
    return {
        type: ALERT_WITHDRAW_HIDE
    }
}

export const setAlertWithDrawShowAction = (message: string, color: string): AlertWithDrawShowActionType => {
    return {
        type: ALERT_WITHDRAW_SHOW,
        color: color,
        message: message
    };
}

export const clearFilterAction = () : ClearFilterWithDrawActionType => {
    return {
        type: CLEAR_FILTER_WITHDRAW
    }
} 

export const setFilterAction = (filter: Filter) : SetFilterWithDrawActionType => {
    return {
        type: SET_FILTER_WITHDRAW,
        filter: filter
    }
}

export const fetchWithDrawAction = (page: number, needApproved: number = 1): ThunkResult<Promise<Boolean>> => {
    return async (dispatch: Dispatch, getState: () => AppState) => {

        const querySearch = queryString.parse(window.location.search);

        const filter: Filter = {
            accountNumber: (querySearch.accountNumber as string) || '',
            name: (querySearch.name as string) || '',
            bankName: (querySearch.bankName as string) || '',
            needApproved: (querySearch.needApproved as string) || '',
            isManual: (querySearch.isManual as string) || '',
            isDecline: (querySearch.isDecline as string) || '',
        }

        dispatch(setFilterAction(filter));

        let paramsObject: OptionObjectString = {
            page: page.toString(),
            ...filter
        }

        return await axiosService.get(process.env.REACT_APP_API_URL + `/web/financial-manager/withdraw/list`, {
                params: paramsObject
            })
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccessList<WithDrawList> = response.data;

                dispatch(setFetchWithDrawSuccessAction(data.result));

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
                dispatch(setFetchWithDrawErrorAction());

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


export const fetchListWithDrawAction = (search: string, page: number): ThunkResult<Promise<ApiResponseList<WithDrawList>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        let paramsObject: OptionObjectString = {
            page: page.toString(),
            name: search
        }

        const params = objectToParamsUrl(paramsObject)
       
        return axiosService.get(process.env.REACT_APP_API_URL + `/web/financial-manager/withdraw?${params}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccessList<WithDrawList> = response.data;

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

export const createWithDrawAction = (topUp: WithDrawCreateField): ThunkResult<Promise<ApiResponse<WithDrawCreateResult>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.post(process.env.REACT_APP_API_URL + '/web/financial-manager/withdraw', topUp)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<WithDrawCreateResult> = response.data;
                
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

export const findWithDrawAction = (id: number): ThunkResult<Promise<ApiResponse<WithDrawShow>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.get(process.env.REACT_APP_API_URL + `/web/financial-manager/withdraw/detail/${id}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<WithDrawShow> = response.data;

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

export const editWithDrawAction = (topUp: WithDrawEditField, id: number): ThunkResult<Promise<ApiResponse<WithDrawEditResult>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.patch(process.env.REACT_APP_API_URL + `/web/financial-manager/withdraw/${id}`, topUp)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<WithDrawEditResult> = response.data;
                
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


export const deleteWithDrawAction = (id: number): ThunkResult<Promise<ApiResponse<WithDraw>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.delete(process.env.REACT_APP_API_URL + `/web/financial-manager/withdraw/${id}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<WithDraw> = response.data;

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

export const approveWithDrawAction = (id: number): ThunkResult<Promise<ApiResponse<WithDrawApprove>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.post(process.env.REACT_APP_API_URL + `/web/financial-manager/withdraw/${id}/approved`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<WithDrawApprove> = response.data;

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