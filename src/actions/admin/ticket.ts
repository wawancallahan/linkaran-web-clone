import axiosService from '../../services/axiosService';
import { Dispatch } from "redux";
import { Paginator } from '../../types/paginator';
import { AppState } from "../../store/configureStore";
import {
    Ticket,
    TicketList,
    TicketShow,
    SET_PAGINATOR_TICKET,
    FETCH_TICKET_SUCCESS,
    FETCH_TICKET_ERROR,
    SetPaginatorTicketActionType,
    FetchTicketActionType,
    FetchTicketErrorActionType,
    FetchTicketSuccessActionType,
    TicketCreateField,
    TicketEditField,
    AlertTicketHideActionType,
    ALERT_TICKET_HIDE,
    AlertTicketShowActionType,
    ALERT_TICKET_SHOW,
    TicketCreateResult,
    TicketEditResult,
    FETCH_TICKET_VOUCHER,
    FETCH_TICKET_VOUCHER_ERROR,
    FETCH_TICKET_VOUCHER_SUCCESS,
    FetchTicketVoucherActionType,
    FetchTicketVoucherErrorActionType,
    SET_PAGINATOR_TICKET_VOUCHER,
    SetPaginatorTicketVoucherActionType,
    FetchTicketVoucherSuccessActionType
} from '../../types/admin/ticket';
import { AxiosResponse, AxiosError } from 'axios';
import { ApiResponse, ApiResponseList, ApiResponseError, ApiResponseSuccess, ApiResponseSuccessList } from '../../types/api';
import { ThunkResult } from '../../types/thunk';
import * as dotenv from 'dotenv';
dotenv.config();

export const setPaginateAction = (paginate: Paginator): SetPaginatorTicketActionType => {
    return {
        type: SET_PAGINATOR_TICKET,
        paginate: paginate
    }
}

export const setPaginateVoucherAction = (paginate: Paginator): SetPaginatorTicketVoucherActionType => {
    return {
        type: SET_PAGINATOR_TICKET_VOUCHER,
        paginate: paginate
    }
}

export const setFetchTicketVoucherSuccessAction = (list: Ticket[]): FetchTicketVoucherSuccessActionType => {
    return {
        type: FETCH_TICKET_VOUCHER_SUCCESS,
        list: list
    }
}

export const setFetchTicketSuccessAction = (list: Ticket[]): FetchTicketSuccessActionType => {
    return {
        type: FETCH_TICKET_SUCCESS,
        list: list
    }
}

export const setFetchTicketErrorAction = (): FetchTicketErrorActionType => {
    return {
        type: FETCH_TICKET_ERROR
    }
}

export const setFetchTicketVoucherErrorAction = (): FetchTicketVoucherErrorActionType => {
    return {
        type: FETCH_TICKET_VOUCHER_ERROR
    }
}

export const setAlertTicketHideAction = (): AlertTicketHideActionType => {
    return {
        type: ALERT_TICKET_HIDE
    }
}

export const setAlertTicketShowAction = (message: string, color: string): AlertTicketShowActionType => {
    return {
        type: ALERT_TICKET_SHOW,
        color: color,
        message: message
    };
}

export const fetchTicketAction = (page: number): ThunkResult<Promise<Boolean>> => {
    return async (dispatch: Dispatch, getState: () => AppState) => {
        return await axiosService.get(process.env.REACT_APP_API_URL + `/web/ticket?page=${page}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccessList<TicketList> = response.data;

                dispatch(setFetchTicketSuccessAction(data.result));

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
                dispatch(setFetchTicketErrorAction());

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

export const fetchTicketVoucherAction = (page: number, id: number): ThunkResult<Promise<Boolean>> => {
    return async (dispatch: Dispatch, getState: () => AppState) => {
        return await axiosService.get(process.env.REACT_APP_API_URL + `/web/ticket?page=${page}&voucherId=${id}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccessList<TicketList> = response.data;

                dispatch(setFetchTicketVoucherSuccessAction(data.result));

                if (data.metaData.paginate) {
                    const paginate = data.metaData.paginate as Paginator;

                    dispatch(setPaginateVoucherAction({
                        total: paginate.itemCount * paginate.pageCount,
                        currentPage: page,
                        itemCount: paginate.itemCount,
                        pageCount: paginate.pageCount
                    }))
                }

                return Promise.resolve(true);
            })
            .catch( (error: AxiosError) => {
                dispatch(setFetchTicketVoucherErrorAction());

                dispatch(setPaginateVoucherAction({
                    total: 0,
                    currentPage: 0,
                    itemCount: 0,
                    pageCount: 0
                }))

                return Promise.resolve(true);
            })
    }
}

export const fetchListTicketAction = (search: string, page: number): ThunkResult<Promise<ApiResponseList<TicketList>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.get(process.env.REACT_APP_API_URL + `/web/ticket?page=${page}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccessList<TicketList> = response.data;

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

export const createTicketAction = (ticket: TicketCreateField): ThunkResult<Promise<ApiResponse<TicketCreateResult>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.post(process.env.REACT_APP_API_URL + '/web/ticket', ticket)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<TicketCreateResult> = response.data;
                
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

export const findTicketAction = (id: number): ThunkResult<Promise<ApiResponse<TicketShow>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.get(process.env.REACT_APP_API_URL + `/web/ticket/${id}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<TicketShow> = response.data;

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

export const editTicketAction = (ticket: TicketEditField, id: number): ThunkResult<Promise<ApiResponse<TicketEditResult>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.patch(process.env.REACT_APP_API_URL + `/web/ticket/${id}`, ticket)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<TicketEditResult> = response.data;
                
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


export const deleteTicketAction = (id: number): ThunkResult<Promise<ApiResponse<Ticket>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.delete(process.env.REACT_APP_API_URL + `/web/ticket/${id}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<Ticket> = response.data;

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
