import axiosService from '../../services/axiosService';
import { Dispatch } from "redux";
import { Paginator } from '../../types/paginator';
import { AppState } from "../../store/configureStore";
import {
    User,
    SET_PAGINATOR_USER,
    FETCH_USER_SUCCESS,
    FETCH_USER_ERROR,
    SetPaginatorUserActionType,
    FetchUserActionType,
    FetchUserErrorActionType,
    FetchUserSuccessActionType,
    UserCreate,
    UserEdit
} from '../../types/admin/user';
import { AxiosResponse, AxiosError } from 'axios';
import { ApiResponse, ApiResponseList, ApiResponseError, ApiResponseSuccess, ApiResponseSuccessList } from '../../types/api';
import { ThunkResult } from '../../types/thunk';

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

export const fetchUserAction = (page: number) => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        axiosService.get(`/v1/web/user?page=${page}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccessList<User> = response.data;

                dispatch(setFetchUserSuccessAction(data.result));

                if (data.metaData.paginate) {
                    dispatch(setPaginateAction({
                        total: data.metaData.paginate.total,
                        currentPage: data.metaData.paginate.currentPage,
                        itemCount: data.metaData.paginate.itemCount,
                        pageCount: data.metaData.paginate.pageCount
                    }))
                }
            })
            .catch( (error: AxiosError) => {
                dispatch(setFetchUserErrorAction());

                dispatch(setPaginateAction({
                    total: 0,
                    currentPage: 0,
                    itemCount: 0,
                    pageCount: 0
                }))
            })
    }
}

export const createUserAction = (user: UserCreate): ThunkResult<Promise<ApiResponse<User>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.post('/v1/web/user', user)
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

export const findUserAction = (id: number): ThunkResult<Promise<ApiResponse<User>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.get(`/v1/web/user/${id}`)
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

export const editUserAction = (user: UserEdit, id: number): ThunkResult<Promise<ApiResponse<User>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.patch(`/v1/web/user/${id}`, user)
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


export const deleteUserAction = (id: number): ThunkResult<Promise<ApiResponseList<User>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.delete(`/v1/web/user/${id}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccessList<User> = response.data;

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
