import { Paginator } from '../paginator';
import { Restaurant } from './restaurant';
import { SelectType, SelectStringType } from '../select';
import { District } from './region/district';
import { Province } from './region/province';
import { FoodCategory } from './foodCategory';
import { Timestamps } from '../timestamps';

export const FETCH_FOOD = "FETCH_FOOD";
export const FETCH_FOOD_SUCCESS = "FETCH_FOOD_SUCCESS";
export const FETCH_FOOD_ERROR = "FETCH_FOOD_ERROR";
export const SET_PAGINATOR_FOOD = "SET_PAGINATOR_FOOD";
export const SET_FILTER_FOOD = "SET_FILTER_FOOD";
export const CLEAR_FILTER_FOOD = "CLEAR_FILTER_FOOD";

export const ALERT_FOOD_SHOW = "ALERT_FOOD_SHOW";
export const ALERT_FOOD_HIDE = "ALERT_FOOD_HIDE";

export type FormField = {
    name: string,
    price: number,
    description: string,
    rating: number,
    image: File | null,
    image_preview: string,
    foodCategory: SelectType,
    restaurant: SelectType,
    status: SelectStringType
}

export type FoodField = {
    name: string,
    price: number,
    description: string,
    rating: number,
    image: File | null,
    image_preview: string,
    foodCategory: {
        id: number
    },
    restaurant: {
        id: number
    },
    status: FoodStatusEnum
}

export enum FoodStatusEnum {
    AVAILABLE = 'AVAILABLE',
    OUT_OF_STOCK = 'OUT_OF_STOCK',
    NOT_AVAILABLE = 'NOT_AVAILABLE',
}

export type Food = {
    id: number,
    name: string,
    price: number,
    description: string,
    rating: number,
    image: string | null,
    status: FoodStatusEnum
}

export type FoodList = Food & {
    restaurant?: Partial<Restaurant> & {
        district?: Partial<District> & {
            province?: Partial<Province>
        }
    },
    foodCategory?: Partial<FoodCategory>
}

export type FoodShow = Food & {
    restaurant?: Partial<Restaurant>,
    foodCategory?: Partial<FoodCategory>
}

export type FoodCreateField = FoodField;

export type FoodEditField = FoodField;

export type FoodCreateResult = Food & Partial<Timestamps> & {
    restaurant?: Partial<Restaurant>,
    foodCategory?: Partial<FoodCategory>
}

export type FoodEditResult = Food & Partial<Timestamps> & {
    restaurant?: Partial<Restaurant>,
    foodCategory?: Partial<FoodCategory>
}

export type FetchFoodActionType = {
    type: typeof FETCH_FOOD
}

export type FetchFoodSuccessActionType = {
    type: typeof FETCH_FOOD_SUCCESS,
    list: Food[]
}

export type FetchFoodErrorActionType = {
    type: typeof FETCH_FOOD_ERROR
}

export type SetPaginatorFoodActionType = {
    type: typeof SET_PAGINATOR_FOOD,
    paginate: Paginator
}

export type AlertFoodHideActionType = {
    type: typeof ALERT_FOOD_HIDE
}

export type AlertFoodShowActionType = {
    type: typeof ALERT_FOOD_SHOW,
    message: string,
    color: string
}

export type Filter = {
    name: string,
    provinceName: string,
    districtName: string,
    restaurantName: string
}

export type FilterKeys = keyof Filter;

export type SetFilterFoodActionType = {
    type: typeof SET_FILTER_FOOD,
    filter: Filter
}

export type ClearFilterFoodActionType = {
    type: typeof CLEAR_FILTER_FOOD
}

export type FoodActionTypes =
    | FetchFoodActionType
    | FetchFoodSuccessActionType
    | FetchFoodErrorActionType
    | AlertFoodHideActionType
    | AlertFoodShowActionType
    | SetPaginatorFoodActionType
    | SetFilterFoodActionType
    | ClearFilterFoodActionType