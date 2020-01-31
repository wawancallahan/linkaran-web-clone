import { Paginator } from '../paginator';

export const FETCH_VOUCHER_TYPE = "FETCH_VOUCHER_TYPE";
export const FETCH_VOUCHER_TYPE_SUCCESS = "FETCH_VOUCHER_TYPE_SUCCESS";
export const FETCH_VOUCHER_TYPE_ERROR = "FETCH_VOUCHER_TYPE_ERROR";
export const SET_PAGINATOR_VOUCHER_TYPE = "SET_PAGINATOR_VOUCHER_TYPE";

export const ALERT_VOUCHER_TYPE_SHOW = "ALERT_VOUCHER_TYPE_SHOW";
export const ALERT_VOUCHER_TYPE_HIDE = "ALERT_VOUCHER_TYPE_HIDE";

export type FormField = {
    name: string
}

interface VoucherTypeField {
    name: string
}

interface VoucherTypeList {
    name: string
}

interface VoucherTypeResult {
    id: number,
    createdAt?: string,
    updatedAt?: string | null,
    deletedAt?: string | null,
}

export type VoucherType = VoucherTypeResult & VoucherTypeList;

export type VoucherTypeCreate = VoucherTypeField;

export type VoucherTypeEdit = VoucherTypeField;

export type VoucherTypeCreateResult = VoucherTypeResult & VoucherTypeList;

export type VoucherTypeEditResult = VoucherTypeResult &  VoucherTypeList;

export interface FetchVoucherTypeActionType {
    type: typeof FETCH_VOUCHER_TYPE
}

export interface FetchVoucherTypeSuccessActionType {
    type: typeof FETCH_VOUCHER_TYPE_SUCCESS,
    list: VoucherType[]
}

export interface FetchVoucherTypeErrorActionType {
    type: typeof FETCH_VOUCHER_TYPE_ERROR
}

export interface SetPaginatorVoucherTypeActionType {
    type: typeof SET_PAGINATOR_VOUCHER_TYPE,
    paginate: Paginator
}

export interface AlertVoucherTypeHideActionType {
    type: typeof ALERT_VOUCHER_TYPE_HIDE
}

export interface AlertVoucherTypeShowActionType {
    type: typeof ALERT_VOUCHER_TYPE_SHOW,
    message: string,
    color: string
}

export type VoucherTypeActionTypes =
    | FetchVoucherTypeActionType
    | FetchVoucherTypeSuccessActionType
    | FetchVoucherTypeErrorActionType
    | AlertVoucherTypeHideActionType
    | AlertVoucherTypeShowActionType
    | SetPaginatorVoucherTypeActionType