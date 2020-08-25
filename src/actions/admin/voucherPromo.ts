import axiosService from '../../services/axiosService';
import { Dispatch } from "redux";
import { Paginator } from '../../types/paginator';
import { AppState } from "../../reducers";
import {
    VoucherPromo,
    VoucherPromoList,
    VoucherPromoShow,
    SET_PAGINATOR_VOUCHER_PROMO,
    FETCH_VOUCHER_PROMO_SUCCESS,
    FETCH_VOUCHER_PROMO_ERROR,
    SetPaginatorVoucherPromoActionType,
    FetchVoucherPromoActionType,
    FetchVoucherPromoErrorActionType,
    FetchVoucherPromoSuccessActionType,
    VoucherPromoCreateField,
    VoucherPromoEditField,
    AlertVoucherPromoHideActionType,
    ALERT_VOUCHER_PROMO_HIDE,
    AlertVoucherPromoShowActionType,
    ALERT_VOUCHER_PROMO_SHOW,
    VoucherPromoEditResult,
    VoucherPromoCreateResult,
    FETCH_VOUCHER_PROMO_USER_USED,
    FETCH_VOUCHER_PROMO_USER_USED_ERROR,
    FETCH_VOUCHER_PROMO_USER_USED_SUCCESS,
    SET_PAGINATOR_VOUCHER_PROMO_USER_USED,
    SetPaginatorVoucherPromoUserUsedActionType,
    VoucherPromoUserUsed,
    FetchVoucherPromoUserUsedErrorActionType,
    FetchVoucherPromoUserUsedSuccessActionType,
    Filter,
    SetFilterVoucherPromoActionType,
    SET_FILTER_VOUCHER_PROMO,
    ClearFilterVoucherPromoActionType,
    CLEAR_FILTER_VOUCHER_PROMO
} from '../../types/admin/voucherPromo';
import { AxiosResponse, AxiosError } from 'axios';
import { ApiResponse, ApiResponseList, ApiResponseError, ApiResponseSuccess, ApiResponseSuccessList } from '../../types/api';
import { ThunkResult } from '../../types/thunk';
import { booleanToString, OptionObjectString } from '../../helpers/utils';
import * as dotenv from 'dotenv';
dotenv.config();
import queryString from 'query-string'
import { SelectType } from '../../types/select';

export const setPaginateAction = (paginate: Paginator): SetPaginatorVoucherPromoActionType => {
    return {
        type: SET_PAGINATOR_VOUCHER_PROMO,
        paginate: paginate
    }
}

export const setFetchVoucherPromoSuccessAction = (list: VoucherPromo[]): FetchVoucherPromoSuccessActionType => {
    return {
        type: FETCH_VOUCHER_PROMO_SUCCESS,
        list: list
    }
}

export const setFetchVoucherPromoErrorAction = (): FetchVoucherPromoErrorActionType => {
    return {
        type: FETCH_VOUCHER_PROMO_ERROR
    }
}

export const setPaginateUserUsedAction = (paginate: Paginator): SetPaginatorVoucherPromoUserUsedActionType => {
    return {
        type: SET_PAGINATOR_VOUCHER_PROMO_USER_USED,
        paginate: paginate
    }
}

export const setFetchVoucherPromoUserUsedSuccessAction = (list: VoucherPromoUserUsed[]): FetchVoucherPromoUserUsedSuccessActionType => {
    return {
        type: FETCH_VOUCHER_PROMO_USER_USED_SUCCESS,
        list: list
    }
}

export const setFetchVoucherPromoUserUsedErrorAction = (): FetchVoucherPromoUserUsedErrorActionType => {
    return {
        type: FETCH_VOUCHER_PROMO_USER_USED_ERROR
    }
}

export const setAlertVoucherPromoHideAction = (): AlertVoucherPromoHideActionType => {
    return {
        type: ALERT_VOUCHER_PROMO_HIDE
    }
}

export const setAlertVoucherPromoShowAction = (message: string, color: string): AlertVoucherPromoShowActionType => {
    return {
        type: ALERT_VOUCHER_PROMO_SHOW,
        color: color,
        message: message
    };
}

export const clearFilterAction = () : ClearFilterVoucherPromoActionType => {
    return {
        type: CLEAR_FILTER_VOUCHER_PROMO
    }
} 

export const setFilterAction = (filter: Filter) : SetFilterVoucherPromoActionType => {
    return {
        type: SET_FILTER_VOUCHER_PROMO,
        filter: filter
    }
}

