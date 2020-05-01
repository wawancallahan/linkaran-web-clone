import axiosService from '../../services/axiosService';
import { Dispatch } from "redux";
import { Paginator } from '../../types/paginator';
import { AppState } from "../../store/configureStore";
import {
    Customer,
    SET_PAGINATOR_CUSTOMER,
    FETCH_CUSTOMER_SUCCESS,
    FETCH_CUSTOMER_ERROR,
    SetPaginatorCustomerActionType,
    FetchCustomerActionType,
    FetchCustomerErrorActionType,
    FetchCustomerSuccessActionType,
    CustomerCreateField,
    CustomerEditField,
    AlertCustomerHideActionType,
    ALERT_CUSTOMER_HIDE,
    AlertCustomerShowActionType,
    ALERT_CUSTOMER_SHOW,
    CustomerEditResult,
    CustomerCreateResult,
    CustomerList,
    CustomerShow,
    Filter,
    SetFilterCustomerActionType,
    SET_FILTER_CUSTOMER,
    ClearFilterCustomerActionType,
    CLEAR_FILTER_CUSTOMER
} from '../../types/admin/customer';
import { AxiosResponse, AxiosError } from 'axios';
import { ApiResponse, ApiResponseList, ApiResponseError, ApiResponseSuccess, ApiResponseSuccessList } from '../../types/api';
import * as dotenv from 'dotenv';
import { ThunkResult } from '../../types/thunk'
dotenv.config();
import queryString from 'query-string'
import { OptionObjectString } from '../../helpers/utils';

export const setPaginateAction = (paginate: Paginator): SetPaginatorCustomerActionType => {
    return {
        type: SET_PAGINATOR_CUSTOMER,
        paginate: paginate
    }
}

export const setFetchCustomerSuccessAction = (list: CustomerList[]): FetchCustomerSuccessActionType => {
    return {
        type: FETCH_CUSTOMER_SUCCESS,
        list: list
    }
}

export const setFetchCustomerErrorAction = (): FetchCustomerErrorActionType => {
    return {
        type: FETCH_CUSTOMER_ERROR
    }
}

export const setAlertCustomerHideAction = (): AlertCustomerHideActionType => {
    return {
        type: ALERT_CUSTOMER_HIDE
    }
}

export const setAlertCustomerShowAction = (message: string, color: string): AlertCustomerShowActionType => {
    return {
        type: ALERT_CUSTOMER_SHOW,
        color: color,
        message: message
    };
}

export const clearFilterAction = () : ClearFilterCustomerActionType => {
    return {
        type: CLEAR_FILTER_CUSTOMER
    }
} 

export const setFilterAction = (filter: Filter) : SetFilterCustomerActionType => {
    return {
        type: SET_FILTER_CUSTOMER,
        filter: filter
    }
}

export const fetchCustomerAction = (page: number): ThunkResult<Promise<Boolean>> => {
    return async (dispatch: Dispatch, getState: () => AppState) => {
        
        const querySearch = queryString.parse(window.location.search);

        const filter: Filter = {
            name: (querySearch.name as string) || '',
            email: (querySearch.email as string) || '',
            phoneNumber: (querySearch.phoneNumber as string) || ''
        }

        dispatch(setFilterAction(filter));

        let paramsObject: OptionObjectString = {
            page: page.toString(),
            ...filter
        }

        return await axiosService.get(process.env.REACT_APP_API_URL + `/web/costumer`, {
                params: paramsObject
            })
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccessList<CustomerList> = response.data;

                dispatch(setFetchCustomerSuccessAction(data.result));

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
                dispatch(setFetchCustomerErrorAction());

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


export const fetchListCustomerAction = (search: string, page: number): ThunkResult<Promise<ApiResponseList<CustomerList>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.get(process.env.REACT_APP_API_URL + `/web/costumer?page=${page}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccessList<CustomerList> = response.data;

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

export const createCustomerAction = (customer: CustomerCreateField): ThunkResult<Promise<ApiResponse<CustomerCreateResult>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.post(process.env.REACT_APP_API_URL + '/web/costumer', customer)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<CustomerCreateResult> = response.data;
                
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

export const findCustomerAction = (id: number): ThunkResult<Promise<ApiResponse<CustomerShow>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.get(process.env.REACT_APP_API_URL + `/web/costumer/${id}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<CustomerShow> = response.data;

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

export const editCustomerAction = (customer: CustomerEditField, id: number): ThunkResult<Promise<ApiResponse<CustomerEditResult>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.patch(process.env.REACT_APP_API_URL + `/web/costumer/${id}`, customer)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<CustomerEditResult> = response.data;
                
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


export const deleteCustomerAction = (id: number): ThunkResult<Promise<ApiResponse<Customer>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.delete(process.env.REACT_APP_API_URL + `/web/costumer/${id}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<Customer> = response.data;

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
