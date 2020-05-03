import axiosService from '../../services/axiosService';
import { Dispatch } from "redux";
import { Paginator } from '../../types/paginator';
import { AppState } from "../../store/configureStore";
import {
    ManualWithDraw,
    SET_PAGINATOR_MANUAL_WITHDRAW,
    FETCH_MANUAL_WITHDRAW_SUCCESS,
    FETCH_MANUAL_WITHDRAW_ERROR,
    SetPaginatorManualWithDrawActionType,
    FetchManualWithDrawActionType,
    FetchManualWithDrawErrorActionType,
    FetchManualWithDrawSuccessActionType,
    ManualWithDrawCreateField,
    ManualWithDrawEditField,
    AlertManualWithDrawHideActionType,
    ALERT_MANUAL_WITHDRAW_HIDE,
    AlertManualWithDrawShowActionType,
    ALERT_MANUAL_WITHDRAW_SHOW,
    ManualWithDrawEditResult,
    ManualWithDrawCreateResult,
    ManualWithDrawList,
    ManualWithDrawShow,
} from '../../types/admin/manualWithdraw';
import { AxiosResponse, AxiosError } from 'axios';
import { ApiResponse, ApiResponseList, ApiResponseError, ApiResponseSuccess, ApiResponseSuccessList } from '../../types/api';
import * as dotenv from 'dotenv';
import { ThunkResult } from '../../types/thunk'
import { OptionObjectNumber, objectToParamsUrl, OptionObjectString } from '../../helpers/utils';
dotenv.config();

export const setPaginateAction = (paginate: Paginator): SetPaginatorManualWithDrawActionType => {
    return {
        type: SET_PAGINATOR_MANUAL_WITHDRAW,
        paginate: paginate
    }
}

export const setFetchManualWithDrawSuccessAction = (list: ManualWithDrawList[]): FetchManualWithDrawSuccessActionType => {
    return {
        type: FETCH_MANUAL_WITHDRAW_SUCCESS,
        list: list
    }
}

export const setFetchManualWithDrawErrorAction = (): FetchManualWithDrawErrorActionType => {
    return {
        type: FETCH_MANUAL_WITHDRAW_ERROR
    }
}

export const setAlertManualWithDrawHideAction = (): AlertManualWithDrawHideActionType => {
    return {
        type: ALERT_MANUAL_WITHDRAW_HIDE
    }
}

export const setAlertManualWithDrawShowAction = (message: string, color: string): AlertManualWithDrawShowActionType => {
    return {
        type: ALERT_MANUAL_WITHDRAW_SHOW,
        color: color,
        message: message
    };
}


export const fetchManualWithDrawAction = (page: number): ThunkResult<Promise<Boolean>> => {
    return async (dispatch: Dispatch, getState: () => AppState) => {

        let paramsObject: OptionObjectString = {
            page: page.toString()
        }

        const params = objectToParamsUrl(paramsObject)

        return await axiosService.get(process.env.REACT_APP_API_URL + `/web/withdraw-manual-driver?${params}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccessList<ManualWithDrawList> = response.data;

                dispatch(setFetchManualWithDrawSuccessAction(data.result));

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
                dispatch(setFetchManualWithDrawErrorAction());

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


export const fetchListManualWithDrawAction = (search: string, page: number): ThunkResult<Promise<ApiResponseList<ManualWithDrawList>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        let paramsObject: OptionObjectString = {
            page: page.toString(),
            name: search
        }

        const params = objectToParamsUrl(paramsObject)
       
        return axiosService.get(process.env.REACT_APP_API_URL + `/web/withdraw-manual-driver?${params}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccessList<ManualWithDrawList> = response.data;

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

export const createManualWithDrawAction = (topUp: ManualWithDrawCreateField): ThunkResult<Promise<ApiResponse<ManualWithDrawCreateResult>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.post(process.env.REACT_APP_API_URL + '/web/withdraw-manual-driver', topUp, {
                headers: {
                    'Content-Type': 'multipart/form-data' 
                }
            })
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<ManualWithDrawCreateResult> = response.data;
                
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

export const findManualWithDrawAction = (id: number): ThunkResult<Promise<ApiResponse<ManualWithDrawShow>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.get(process.env.REACT_APP_API_URL + `/web/withdraw-manual-driver/${id}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<ManualWithDrawShow> = response.data;

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

export const editManualWithDrawAction = (topUp: ManualWithDrawEditField, id: number): ThunkResult<Promise<ApiResponse<ManualWithDrawEditResult>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.patch(process.env.REACT_APP_API_URL + `/web/withdraw-manual-driver/${id}`, topUp, {
                headers: {
                    'Content-Type': 'multipart/form-data' 
                }
            })
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<ManualWithDrawEditResult> = response.data;
                
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


export const deleteManualWithDrawAction = (id: number): ThunkResult<Promise<ApiResponse<ManualWithDraw>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.delete(process.env.REACT_APP_API_URL + `/web/withdraw-manual-driver/${id}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<ManualWithDraw> = response.data;

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