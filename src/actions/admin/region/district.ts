import axiosService from '../../../services/axiosService';
import { Dispatch } from "redux";
import { Paginator } from '../../../types/paginator';
import { AppState } from "../../../store/configureStore";
import {
    District,
    SET_PAGINATOR_DISTRICT,
    FETCH_DISTRICT_SUCCESS,
    FETCH_DISTRICT_ERROR,
    SetPaginatorDistrictActionType,
    FetchDistrictActionType,
    FetchDistrictErrorActionType,
    FetchDistrictSuccessActionType,
    DistrictCreateField,
    DistrictEditField,
    AlertDistrictHideActionType,
    ALERT_DISTRICT_HIDE,
    AlertDistrictShowActionType,
    ALERT_DISTRICT_SHOW,
    DistrictEditResult,
    DistrictCreateResult,
    DistrictList,
    DistrictShow
} from '../../../types/admin/region/district';
import { AxiosResponse, AxiosError } from 'axios';
import { ApiResponse, ApiResponseList, ApiResponseError, ApiResponseSuccess, ApiResponseSuccessList } from '../../../types/api';
import * as dotenv from 'dotenv';
import { ThunkResult } from '../../../types/thunk'
dotenv.config();

export const setPaginateAction = (paginate: Paginator): SetPaginatorDistrictActionType => {
    return {
        type: SET_PAGINATOR_DISTRICT,
        paginate: paginate
    }
}

export const setFetchDistrictSuccessAction = (list: DistrictList[]): FetchDistrictSuccessActionType => {
    return {
        type: FETCH_DISTRICT_SUCCESS,
        list: list
    }
}

export const setFetchDistrictErrorAction = (): FetchDistrictErrorActionType => {
    return {
        type: FETCH_DISTRICT_ERROR
    }
}

export const setAlertDistrictHideAction = (): AlertDistrictHideActionType => {
    return {
        type: ALERT_DISTRICT_HIDE
    }
}

export const setAlertDistrictShowAction = (message: string, color: string): AlertDistrictShowActionType => {
    return {
        type: ALERT_DISTRICT_SHOW,
        color: color,
        message: message
    };
}


export const fetchDistrictAction = (page: number): ThunkResult<Promise<Boolean>> => {
    return async (dispatch: Dispatch, getState: () => AppState) => {
        return await axiosService.get(process.env.REACT_APP_API_URL + `/web/region-district?page=${page}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccessList<DistrictList> = response.data;

                dispatch(setFetchDistrictSuccessAction(data.result));

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
                dispatch(setFetchDistrictErrorAction());

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


export const fetchListDistrictAction = (search: string, page: number): ThunkResult<Promise<ApiResponseList<DistrictList>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.get(process.env.REACT_APP_API_URL + `/web/region-district?page=${page}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccessList<DistrictList> = response.data;

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

export const createDistrictAction = (district: DistrictCreateField): ThunkResult<Promise<ApiResponse<DistrictCreateResult>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.post(process.env.REACT_APP_API_URL + '/web/region-district', district)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<DistrictCreateResult> = response.data;
                
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

export const findDistrictAction = (id: number): ThunkResult<Promise<ApiResponse<DistrictShow>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.get(process.env.REACT_APP_API_URL + `/web/region-district/${id}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<DistrictShow> = response.data;

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

export const editDistrictAction = (district: DistrictEditField, id: number): ThunkResult<Promise<ApiResponse<DistrictEditResult>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.patch(process.env.REACT_APP_API_URL + `/web/region-district/${id}`, district)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<DistrictEditResult> = response.data;
                
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


export const deleteDistrictAction = (id: number): ThunkResult<Promise<ApiResponse<District>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.delete(process.env.REACT_APP_API_URL + `/web/region-district/${id}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<District> = response.data;

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
