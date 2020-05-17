import { Paginator } from '../paginator';
import { Timestamps } from '../timestamps';

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

export type FoodCategoryField = {
    name: string
}

export type FoodCategory = {
    id: number,
    name: string
}

export type FoodCategoryList = FoodCategory & Partial<Timestamps>

export type FoodCategoryShow = FoodCategory & Partial<Timestamps>

export type FoodCategoryCreateField = FoodCategoryField

export type FoodCategoryEditField = FoodCategoryField

export type FoodCategoryCreateResult = FoodCategory & Partial<Timestamps>

export type FoodCategoryEditResult = FoodCategory & Partial<Timestamps>

export type FetchFoodCategoryActionType = {
    type: typeof FETCH_FOOD_CATEGORY
}

export type FetchFoodCategorySuccessActionType = {
    type: typeof FETCH_FOOD_CATEGORY_SUCCESS,
    list: FoodCategory[]
}

export type FetchFoodCategoryErrorActionType = {
    type: typeof FETCH_FOOD_CATEGORY_ERROR
}

export type SetPaginatorFoodCategoryActionType = {
    type: typeof SET_PAGINATOR_FOOD_CATEGORY,
    paginate: Paginator
}

export type AlertFoodCategoryHideActionType = {
    type: typeof ALERT_FOOD_CATEGORY_HIDE
}

export type AlertFoodCategoryShowActionType = {
    type: typeof ALERT_FOOD_CATEGORY_SHOW,
    message: string,
    color: string
}

export type Filter = {
    name: string
}

export type FilterKeys = keyof Filter;

export type SetFilterFoodCategoryActionType = {
    type: typeof SET_FILTER_FOOD_CATEGORY,
    filter: Filter
}

export type ClearFilterFoodCategoryActionType = {
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