import { Paginator } from '../paginator';

export const FETCH_FOOD_CATEGORY = "FETCH_FOOD_CATEGORY";
export const FETCH_FOOD_CATEGORY_SUCCESS = "FETCH_FOOD_CATEGORY_SUCCESS";
export const FETCH_FOOD_CATEGORY_ERROR = "FETCH_FOOD_CATEGORY_ERROR";
export const SET_PAGINATOR_FOOD_CATEGORY = "SET_PAGINATOR_FOOD_CATEGORY";

export type FormField = {
    name: string,
}

interface FoodCategoryField {
    name: string
}

export interface FoodCategory extends FoodCategoryField {
    id: number,
    createdAt: string,
    updatedAt: string,
    deletedAt: string,
}

export interface FoodCategoryCreate extends FoodCategoryField {

}

export interface FoodCategoryEdit extends FoodCategoryField {

}

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

export type FoodCategoryActionTypes =
    | FetchFoodCategoryActionType
    | FetchFoodCategorySuccessActionType
    | FetchFoodCategoryErrorActionType
    | SetPaginatorFoodCategoryActionType