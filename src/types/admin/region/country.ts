import { Paginator } from '../../paginator';
import { Timestamps } from '../../timestamps';

export const FETCH_COUNTRY = "FETCH_COUNTRY";
export const FETCH_COUNTRY_SUCCESS = "FETCH_COUNTRY_SUCCESS";
export const FETCH_COUNTRY_ERROR = "FETCH_COUNTRY_ERROR";
export const SET_PAGINATOR_COUNTRY = "SET_PAGINATOR_COUNTRY";
export const SET_FILTER_COUNTRY = "SET_FILTER_COUNTRY";
export const CLEAR_FILTER_COUNTRY = "CLEAR_FILTER_COUNTRY";

export const ALERT_COUNTRY_SHOW = "ALERT_COUNTRY_SHOW";
export const ALERT_COUNTRY_HIDE = "ALERT_COUNTRY_HIDE";

export type FormField = {
    name: string,
}

interface CountryField {
    name: string
}

export interface Country {
    id: number,
    name: string
}

export type CountryList = Country

export type CountryShow = Country

export type CountryCreateField = CountryField

export type CountryEditField = CountryField

export type CountryCreateResult = Country & Partial<Timestamps>

export type CountryEditResult = Country & Partial<Timestamps>

export interface FetchCountryActionType {
    type: typeof FETCH_COUNTRY
}

export interface FetchCountrySuccessActionType {
    type: typeof FETCH_COUNTRY_SUCCESS,
    list: CountryList[]
}

export interface FetchCountryErrorActionType {
    type: typeof FETCH_COUNTRY_ERROR
}

export interface SetPaginatorCountryActionType {
    type: typeof SET_PAGINATOR_COUNTRY,
    paginate: Paginator
}

export interface AlertCountryHideActionType {
    type: typeof ALERT_COUNTRY_HIDE
}

export interface AlertCountryShowActionType {
    type: typeof ALERT_COUNTRY_SHOW,
    message: string,
    color: string
}

export interface Filter {
    name: string
}

export type FilterKeys = keyof Filter

export interface SetFilterCountryActionType {
    type: typeof SET_FILTER_COUNTRY,
    filter: Filter
}

export interface ClearFilterCountryActionType {
    type: typeof CLEAR_FILTER_COUNTRY
}

export type CountryActionTypes =
    | FetchCountryActionType
    | FetchCountrySuccessActionType
    | FetchCountryErrorActionType
    | AlertCountryHideActionType
    | AlertCountryShowActionType
    | SetPaginatorCountryActionType
    | SetFilterCountryActionType
    | ClearFilterCountryActionType