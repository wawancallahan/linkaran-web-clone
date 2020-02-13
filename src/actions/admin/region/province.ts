import axiosService from '../../../services/axiosService';
import { Dispatch } from "redux";
import { Paginator } from '../../../types/paginator';
import { AppState } from "../../../store/configureStore";
import {
    Province,
    SET_PAGINATOR_PROVINCE,
    FETCH_PROVINCE_SUCCESS,
    FETCH_PROVINCE_ERROR,
    SetPaginatorProvinceActionType,
    FetchProvinceActionType,
    FetchProvinceErrorActionType,
    FetchProvinceSuccessActionType,
    ProvinceCreateField,
    ProvinceEditField,
    AlertProvinceHideActionType,
    ALERT_PROVINCE_HIDE,
    AlertProvinceShowActionType,
    ALERT_PROVINCE_SHOW,
    ProvinceEditResult,
    ProvinceCreateResult,
    ProvinceList,
    ProvinceShow
} from '../../../types/admin/region/province';
import { AxiosResponse, AxiosError } from 'axios';
import { ApiResponse, ApiResponseList, ApiResponseError, ApiResponseSuccess, ApiResponseSuccessList } from '../../../types/api';
import * as dotenv from 'dotenv';
import { ThunkResult } from '../../../types/thunk'
dotenv.config();

export const setPaginateAction = (paginate: Paginator): SetPaginatorProvinceActionType => {
    return {
        type: SET_PAGINATOR_PROVINCE,
        paginate: paginate
    }
}

export const setFetchProvinceSuccessAction = (list: ProvinceList[]): FetchProvinceSuccessActionType => {
    return {
        type: FETCH_PROVINCE_SUCCESS,
        list: list
    }
}

export const setFetchProvinceErrorAction = (): FetchProvinceErrorActionType => {
    return {
        type: FETCH_PROVINCE_ERROR
    }
}

export const setAlertProvinceHideAction = (): AlertProvinceHideActionType => {
    return {
        type: ALERT_PROVINCE_HIDE
    }
}

export const setAlertProvinceShowAction = (message: string, color: string): AlertProvinceShowActionType => {
    return {
        type: ALERT_PROVINCE_SHOW,
        color: color,
        message: message
    };
}


export const fetchProvinceAction = (page: number): ThunkResult<Promise<Boolean>> => {
    return async (dispatch: Dispatch, getState: () => AppState) => {
        return await axiosService.get(process.env.REACT_APP_API_URL + `/web/region-province?page=${page}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccessList<ProvinceList> = response.data;

                dispatch(setFetchProvinceSuccessAction(data.result));

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
                dispatch(setFetchProvinceErrorAction());

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


export const fetchListProvinceAction = (search: string, page: number): ThunkResult<Promise<ApiResponseList<ProvinceList>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.get(process.env.REACT_APP_API_URL + `/web/region-province?page=${page}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccessList<ProvinceList> = response.data;

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

export const createProvinceAction = (province: ProvinceCreateField): ThunkResult<Promise<ApiResponse<ProvinceCreateResult>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.post(process.env.REACT_APP_API_URL + '/web/region-province', province)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<ProvinceCreateResult> = response.data;
                
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

export const findProvinceAction = (id: number): ThunkResult<Promise<ApiResponse<ProvinceShow>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.get(process.env.REACT_APP_API_URL + `/web/region-province/${id}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<ProvinceShow> = response.data;

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

export const editProvinceAction = (province: ProvinceEditField, id: number): ThunkResult<Promise<ApiResponse<ProvinceEditResult>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.patch(process.env.REACT_APP_API_URL + `/web/region-province/${id}`, province)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<ProvinceEditResult> = response.data;
                
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


export const deleteProvinceAction = (id: number): ThunkResult<Promise<ApiResponse<Province>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.delete(process.env.REACT_APP_API_URL + `/web/region-province/${id}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<Province> = response.data;

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
