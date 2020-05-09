import { Paginator } from '../paginator';
import { District } from './region/district';
import { Province } from './region/province';

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
    monday_start: Date | null,
    monday_end: Date | null,
    monday_isClosed: boolean,
    tuesday_start: Date | null,
    tuesday_end: Date | null,
    tuesday_isClosed: boolean,
    wednesday_start: Date | null,
    wednesday_end: Date | null,
    wednesday_isClosed: boolean,
    thursday_start: Date | null,
    thursday_end: Date | null,
    thursday_isClosed: boolean,
    friday_start: Date | null,
    friday_end: Date | null,
    friday_isClosed: boolean,
    saturday_start: Date | null,
    saturday_end: Date | null,
    saturday_isClosed: boolean,
    sunday_start: Date | null,
    sunday_end: Date | null,
    sunday_isClosed: boolean,
    province: {
        label: string,
        value: number
    },
    district: {
        label: string,
        value: number
    },
    phoneNumber: string
}

export interface OperatingTime {
    openTime: string,
    closeTime: string,
    day: number,
    isClosed: boolean
}

interface RestaurantField {
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
    phoneNumber: string
}
interface RestaurantList {
    name: string,
    address: string | null,
    point: {
        lat: string,
        lng: string
    },
    rating: number,
    image: string | null,
    phoneNumber?: string
}
interface RestaurantResult {
    id: number,
    createdAt: string | null,
    updatedAt: string | null,
    deletedAt: string | null,
}

interface RestaurantModel {
    name: string,
    address: string,
    rating: number,
    image: string,
    point: {
        lat: string,
        lng: string
    },
    phoneNumber?: string
}

export interface OperatingTimeModel {
    openTime: string,
    closeTime: string,
    day: number,
    isClosed: string
}

export type Restaurant = RestaurantResult & RestaurantList & {
    district?: Partial<District> & {
        province?: Partial<Province>
    }
};

export type RestaurantCreate = RestaurantField;

export type RestaurantEdit = RestaurantField;

type operatingTimeResult = RestaurantResult & OperatingTimeModel & {
    restaurant: RestaurantModel & RestaurantResult & {
        district?: Partial<District>
    }
}

export type RestaurantCreateResult = RestaurantResult & RestaurantModel & {
    operatingTime: operatingTimeResult[],
    district?: Partial<District> & {
        province?: Partial<Province>
    }
}

export type RestaurantEditResult = RestaurantResult & RestaurantModel & {
    operatingTime: operatingTimeResult[],
    district?: Partial<District> & {
        province?: Partial<Province>
    }
};

type OperatingTimeDetail = OperatingTime & RestaurantResult;

export type RestaurantDetailResult = RestaurantResult & RestaurantModel & {
    operatingTime: OperatingTimeDetail[],
    district?: Partial<District> & {
        province?: Partial<Province>
    }
}

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

export interface Filter {
    name: string,
    provinceName: string,
    districtName: string
}

export type FilterKeys = keyof Filter

export interface SetFilterRestaurantActionType {
    type: typeof SET_FILTER_RESTAURANT,
    filter: Filter
}

export interface ClearFilterRestaurantActionType {
    type: typeof CLEAR_FILTER_RESTAURANT
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
    | SetFilterRestaurantActionType
    | ClearFilterRestaurantActionType