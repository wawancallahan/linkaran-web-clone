import axiosService from '../../../services/axiosService';
import { Dispatch } from "redux";
import { Paginator } from '../../../types/paginator';
import { AppState } from "../../../store/configureStore";
import {
    Application,
    SET_PAGINATOR_APPLICATION,
    FETCH_APPLICATION_SUCCESS,
    FETCH_APPLICATION_ERROR,
    SetPaginatorApplicationActionType,
    FetchApplicationActionType,
    FetchApplicationErrorActionType,
    FetchApplicationSuccessActionType,
    ApplicationCreateField,
    ApplicationEditField,
    AlertApplicationHideActionType,
    ALERT_APPLICATION_HIDE,
    AlertApplicationShowActionType,
    ALERT_APPLICATION_SHOW,
    ApplicationEditResult,
    ApplicationCreateResult,
    ApplicationList,
    ApplicationShow,
    ApplicationShowComplete,
    ApplicationShowInprogress,
    Filter,
    SetFilterApplicationActionType,
    SET_FILTER_APPLICATION,
    ClearFilterApplicationActionType,
    CLEAR_FILTER_APPLICATION,
    FilterOmit,
} from '../../../types/admin/transaction/application';
import { AxiosResponse, AxiosError } from 'axios';
import { ApiResponse, ApiResponseList, ApiResponseError, ApiResponseSuccess, ApiResponseSuccessList, MetaDataSuccess } from '../../../types/api';
import * as dotenv from 'dotenv';
import { ThunkResult } from '../../../types/thunk'
import { OptionObjectNumber, objectToParamsUrl, OptionObjectString, typeTransactionFormat } from '../../../helpers/utils';
dotenv.config();
import queryString from 'query-string'
import moment from 'moment';

export const setPaginateAction = (paginate: Paginator): SetPaginatorApplicationActionType => {
    return {
        type: SET_PAGINATOR_APPLICATION,
        paginate: paginate
    }
}

export const setFetchApplicationSuccessAction = (list: ApplicationList[]): FetchApplicationSuccessActionType => {
    return {
        type: FETCH_APPLICATION_SUCCESS,
        list: list
    }
}

export const setFetchApplicationErrorAction = (): FetchApplicationErrorActionType => {
    return {
        type: FETCH_APPLICATION_ERROR
    }
}

export const setAlertApplicationHideAction = (): AlertApplicationHideActionType => {
    return {
        type: ALERT_APPLICATION_HIDE
    }
}

export const setAlertApplicationShowAction = (message: string, color: string): AlertApplicationShowActionType => {
    return {
        type: ALERT_APPLICATION_SHOW,
        color: color,
        message: message
    };
}

export const clearFilterAction = () : ClearFilterApplicationActionType => {
    return {
        type: CLEAR_FILTER_APPLICATION
    }
} 

export const setFilterAction = (filter: Filter) : SetFilterApplicationActionType => {
    return {
        type: SET_FILTER_APPLICATION,
        filter: filter
    }
}

export const fetchApplicationAction = (page: number): ThunkResult<Promise<Boolean>> => {
    return async (dispatch: Dispatch, getState: () => AppState) => {

        const querySearch = queryString.parse(window.location.search);

        let dateQuery = (querySearch.date as string) || '';
        const date = moment(dateQuery, "YYYY-MM-DD", true);

        const filterOmit: FilterOmit = {
            date: date.isValid() ? date.format("YYYY-MM-DD") : '',
            driverName: (querySearch.driverName as string) || '',
            numberTransaction: (querySearch.numberTransaction as string) || '',
            serviceCode: (querySearch.serviceCode as string) || '',
            statusOrder: (querySearch.statusOrder as string) || '',
            type: (querySearch.type as string) || 'complete',
            userName: (querySearch.userName as string) || ''
        }

        const filter: Filter = {
            ...filterOmit,
            date: date.isValid() ? date.toDate() : null
        }

        dispatch(setFilterAction(filter));

        let paramsObject: OptionObjectString = {
            page: page.toString(),
            ...filterOmit
        }

        return await axiosService.get(process.env.REACT_APP_API_URL + `/web/transaction`, {
                params: paramsObject
            })
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccessList<ApplicationList> = response.data;

                dispatch(setFetchApplicationSuccessAction(data.result));

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
                dispatch(setFetchApplicationErrorAction());

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


export const fetchListApplicationAction = (search: string, page: number): ThunkResult<Promise<ApiResponseList<ApplicationList>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        let paramsObject: OptionObjectString = {
            page: page.toString(),
            name: search
        }

        const params = objectToParamsUrl(paramsObject)
       
        return axiosService.get(process.env.REACT_APP_API_URL + `/web/transaction?${params}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccessList<ApplicationList> = response.data;

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

export const createApplicationAction = (country: ApplicationCreateField): ThunkResult<Promise<ApiResponse<ApplicationCreateResult>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.post(process.env.REACT_APP_API_URL + '/web/transaction', country)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<ApplicationCreateResult> = response.data;
                
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

export const findApplicationAction = (type: string, numberTransaction: string): ThunkResult<Promise<ApiResponse<ApplicationShow>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.get(process.env.REACT_APP_API_URL + `/web/transaction/${type}/${numberTransaction}`)
            .then( (response: AxiosResponse) => {

                const typeTransaction = typeTransactionFormat(type);

                let result: ApplicationShow | undefined = undefined; 
                let metaData: MetaDataSuccess | undefined = undefined;

                switch (typeTransaction) {
                    case "complete":
                        const responseComplete: ApiResponseSuccess<ApplicationShowComplete> = response.data;
                        metaData = responseComplete.metaData;
                        result = {
                            item: responseComplete.result,
                            type: "complete"
                        } as ApplicationShow;
                    break;
                    case "inprogress":
                        const responseInprogress: ApiResponseSuccess<ApplicationShowInprogress> = response.data;
                        metaData = responseInprogress.metaData;
                        result = {
                            item: responseInprogress.result,
                            type: "inprogress"
                        } as ApplicationShow;
                    break;
                }

                if (result && metaData) {
                    const data: ApiResponseSuccess<ApplicationShow> = {
                        metaData: metaData,
                        result: result
                    };
    
                    return Promise.resolve({
                        response: data,
                        error: null
                    });
                }

                const errorResponse: ApiResponseError = {
                    metaData: {
                        isError: true,
                        message: "Gagal Mendapatkan Response",
                        statusCode: 500
                    },
                    result: null
                }

                return Promise.reject({
                    response: null,
                    error: errorResponse
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

export const editApplicationAction = (country: ApplicationEditField, id: number): ThunkResult<Promise<ApiResponse<ApplicationEditResult>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.patch(process.env.REACT_APP_API_URL + `/web/transaction/${id}`, country)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<ApplicationEditResult> = response.data;
                
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


export const deleteApplicationAction = (id: number): ThunkResult<Promise<ApiResponse<Application>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.delete(process.env.REACT_APP_API_URL + `/web/transaction/${id}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<Application> = response.data;

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
