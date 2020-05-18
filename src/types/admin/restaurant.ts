import { Paginator } from '../paginator';
import { District } from './region/district';
import { Province } from './region/province';
import { SelectType } from '../select';
import { Timestamps } from '../timestamps';

export const FETCH_RESTAURANT = "FETCH_RESTAURANT";
export const FETCH_RESTAURANT_SUCCESS = "FETCH_RESTAURANT_SUCCESS";
export const FETCH_RESTAURANT_ERROR = "FETCH_RESTAURANT_ERROR";
export const SET_PAGINATOR_RESTAURANT = "SET_PAGINATOR_RESTAURANT";
export const SET_FILTER_RESTAURANT = "SET_FILTER_RESTAURANT";
export const CLEAR_FILTER_RESTAURANT = "CLEAR_FILTER_RESTAURANT";

export const ALERT_RESTAURANT_SHOW = "ALERT_RESTAURANT_SHOW";
export const ALERT_RESTAURANT_HIDE = "ALERT_RESTAURANT_HIDE";

export type FormField = {
    name: string,
    address: string,
    point: {
        lat: string,
        lng: string
    },
    rating: number,
    photo: File | null,
    photo_preview: string,
    monday_start: string | null,
    monday_end: string | null,
    monday_isClosed: boolean,
    tuesday_start: string | null,
    tuesday_end: string | null,
    tuesday_isClosed: boolean,
    wednesday_start: string | null,
    wednesday_end: string | null,
    wednesday_isClosed: boolean,
    thursday_start: string | null,
    thursday_end: string | null,
    thursday_isClosed: boolean,
    friday_start: string | null,
    friday_end: string | null,
    friday_isClosed: boolean,
    saturday_start: string | null,
    saturday_end: string | null,
    saturday_isClosed: boolean,
    sunday_start: string | null,
    sunday_end: string | null,
    sunday_isClosed: boolean,
    province: SelectType,
    district: SelectType,
    phoneNumber: string,
    registered: string
}

export type RestaurantField = {
    name: string,
    address: string,
    point: {
        lat: string,
        lng: string
    },
    rating: number,
    photo: File | null,
    photo_preview: string,
    operatingTime: OperatingTime[],
    district: {
        id: number
    },
    phoneNumber: string,
    registered: boolean
}

export type Restaurant = {
    id: number,
    name: string,
    address: string,
    registered: boolean,
    phoneNumber: string | null,
    point: {
        lat: string,
        lng: string
    },
    rating: number,
    image: string | null
}

export type OperatingTime = {
    openTime: string,
    closeTime: string,
    day: number,
    isClosed: boolean
}

export type RestaurantList = Restaurant & {
    district?: Partial<District> & {
        province?: Partial<Province>
    }
}

export type RestaurantShow = Restaurant & {
    district?: Partial<District> & {
        province?: Partial<Province>
    },
    operatingTime?: Partial<OperatingTime>[]
}

export type RestaurantCreateField = RestaurantField;

export type RestaurantEditField = RestaurantField;

export type RestaurantCreateResult = Restaurant & Partial<Timestamps> & {
    district?: Partial<District>,
    operatingTime?: Partial<OperatingTime & Timestamps & {
        restaurant?: Partial<Restaurant> & {
            district?: Partial<District>
        }
    }>[]
}

export type RestaurantEditResult = Restaurant & Partial<Timestamps> & {
    district?: Partial<District>,
    operatingTime?: Partial<OperatingTime & Timestamps & {
        restaurant?: Partial<Restaurant> & {
            district?: Partial<District>
        }
    }>[]
}

export type FetchRestaurantActionType = {
    type: typeof FETCH_RESTAURANT
}

export type FetchRestaurantSuccessActionType = {
    type: typeof FETCH_RESTAURANT_SUCCESS,
    list: Restaurant[]
}

export type FetchRestaurantErrorActionType = {
    type: typeof FETCH_RESTAURANT_ERROR
}

export type SetPaginatorRestaurantActionType = {
    type: typeof SET_PAGINATOR_RESTAURANT,
    paginate: Paginator
}

export type Filter = {
    name: string,
    provinceName: string,
    districtName: string
}

export type FilterKeys = keyof Filter

export type SetFilterRestaurantActionType = {
    type: typeof SET_FILTER_RESTAURANT,
    filter: Filter
}

export type ClearFilterRestaurantActionType = {
    type: typeof CLEAR_FILTER_RESTAURANT
}

export type AlertRestaurantHideActionType = {
    type: typeof ALERT_RESTAURANT_HIDE
}

export type AlertRestaurantShowActionType = {
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
    | SetFilterRestaurantActionType
    | ClearFilterRestaurantActionType