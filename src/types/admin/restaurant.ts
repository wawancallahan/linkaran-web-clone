import { Paginator } from '../paginator';

export const FETCH_RESTAURANT = "FETCH_RESTAURANT";
export const FETCH_RESTAURANT_SUCCESS = "FETCH_RESTAURANT_SUCCESS";
export const FETCH_RESTAURANT_ERROR = "FETCH_RESTAURANT_ERROR";
export const SET_PAGINATOR_RESTAURANT = "SET_PAGINATOR_RESTAURANT";

export const ALERT_RESTAURANT_SHOW = "ALERT_RESTAURANT_SHOW";
export const ALERT_RESTAURANT_HIDE = "ALERT_RESTAURANT_HIDE";

export type FormField = {
    name: string,
    point: string,
    rating: number,
    openTime?: Date,
    closeTime?: Date
}

interface RestaurantField {
    name: string,
    point: string,
    rating: number,
    openTime: number,
    closeTime: number
}
interface RestaurantList {
    name: string,
    point: string,
    rating: number,
    openTime: number,
    closeTime: number
}
interface RestaurantResult {
    id: number,
    createdAt: string,
    updatedAt: string,
    deletedAt: string,
}

export type Restaurant = RestaurantResult & RestaurantList;

export type RestaurantCreate = RestaurantField;

export type RestaurantEdit = RestaurantField;

export type RestaurantCreateResult = RestaurantResult;

export type RestaurantEditResult = RestaurantResult;

export interface FetchRestaurantActionType {
    type: typeof FETCH_RESTAURANT
}

export interface FetchRestaurantSuccessActionType {
    type: typeof FETCH_RESTAURANT_SUCCESS,
    list: Restaurant[]
}

export interface FetchRestaurantErrorActionType {
    type: typeof FETCH_RESTAURANT_ERROR
}

export interface SetPaginatorRestaurantActionType {
    type: typeof SET_PAGINATOR_RESTAURANT,
    paginate: Paginator
}

export interface AlertRestaurantHideActionType {
    type: typeof ALERT_RESTAURANT_HIDE
}

export interface AlertRestaurantShowActionType {
    type: typeof ALERT_RESTAURANT_SHOW,
    message: string,
    color: string
}

export type RestaurantActionTypes =
    | FetchRestaurantActionType
    | FetchRestaurantSuccessActionType
    | FetchRestaurantErrorActionType
    | AlertRestaurantHideActionType
    | AlertRestaurantShowActionType
    | SetPaginatorRestaurantActionType