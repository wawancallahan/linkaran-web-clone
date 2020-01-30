import axiosService from '../../services/axiosService';
import { Dispatch } from "redux";
import { Paginator } from '../../types/paginator';
import { AppState } from "../../store/configureStore";
import {
    VoucherPromo,
    SET_PAGINATOR_VOUCHER_PROMO,
    FETCH_VOUCHER_PROMO_SUCCESS,
    FETCH_VOUCHER_PROMO_ERROR,
    SetPaginatorVoucherPromoActionType,
    FetchVoucherPromoActionType,
    FetchVoucherPromoErrorActionType,
    FetchVoucherPromoSuccessActionType,
    VoucherPromoCreate,
    VoucherPromoEdit,
    AlertVoucherPromoHideActionType,
    ALERT_VOUCHER_PROMO_HIDE,
    AlertVoucherPromoShowActionType,
    ALERT_VOUCHER_PROMO_SHOW,
    VoucherPromoEditResult,
    VoucherPromoCreateResult
} from '../../types/admin/voucherPromo';
import { AxiosResponse, AxiosError } from 'axios';
import { ApiResponse, ApiResponseList, ApiResponseError, ApiResponseSuccess, ApiResponseSuccessList } from '../../types/api';
import { ThunkResult } from '../../types/thunk';
import * as dotenv from 'dotenv';
dotenv.config();

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

export const fetchVoucherPromoAction = (page: number) => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        axiosService.get(process.env.REACT_APP_API_URL + `/web/voucher?page=${page}`)
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
            })
            .catch( (error: AxiosError) => {
                dispatch(setFetchVoucherPromoErrorAction());

                dispatch(setPaginateAction({
                    total: 0,
                    currentPage: 0,
                    itemCount: 0,
                    pageCount: 0
                }))
            })
    }
}

export const fetchListVoucherPromoAction = (search: string, page: number): ThunkResult<Promise<ApiResponseList<VoucherPromo>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.get(process.env.REACT_APP_API_URL + `/web/voucher?page=${page}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccessList<VoucherPromo> = response.data;

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

export const createVoucherPromoAction = (voucherPromo: VoucherPromoCreate): ThunkResult<Promise<ApiResponse<VoucherPromoCreateResult>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {

        const data = new FormData();

        return axiosService.post(process.env.REACT_APP_API_URL + '/web/voucher', data)
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

export const findVoucherPromoAction = (id: number): ThunkResult<Promise<ApiResponse<VoucherPromo>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.get(process.env.REACT_APP_API_URL + `/web/voucher/${id}`)
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

export const editVoucherPromoAction = (voucherPromo: VoucherPromoEdit, id: number): ThunkResult<Promise<ApiResponse<VoucherPromoEditResult>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.patch(process.env.REACT_APP_API_URL + `/web/voucher/${id}`, voucherPromo)
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