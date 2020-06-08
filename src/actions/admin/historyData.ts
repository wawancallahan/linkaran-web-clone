import axiosService from '../../services/axiosService';
import { Dispatch } from "redux";
import { Paginator } from '../../types/paginator';
import { AppState } from "../../store/configureStore";
import {
    HistoryData,
    SET_PAGINATOR_HISTORY_DATA,
    FETCH_HISTORY_DATA_SUCCESS,
    FETCH_HISTORY_DATA_ERROR,
    SetPaginatorHistoryDataActionType,
    FetchHistoryDataActionType,
    FetchHistoryDataErrorActionType,
    FetchHistoryDataSuccessActionType,
    AlertHistoryDataHideActionType,
    ALERT_HISTORY_DATA_HIDE,
    AlertHistoryDataShowActionType,
    ALERT_HISTORY_DATA_SHOW,
    HistoryDataList,
    HistoryDataShow,
    Filter,
    SetFilterHistoryDataActionType,
    SET_FILTER_HISTORY_DATA,
    ClearFilterHistoryDataActionType,
    CLEAR_FILTER_HISTORY_DATA,
    FilterOmit
} from '../../types/admin/historyData/historyData';
import { AxiosResponse, AxiosError } from 'axios';
import { ApiResponse, ApiResponseList, ApiResponseError, ApiResponseSuccess, ApiResponseSuccessList } from '../../types/api';
import * as dotenv from 'dotenv';
import { ThunkResult } from '../../types/thunk'
import { OptionObjectNumber, objectToParamsUrl, OptionObjectString, getOnlyDateFromDateNull } from '../../helpers/utils';
dotenv.config();
import queryString from 'query-string'
import moment from 'moment';

export const setPaginateAction = (paginate: Paginator): SetPaginatorHistoryDataActionType => {
    return {
        type: SET_PAGINATOR_HISTORY_DATA,
        paginate: paginate
    }
}

export const setFetchHistoryDataSuccessAction = (list: HistoryDataList[]): FetchHistoryDataSuccessActionType => {
    return {
        type: FETCH_HISTORY_DATA_SUCCESS,
        list: list
    }
}

export const setFetchHistoryDataErrorAction = (): FetchHistoryDataErrorActionType => {
    return {
        type: FETCH_HISTORY_DATA_ERROR
    }
}

export const setAlertHistoryDataHideAction = (): AlertHistoryDataHideActionType => {
    return {
        type: ALERT_HISTORY_DATA_HIDE
    }
}

export const setAlertHistoryDataShowAction = (message: string, color: string): AlertHistoryDataShowActionType => {
    return {
        type: ALERT_HISTORY_DATA_SHOW,
        color: color,
        message: message
    };
}

export const clearFilterAction = () : ClearFilterHistoryDataActionType => {
    return {
        type: CLEAR_FILTER_HISTORY_DATA
    }
} 

export const setFilterAction = (filter: Filter) : SetFilterHistoryDataActionType => {
    return {
        type: SET_FILTER_HISTORY_DATA,
        filter: filter
    }
}

export const fetchHistoryDataAction = (page: number): ThunkResult<Promise<Boolean>> => {
    return async (dispatch: Dispatch, getState: () => AppState) => {

        const querySearch = queryString.parse(window.location.search);

        let dateCreateQuery = (querySearch.dateCreate as string) || '';

        const dateCreate = moment(dateCreateQuery, "YYYY-MM-DD", true);

        const filterOmit: FilterOmit = {
            userName: (querySearch.userName as string) || '',
            dateCreate: dateCreate.isValid() ? dateCreate.format("YYYY-MM-DD") : ''
        }

        const filter: Filter = {
            ...filterOmit,
            dateCreate: dateCreate.isValid() ? dateCreate.toDate() : null
        }

        dispatch(setFilterAction(filter));

        let paramsObject: OptionObjectString = {
            page: page.toString(),
            ...filterOmit
        }

        return await axiosService.get(process.env.REACT_APP_API_URL + `/web/history-data`, {
                params: paramsObject
            })
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccessList<HistoryDataList> = response.data;

                dispatch(setFetchHistoryDataSuccessAction(data.result));

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
                dispatch(setFetchHistoryDataErrorAction());

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

export const findHistoryDataAction = (id: number): ThunkResult<Promise<ApiResponse<HistoryDataShow>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.get(process.env.REACT_APP_API_URL + `/web/history-data/${id}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<HistoryDataShow> = response.data;

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