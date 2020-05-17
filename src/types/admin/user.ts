import { Paginator } from '../paginator';
import { Role } from './role'
import { SelectType } from '../select';
import { Timestamps } from '../timestamps';

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

export type UserField = {
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

export type User = {
    id: number,
    name: string,
    phoneNumber: string,
    email: string,
    telegramuser: string | null,
    chatId: number | null,
    gUserId: string | null,
    gUserPhoneVerified: boolean,
    isActive: boolean,
}

export type UserList = User & {
    roles?: Role[]
}

export type UserShow = User & {
    roles?: Role[]
}

export type UserCreateField = UserField;

export type UserEditField = UserField;

export type UserCreateResult = User & Partial<Timestamps>

export type UserEditResult = User & Partial<Timestamps>

export type FetchUserActionType = {
    type: typeof FETCH_USER
}

export type FetchUserSuccessActionType = {
    type: typeof FETCH_USER_SUCCESS,
    list: User[]
}

export type FetchUserErrorActionType = {
    type: typeof FETCH_USER_ERROR
}

export type SetPaginatorUserActionType = {
    type: typeof SET_PAGINATOR_USER,
    paginate: Paginator
}

export type AlertUserHideActionType = {
    type: typeof ALERT_USER_HIDE
}

export type AlertUserShowActionType = {
    type: typeof ALERT_USER_SHOW,
    message: string,
    color: string
}

export type Filter = {
    name: string
}

export type FilterKeys = keyof Filter;

export type SetFilterUserActionType = {
    type: typeof SET_FILTER_USER,
    filter: Filter
}

export type ClearFilterUserActionType = {
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