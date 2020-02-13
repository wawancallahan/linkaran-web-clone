import axiosService from '../../../services/axiosService';
import { Dispatch } from "redux";
import { Paginator } from '../../../types/paginator';
import { AppState } from "../../../store/configureStore";
import {
    Country,
    SET_PAGINATOR_COUNTRY,
    FETCH_COUNTRY_SUCCESS,
    FETCH_COUNTRY_ERROR,
    SetPaginatorCountryActionType,
    FetchCountryActionType,
    FetchCountryErrorActionType,
    FetchCountrySuccessActionType,
    CountryCreateField,
    CountryEditField,
    AlertCountryHideActionType,
    ALERT_COUNTRY_HIDE,
    AlertCountryShowActionType,
    ALERT_COUNTRY_SHOW,
    CountryEditResult,
    CountryCreateResult,
    CountryList,
    CountryShow
} from '../../../types/admin/region/country';
import { AxiosResponse, AxiosError } from 'axios';
import { ApiResponse, ApiResponseList, ApiResponseError, ApiResponseSuccess, ApiResponseSuccessList } from '../../../types/api';
import * as dotenv from 'dotenv';
import { ThunkResult } from '../../../types/thunk'
dotenv.config();

export const setPaginateAction = (paginate: Paginator): SetPaginatorCountryActionType => {
    return {
        type: SET_PAGINATOR_COUNTRY,
        paginate: paginate
    }
}

export const setFetchCountrySuccessAction = (list: CountryList[]): FetchCountrySuccessActionType => {
    return {
        type: FETCH_COUNTRY_SUCCESS,
        list: list
    }
}

export const setFetchCountryErrorAction = (): FetchCountryErrorActionType => {
    return {
        type: FETCH_COUNTRY_ERROR
    }
}

export const setAlertCountryHideAction = (): AlertCountryHideActionType => {
    return {
        type: ALERT_COUNTRY_HIDE
    }
}

export const setAlertCountryShowAction = (message: string, color: string): AlertCountryShowActionType => {
    return {
        type: ALERT_COUNTRY_SHOW,
        color: color,
        message: message
    };
}


export const fetchCountryAction = (page: number): ThunkResult<Promise<Boolean>> => {
    return async (dispatch: Dispatch, getState: () => AppState) => {
        return await axiosService.get(process.env.REACT_APP_API_URL + `/web/region-country?page=${page}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccessList<CountryList> = response.data;

                dispatch(setFetchCountrySuccessAction(data.result));

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
                dispatch(setFetchCountryErrorAction());

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


export const fetchListCountryAction = (search: string, page: number): ThunkResult<Promise<ApiResponseList<CountryList>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.get(process.env.REACT_APP_API_URL + `/web/region-country?page=${page}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccessList<CountryList> = response.data;

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

export const createCountryAction = (country: CountryCreateField): ThunkResult<Promise<ApiResponse<CountryCreateResult>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.post(process.env.REACT_APP_API_URL + '/web/region-country', country)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<CountryCreateResult> = response.data;
                
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

export const findCountryAction = (id: number): ThunkResult<Promise<ApiResponse<CountryShow>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.get(process.env.REACT_APP_API_URL + `/web/region-country/${id}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<CountryShow> = response.data;

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

export const editCountryAction = (country: CountryEditField, id: number): ThunkResult<Promise<ApiResponse<CountryEditResult>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.patch(process.env.REACT_APP_API_URL + `/web/region-country/${id}`, country)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<CountryEditResult> = response.data;
                
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


export const deleteCountryAction = (id: number): ThunkResult<Promise<ApiResponse<Country>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.delete(process.env.REACT_APP_API_URL + `/web/region-country/${id}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<Country> = response.data;

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
