import axiosService from '../../services/axiosService';
import { Dispatch } from "redux";
import { Paginator } from '../../types/paginator';
import { AppState } from "../../reducers/index";
import {
    Price,
    PriceList,
    PriceShow,
    SET_PAGINATOR_PRICE,
    FETCH_PRICE_SUCCESS,
    FETCH_PRICE_ERROR,
    SetPaginatorPriceActionType,
    FetchPriceActionType,
    FetchPriceErrorActionType,
    FetchPriceSuccessActionType,
    PriceCreateField,
    PriceEditField,
    AlertPriceHideActionType,
    ALERT_PRICE_HIDE,
    AlertPriceShowActionType,
    ALERT_PRICE_SHOW,
    PriceEditResult,
    PriceCreateResult,
    Filter,
    SetFilterPriceActionType,
    SET_FILTER_PRICE,
    ClearFilterPriceActionType,
    CLEAR_FILTER_PRICE
} from '../../types/admin/price';
import { AxiosResponse, AxiosError } from 'axios';
import { ApiResponse, ApiResponseList, ApiResponseError, ApiResponseSuccess, ApiResponseSuccessList } from '../../types/api';
import { ThunkResult } from '../../types/thunk';
import * as dotenv from 'dotenv';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../../types';
import { OptionObjectString } from '../../helpers/utils';
dotenv.config();
import queryString from 'query-string'

export const setPaginateAction = (paginate: Paginator): SetPaginatorPriceActionType => {
    return {
        type: SET_PAGINATOR_PRICE,
        paginate: paginate
    }
}

export const setFetchPriceSuccessAction = (list: Price[]): FetchPriceSuccessActionType => {
    return {
        type: FETCH_PRICE_SUCCESS,
        list: list
    }
}

export const setFetchPriceErrorAction = (): FetchPriceErrorActionType => {
    return {
        type: FETCH_PRICE_ERROR
    }
}

export const setAlertPriceHideAction = (): AlertPriceHideActionType => {
    return {
        type: ALERT_PRICE_HIDE
    }
}

export const setAlertPriceShowAction = (message: string, color: string): AlertPriceShowActionType => {
    return {
        type: ALERT_PRICE_SHOW,
        color: color,
        message: message
    };
}

export const clearFilterAction = () : ClearFilterPriceActionType => {
    return {
        type: CLEAR_FILTER_PRICE
    }
} 

export const setFilterAction = (filter: Filter) : SetFilterPriceActionType => {
    return {
        type: SET_FILTER_PRICE,
        filter: filter
    }
}

export const fetchPriceAction = (page: number) : ThunkResult<Promise<Boolean>> => {
    return async (dispatch: Dispatch, getState: () => AppState) => {
        const querySearch = queryString.parse(window.location.search);

        const filter: Filter = {
            basePrice: decodeURIComponent((querySearch.basePrice as string) || ''),
            minKm: decodeURIComponent((querySearch.minKm as string) || ''),
            perKilometer: decodeURIComponent((querySearch.perKilometer as string) || ''),
        }

        let paramsObject: OptionObjectString = {
            page: page.toString(),
            ...filter
        }

        return await axiosService.get(process.env.REACT_APP_API_URL + `/web/price`, {
                params: paramsObject
            })
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccessList<PriceList> = response.data;

                dispatch(setFetchPriceSuccessAction(data.result));

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
                dispatch(setFetchPriceErrorAction());

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

export const fetchListPriceAction = (search: string, page: number): ThunkResult<Promise<ApiResponseList<PriceList>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {

        let paramsObject: OptionObjectString = {
            page: page.toString(),
            basePrice: search
        }

        return axiosService.get(process.env.REACT_APP_API_URL + `/web/price`, {
                params: paramsObject
            })
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccessList<PriceList> = response.data;

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

export const createPriceAction = (price: PriceCreateField): ThunkResult<Promise<ApiResponse<PriceCreateResult>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {

        return axiosService.post(process.env.REACT_APP_API_URL + '/web/price', price)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<PriceCreateResult> = response.data;
                
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

export const findPriceAction = (id: number): ThunkResult<Promise<ApiResponse<PriceShow>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.get(process.env.REACT_APP_API_URL + `/web/price/${id}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<PriceShow> = response.data;

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

export const editPriceAction = (price: PriceEditField, id: number): ThunkResult<Promise<ApiResponse<PriceEditResult>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.patch(process.env.REACT_APP_API_URL + `/web/price/${id}`, price)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<PriceEditResult> = response.data;
                
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


export const deletePriceAction = (id: number): ThunkResult<Promise<ApiResponse<Price>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.delete(process.env.REACT_APP_API_URL + `/web/price/${id}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<Price> = response.data;

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
