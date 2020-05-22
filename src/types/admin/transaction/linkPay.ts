import { Paginator } from '../../paginator';

export const FETCH_LINK_PAY = "FETCH_LINK_PAY";
export const FETCH_LINK_PAY_SUCCESS = "FETCH_LINK_PAY_SUCCESS";
export const FETCH_LINK_PAY_ERROR = "FETCH_LINK_PAY_ERROR";
export const SET_PAGINATOR_LINK_PAY = "SET_PAGINATOR_LINK_PAY";

export const ALERT_LINK_PAY_SHOW = "ALERT_LINK_PAY_SHOW";
export const ALERT_LINK_PAY_HIDE = "ALERT_LINK_PAY_HIDE";

export type FormField = {
   
}

export type LinkPayField = {
    
}

export type LinkPayList = {
    linkpay_id: number,
    payment_id: number,
    amount: number,
    note: string,
    is_deposit: number,
    is_withdraw: number,
    is_transfer: number,
    send_to: string | null,
    datetime_transaction: string
}

export type LinkPayResult = {
   id: number
}

export type LinkPay = LinkPayResult & LinkPayList;

export type LinkPayCreate = LinkPayField;

export type LinkPayEdit = LinkPayField;

export type LinkPayCreateResult = LinkPayResult;

export type LinkPayEditResult = LinkPayResult;

export type FetchLinkPayActionType = {
    type: typeof FETCH_LINK_PAY
}

export type FetchLinkPaySuccessActionType = {
    type: typeof FETCH_LINK_PAY_SUCCESS,
    list: LinkPay[]
}

export type FetchLinkPayErrorActionType = {
    type: typeof FETCH_LINK_PAY_ERROR
}

export type SetPaginatorLinkPayActionType = {
    type: typeof SET_PAGINATOR_LINK_PAY,
    paginate: Paginator
}

export type AlertLinkPayHideActionType = {
    type: typeof ALERT_LINK_PAY_HIDE
}

export type AlertLinkPayShowActionType = {
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