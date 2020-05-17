import { Paginator } from '../paginator';
import { Service } from './service' 
import { VoucherType } from './voucherType';
import { User } from './user';
import { Transaction } from './tansaction';
import { SelectType } from '../select';

export const FETCH_VOUCHER_PROMO = "FETCH_VOUCHER_PROMO";
export const FETCH_VOUCHER_PROMO_SUCCESS = "FETCH_VOUCHER_PROMO_SUCCESS";
export const FETCH_VOUCHER_PROMO_ERROR = "FETCH_VOUCHER_PROMO_ERROR";
export const SET_PAGINATOR_VOUCHER_PROMO = "SET_PAGINATOR_VOUCHER_PROMO";
export const SET_FILTER_VOUCHER_PROMO = "SET_FILTER_VOUCHER_PROMO";
export const CLEAR_FILTER_VOUCHER_PROMO = "CLEAR_FILTER_VOUCHER_PROMO";

export const ALERT_VOUCHER_PROMO_SHOW = "ALERT_VOUCHER_PROMO_SHOW";
export const ALERT_VOUCHER_PROMO_HIDE = "ALERT_VOUCHER_PROMO_HIDE";

export const FETCH_VOUCHER_PROMO_USER_USED = "FETCH_VOUCHER_PROMO_USER_USED";
export const FETCH_VOUCHER_PROMO_USER_USED_SUCCESS = "FETCH_VOUCHER_PROMO_USER_USED_SUCCESS";
export const FETCH_VOUCHER_PROMO_USER_USED_ERROR = "FETCH_VOUCHER_PROMO_USER_USED_ERROR";
export const SET_PAGINATOR_VOUCHER_PROMO_USER_USED = "SET_PAGINATOR_VOUCHER_PROMO_USER_USED";

export type FormField = {
    name: string,
    code: string,
    amount: string,
    quota: string,
    minimumPurchase: string,
    isLimited: string,
    quantity: string,
    description: string,
    service: SelectType[],
    type: SelectType,
    startDateTime: Date | null,
    endDateTime: Date | null,
    image: File | null,
    image_preview: string
}

interface VoucherPromoField {
    name: string,
    code: string,
    amount: string,
    quota: string,
    minimumPurchase: string,
    isLimited: boolean,
    quantity: string,
    description: string,
    service: SelectType[],
    type: SelectType,
    startDateTime: string,
    endDateTime: string,
    image: File | null,
    image_preview: string
}

interface VoucherPromoList {
    name: string,
    code: string,
    image: string | null,
    amount: number,
    quota: number,
    minimumPurchase: number,
    startDateTime: string,
    endDateTime: string,
    isLimited: boolean,
    quantity: number,
    description: string,
    type: Partial<VoucherType>,
    service: Service[],
    ticketUsed?: number
    quotaUsed?: string,
    typeId?: number
}

interface VoucherPromoResult {
    id: number,
    createdAt?: string,
    updatedAt?: string,
    deletedAt?: string,
}

export type VoucherPromoUserUsed = {
    id: number,
    isUsed: boolean,
    user: User,
    transaction: Transaction
}

export type VoucherPromo = VoucherPromoResult & VoucherPromoList;

export type VoucherPromoCreate = VoucherPromoField;

export type VoucherPromoEdit = VoucherPromoField;

export type VoucherPromoCreateResult = VoucherPromoResult;

export type VoucherPromoEditResult = VoucherPromoResult;

export interface FetchVoucherPromoActionType {
    type: typeof FETCH_VOUCHER_PROMO
}

export interface FetchVoucherPromoSuccessActionType {
    type: typeof FETCH_VOUCHER_PROMO_SUCCESS,
    list: VoucherPromo[]
}

export interface FetchVoucherPromoErrorActionType {
    type: typeof FETCH_VOUCHER_PROMO_ERROR
}

export interface SetPaginatorVoucherPromoActionType {
    type: typeof SET_PAGINATOR_VOUCHER_PROMO,
    paginate: Paginator
}

export interface FetchVoucherPromoUserUsedActionType {
    type: typeof FETCH_VOUCHER_PROMO_USER_USED
}

export interface FetchVoucherPromoUserUsedSuccessActionType {
    type: typeof FETCH_VOUCHER_PROMO_USER_USED_SUCCESS,
    list: VoucherPromoUserUsed[]
}

export interface FetchVoucherPromoUserUsedErrorActionType {
    type: typeof FETCH_VOUCHER_PROMO_USER_USED_ERROR
}

export interface SetPaginatorVoucherPromoUserUsedActionType {
    type: typeof SET_PAGINATOR_VOUCHER_PROMO_USER_USED,
    paginate: Paginator
}

export interface AlertVoucherPromoHideActionType {
    type: typeof ALERT_VOUCHER_PROMO_HIDE
}

export interface AlertVoucherPromoShowActionType {
    type: typeof ALERT_VOUCHER_PROMO_SHOW,
    message: string,
    color: string
}

export interface Filter {
    name: string,
    code: string,
    amount: string,
    quota: string,
    minimumPurchase: string,
    isLimited: string,
    quantity: string
}

export type FilterKeys = keyof Filter;

export interface SetFilterVoucherPromoActionType {
    type: typeof SET_FILTER_VOUCHER_PROMO,
    filter: Filter
}

export interface ClearFilterVoucherPromoActionType {
    type: typeof CLEAR_FILTER_VOUCHER_PROMO
}

export type VoucherPromoActionTypes =
    | FetchVoucherPromoActionType
    | FetchVoucherPromoSuccessActionType
    | FetchVoucherPromoErrorActionType
    | AlertVoucherPromoHideActionType
    | AlertVoucherPromoShowActionType
    | SetPaginatorVoucherPromoActionType
    | FetchVoucherPromoUserUsedActionType
    | FetchVoucherPromoUserUsedSuccessActionType
    | FetchVoucherPromoUserUsedErrorActionType
    | SetPaginatorVoucherPromoUserUsedActionType
    | SetFilterVoucherPromoActionType
    | ClearFilterVoucherPromoActionType