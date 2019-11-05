import { Paginator } from '../paginator';

export const FETCH_USER = "FETCH_USER";
export const SET_PAGINATOR_USER = "SET_PAGINATOR_USER";

export type FormField = {
    nama: string,
    phoneNumber: string,
    email: string
}

export interface User {
}

export interface FetchUserActionType {
    type: typeof FETCH_USER,
    list: User[]
}

export interface SetPaginatorUserActionType {
    type: typeof SET_PAGINATOR_USER,
    paginate: Paginator
}

export type UserActionTypes =
    | FetchUserActionType
    | SetPaginatorUserActionType