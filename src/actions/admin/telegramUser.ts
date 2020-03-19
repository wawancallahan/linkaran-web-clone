import axiosService from '../../services/axiosService';
import { Dispatch } from "redux";
import { Paginator } from '../../types/paginator';
import { AppState } from "../../store/configureStore";
import {
    TelegramUser,
    SET_PAGINATOR_TELEGRAM_USER,
    FETCH_TELEGRAM_USER_SUCCESS,
    FETCH_TELEGRAM_USER_ERROR,
    SetPaginatorTelegramUserActionType,
    FetchTelegramUserActionType,
    FetchTelegramUserErrorActionType,
    FetchTelegramUserSuccessActionType,
    TelegramUserCreateField,
    TelegramUserEditField,
    AlertTelegramUserHideActionType,
    ALERT_TELEGRAM_USER_HIDE,
    AlertTelegramUserShowActionType,
    ALERT_TELEGRAM_USER_SHOW,
    TelegramUserEditResult,
    TelegramUserCreateResult,
    TelegramUserList,
    TelegramUserShow
} from '../../types/admin/telegramUser';
import { AxiosResponse, AxiosError } from 'axios';
import { ApiResponse, ApiResponseList, ApiResponseError, ApiResponseSuccess, ApiResponseSuccessList } from '../../types/api';
import * as dotenv from 'dotenv';
import { ThunkResult } from '../../types/thunk'
import { OptionObjectNumber, objectToParamsUrl, OptionObjectString } from '../../helpers/utils';
dotenv.config();

export const setPaginateAction = (paginate: Paginator): SetPaginatorTelegramUserActionType => {
    return {
        type: SET_PAGINATOR_TELEGRAM_USER,
        paginate: paginate
    }
}

export const setFetchTelegramUserSuccessAction = (list: TelegramUserList[]): FetchTelegramUserSuccessActionType => {
    return {
        type: FETCH_TELEGRAM_USER_SUCCESS,
        list: list
    }
}

export const setFetchTelegramUserErrorAction = (): FetchTelegramUserErrorActionType => {
    return {
        type: FETCH_TELEGRAM_USER_ERROR
    }
}

export const setAlertTelegramUserHideAction = (): AlertTelegramUserHideActionType => {
    return {
        type: ALERT_TELEGRAM_USER_HIDE
    }
}

export const setAlertTelegramUserShowAction = (message: string, color: string): AlertTelegramUserShowActionType => {
    return {
        type: ALERT_TELEGRAM_USER_SHOW,
        color: color,
        message: message
    };
}


export const fetchTelegramUserAction = (page: number): ThunkResult<Promise<Boolean>> => {
    return async (dispatch: Dispatch, getState: () => AppState) => {
        return await axiosService.get(process.env.REACT_APP_API_URL + `/web/telegramuser?page=${page}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccessList<TelegramUserList> = response.data;

                dispatch(setFetchTelegramUserSuccessAction(data.result));

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
                dispatch(setFetchTelegramUserErrorAction());

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


export const fetchListTelegramUserAction = (search: string, page: number): ThunkResult<Promise<ApiResponseList<TelegramUserList>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        let paramsObject: OptionObjectString = {
            page: page.toString(),
            name: search
        }

        const params = objectToParamsUrl(paramsObject)
       
        return axiosService.get(process.env.REACT_APP_API_URL + `/web/telegramuser?${params}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccessList<TelegramUserList> = response.data;

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

export const createTelegramUserAction = (country: TelegramUserCreateField): ThunkResult<Promise<ApiResponse<TelegramUserCreateResult>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.post(process.env.REACT_APP_API_URL + '/web/telegramuser', country)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<TelegramUserCreateResult> = response.data;
                
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

export const findTelegramUserAction = (id: number): ThunkResult<Promise<ApiResponse<TelegramUserShow>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.get(process.env.REACT_APP_API_URL + `/web/telegramuser/${id}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<TelegramUserShow> = response.data;

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

export const editTelegramUserAction = (country: TelegramUserEditField, id: number): ThunkResult<Promise<ApiResponse<TelegramUserEditResult>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.patch(process.env.REACT_APP_API_URL + `/web/telegramuser/${id}`, country)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<TelegramUserEditResult> = response.data;
                
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


export const deleteTelegramUserAction = (id: number): ThunkResult<Promise<ApiResponse<TelegramUser>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.delete(process.env.REACT_APP_API_URL + `/web/telegramuser/${id}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<TelegramUser> = response.data;

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
