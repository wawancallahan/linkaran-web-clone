import { Paginator } from '../paginator';

export const FETCH_FOOD_CATEGORY = "FETCH_FOOD_CATEGORY";
export const FETCH_FOOD_CATEGORY_SUCCESS = "FETCH_FOOD_CATEGORY_SUCCESS";
export const FETCH_FOOD_CATEGORY_ERROR = "FETCH_FOOD_CATEGORY_ERROR";
export const SET_PAGINATOR_FOOD_CATEGORY = "SET_PAGINATOR_FOOD_CATEGORY";
export const SET_FILTER_FOOD_CATEGORY = "SET_FILTER_FOOD_CATEGORY";
export const CLEAR_FILTER_FOOD_CATEGORY = "CLEAR_FILTER_FOOD_CATEGORY";

export const ALERT_FOOD_CATEGORY_SHOW = "ALERT_FOOD_CATEGORY_SHOW";
export const ALERT_FOOD_CATEGORY_HIDE = "ALERT_FOOD_CATEGORY_HIDE";

export type FormField = {
    name: string,
}

interface FoodCategoryField {
    name: string
}
interface FoodCategoryList {
    name: string
}
interface FoodCategoryResult {
    id: number,
    createdAt: string,
    updatedAt: string,
    deletedAt: string,
}

export type FoodCategory = FoodCategoryResult & FoodCategoryList;

export type FoodCategoryCreate = FoodCategoryField;

export type FoodCategoryEdit = FoodCategoryField;

export type FoodCategoryCreateResult = FoodCategoryResult;

export type FoodCategoryEditResult = FoodCategoryResult;

export interface FetchFoodCategoryActionType {
    type: typeof FETCH_FOOD_CATEGORY
}

export interface FetchFoodCategorySuccessActionType {
    type: typeof FETCH_FOOD_CATEGORY_SUCCESS,
    list: FoodCategory[]
}

export interface FetchFoodCategoryErrorActionType {
    type: typeof FETCH_FOOD_CATEGORY_ERROR
}

export interface SetPaginatorFoodCategoryActionType {
    type: typeof SET_PAGINATOR_FOOD_CATEGORY,
    paginate: Paginator
}

export interface AlertFoodCategoryHideActionType {
    type: typeof ALERT_FOOD_CATEGORY_HIDE
}

export interface AlertFoodCategoryShowActionType {
    type: typeof ALERT_FOOD_CATEGORY_SHOW,
    message: string,
    color: string
}

export interface Filter {
    name: string
}

export type FilterKeys = keyof Filter;

export interface SetFilterFoodCategoryActionType {
    type: typeof SET_FILTER_FOOD_CATEGORY,
    filter: Filter
}

export interface ClearFilterFoodCategoryActionType {
    type: typeof CLEAR_FILTER_FOOD_CATEGORY
}

export type FoodCategoryActionTypes =
    | FetchFoodCategoryActionType
    | FetchFoodCategorySuccessActionType
    | FetchFoodCategoryErrorActionType
    | AlertFoodCategoryHideActionType
    | AlertFoodCategoryShowActionType
    | SetPaginatorFoodCategoryActionType
    | SetFilterFoodCategoryActionType
    | ClearFilterFoodCategoryActionType