import axiosService from '../../../services/axiosService';
import { Dispatch } from "redux";
import { Paginator } from '../../../types/paginator';
import { AppState } from "../../../store/configureStore";
import {
    SubDistrict,
    SET_PAGINATOR_SUB_DISTRICT,
    FETCH_SUB_DISTRICT_SUCCESS,
    FETCH_SUB_DISTRICT_ERROR,
    SetPaginatorSubDistrictActionType,
    FetchSubDistrictActionType,
    FetchSubDistrictErrorActionType,
    FetchSubDistrictSuccessActionType,
    SubDistrictCreateField,
    SubDistrictEditField,
    AlertSubDistrictHideActionType,
    ALERT_SUB_DISTRICT_HIDE,
    AlertSubDistrictShowActionType,
    ALERT_SUB_DISTRICT_SHOW,
    SubDistrictEditResult,
    SubDistrictCreateResult,
    SubDistrictList,
    SubDistrictShow,
    Filter,
    SetFilterSubDistrictActionType,
    SET_FILTER_SUB_DISTRICT,
    ClearFilterSubDistrictActionType,
    CLEAR_FILTER_SUB_DISTRICT
} from '../../../types/admin/region/subDistrict';
import { AxiosResponse, AxiosError } from 'axios';
import { ApiResponse, ApiResponseList, ApiResponseError, ApiResponseSuccess, ApiResponseSuccessList } from '../../../types/api';
import * as dotenv from 'dotenv';
import { ThunkResult } from '../../../types/thunk'
import { OptionObjectNumber, objectToParamsUrl, OptionObjectString } from '../../../helpers/utils';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../../../types';
dotenv.config();
import queryString from 'query-string'

export const setPaginateAction = (paginate: Paginator): SetPaginatorSubDistrictActionType => {
    return {
        type: SET_PAGINATOR_SUB_DISTRICT,
        paginate: paginate
    }
}

export const setFetchSubDistrictSuccessAction = (list: SubDistrictList[]): FetchSubDistrictSuccessActionType => {
    return {
        type: FETCH_SUB_DISTRICT_SUCCESS,
        list: list
    }
}

export const setFetchSubDistrictErrorAction = (): FetchSubDistrictErrorActionType => {
    return {
        type: FETCH_SUB_DISTRICT_ERROR
    }
}

export const setAlertSubDistrictHideAction = (): AlertSubDistrictHideActionType => {
    return {
        type: ALERT_SUB_DISTRICT_HIDE
    }
}

export const setAlertSubDistrictShowAction = (message: string, color: string): AlertSubDistrictShowActionType => {
    return {
        type: ALERT_SUB_DISTRICT_SHOW,
        color: color,
        message: message
    };
}

export const clearFilterAction = () : ClearFilterSubDistrictActionType => {
    return {
        type: CLEAR_FILTER_SUB_DISTRICT
    }
} 

export const setFilterAction = (filter: Filter) : SetFilterSubDistrictActionType => {
    return {
        type: SET_FILTER_SUB_DISTRICT,
        filter: filter
    }
}

export const fetchSubDistrictAction = (page: number): ThunkResult<Promise<Boolean>> => {
    return async (dispatch: Dispatch, getState: () => AppState) => {

        const querySearch = queryString.parse(window.location.search);

        const filter: Filter = {
            name: (querySearch.name as string) || '',
            districtName: (querySearch.districtName as string) || '',
        }

        let paramsObject: OptionObjectString = {
            page: page.toString(),
            ...filter
        }

        return await axiosService.get(process.env.REACT_APP_API_URL + `/web/region-sub-district`, {
                params: paramsObject
            })
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccessList<SubDistrictList> = response.data;

                dispatch(setFetchSubDistrictSuccessAction(data.result));

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
                dispatch(setFetchSubDistrictErrorAction());

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


export const fetchListSubDistrictAction = (search: string, page: number, districtId?: number): ThunkResult<Promise<ApiResponseList<SubDistrictList>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        
        let paramsObject: OptionObjectString = {
            page: page.toString(),
            name: search
        }

        if (districtId) {
            paramsObject = {
                ...paramsObject,
                districtId: districtId.toString()
            }
        }

        const params = objectToParamsUrl(paramsObject)
        
        return axiosService.get(process.env.REACT_APP_API_URL + `/web/region-sub-district?${params}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccessList<SubDistrictList> = response.data;

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

export const createSubDistrictAction = (subDistrict: SubDistrictCreateField): ThunkResult<Promise<ApiResponse<SubDistrictCreateResult>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.post(process.env.REACT_APP_API_URL + '/web/region-sub-district', subDistrict)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<SubDistrictCreateResult> = response.data;
                
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

export const findSubDistrictAction = (id: number): ThunkResult<Promise<ApiResponse<SubDistrictShow>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.get(process.env.REACT_APP_API_URL + `/web/region-sub-district/${id}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<SubDistrictShow> = response.data;

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

export const editSubDistrictAction = (subDistrict: SubDistrictEditField, id: number): ThunkResult<Promise<ApiResponse<SubDistrictEditResult>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.patch(process.env.REACT_APP_API_URL + `/web/region-sub-district/${id}`, subDistrict)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<SubDistrictEditResult> = response.data;
                
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


export const deleteSubDistrictAction = (id: number): ThunkResult<Promise<ApiResponse<SubDistrict>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.delete(process.env.REACT_APP_API_URL + `/web/region-sub-district/${id}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<SubDistrict> = response.data;

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