export const fetchVoucherPromoAction = (page: number): ThunkResult<Promise<Boolean>> => {
    return async (dispatch: Dispatch, getState: () => AppState) => {

        const querySearch = queryString.parse(window.location.search);

        const filter: Filter = {
            amount: decodeURIComponent((querySearch.amount as string) || ''),
            code: decodeURIComponent((querySearch.code as string) || ''),
            isLimited: decodeURIComponent((querySearch.isLimited as string) || ''),
            minimumPurchase: decodeURIComponent((querySearch.minimumPurchase as string) || ''),
            name: decodeURIComponent((querySearch.name as string) || ''),
            quantity: decodeURIComponent((querySearch.quantity as string) || ''),
            quota: decodeURIComponent((querySearch.quota as string) || '')
        }

        let paramsObject: OptionObjectString = {
            page: page.toString(),
            ...filter
        }

        return await axiosService.get(process.env.REACT_APP_API_URL + `/web/voucher`, {
                params: paramsObject
            })
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccessList<VoucherPromo> = response.data;

                dispatch(setFetchVoucherPromoSuccessAction(data.result));

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
                dispatch(setFetchVoucherPromoErrorAction());

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

export const fetchVoucherPromoUserUsedAction = (page: number, id: number): ThunkResult<Promise<Boolean>> => {
    return async (dispatch: Dispatch, getState: () => AppState) => {
        return await axiosService.get(process.env.REACT_APP_API_URL + `/web/voucher/${id}/user?page=${page}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccessList<VoucherPromoUserUsed> = response.data;

                dispatch(setFetchVoucherPromoUserUsedSuccessAction(data.result));

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
                dispatch(setFetchVoucherPromoUserUsedErrorAction());

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

export const createVoucherPromoAction = (voucherPromo: VoucherPromoCreateField): ThunkResult<Promise<ApiResponse<VoucherPromoCreateResult>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {

        const data = new FormData();
        data.set('name', voucherPromo.name)
        data.set('code', voucherPromo.code)
        data.set('amount', voucherPromo.amount)
        data.set('quota', voucherPromo.quota)
        data.set('quantity', voucherPromo.quantity)
        data.set('minimumPurchase', voucherPromo.minimumPurchase)
        data.set('description', voucherPromo.description)
        data.set('isLimited', booleanToString(voucherPromo.isLimited))
        data.set('isAutoSet', booleanToString(voucherPromo.isAutoSet))

        if (voucherPromo.image) {
            data.append('fileimage', voucherPromo.image)
        }

        data.set('startDateTime', voucherPromo.startDateTime)
        data.set('endDateTime', voucherPromo.endDateTime)

        data.set('type.id', voucherPromo.type.id.toString())

        voucherPromo.service.forEach((value: SelectType, index: number) => {
            data.set(`service.${index}.id`, value.value.toString())
        })

        voucherPromo.restaurants.forEach((value: number, index: number) => {
            data.set(`restaurant.${index}.id`, value.toString())
        })

        return axiosService.post(process.env.REACT_APP_API_URL + '/web/voucher', data, {
                headers: {
                    'Content-Type': 'multipart/form-data' 
                }
            })
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<VoucherPromoCreateResult> = response.data;
                
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

export const findVoucherPromoAction = (id: number): ThunkResult<Promise<ApiResponse<VoucherPromoShow>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.get(process.env.REACT_APP_API_URL + `/web/voucher/${id}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<VoucherPromoShow> = response.data;

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

export const editVoucherPromoAction = (voucherPromo: VoucherPromoEditField, id: number): ThunkResult<Promise<ApiResponse<VoucherPromoEditResult>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {

        const data = new FormData();
        data.set('name', voucherPromo.name)
        data.set('code', voucherPromo.code)
        data.set('amount', voucherPromo.amount)
        data.set('quota', voucherPromo.quota)
        data.set('quantity', voucherPromo.quantity)
        data.set('minimumPurchase', voucherPromo.minimumPurchase)
        data.set('description', voucherPromo.description)
        data.set('isLimited', booleanToString(voucherPromo.isLimited))
        data.set('isAutoSet', booleanToString(voucherPromo.isAutoSet))

        if (voucherPromo.image) {
            data.append('fileimage', voucherPromo.image)
        }

        data.set('startDateTime', voucherPromo.startDateTime)
        data.set('endDateTime', voucherPromo.endDateTime)

        data.set('type.id', voucherPromo.type.id.toString())

        voucherPromo.service.forEach((value: SelectType, index: number) => {
            data.set(`service.${index}.id`, value.value.toString())
        })

        voucherPromo.restaurants.forEach((value: number, index: number) => {
            data.set(`restaurant.${index}.id`, value.toString())
        })

        return axiosService.patch(process.env.REACT_APP_API_URL + `/web/voucher/${id}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data' 
                }
            })
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<VoucherPromoEditResult> = response.data;
                
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


export const deleteVoucherPromoAction = (id: number): ThunkResult<Promise<ApiResponse<VoucherPromo>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.delete(process.env.REACT_APP_API_URL + `/web/voucher/${id}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<VoucherPromo> = response.data;

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
