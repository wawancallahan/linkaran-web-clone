import { Paginator } from '../paginator';
import { Timestamps } from '../timestamps';

export const FETCH_TELEGRAM_USER = "FETCH_TELEGRAM_USER";
export const FETCH_TELEGRAM_USER_SUCCESS = "FETCH_TELEGRAM_USER_SUCCESS";
export const FETCH_TELEGRAM_USER_ERROR = "FETCH_TELEGRAM_USER_ERROR";
export const SET_PAGINATOR_TELEGRAM_USER = "SET_PAGINATOR_TELEGRAM_USER";

export const ALERT_TELEGRAM_USER_SHOW = "ALERT_TELEGRAM_USER_SHOW";
export const ALERT_TELEGRAM_USER_HIDE = "ALERT_TELEGRAM_USER_HIDE";

export type FormField = {
    telegramuser: string,
}

interface TelegramUserField {
    telegramuser: string
}

export interface TelegramUser {
    id: number,
    telegramuser: string
}

export type TelegramUserList = TelegramUser

export type TelegramUserShow = TelegramUser

export type TelegramUserCreateField = TelegramUserField

export type TelegramUserEditField = TelegramUserField

export type TelegramUserCreateResult = TelegramUser & Partial<Timestamps>

export type TelegramUserEditResult = TelegramUser & Partial<Timestamps>

export interface FetchTelegramUserActionType {
    type: typeof FETCH_TELEGRAM_USER
}

export interface FetchTelegramUserSuccessActionType {
    type: typeof FETCH_TELEGRAM_USER_SUCCESS,
    list: TelegramUserList[]
}

export interface FetchTelegramUserErrorActionType {
    type: typeof FETCH_TELEGRAM_USER_ERROR
}

export interface SetPaginatorTelegramUserActionType {
    type: typeof SET_PAGINATOR_TELEGRAM_USER,
    paginate: Paginator
}

export interface AlertTelegramUserHideActionType {
    type: typeof ALERT_TELEGRAM_USER_HIDE
}

export interface AlertTelegramUserShowActionType {
    type: typeof ALERT_TELEGRAM_USER_SHOW,
    message: string,
    color: string
}

export type TelegramUserActionTypes =
    | FetchTelegramUserActionType
    | FetchTelegramUserSuccessActionType
    | FetchTelegramUserErrorActionType
    | AlertTelegramUserHideActionType
    | AlertTelegramUserShowActionType
    | SetPaginatorTelegramUserActionType