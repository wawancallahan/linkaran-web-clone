import { Paginator } from '../../paginator';

export const FETCH_ACCOUNT_LINK_PAY = "FETCH_ACCOUNT_LINK_PAY";
export const FETCH_ACCOUNT_LINK_PAY_SUCCESS = "FETCH_ACCOUNT_LINK_PAY_SUCCESS";
export const FETCH_ACCOUNT_LINK_PAY_ERROR = "FETCH_ACCOUNT_LINK_PAY_ERROR";
export const SET_PAGINATOR_ACCOUNT_LINK_PAY = "SET_PAGINATOR_ACCOUNT_LINK_PAY";

export const ALERT_ACCOUNT_LINK_PAY_SHOW = "ALERT_ACCOUNT_LINK_PAY_SHOW";
export const ALERT_ACCOUNT_LINK_PAY_HIDE = "ALERT_ACCOUNT_LINK_PAY_HIDE";

export type FormField = {
   
}

interface AccountLinkPayField {
    
}

interface AccountLinkPayList {
    user_id: number,
    name: string,
    balance: number,
    code: string,
    type: string
}

interface AccountLinkPayResult {
   id: number
}

export type AccountLinkPay = AccountLinkPayResult & AccountLinkPayList;

export type AccountLinkPayCreate = AccountLinkPayField;

export type AccountLinkPayEdit = AccountLinkPayField;

export type AccountLinkPayCreateResult = AccountLinkPayResult;

export type AccountLinkPayEditResult = AccountLinkPayResult;

export interface FetchAccountLinkPayActionType {
    type: typeof FETCH_ACCOUNT_LINK_PAY
}

export interface FetchAccountLinkPaySuccessActionType {
    type: typeof FETCH_ACCOUNT_LINK_PAY_SUCCESS,
    list: AccountLinkPay[]
}

export interface FetchAccountLinkPayErrorActionType {
    type: typeof FETCH_ACCOUNT_LINK_PAY_ERROR
}

export interface SetPaginatorAccountLinkPayActionType {
    type: typeof SET_PAGINATOR_ACCOUNT_LINK_PAY,
    paginate: Paginator
}

export interface AlertAccountLinkPayHideActionType {
    type: typeof ALERT_ACCOUNT_LINK_PAY_HIDE
}

export interface AlertAccountLinkPayShowActionType {
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