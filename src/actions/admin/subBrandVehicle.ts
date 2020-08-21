import axiosService from '../../services/axiosService';
import { Dispatch } from "redux";
import { Paginator } from '../../types/paginator';
import { AppState } from "../../store/configureStore";
import {
    SubBrandVehicle,
    SubBrandVehicleShow,
    SubBrandVehicleList,
    SET_PAGINATOR_SUB_BRAND_VEHICLE,
    FETCH_SUB_BRAND_VEHICLE_SUCCESS,
    FETCH_SUB_BRAND_VEHICLE_ERROR,
    SetPaginatorSubBrandVehicleActionType,
    FetchSubBrandVehicleActionType,
    FetchSubBrandVehicleErrorActionType,
    FetchSubBrandVehicleSuccessActionType,
    SubBrandVehicleCreateField,
    SubBrandVehicleEditField,
    AlertSubBrandVehicleHideActionType,
    ALERT_SUB_BRAND_VEHICLE_HIDE,
    AlertSubBrandVehicleShowActionType,
    ALERT_SUB_BRAND_VEHICLE_SHOW,
    SubBrandVehicleCreateResult,
    SubBrandVehicleEditResult,
    Filter,
    SetFilterSubBrandVehicleActionType,
    SET_FILTER_SUB_BRAND_VEHICLE,
    ClearFilterSubBrandVehicleActionType,
    CLEAR_FILTER_SUB_BRAND_VEHICLE
} from '../../types/admin/subBrandVehicle';
import { AxiosResponse, AxiosError } from 'axios';
import { ApiResponse, ApiResponseList, ApiResponseError, ApiResponseSuccess, ApiResponseSuccessList } from '../../types/api';
import { ThunkResult } from '../../types/thunk';
import * as dotenv from 'dotenv';
import { OptionObjectString, objectToParamsUrl } from '../../helpers/utils';
dotenv.config();
import queryString from 'query-string'

export const setPaginateAction = (paginate: Paginator): SetPaginatorSubBrandVehicleActionType => {
    return {
        type: SET_PAGINATOR_SUB_BRAND_VEHICLE,
        paginate: paginate
    }
}

export const setFetchSubBrandVehicleSuccessAction = (list: SubBrandVehicle[]): FetchSubBrandVehicleSuccessActionType => {
    return {
        type: FETCH_SUB_BRAND_VEHICLE_SUCCESS,
        list: list
    }
}

export const setFetchSubBrandVehicleErrorAction = (): FetchSubBrandVehicleErrorActionType => {
    return {
        type: FETCH_SUB_BRAND_VEHICLE_ERROR
    }
}

export const setAlertSubBrandVehicleHideAction = (): AlertSubBrandVehicleHideActionType => {
    return {
        type: ALERT_SUB_BRAND_VEHICLE_HIDE
    }
}

export const setAlertSubBrandVehicleShowAction = (message: string, color: string): AlertSubBrandVehicleShowActionType => {
    return {
        type: ALERT_SUB_BRAND_VEHICLE_SHOW,
        color: color,
        message: message
    };
}

export const clearFilterAction = () : ClearFilterSubBrandVehicleActionType => {
    return {
        type: CLEAR_FILTER_SUB_BRAND_VEHICLE
    }
} 

export const setFilterAction = (filter: Filter) : SetFilterSubBrandVehicleActionType => {
    return {
        type: SET_FILTER_SUB_BRAND_VEHICLE,
        filter: filter
    }
}

export const fetchSubBrandVehicleAction = (page: number): ThunkResult<Promise<Boolean>> => {
    return async (dispatch: Dispatch, getState: () => AppState) => {
        
        const querySearch = queryString.parse(window.location.search);

        const filter: Filter = {
            name: decodeURIComponent((querySearch.name as string) || ''),
            brandName: decodeURIComponent((querySearch.brandName as string) || ''),
        }

        let paramsObject: OptionObjectString = {
            page: page.toString(),
            ...filter
        }
        
        return await axiosService.get(process.env.REACT_APP_API_URL + `/web/sub-brand-vehicle`, {
                params: paramsObject
            })
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccessList<SubBrandVehicleList> = response.data;

                dispatch(setFetchSubBrandVehicleSuccessAction(data.result));

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
                dispatch(setFetchSubBrandVehicleErrorAction());

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


export const fetchListSubBrandVehicleAction = (search: string, page: number): ThunkResult<Promise<ApiResponseList<SubBrandVehicleList>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        let paramsObject: OptionObjectString = {
            page: page.toString(),
            name: search
        }

        const params = objectToParamsUrl(paramsObject)
        
        return axiosService.get(process.env.REACT_APP_API_URL + `/web/sub-brand-vehicle?${params}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccessList<SubBrandVehicleList> = response.data;

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

export const createSubBrandVehicleAction = (subBrandVehicle: SubBrandVehicleCreateField): ThunkResult<Promise<ApiResponse<SubBrandVehicleCreateResult>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.post(process.env.REACT_APP_API_URL + '/web/sub-brand-vehicle', subBrandVehicle)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<SubBrandVehicleCreateResult> = response.data;
                
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

export const findSubBrandVehicleAction = (id: number): ThunkResult<Promise<ApiResponse<SubBrandVehicleShow>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.get(process.env.REACT_APP_API_URL + `/web/sub-brand-vehicle/${id}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<SubBrandVehicleShow> = response.data;

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

export const editSubBrandVehicleAction = (subBrandVehicle: SubBrandVehicleEditField, id: number): ThunkResult<Promise<ApiResponse<SubBrandVehicleEditResult>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.patch(process.env.REACT_APP_API_URL + `/web/sub-brand-vehicle/${id}`, subBrandVehicle)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<SubBrandVehicleEditResult> = response.data;
                
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


export const deleteSubBrandVehicleAction = (id: number): ThunkResult<Promise<ApiResponse<SubBrandVehicle>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.delete(process.env.REACT_APP_API_URL + `/web/sub-brand-vehicle/${id}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<SubBrandVehicle> = response.data;

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
