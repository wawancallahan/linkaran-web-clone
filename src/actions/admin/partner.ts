import axiosService from '../../services/axiosService';
import { Dispatch } from "redux";
import { Paginator } from '../../types/paginator';
import { AppState } from "../../store/configureStore";
import {
    Partner,
    SET_PAGINATOR_PARTNER,
    FETCH_PARTNER_SUCCESS,
    FETCH_PARTNER_ERROR,
    SetPaginatorPartnerActionType,
    FetchPartnerActionType,
    FetchPartnerErrorActionType,
    FetchPartnerSuccessActionType,
    PartnerCreateField,
    PartnerEditField,
    AlertPartnerHideActionType,
    ALERT_PARTNER_HIDE,
    AlertPartnerShowActionType,
    ALERT_PARTNER_SHOW,
    PartnerEditResult,
    PartnerCreateResult,
    PartnerList,
    PartnerShow,
    Filter,
    SetFilterPartnerActionType,
    SET_FILTER_PARTNER,
    ClearFilterPartnerActionType,
    CLEAR_FILTER_PARTNER,
    FilterOmit
} from '../../types/admin/partner';
import { AxiosResponse, AxiosError } from 'axios';
import { ApiResponse, ApiResponseList, ApiResponseError, ApiResponseSuccess, ApiResponseSuccessList } from '../../types/api';
import * as dotenv from 'dotenv';
import { ThunkResult } from '../../types/thunk'
import { OptionObjectNumber, objectToParamsUrl, OptionObjectString, getOnlyDateFromDateNull } from '../../helpers/utils';
import { AppActions } from '../../types';
import { ThunkDispatch } from 'redux-thunk';
dotenv.config();
import queryString from 'query-string'
import moment from 'moment';

export const setPaginateAction = (paginate: Paginator): SetPaginatorPartnerActionType => {
    return {
        type: SET_PAGINATOR_PARTNER,
        paginate: paginate
    }
}

export const setFetchPartnerSuccessAction = (list: PartnerList[]): FetchPartnerSuccessActionType => {
    return {
        type: FETCH_PARTNER_SUCCESS,
        list: list
    }
}

export const setFetchPartnerErrorAction = (): FetchPartnerErrorActionType => {
    return {
        type: FETCH_PARTNER_ERROR
    }
}

export const setAlertPartnerHideAction = (): AlertPartnerHideActionType => {
    return {
        type: ALERT_PARTNER_HIDE
    }
}

export const setAlertPartnerShowAction = (message: string, color: string): AlertPartnerShowActionType => {
    return {
        type: ALERT_PARTNER_SHOW,
        color: color,
        message: message
    };
}

export const clearFilterAction = () : ClearFilterPartnerActionType => {
    return {
        type: CLEAR_FILTER_PARTNER
    }
} 

export const setFilterAction = (filter: Filter) : SetFilterPartnerActionType => {
    return {
        type: SET_FILTER_PARTNER,
        filter: filter
    }
}

export const fetchPartnerAction = (page: number): ThunkResult<Promise<Boolean>> => {
    return async (dispatch: Dispatch, getState: () => AppState) => {

        const querySearch = queryString.parse(window.location.search);

        let startWorkingTogetherQuery = decodeURIComponent((querySearch.startWorkingTogether as string) || '');
        let endWorkingTogetherQuery = decodeURIComponent((querySearch.endWorkingTogether as string) || '');

        const startWorkingTogether = moment(startWorkingTogetherQuery, "YYYY-MM-DD", true);
        const endWorkingTogether = moment(endWorkingTogetherQuery, "YYYY-MM-DD", true);

        const filterOmit: FilterOmit = {
            name: decodeURIComponent((querySearch.name as string) || ''),
            companyName: decodeURIComponent((querySearch.companyName as string) || ''),
            email: decodeURIComponent((querySearch.email as string) || ''),
            endWorkingTogether: endWorkingTogether.isValid() ? endWorkingTogether.format("YYYY-MM-DD") : '',
            phoneNumber: decodeURIComponent((querySearch.phoneNumber as string) || ''),
            startWorkingTogether: startWorkingTogether.isValid() ? startWorkingTogether.format("YYYY-MM-DD") : ''
        }

        const filter: Filter = {
            ...filterOmit,
            endWorkingTogether: endWorkingTogether.isValid() ? endWorkingTogether.toDate() : null,
            startWorkingTogether: startWorkingTogether.isValid() ? startWorkingTogether.toDate() : null
        }

        let paramsObject: OptionObjectString = {
            page: page.toString(),
            ...filterOmit
        }

        return await axiosService.get(process.env.REACT_APP_API_URL + `/web/partner`, {
                params: paramsObject
            })
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccessList<PartnerList> = response.data;

                dispatch(setFetchPartnerSuccessAction(data.result));

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
                dispatch(setFetchPartnerErrorAction());

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


export const fetchListPartnerAction = (search: string, page: number): ThunkResult<Promise<ApiResponseList<PartnerList>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        let paramsObject: OptionObjectString = {
            page: page.toString(),
            name: search
        }

        const params = objectToParamsUrl(paramsObject)
       
        return axiosService.get(process.env.REACT_APP_API_URL + `/web/partner?${params}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccessList<PartnerList> = response.data;

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

export const createPartnerAction = (partner: PartnerCreateField): ThunkResult<Promise<ApiResponse<PartnerCreateResult>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.post(process.env.REACT_APP_API_URL + '/web/partner', partner)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<PartnerCreateResult> = response.data;
                
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

export const findPartnerAction = (id: number): ThunkResult<Promise<ApiResponse<PartnerShow>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.get(process.env.REACT_APP_API_URL + `/web/partner/${id}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<PartnerShow> = response.data;

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

export const editPartnerAction = (partner: PartnerEditField, id: number): ThunkResult<Promise<ApiResponse<PartnerEditResult>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.patch(process.env.REACT_APP_API_URL + `/web/partner/${id}`, partner)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<PartnerEditResult> = response.data;
                
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


export const deletePartnerAction = (id: number): ThunkResult<Promise<ApiResponse<Partner>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.delete(process.env.REACT_APP_API_URL + `/web/partner/${id}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<Partner> = response.data;

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

export const activePartnerAction = (id: number): ThunkResult<Promise<ApiResponse<Partner>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.patch(process.env.REACT_APP_API_URL + `/web/partner/${id}/activate`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<Partner> = response.data;

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

export const deactivePartnerAction = (id: number): ThunkResult<Promise<ApiResponse<Partner>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.patch(process.env.REACT_APP_API_URL + `/web/partner/${id}/deactivate`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<Partner> = response.data;

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
