import { Paginator } from '../paginator';

export const FETCH_USER = "FETCH_USER";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const FETCH_USER_ERROR = "FETCH_USER_ERROR";
export const SET_PAGINATOR_USER = "SET_PAGINATOR_USER";

export const ALERT_USER_SHOW = "ALERT_USER_SHOW";
export const ALERT_USER_HIDE = "ALERT_USER_HIDE";

export type FormField = {
    name: string,
    phoneNumber: string,
    email: string
}

interface UserField {
    name: string
    phoneNumber: string,
    email: string
}

export interface User extends UserField {
    id: number,
    createdAt: string,
    updatedAt: string,
    deletedAt: string,
}

export interface UserCreate extends UserField {

}

export interface UserEdit extends UserField {

}

export interface FetchUserActionType {
    type: typeof FETCH_USER
}

export interface FetchUserSuccessActionType {
    type: typeof FETCH_USER_SUCCESS,
    list: User[]
}

export interface FetchUserErrorActionType {
    type: typeof FETCH_USER_ERROR
}

export interface SetPaginatorUserActionType {
    type: typeof SET_PAGINATOR_USER,
    paginate: Paginator
}

export interface AlertUserHideActionType {
    type: typeof ALERT_USER_HIDE
}

export interface AlertUserShowActionType {
    type: typeof ALERT_USER_SHOW,
    message: string,
    color: string
}

export type UserActionTypes =
    | FetchUserActionType
    | FetchUserSuccessActionType
    | FetchUserErrorActionType
    | AlertUserHideActionType
    | AlertUserShowActionType
    | SetPaginatorUserActionType