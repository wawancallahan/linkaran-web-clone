import { Paginator } from '../paginator';

export const FETCH_PRICE = "FETCH_PRICE";
export const FETCH_PRICE_SUCCESS = "FETCH_PRICE_SUCCESS";
export const FETCH_PRICE_ERROR = "FETCH_PRICE_ERROR";
export const SET_PAGINATOR_PRICE = "SET_PAGINATOR_PRICE";

export const ALERT_PRICE_SHOW = "ALERT_PRICE_SHOW";
export const ALERT_PRICE_HIDE = "ALERT_PRICE_HIDE";

export type FormField = {
    basePrice: string,
    perKilometer: string,
    minKm: string
}

interface PriceField {
    basePrice: number,
    perKilometer: number,
    minKm: number
}

interface PriceList {
    basePrice: number,
    perKilometer: number,
    minKm: number
}

interface PriceResult {
    id: number,
    createdAt?: string,
    updatedAt?: string,
    deletedAt?: string,
}

export type Price = PriceResult & PriceList;

export type PriceCreate = PriceField;

export type PriceEdit = PriceField;

export type PriceCreateResult = PriceResult & PriceList;

export type PriceEditResult = PriceResult & PriceList;

export interface FetchPriceActionType {
    type: typeof FETCH_PRICE
}

export interface FetchPriceSuccessActionType {
    type: typeof FETCH_PRICE_SUCCESS,
    list: Price[]
}

export interface FetchPriceErrorActionType {
    type: typeof FETCH_PRICE_ERROR
}

export interface SetPaginatorPriceActionType {
    type: typeof SET_PAGINATOR_PRICE,
    paginate: Paginator
}

export interface AlertPriceHideActionType {
    type: typeof ALERT_PRICE_HIDE
}

export interface AlertPriceShowActionType {
    type: typeof ALERT_PRICE_SHOW,
    message: string,
    color: string
}

export type PriceActionTypes =
    | FetchPriceActionType
    | FetchPriceSuccessActionType
    | FetchPriceErrorActionType
    | AlertPriceHideActionType
    | AlertPriceShowActionType
    | SetPaginatorPriceActionType