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

export type CountryField = {
    name: string
}

export type Country = {
    id: number,
    name: string
}

export type CountryList = Country

export type CountryShow = Country

export type CountryCreateField = CountryField

export type CountryEditField = CountryField

export type CountryCreateResult = Country & Partial<Timestamps>

export type CountryEditResult = Country & Partial<Timestamps>

export type FetchCountryActionType = {
    type: typeof FETCH_COUNTRY
}

export type FetchCountrySuccessActionType = {
    type: typeof FETCH_COUNTRY_SUCCESS,
    list: CountryList[]
}

export type FetchCountryErrorActionType = {
    type: typeof FETCH_COUNTRY_ERROR
}

export type SetPaginatorCountryActionType = {
    type: typeof SET_PAGINATOR_COUNTRY,
    paginate: Paginator
}

export type AlertCountryHideActionType = {
    type: typeof ALERT_COUNTRY_HIDE
}

export type AlertCountryShowActionType = {
    type: typeof ALERT_COUNTRY_SHOW,
    message: string,
    color: string
}

export type Filter = {
    name: string
}

export type FilterKeys = keyof Filter

export type SetFilterCountryActionType = {
    type: typeof SET_FILTER_COUNTRY,
    filter: Filter
}

export type ClearFilterCountryActionType = {
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