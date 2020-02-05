import axiosService from '../../services/axiosService';
import { Dispatch } from "redux";
import { Paginator } from '../../types/paginator';
import { AppState } from "../../store/configureStore";
import {
    Food,
    SET_PAGINATOR_FOOD,
    FETCH_FOOD_SUCCESS,
    FETCH_FOOD_ERROR,
    SetPaginatorFoodActionType,
    FetchFoodActionType,
    FetchFoodErrorActionType,
    FetchFoodSuccessActionType,
    FoodCreate,
    FoodEdit,
    AlertFoodHideActionType,
    ALERT_FOOD_HIDE,
    AlertFoodShowActionType,
    ALERT_FOOD_SHOW,
    FoodCreateResult,
    FoodEditResult
} from '../../types/admin/food';
import { AxiosResponse, AxiosError } from 'axios';
import { ApiResponse, ApiResponseList, ApiResponseError, ApiResponseSuccess, ApiResponseSuccessList } from '../../types/api';
import { ThunkResult } from '../../types/thunk';
import * as dotenv from 'dotenv';
dotenv.config();

export const setPaginateAction = (paginate: Paginator): SetPaginatorFoodActionType => {
    return {
        type: SET_PAGINATOR_FOOD,
        paginate: paginate
    }
}

export const setFetchFoodSuccessAction = (list: Food[]): FetchFoodSuccessActionType => {
    return {
        type: FETCH_FOOD_SUCCESS,
        list: list
    }
}

export const setFetchFoodErrorAction = (): FetchFoodErrorActionType => {
    return {
        type: FETCH_FOOD_ERROR
    }
}

export const setAlertFoodHideAction = (): AlertFoodHideActionType => {
    return {
        type: ALERT_FOOD_HIDE
    }
}

export const setAlertFoodShowAction = (message: string, color: string): AlertFoodShowActionType => {
    return {
        type: ALERT_FOOD_SHOW,
        color: color,
        message: message
    };
}

export const fetchFoodAction = (page: number) : ThunkResult<Promise<Boolean>> => {
    return async (dispatch: Dispatch, getState: () => AppState) => {
        return await axiosService.get(process.env.REACT_APP_API_URL + `/web/food?page=${page}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccessList<Food> = response.data;

                dispatch(setFetchFoodSuccessAction(data.result));

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
                dispatch(setFetchFoodErrorAction());

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

export const createFoodAction = (food: FoodCreate): ThunkResult<Promise<ApiResponse<FoodCreateResult>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        const data = new FormData;

        if (food.image) {
            data.append('photo', food.image);
        }

        data.set('name', food.name)
        data.set('price', food.price.toString())
        data.set('description', food.description)
        data.set('rating', food.rating.toString())
        data.set('foodCategory.id', food.foodCategory.id.toString())
        data.set('restaurant.id', food.restaurant.id.toString())
       
        return axiosService.post(process.env.REACT_APP_API_URL + '/web/food', data, {
                headers: {
                    'Content-Type': 'multipart/form-data' 
                }
            })
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<FoodCreateResult> = response.data;
                
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

export const findFoodAction = (id: number): ThunkResult<Promise<ApiResponse<Food>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.get(process.env.REACT_APP_API_URL + `/web/food/${id}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<Food> = response.data;

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

export const editFoodAction = (food: FoodEdit, id: number): ThunkResult<Promise<ApiResponse<FoodEditResult>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        const data = new FormData;
        
        if (food.image) {
            data.append('photo', food.image);
        }

        data.set('name', food.name)
        data.set('price', food.price.toString())
        data.set('description', food.description)
        data.set('rating', food.rating.toString())
        data.set('foodCategory.id', food.foodCategory.id.toString())
        data.set('restaurant.id', food.restaurant.id.toString())
        
        return axiosService.patch(process.env.REACT_APP_API_URL + `/web/food/${id}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data' 
                }
            })
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<FoodEditResult> = response.data;
                
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


export const deleteFoodAction = (id: number): ThunkResult<Promise<ApiResponse<Food>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.delete(process.env.REACT_APP_API_URL + `/web/food/${id}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<Food> = response.data;

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
