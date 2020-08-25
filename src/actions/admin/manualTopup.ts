import axiosService from '../../services/axiosService';
import { Dispatch } from "redux";
import { Paginator } from '../../types/paginator';
import { AppState } from "../../reducers";
import {
    ManualTopUp,
    SET_PAGINATOR_MANUAL_TOPUP,
    FETCH_MANUAL_TOPUP_SUCCESS,
    FETCH_MANUAL_TOPUP_ERROR,
    SetPaginatorManualTopUpActionType,
    FetchManualTopUpActionType,
    FetchManualTopUpErrorActionType,
    FetchManualTopUpSuccessActionType,
    ManualTopUpCreateField,
    ManualTopUpEditField,
    AlertManualTopUpHideActionType,
    ALERT_MANUAL_TOPUP_HIDE,
    AlertManualTopUpShowActionType,
    ALERT_MANUAL_TOPUP_SHOW,
    ManualTopUpEditResult,
    ManualTopUpCreateResult,
    ManualTopUpList,
    ManualTopUpShow,
    Filter,
    SetFilterManualTopUpActionType,
    SET_FILTER_MANUAL_TOPUP,
    ClearFilterManualTopUpActionType,
    CLEAR_FILTER_MANUAL_TOPUP
} from '../../types/admin/manualTopup';
import { AxiosResponse, AxiosError } from 'axios';
import { ApiResponse, ApiResponseList, ApiResponseError, ApiResponseSuccess, ApiResponseSuccessList } from '../../types/api';
import * as dotenv from 'dotenv';
import { ThunkResult } from '../../types/thunk'
import { OptionObjectNumber, objectToParamsUrl, OptionObjectString } from '../../helpers/utils';
dotenv.config();
import queryString from 'query-string'

export const setPaginateAction = (paginate: Paginator): SetPaginatorManualTopUpActionType => {
    return {
        type: SET_PAGINATOR_MANUAL_TOPUP,
        paginate: paginate
    }
}

export const setFetchManualTopUpSuccessAction = (list: ManualTopUpList[]): FetchManualTopUpSuccessActionType => {
    return {
        type: FETCH_MANUAL_TOPUP_SUCCESS,
        list: list
    }
}

export const setFetchManualTopUpErrorAction = (): FetchManualTopUpErrorActionType => {
    return {
        type: FETCH_MANUAL_TOPUP_ERROR
    }
}

export const setAlertManualTopUpHideAction = (): AlertManualTopUpHideActionType => {
    return {
        type: ALERT_MANUAL_TOPUP_HIDE
    }
}

export const setAlertManualTopUpShowAction = (message: string, color: string): AlertManualTopUpShowActionType => {
    return {
        type: ALERT_MANUAL_TOPUP_SHOW,
        color: color,
        message: message
    };
}

export const clearFilterAction = () : ClearFilterManualTopUpActionType => {
    return {
        type: CLEAR_FILTER_MANUAL_TOPUP
    }
} 

export const setFilterAction = (filter: Filter) : SetFilterManualTopUpActionType => {
    return {
        type: SET_FILTER_MANUAL_TOPUP,
        filter: filter
    }
}

export const fetchManualTopUpAction = (page: number): ThunkResult<Promise<Boolean>> => {
    return async (dispatch: Dispatch, getState: () => AppState) => {

        const querySearch = queryString.parse(window.location.search);

        const filter: Filter = {
            accountNumber: decodeURIComponent((querySearch.accountNumber as string) || ''),
            accountName: decodeURIComponent((querySearch.accountName as string) || ''),
            bankName: decodeURIComponent((querySearch.bankName as string) || ''),
        }

        let paramsObject: OptionObjectString = {
            page: page.toString(),
            ...filter
        }

        return await axiosService.get(process.env.REACT_APP_API_URL + `/web/topup-manual-driver`, {
                params: paramsObject
            })
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccessList<ManualTopUpList> = response.data;

                dispatch(setFetchManualTopUpSuccessAction(data.result));

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
                dispatch(setFetchManualTopUpErrorAction());

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


export const fetchListManualTopUpAction = (search: string, page: number): ThunkResult<Promise<ApiResponseList<ManualTopUpList>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        let paramsObject: OptionObjectString = {
            page: page.toString(),
            name: search
        }

        const params = objectToParamsUrl(paramsObject)
       
        return axiosService.get(process.env.REACT_APP_API_URL + `/web/topup-manual-driver?${params}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccessList<ManualTopUpList> = response.data;

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

export const createManualTopUpAction = (topUp: ManualTopUpCreateField): ThunkResult<Promise<ApiResponse<ManualTopUpCreateResult>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        
        const data = new FormData;

        if (topUp.image) {
            data.append('image', topUp.image);
        }

        data.set('amount', topUp.amount)
        data.set('driverProfileId', topUp.driverProfile.id.toString())
        data.set('bankId', topUp.bank.id.toString())
        
        return axiosService.post(process.env.REACT_APP_API_URL + '/web/topup-manual-driver', data, {
                headers: {
                    'Content-Type': 'multipart/form-data' 
                }
            })
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<ManualTopUpCreateResult> = response.data;
                
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

export const findManualTopUpAction = (id: number): ThunkResult<Promise<ApiResponse<ManualTopUpShow>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.get(process.env.REACT_APP_API_URL + `/web/topup-manual-driver/${id}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<ManualTopUpShow> = response.data;

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

export const editManualTopUpAction = (topUp: ManualTopUpEditField, id: number): ThunkResult<Promise<ApiResponse<ManualTopUpEditResult>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {

        const data = new FormData;

        if (topUp.image) {
            data.append('image', topUp.image);
        }

        data.set('amount', topUp.amount)
        data.set('driverProfileId', topUp.driverProfile.id.toString())
        data.set('bankId', topUp.bank.id.toString())
        
        return axiosService.patch(process.env.REACT_APP_API_URL + `/web/topup-manual-driver/${id}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data' 
                }
            })
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<ManualTopUpEditResult> = response.data;
                
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


export const deleteManualTopUpAction = (id: number): ThunkResult<Promise<ApiResponse<ManualTopUp>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.delete(process.env.REACT_APP_API_URL + `/web/topup-manual-driver/${id}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<ManualTopUp> = response.data;

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