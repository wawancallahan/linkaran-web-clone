import axiosService from '../../../services/axiosService';
import { Dispatch } from "redux";
import { Paginator } from '../../../types/paginator';
import { AppState } from "../../../store/configureStore";
import {
    Village,
    SET_PAGINATOR_VILLAGE,
    FETCH_VILLAGE_SUCCESS,
    FETCH_VILLAGE_ERROR,
    SetPaginatorVillageActionType,
    FetchVillageActionType,
    FetchVillageErrorActionType,
    FetchVillageSuccessActionType,
    VillageCreateField,
    VillageEditField,
    AlertVillageHideActionType,
    ALERT_VILLAGE_HIDE,
    AlertVillageShowActionType,
    ALERT_VILLAGE_SHOW,
    VillageEditResult,
    VillageCreateResult,
    VillageList,
    VillageShow
} from '../../../types/admin/region/village';
import { AxiosResponse, AxiosError } from 'axios';
import { ApiResponse, ApiResponseList, ApiResponseError, ApiResponseSuccess, ApiResponseSuccessList } from '../../../types/api';
import * as dotenv from 'dotenv';
import { ThunkResult } from '../../../types/thunk'
import { OptionObjectNumber, objectToParamsUrl, OptionObjectString } from '../../../helpers/utils'
dotenv.config();

export const setPaginateAction = (paginate: Paginator): SetPaginatorVillageActionType => {
    return {
        type: SET_PAGINATOR_VILLAGE,
        paginate: paginate
    }
}

export const setFetchVillageSuccessAction = (list: VillageList[]): FetchVillageSuccessActionType => {
    return {
        type: FETCH_VILLAGE_SUCCESS,
        list: list
    }
}

export const setFetchVillageErrorAction = (): FetchVillageErrorActionType => {
    return {
        type: FETCH_VILLAGE_ERROR
    }
}

export const setAlertVillageHideAction = (): AlertVillageHideActionType => {
    return {
        type: ALERT_VILLAGE_HIDE
    }
}

export const setAlertVillageShowAction = (message: string, color: string): AlertVillageShowActionType => {
    return {
        type: ALERT_VILLAGE_SHOW,
        color: color,
        message: message
    };
}


export const fetchVillageAction = (page: number): ThunkResult<Promise<Boolean>> => {
    return async (dispatch: Dispatch, getState: () => AppState) => {
        return await axiosService.get(process.env.REACT_APP_API_URL + `/web/region-village?page=${page}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccessList<VillageList> = response.data;

                dispatch(setFetchVillageSuccessAction(data.result));

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
                dispatch(setFetchVillageErrorAction());

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


export const fetchListVillageAction = (search: string, page: number, subDistrictId?: number): ThunkResult<Promise<ApiResponseList<VillageList>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {

        let paramsObject: OptionObjectString = {
            page: page.toString(),
            name: search
        }

        if (subDistrictId) {
            paramsObject = {
                ...paramsObject,
                subDistrictId: subDistrictId.toString()
            }
        }

        const params = objectToParamsUrl(paramsObject)

        return axiosService.get(process.env.REACT_APP_API_URL + `/web/region-village?${params}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccessList<VillageList> = response.data;

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

export const createVillageAction = (village: VillageCreateField): ThunkResult<Promise<ApiResponse<VillageCreateResult>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.post(process.env.REACT_APP_API_URL + '/web/region-village', village)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<VillageCreateResult> = response.data;
                
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

export const findVillageAction = (id: number): ThunkResult<Promise<ApiResponse<VillageShow>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.get(process.env.REACT_APP_API_URL + `/web/region-village/${id}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<VillageShow> = response.data;

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

export const editVillageAction = (village: VillageEditField, id: number): ThunkResult<Promise<ApiResponse<VillageEditResult>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.patch(process.env.REACT_APP_API_URL + `/web/region-village/${id}`, village)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<VillageEditResult> = response.data;
                
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


export const deleteVillageAction = (id: number): ThunkResult<Promise<ApiResponse<Village>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.delete(process.env.REACT_APP_API_URL + `/web/region-village/${id}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<Village> = response.data;

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
