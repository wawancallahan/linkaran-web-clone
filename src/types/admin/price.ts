import { Paginator } from '../paginator';
import { Timestamps } from '../timestamps';

export const FETCH_PRICE = "FETCH_PRICE";
export const FETCH_PRICE_SUCCESS = "FETCH_PRICE_SUCCESS";
export const FETCH_PRICE_ERROR = "FETCH_PRICE_ERROR";
export const SET_PAGINATOR_PRICE = "SET_PAGINATOR_PRICE";
export const SET_FILTER_PRICE = "SET_FILTER_PRICE";
export const CLEAR_FILTER_PRICE = "CLEAR_FILTER_PRICE";

export const ALERT_PRICE_SHOW = "ALERT_PRICE_SHOW";
export const ALERT_PRICE_HIDE = "ALERT_PRICE_HIDE";

export type FormField = {
    basePrice: string,
    perKilometer: string,
    minKm: string
}

export type PriceField = {
    basePrice: number,
    perKilometer: number,
    minKm: number
}

export type Price = {
    id: number,
    basePrice: number,
    perKilometer: number,
    minKm: number
}

export type PriceList = Price

export type PriceShow = Price

export type PriceCreateField = PriceField;

export type PriceEditField = PriceField;

export type PriceCreateResult = Price & Partial<Timestamps>;

export type PriceEditResult = Price & Partial<Timestamps>;

export type FetchPriceActionType = {
    type: typeof FETCH_PRICE
}

export type FetchPriceSuccessActionType = {
    type: typeof FETCH_PRICE_SUCCESS,
    list: Price[]
}

export type FetchPriceErrorActionType = {
    type: typeof FETCH_PRICE_ERROR
}

export type SetPaginatorPriceActionType = {
    type: typeof SET_PAGINATOR_PRICE,
    paginate: Paginator
}

export type AlertPriceHideActionType = {
    type: typeof ALERT_PRICE_HIDE
}

export type AlertPriceShowActionType = {
    type: typeof ALERT_PRICE_SHOW,
    message: string,
    color: string
}

export type Filter = {
    basePrice: string,
    perKilometer: string,
    minKm: string
}

export type FilterKeys = keyof Filter

export type SetFilterPriceActionType = {
    type: typeof SET_FILTER_PRICE,
    filter: Filter
}

export type ClearFilterPriceActionType = {
    type: typeof CLEAR_FILTER_PRICE
}

export type PriceActionTypes =
    | FetchPriceActionType
    | FetchPriceSuccessActionType
    | FetchPriceErrorActionType
    | AlertPriceHideActionType
    | AlertPriceShowActionType
    | SetPaginatorPriceActionType
    | SetFilterPriceActionType
    | ClearFilterPriceActionType