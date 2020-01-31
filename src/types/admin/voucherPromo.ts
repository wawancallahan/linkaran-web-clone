import { Paginator } from '../paginator';
import { Service } from './service' 
import { VoucherType } from './voucherType';

export const FETCH_VOUCHER_PROMO = "FETCH_VOUCHER_PROMO";
export const FETCH_VOUCHER_PROMO_SUCCESS = "FETCH_VOUCHER_PROMO_SUCCESS";
export const FETCH_VOUCHER_PROMO_ERROR = "FETCH_VOUCHER_PROMO_ERROR";
export const SET_PAGINATOR_VOUCHER_PROMO = "SET_PAGINATOR_VOUCHER_PROMO";

export const ALERT_VOUCHER_PROMO_SHOW = "ALERT_VOUCHER_PROMO_SHOW";
export const ALERT_VOUCHER_PROMO_HIDE = "ALERT_VOUCHER_PROMO_HIDE";

type ServiceSelect = {
    value: number,
    label: string
}

export type FormField = {
    name: string,
    code: string,
    minKm: string,
    amount: string,
    quota: string,
    minimumPurchase: string,
    isLimited: number | null,
    quantity: string,
    description: string,
    service: ServiceSelect[],
    type: {
        value: number,
        label: string
    },
    startDateTime: Date | null,
    endDateTime: Date | null,
    fileimage: File | null,
    fileImagePreview: string
}

interface VoucherPromoField {
    basePrice: number,
    pricePerKm: number,
    minKm: number,
    district: {
        id: number
    }
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
    type: VoucherType,
    service: Service[]
}

interface VoucherPromoResult {
    id: number,
    createdAt?: string,
    updatedAt?: string,
    deletedAt?: string,
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

export interface AlertVoucherPromoHideActionType {
    type: typeof ALERT_VOUCHER_PROMO_HIDE
}

export interface AlertVoucherPromoShowActionType {
    type: typeof ALERT_VOUCHER_PROMO_SHOW,
    message: string,
    color: string
}

export type VoucherPromoActionTypes =
    | FetchVoucherPromoActionType
    | FetchVoucherPromoSuccessActionType
    | FetchVoucherPromoErrorActionType
    | AlertVoucherPromoHideActionType
    | AlertVoucherPromoShowActionType
    | SetPaginatorVoucherPromoActionType