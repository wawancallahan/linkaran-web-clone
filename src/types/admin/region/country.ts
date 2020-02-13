import { Paginator } from '../../paginator';
import { Timestamps } from '../../timestamps';

export const FETCH_COUNTRY = "FETCH_COUNTRY";
export const FETCH_COUNTRY_SUCCESS = "FETCH_COUNTRY_SUCCESS";
export const FETCH_COUNTRY_ERROR = "FETCH_COUNTRY_ERROR";
export const SET_PAGINATOR_COUNTRY = "SET_PAGINATOR_COUNTRY";

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

export type CountryActionTypes =
    | FetchCountryActionType
    | FetchCountrySuccessActionType
    | FetchCountryErrorActionType
    | AlertCountryHideActionType
    | AlertCountryShowActionType
    | SetPaginatorCountryActionType