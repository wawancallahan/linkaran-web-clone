import { Paginator } from '../../paginator';

export const FETCH_ACCOUNT_LINK_PAY = "FETCH_ACCOUNT_LINK_PAY";
export const FETCH_ACCOUNT_LINK_PAY_SUCCESS = "FETCH_ACCOUNT_LINK_PAY_SUCCESS";
export const FETCH_ACCOUNT_LINK_PAY_ERROR = "FETCH_ACCOUNT_LINK_PAY_ERROR";
export const SET_PAGINATOR_ACCOUNT_LINK_PAY = "SET_PAGINATOR_ACCOUNT_LINK_PAY";

export const ALERT_ACCOUNT_LINK_PAY_SHOW = "ALERT_ACCOUNT_LINK_PAY_SHOW";
export const ALERT_ACCOUNT_LINK_PAY_HIDE = "ALERT_ACCOUNT_LINK_PAY_HIDE";

export type AccountLinkPay = {
    id: number,
    user_id: number,
    name: string,
    balance: number,
    code: string,
    type: string
}

export type AccountLinkPayList = AccountLinkPay

export type AccountLinkPayShow = AccountLinkPay

export type FetchAccountLinkPayActionType = {
    type: typeof FETCH_ACCOUNT_LINK_PAY
}

export type FetchAccountLinkPaySuccessActionType = {
    type: typeof FETCH_ACCOUNT_LINK_PAY_SUCCESS,
    list: AccountLinkPay[]
}

export type FetchAccountLinkPayErrorActionType = {
    type: typeof FETCH_ACCOUNT_LINK_PAY_ERROR
}

export type SetPaginatorAccountLinkPayActionType = {
    type: typeof SET_PAGINATOR_ACCOUNT_LINK_PAY,
    paginate: Paginator
}

export type AlertAccountLinkPayHideActionType = {
    type: typeof ALERT_ACCOUNT_LINK_PAY_HIDE
}

export type AlertAccountLinkPayShowActionType = {
    type: typeof ALERT_ACCOUNT_LINK_PAY_SHOW,
    message: string,
    color: string
}

export type AccountLinkPayActionTypes =
    | FetchAccountLinkPayActionType
    | FetchAccountLinkPaySuccessActionType
    | FetchAccountLinkPayErrorActionType
    | AlertAccountLinkPayHideActionType
    | AlertAccountLinkPayShowActionType
    | SetPaginatorAccountLinkPayActionType