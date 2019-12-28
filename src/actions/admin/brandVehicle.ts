import axiosService from '../../services/axiosService';
import { Dispatch } from "redux";
import { Paginator } from '../../types/paginator';
import { AppState } from "../../store/configureStore";
import {
    BrandVehicle,
    SET_PAGINATOR_BRAND_VEHICLE,
    FETCH_BRAND_VEHICLE_SUCCESS,
    FETCH_BRAND_VEHICLE_ERROR,
    SetPaginatorBrandVehicleActionType,
    FetchBrandVehicleActionType,
    FetchBrandVehicleErrorActionType,
    FetchBrandVehicleSuccessActionType,
    BrandVehicleCreate,
    BrandVehicleEdit,
    AlertBrandVehicleHideActionType,
    ALERT_BRAND_VEHICLE_HIDE,
    AlertBrandVehicleShowActionType,
    ALERT_BRAND_VEHICLE_SHOW,
    BrandVehicleCreateResult,
    BrandVehicleEditResult
} from '../../types/admin/brandVehicle';
import { AxiosResponse, AxiosError } from 'axios';
import { ApiResponse, ApiResponseList, ApiResponseError, ApiResponseSuccess, ApiResponseSuccessList } from '../../types/api';
import { ThunkResult } from '../../types/thunk';

export const setPaginateAction = (paginate: Paginator): SetPaginatorBrandVehicleActionType => {
    return {
        type: SET_PAGINATOR_BRAND_VEHICLE,
        paginate: paginate
    }
}

export const setFetchBrandVehicleSuccessAction = (list: BrandVehicle[]): FetchBrandVehicleSuccessActionType => {
    return {
        type: FETCH_BRAND_VEHICLE_SUCCESS,
        list: list
    }
}

export const setFetchBrandVehicleErrorAction = (): FetchBrandVehicleErrorActionType => {
    return {
        type: FETCH_BRAND_VEHICLE_ERROR
    }
}

export const setAlertBrandVehicleHideAction = (): AlertBrandVehicleHideActionType => {
    return {
        type: ALERT_BRAND_VEHICLE_HIDE
    }
}

export const setAlertBrandVehicleShowAction = (message: string, color: string): AlertBrandVehicleShowActionType => {
    return {
        type: ALERT_BRAND_VEHICLE_SHOW,
        color: color,
        message: message
    };
}

export const fetchBrandVehicleAction = (page: number) => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        axiosService.get(`/api_linkaran/v1/web/brand-vehicle?page=${page}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccessList<BrandVehicle> = response.data;

                dispatch(setFetchBrandVehicleSuccessAction(data.result));

                if (data.metaData.paginate) {
                    
                    const paginate = data.metaData.paginate as Paginator;

                    dispatch(setPaginateAction({
                        total: paginate.total,
                        currentPage: paginate.currentPage,
                        itemCount: paginate.itemCount,
                        pageCount: paginate.pageCount
                    }))
                }
            })
            .catch( (error: AxiosError) => {
                dispatch(setFetchBrandVehicleErrorAction());

                dispatch(setPaginateAction({
                    total: 0,
                    currentPage: 0,
                    itemCount: 0,
                    pageCount: 0
                }))
            })
    }
}

export const fetchListBrandVehicleAction = (search: string, page: number): ThunkResult<Promise<ApiResponseList<BrandVehicle>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.get(`/api_linkaran/v1/web/brand-vehicle?page=${page}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccessList<BrandVehicle> = response.data;

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

export const createBrandVehicleAction = (brandVehicle: BrandVehicleCreate): ThunkResult<Promise<ApiResponse<BrandVehicleCreateResult>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.post('/api_linkaran/v1/web/brand-vehicle', brandVehicle)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<BrandVehicleCreateResult> = response.data;
                
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

export const findBrandVehicleAction = (id: number): ThunkResult<Promise<ApiResponse<BrandVehicle>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.get(`/api_linkaran/v1/web/brand-vehicle/${id}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<BrandVehicle> = response.data;

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

export const editBrandVehicleAction = (brandVehicle: BrandVehicleEdit, id: number): ThunkResult<Promise<ApiResponse<BrandVehicleEditResult>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.patch(`/api_linkaran/v1/web/brand-vehicle/${id}`, brandVehicle)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<BrandVehicleEditResult> = response.data;
                
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


export const deleteBrandVehicleAction = (id: number): ThunkResult<Promise<ApiResponse<BrandVehicle>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.delete(`/api_linkaran/v1/web/brand-vehicle/${id}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<BrandVehicle> = response.data;

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
