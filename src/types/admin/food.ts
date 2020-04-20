import { Paginator } from '../paginator';

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
    foodCategory: {
        value: number,
        label: string
    },
    restaurant: {
        value: number,
        label: string
    }
}

interface FoodField {
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
    }
}

interface FoodList {
    name: string,
    price: number,
    description: string,
    rating: number,
    image: string | null,
    foodCategory: {
        id: number,
        name: string
    },
    restaurant: {
        id: number,
        name: string
    }
}

interface FoodList2 {
    name: string,
    price: number,
    description: string,
    rating: number,
    image: string | null,
    foodCategory: {
        id: number
    },
    restaurant: {
        id: number
    }
}

interface FoodResult {
    id: number,
    createdAt: string,
    updatedAt: string,
    deletedAt: string,
}

export type Food = FoodResult & FoodList;

export type FoodCreate = FoodField;

export type FoodEdit = FoodField;

export type FoodCreateResult = FoodResult & FoodList2;

export type FoodEditResult = FoodResult &  FoodList2;

export interface FetchFoodActionType {
    type: typeof FETCH_FOOD
}

export interface FetchFoodSuccessActionType {
    type: typeof FETCH_FOOD_SUCCESS,
    list: Food[]
}

export interface FetchFoodErrorActionType {
    type: typeof FETCH_FOOD_ERROR
}

export interface SetPaginatorFoodActionType {
    type: typeof SET_PAGINATOR_FOOD,
    paginate: Paginator
}

export interface AlertFoodHideActionType {
    type: typeof ALERT_FOOD_HIDE
}

export interface AlertFoodShowActionType {
    type: typeof ALERT_FOOD_SHOW,
    message: string,
    color: string
}

export interface Filter {
    name: string,
    provinceName: string,
    districtName: string,
    restaurantName: string
}

export interface SetFilterFoodActionType {
    type: typeof SET_FILTER_FOOD,
    filter: Filter
}

export interface ClearFilterFoodActionType {
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