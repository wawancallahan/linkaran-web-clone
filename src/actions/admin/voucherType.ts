import axiosService from '../../services/axiosService';
import { Dispatch } from "redux";
import { Paginator } from '../../types/paginator';
import { AppState } from "../../store/configureStore";
import {
    VoucherType,
    VoucherTypeList,
    VoucherTypeShow,
    SET_PAGINATOR_VOUCHER_TYPE,
    FETCH_VOUCHER_TYPE_SUCCESS,
    FETCH_VOUCHER_TYPE_ERROR,
    SetPaginatorVoucherTypeActionType,
    FetchVoucherTypeActionType,
    FetchVoucherTypeErrorActionType,
    FetchVoucherTypeSuccessActionType,
    VoucherTypeCreateField,
    VoucherTypeEditField,
    AlertVoucherTypeHideActionType,
    ALERT_VOUCHER_TYPE_HIDE,
    AlertVoucherTypeShowActionType,
    ALERT_VOUCHER_TYPE_SHOW,
    VoucherTypeCreateResult,
    VoucherTypeEditResult,
    Filter,
    SetFilterVoucherTypeActionType,
    SET_FILTER_VOUCHER_TYPE,
    ClearFilterVoucherTypeActionType,
    CLEAR_FILTER_VOUCHER_TYPE
} from '../../types/admin/voucherType';
import { AxiosResponse, AxiosError } from 'axios';
import { ApiResponse, ApiResponseList, ApiResponseError, ApiResponseSuccess, ApiResponseSuccessList } from '../../types/api';
import { ThunkResult } from '../../types/thunk';
import * as dotenv from 'dotenv';
dotenv.config();
import queryString from 'query-string'
import { OptionObjectString } from '../../helpers/utils';

export const setPaginateAction = (paginate: Paginator): SetPaginatorVoucherTypeActionType => {
    return {
        type: SET_PAGINATOR_VOUCHER_TYPE,
        paginate: paginate
    }
}

export const setFetchVoucherTypeSuccessAction = (list: VoucherType[]): FetchVoucherTypeSuccessActionType => {
    return {
        type: FETCH_VOUCHER_TYPE_SUCCESS,
        list: list
    }
}

export const setFetchVoucherTypeErrorAction = (): FetchVoucherTypeErrorActionType => {
    return {
        type: FETCH_VOUCHER_TYPE_ERROR
    }
}

export const setAlertVoucherTypeHideAction = (): AlertVoucherTypeHideActionType => {
    return {
        type: ALERT_VOUCHER_TYPE_HIDE
    }
}

export const setAlertVoucherTypeShowAction = (message: string, color: string): AlertVoucherTypeShowActionType => {
    return {
        type: ALERT_VOUCHER_TYPE_SHOW,
        color: color,
        message: message
    };
}

export const clearFilterAction = () : ClearFilterVoucherTypeActionType => {
    return {
        type: CLEAR_FILTER_VOUCHER_TYPE
    }
} 

export const setFilterAction = (filter: Filter) : SetFilterVoucherTypeActionType => {
    return {
        type: SET_FILTER_VOUCHER_TYPE,
        filter: filter
    }
}

export const fetchVoucherTypeAction = (page: number): ThunkResult<Promise<Boolean>> => {
    return async (dispatch: Dispatch, getState: () => AppState) => {
        
        const querySearch = queryString.parse(window.location.search);

        const filter: Filter = {
            name: (querySearch.name as string) || ''
        }

        dispatch(setFilterAction(filter));

        let paramsObject: OptionObjectString = {
            page: page.toString(),
            ...filter
        }
        
        return await axiosService.get(process.env.REACT_APP_API_URL + `/web/voucher-type`, {
                params: paramsObject
            })
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccessList<VoucherTypeList> = response.data;

                dispatch(setFetchVoucherTypeSuccessAction(data.result));

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
                dispatch(setFetchVoucherTypeErrorAction());

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


export const fetchListVoucherTypeAction = (search: string, page: number): ThunkResult<Promise<ApiResponseList<VoucherTypeList>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {

        let paramsObject: OptionObjectString = {
            page: page.toString(),
            name: search
        }

        return axiosService.get(process.env.REACT_APP_API_URL + `/web/voucher-type`, {
                params: paramsObject
            })
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccessList<VoucherTypeList> = response.data;

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

export const createVoucherTypeAction = (voucherType: VoucherTypeCreateField): ThunkResult<Promise<ApiResponse<VoucherTypeCreateResult>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.post(process.env.REACT_APP_API_URL + '/web/voucher-type', voucherType)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<VoucherTypeCreateResult> = response.data;
                
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

export const findVoucherTypeAction = (id: number): ThunkResult<Promise<ApiResponse<VoucherTypeShow>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.get(process.env.REACT_APP_API_URL + `/web/voucher-type/${id}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<VoucherTypeShow> = response.data;

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

export const editVoucherTypeAction = (voucherType: VoucherTypeEditField, id: number): ThunkResult<Promise<ApiResponse<VoucherTypeEditResult>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.patch(process.env.REACT_APP_API_URL + `/web/voucher-type/${id}`, voucherType)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<VoucherTypeEditResult> = response.data;
                
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


export const deleteVoucherTypeAction = (id: number): ThunkResult<Promise<ApiResponse<VoucherType>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.delete(process.env.REACT_APP_API_URL + `/web/voucher-type/${id}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<VoucherType> = response.data;

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
