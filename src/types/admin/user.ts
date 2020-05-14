import { Paginator } from '../paginator';
import { Role } from './role'
import { SelectType } from '../select';

export const FETCH_USER = "FETCH_USER";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const FETCH_USER_ERROR = "FETCH_USER_ERROR";
export const SET_PAGINATOR_USER = "SET_PAGINATOR_USER";
export const SET_FILTER_USER = "SET_FILTER_USER";
export const CLEAR_FILTER_USER = "CLEAR_FILTER_USER";

export const ALERT_USER_SHOW = "ALERT_USER_SHOW";
export const ALERT_USER_HIDE = "ALERT_USER_HIDE";

export type FormField = {
    name: string,
    phoneNumber: string,
    email: string,
    roles: SelectType[],
    telegramuser: string | null
}

interface UserField {
    name: string
    phoneNumber: string,
    email: string,
    roles: {
        id: number
    }[],
    telegramuser: string | null 
}

export type EMoneyUser = {
    id: number,
    name: string,
    accountNumber: string,
    balance: number
}

interface UserList {
    name: string
    phoneNumber: string,
    email: string,
    gUserPhoneVerified: boolean | null,
    gUserId: string | null
    roles: Role[],
    iat?: number,
    exp?: number,
    linkWithGoogle?: boolean,
    isActive?: boolean,
    telegramuser: string | null,
    chatId: number | string | null,
    eMoneyUser?: EMoneyUser[]
}

interface UserResult {
    id: number,
    createdAt: string,
    updatedAt: string,
    deletedAt: string,
}

export type User = UserResult & UserList;

export type UserCreate = UserField;

export type UserEdit = UserField;

export type UserCreateResult = UserResult & UserList;

export type UserEditResult = UserResult &  UserList;

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

export interface Filter {
    name: string
}

export type FilterKeys = keyof Filter;

export interface SetFilterUserActionType {
    type: typeof SET_FILTER_USER,
    filter: Filter
}

export interface ClearFilterUserActionType {
    type: typeof CLEAR_FILTER_USER
}

export type UserActionTypes =
    | FetchUserActionType
    | FetchUserSuccessActionType
    | FetchUserErrorActionType
    | AlertUserHideActionType
    | AlertUserShowActionType
    | SetPaginatorUserActionType
    | SetFilterUserActionType
    | ClearFilterUserActionType