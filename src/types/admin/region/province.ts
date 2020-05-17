import { Paginator } from '../../paginator';
import { Country } from './country';
import { Timestamps } from '../../timestamps';
import { SelectType } from '../../select';

export const FETCH_PROVINCE = "FETCH_PROVINCE";
export const FETCH_PROVINCE_SUCCESS = "FETCH_PROVINCE_SUCCESS";
export const FETCH_PROVINCE_ERROR = "FETCH_PROVINCE_ERROR";
export const SET_PAGINATOR_PROVINCE = "SET_PAGINATOR_PROVINCE";
export const SET_FILTER_PROVINCE = "SET_FILTER_PROVINCE";
export const CLEAR_FILTER_PROVINCE = "CLEAR_FILTER_PROVINCE";

export const ALERT_PROVINCE_SHOW = "ALERT_PROVINCE_SHOW";
export const ALERT_PROVINCE_HIDE = "ALERT_PROVINCE_HIDE";

export type FormField = {
    name: string,
    alternativeName: string,
    country: SelectType
}

export type ProvinceField = {
    name: string,
    alternativeName: string,
    country: {
        id: number
    }
}

export type Province = {
    id: number,
    name: string,
    alternativeName: string,
}

export type ProvinceList = Province & {
    country?: Partial<Country>
}

export type ProvinceShow = Province & {
    country?: Partial<Country>
}

export type ProvinceCreateField = ProvinceField

export type ProvinceEditField = ProvinceField

export type ProvinceCreateResult = Province & Partial<Timestamps> & {
    country?: Partial<Country>
}

export type ProvinceEditResult = Province & Partial<Timestamps> & {
    country?: Partial<Country>
}

export type FetchProvinceActionType = {
    type: typeof FETCH_PROVINCE
}

export type FetchProvinceSuccessActionType = {
    type: typeof FETCH_PROVINCE_SUCCESS,
    list: ProvinceList[]
}

export type FetchProvinceErrorActionType = {
    type: typeof FETCH_PROVINCE_ERROR
}

export type SetPaginatorProvinceActionType = {
    type: typeof SET_PAGINATOR_PROVINCE,
    paginate: Paginator
}

export type AlertProvinceHideActionType = {
    type: typeof ALERT_PROVINCE_HIDE
}

export type AlertProvinceShowActionType = {
    type: typeof ALERT_PROVINCE_SHOW,
    message: string,
    color: string
}

export type Filter = {
    name: string,
    countryName: string
}

export type FilterKeys = keyof Filter

export type SetFilterProvinceActionType = {
    type: typeof SET_FILTER_PROVINCE,
    filter: Filter
}

export type ClearFilterProvinceActionType = {
    type: typeof CLEAR_FILTER_PROVINCE
}

export type ProvinceActionTypes =
    | FetchProvinceActionType
    | FetchProvinceSuccessActionType
    | FetchProvinceErrorActionType
    | AlertProvinceHideActionType
    | AlertProvinceShowActionType
    | SetPaginatorProvinceActionType
    | SetFilterProvinceActionType
    | ClearFilterProvinceActionType