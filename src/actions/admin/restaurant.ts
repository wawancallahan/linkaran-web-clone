import axiosService from '../../services/axiosService';
import { Dispatch } from "redux";
import { Paginator } from '../../types/paginator';
import { AppState } from "../../store/configureStore";
import {
    Restaurant,
    RestaurantList,
    RestaurantShow,
    SET_PAGINATOR_RESTAURANT,
    FETCH_RESTAURANT_SUCCESS,
    FETCH_RESTAURANT_ERROR,
    SetPaginatorRestaurantActionType,
    FetchRestaurantActionType,
    FetchRestaurantErrorActionType,
    FetchRestaurantSuccessActionType,
    RestaurantCreateField,
    RestaurantEditField,
    AlertRestaurantHideActionType,
    ALERT_RESTAURANT_HIDE,
    AlertRestaurantShowActionType,
    ALERT_RESTAURANT_SHOW,
    RestaurantEditResult,
    RestaurantCreateResult,
    OperatingTime,
    Filter,
    SetFilterRestaurantActionType,
    SET_FILTER_RESTAURANT,
    ClearFilterRestaurantActionType,
    CLEAR_FILTER_RESTAURANT
} from '../../types/admin/restaurant';
import Axios, { AxiosResponse, AxiosError } from 'axios';
import { ApiResponse, ApiResponseList, ApiResponseError, ApiResponseSuccess, ApiResponseSuccessList } from '../../types/api';
import { ThunkResult } from '../../types/thunk';
import * as dotenv from 'dotenv';
import { booleanToString, OptionObjectString, objectToParamsUrl } from '../../helpers/utils';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../../types';
dotenv.config();
import queryString from 'query-string'

export const setPaginateAction = (paginate: Paginator): SetPaginatorRestaurantActionType => {
    return {
        type: SET_PAGINATOR_RESTAURANT,
        paginate: paginate
    }
}

export const setFetchRestaurantSuccessAction = (list: Restaurant[]): FetchRestaurantSuccessActionType => {
    return {
        type: FETCH_RESTAURANT_SUCCESS,
        list: list
    }
}

export const setFetchRestaurantErrorAction = (): FetchRestaurantErrorActionType => {
    return {
        type: FETCH_RESTAURANT_ERROR
    }
}

export const setAlertRestaurantHideAction = (): AlertRestaurantHideActionType => {
    return {
        type: ALERT_RESTAURANT_HIDE
    }
}

export const setAlertRestaurantShowAction = (message: string, color: string): AlertRestaurantShowActionType => {
    return {
        type: ALERT_RESTAURANT_SHOW,
        color: color,
        message: message
    };
}

export const clearFilterAction = () : ClearFilterRestaurantActionType => {
    return {
        type: CLEAR_FILTER_RESTAURANT
    }
} 

export const setFilterAction = (filter: Filter) : SetFilterRestaurantActionType => {
    return {
        type: SET_FILTER_RESTAURANT,
        filter: filter
    }
}

export const fetchRestaurantAction = (page: number) : ThunkResult<Promise<Boolean>> => {
    return async (dispatch: Dispatch, getState: () => AppState) => {
        
        const querySearch = queryString.parse(window.location.search);

        const filter: Filter = {
            districtName: (querySearch.districtName as string) || '',
            name: (querySearch.name as string) || '',
            provinceName: (querySearch.provinceName as string) || '',
        }

        let paramsObject: OptionObjectString = {
            page: page.toString(),
            ...filter
        }

        return await axiosService.get(process.env.REACT_APP_API_URL + `/web/restaurant`, {
                params: paramsObject
            })
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccessList<RestaurantList> = response.data;

                dispatch(setFetchRestaurantSuccessAction(data.result));

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
                dispatch(setFetchRestaurantErrorAction());

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

export const fetchListRestaurantAction = (search: string, page: number): ThunkResult<Promise<ApiResponseList<RestaurantList>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {

        let paramsObject: OptionObjectString = {
            page: page.toString(),
            name: search
        }

        return axiosService.get(process.env.REACT_APP_API_URL + `/web/restaurant`, {
                params: paramsObject
            })
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccessList<RestaurantList> = response.data;

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

export const createRestaurantAction = (restaurant: RestaurantCreateField): ThunkResult<Promise<ApiResponse<RestaurantCreateResult>>> => {
    return async (dispatch: Dispatch, getState: () => AppState) => {
        
        const data = new FormData;

        if (restaurant.photo) {
            data.append('photo', restaurant.photo);
        }

        data.set('name', restaurant.name)
        data.set('address', restaurant.address)
        data.set('point.lat', restaurant.point.lat)
        data.set('point.lng', restaurant.point.lng)
        data.set('rating', restaurant.rating.toString())
        data.set('district.id', restaurant.district.id.toString())
        data.set('phoneNumber', restaurant.phoneNumber)
        data.set('registered', booleanToString(restaurant.registered))

        for (var i = 0; i < restaurant.operatingTime.length; i++) {
            data.set(`operatingTime.${i}.openTime`, restaurant.operatingTime[i].openTime);
            data.set(`operatingTime.${i}.closeTime`, restaurant.operatingTime[i].closeTime);
            data.set(`operatingTime.${i}.day`, restaurant.operatingTime[i].day.toString());
            data.set(`operatingTime.${i}.isClosed`, booleanToString(restaurant.operatingTime[i].isClosed));   
        }
        
        return await axiosService.post(process.env.REACT_APP_API_URL + '/web/restaurant', data, {
                headers: {
                    'Content-Type': 'multipart/form-data' 
                }
            })
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<RestaurantCreateResult> = response.data;
                
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

export const findRestaurantAction = (id: number): ThunkResult<Promise<ApiResponse<RestaurantShow>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.get(process.env.REACT_APP_API_URL + `/web/restaurant/${id}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<RestaurantShow> = response.data;

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

export const editRestaurantAction = (restaurant: RestaurantEditField, id: number): ThunkResult<Promise<ApiResponse<RestaurantEditResult>>> => {
    return async (dispatch: Dispatch, getState: () => AppState) => {

        const data = new FormData;

        if (restaurant.photo) {
            data.append('photo', restaurant.photo);
        }

        data.set('name', restaurant.name)
        data.set('address', restaurant.address)
        data.set('point.lat', restaurant.point.lat)
        data.set('point.lng', restaurant.point.lng)
        data.set('rating', restaurant.rating.toString())
        data.set('district.id', restaurant.district.id.toString())
        data.set('phoneNumber', restaurant.phoneNumber)
        data.set('registered', booleanToString(restaurant.registered))

        for (var i = 0; i < restaurant.operatingTime.length; i++) {
            data.set(`operatingTime.${i}.openTime`, restaurant.operatingTime[i].openTime);
            data.set(`operatingTime.${i}.closeTime`, restaurant.operatingTime[i].closeTime);
            data.set(`operatingTime.${i}.day`, restaurant.operatingTime[i].day.toString());
            data.set(`operatingTime.${i}.isClosed`, booleanToString(restaurant.operatingTime[i].isClosed));   
        }

        return await axiosService.patch(process.env.REACT_APP_API_URL + `/web/restaurant/${id}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data' 
                }
            })
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<RestaurantEditResult> = response.data;
                
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


export const deleteRestaurantAction = (id: number): ThunkResult<Promise<ApiResponse<Restaurant>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.delete(process.env.REACT_APP_API_URL + `/web/restaurant/${id}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<Restaurant> = response.data;

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
