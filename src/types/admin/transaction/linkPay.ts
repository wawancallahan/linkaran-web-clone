import { Paginator } from '../../paginator';

export const FETCH_LINK_PAY = "FETCH_LINK_PAY";
export const FETCH_LINK_PAY_SUCCESS = "FETCH_LINK_PAY_SUCCESS";
export const FETCH_LINK_PAY_ERROR = "FETCH_LINK_PAY_ERROR";
export const SET_PAGINATOR_LINK_PAY = "SET_PAGINATOR_LINK_PAY";

export const ALERT_LINK_PAY_SHOW = "ALERT_LINK_PAY_SHOW";
export const ALERT_LINK_PAY_HIDE = "ALERT_LINK_PAY_HIDE";

export type FormField = {
   
}

interface LinkPayField {
    
}

interface LinkPayList {
    
}

interface LinkPayResult {
   
}

export type LinkPay = LinkPayResult & LinkPayList;

export type LinkPayCreate = LinkPayField;

export type LinkPayEdit = LinkPayField;

export type LinkPayCreateResult = LinkPayResult;

export type LinkPayEditResult = LinkPayResult;

export interface FetchLinkPayActionType {
    type: typeof FETCH_LINK_PAY
}

export interface FetchLinkPaySuccessActionType {
    type: typeof FETCH_LINK_PAY_SUCCESS,
    list: LinkPay[]
}

export interface FetchLinkPayErrorActionType {
    type: typeof FETCH_LINK_PAY_ERROR
}

export interface SetPaginatorLinkPayActionType {
    type: typeof SET_PAGINATOR_LINK_PAY,
    paginate: Paginator
}

export interface AlertLinkPayHideActionType {
    type: typeof ALERT_LINK_PAY_HIDE
}

export interface AlertLinkPayShowActionType {
    type: typeof ALERT_LINK_PAY_SHOW,
    message: string,
    color: string
}

export type LinkPayActionTypes =
    | FetchLinkPayActionType
    | FetchLinkPaySuccessActionType
    | FetchLinkPayErrorActionType
    | AlertLinkPayHideActionType
    | AlertLinkPayShowActionType
    | SetPaginatorLinkPayActionType