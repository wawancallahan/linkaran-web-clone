import axiosService from '../../services/axiosService';
import { Dispatch } from "redux";
import { Paginator } from '../../types/paginator';
import { AppState } from "../../reducers/index";
import {
    User,
    UserList,
    UserShow,
    SET_PAGINATOR_USER,
    FETCH_USER_SUCCESS,
    FETCH_USER_ERROR,
    SetPaginatorUserActionType,
    FetchUserActionType,
    FetchUserErrorActionType,
    FetchUserSuccessActionType,
    UserCreateField,
    UserEditField,
    AlertUserHideActionType,
    ALERT_USER_HIDE,
    AlertUserShowActionType,
    ALERT_USER_SHOW,
    UserEditResult,
    UserCreateResult,
    Filter,
    SetFilterUserActionType,
    SET_FILTER_USER,
    ClearFilterUserActionType,
    CLEAR_FILTER_USER
} from '../../types/admin/user';
import { AxiosResponse, AxiosError } from 'axios';
import { ApiResponse, ApiResponseList, ApiResponseError, ApiResponseSuccess, ApiResponseSuccessList } from '../../types/api';
import { ThunkResult } from '../../types/thunk';
import { OptionObjectNumber, objectToParamsUrl, OptionObjectString } from '../../helpers/utils';
import * as dotenv from 'dotenv';
dotenv.config();
import queryString from 'query-string'

export const setPaginateAction = (paginate: Paginator): SetPaginatorUserActionType => {
    return {
        type: SET_PAGINATOR_USER,
        paginate: paginate
    }
}

export const setFetchUserSuccessAction = (list: User[]): FetchUserSuccessActionType => {
    return {
        type: FETCH_USER_SUCCESS,
        list: list
    }
}

export const setFetchUserErrorAction = (): FetchUserErrorActionType => {
    return {
        type: FETCH_USER_ERROR
    }
}

export const setAlertUserHideAction = (): AlertUserHideActionType => {
    return {
        type: ALERT_USER_HIDE
    }
}

export const setAlertUserShowAction = (message: string, color: string): AlertUserShowActionType => {
    return {
        type: ALERT_USER_SHOW,
        color: color,
        message: message
    };
}

export const clearFilterAction = () : ClearFilterUserActionType => {
    return {
        type: CLEAR_FILTER_USER
    }
} 

export const setFilterAction = (filter: Filter) : SetFilterUserActionType => {
    return {
        type: SET_FILTER_USER,
        filter: filter
    }
}

export const fetchUserAction = (page: number) : ThunkResult<Promise<Boolean>> => {
    return async (dispatch: Dispatch, getState: () => AppState) => {
        
        const querySearch = queryString.parse(window.location.search);

        const filter: Filter = {
            name: decodeURIComponent((querySearch.name as string) || '')
        }

        let paramsObject: OptionObjectString = {
            page: page.toString(),
            ...filter
        }
        
        return await axiosService.get(process.env.REACT_APP_API_URL + `/web/user`, {
                params: paramsObject
            })
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccessList<UserList> = response.data;

                dispatch(setFetchUserSuccessAction(data.result));

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
                dispatch(setFetchUserErrorAction());

                dispatch(setPaginateAction({
                    total: 0,
                    currentPage: 0,
                    itemCount: 0,
                    pageCount: 0
                }))

                return Promise.resolve(false);
            })
    }
}

export const fetchListUserAction = (search: string, page: number): ThunkResult<Promise<ApiResponseList<UserList>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {

        let paramsObject: OptionObjectString = {
            page: page.toString(),
            name: search
        }

        return axiosService.get(process.env.REACT_APP_API_URL + `/web/user`, {
                params: paramsObject
            })
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccessList<UserList> = response.data;

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

export const createUserAction = (user: UserCreateField): ThunkResult<Promise<ApiResponse<UserCreateResult>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.post(process.env.REACT_APP_API_URL + '/web/user', user)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<UserCreateResult> = response.data;
                
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

export const findUserAction = (id: number): ThunkResult<Promise<ApiResponse<UserShow>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.get(process.env.REACT_APP_API_URL + `/web/user/${id}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<UserShow> = response.data;

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

export const editUserAction = (user: UserEditField, id: number): ThunkResult<Promise<ApiResponse<UserEditResult>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.patch(process.env.REACT_APP_API_URL + `/web/user/${id}`, user)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<UserEditResult> = response.data;
                
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


export const deleteUserAction = (id: number): ThunkResult<Promise<ApiResponse<User>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.delete(process.env.REACT_APP_API_URL + `/web/user/${id}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<User> = response.data;

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
