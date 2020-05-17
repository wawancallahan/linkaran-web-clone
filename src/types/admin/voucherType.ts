import { Paginator } from '../paginator';
import { Timestamps } from '../timestamps';

export const FETCH_VOUCHER_TYPE = "FETCH_VOUCHER_TYPE";
export const FETCH_VOUCHER_TYPE_SUCCESS = "FETCH_VOUCHER_TYPE_SUCCESS";
export const FETCH_VOUCHER_TYPE_ERROR = "FETCH_VOUCHER_TYPE_ERROR";
export const SET_PAGINATOR_VOUCHER_TYPE = "SET_PAGINATOR_VOUCHER_TYPE";
export const SET_FILTER_VOUCHER_TYPE = "SET_FILTER_VOUCHER_TYPE";
export const CLEAR_FILTER_VOUCHER_TYPE = "CLEAR_FILTER_VOUCHER_TYPE";

export const ALERT_VOUCHER_TYPE_SHOW = "ALERT_VOUCHER_TYPE_SHOW";
export const ALERT_VOUCHER_TYPE_HIDE = "ALERT_VOUCHER_TYPE_HIDE";

export type FormField = {
    name: string
}

export type VoucherTypeField = {
    name: string
}

export type VoucherType = {
    id: number,
    name: string
}

export type VoucherTypeList = VoucherType

export type VoucherTypeShow = VoucherType

export type VoucherTypeCreateField = VoucherTypeField

export type VoucherTypeEditField = VoucherTypeField

export type VoucherTypeCreateResult = VoucherType & Partial<Timestamps>

export type VoucherTypeEditResult = VoucherType &  Partial<Timestamps>

export type FetchVoucherTypeActionType = {
    type: typeof FETCH_VOUCHER_TYPE
}

export type FetchVoucherTypeSuccessActionType = {
    type: typeof FETCH_VOUCHER_TYPE_SUCCESS,
    list: VoucherType[]
}

export type FetchVoucherTypeErrorActionType = {
    type: typeof FETCH_VOUCHER_TYPE_ERROR
}

export type SetPaginatorVoucherTypeActionType = {
    type: typeof SET_PAGINATOR_VOUCHER_TYPE,
    paginate: Paginator
}

export type AlertVoucherTypeHideActionType = {
    type: typeof ALERT_VOUCHER_TYPE_HIDE
}

export type AlertVoucherTypeShowActionType = {
    type: typeof ALERT_VOUCHER_TYPE_SHOW,
    message: string,
    color: string
}

export type Filter = {
    name: string
}

export type FilterKeys = keyof Filter;

export type SetFilterVoucherTypeActionType = {
    type: typeof SET_FILTER_VOUCHER_TYPE,
    filter: Filter
}

export type ClearFilterVoucherTypeActionType = {
    type: typeof CLEAR_FILTER_VOUCHER_TYPE
}

export type VoucherTypeActionTypes =
    | FetchVoucherTypeActionType
    | FetchVoucherTypeSuccessActionType
    | FetchVoucherTypeErrorActionType
    | AlertVoucherTypeHideActionType
    | AlertVoucherTypeShowActionType
    | SetPaginatorVoucherTypeActionType
    | SetFilterVoucherTypeActionType
    | ClearFilterVoucherTypeActionType