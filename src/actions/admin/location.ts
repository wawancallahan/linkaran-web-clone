import { AxiosResponse, AxiosError } from 'axios';
import { ApiResponse, ApiResponseList, ApiResponseError, ApiResponseSuccess, ApiResponseSuccessList } from '../../types/api';
import { ThunkResult } from '../../types/thunk';
import axiosService from '../../services/axiosService';
import { Dispatch } from "redux";
import { AppState } from "../../store/configureStore";

import {
    Negara,
    Provinsi,
    KabupatenKota,
    Kecamatan,
    Kelurahan
} from '../../types/admin/location';
import * as dotenv from 'dotenv';
dotenv.config();

export const fetchListNegaraAction = (search: string, page: number): ThunkResult<Promise<ApiResponseList<Negara>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.get(process.env.REACT_APP_API_URL + `/v1/web/location/country?page=${page}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccessList<Negara> = response.data;

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

export const fetchListProvinsiAction = (search: string, page: number, id: number): ThunkResult<Promise<ApiResponseList<Provinsi>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.get(process.env.REACT_APP_API_URL + `/v1/web/location/province/${id}?page=${page}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccessList<Provinsi> = response.data;

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

export const fetchListKabupatenKotaAction = (search: string, page: number, id: number): ThunkResult<Promise<ApiResponseList<KabupatenKota>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.get(process.env.REACT_APP_API_URL + `/v1/web/location/district/${id}?page=${page}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccessList<KabupatenKota> = response.data;

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

export const fetchListKecamatanAction = (search: string, page: number, id: number): ThunkResult<Promise<ApiResponseList<Kecamatan>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.get(process.env.REACT_APP_API_URL + `/v1/web/location/sub-district/${id}?page=${page}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccessList<Kecamatan> = response.data;

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

export const fetchListKelurahanAction = (search: string, page: number, id: number): ThunkResult<Promise<ApiResponseList<Kelurahan>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.get(process.env.REACT_APP_API_URL + `/v1/web/location/village/${id}?page=${page}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccessList<Kelurahan> = response.data;

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