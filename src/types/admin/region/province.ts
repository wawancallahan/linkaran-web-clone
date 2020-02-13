import { Paginator } from '../../paginator';
import { Country } from './country';
import { Timestamps } from '../../timestamps';

export const FETCH_PROVINCE = "FETCH_PROVINCE";
export const FETCH_PROVINCE_SUCCESS = "FETCH_PROVINCE_SUCCESS";
export const FETCH_PROVINCE_ERROR = "FETCH_PROVINCE_ERROR";
export const SET_PAGINATOR_PROVINCE = "SET_PAGINATOR_PROVINCE";

export const ALERT_PROVINCE_SHOW = "ALERT_PROVINCE_SHOW";
export const ALERT_PROVINCE_HIDE = "ALERT_PROVINCE_HIDE";

export type FormField = {
    name: string,
    alternativeName: string,
    country: {
        label: string,
        value: number
    }
}

interface ProvinceField {
    name: string,
    alternativeName: string,
    country: {
        id: number
    }
}

export interface Province {
    id: number,
    name: string,
    alternativeName: string,
}

export type ProvinceList = Province & {
    country: Partial<Country>
}

export type ProvinceShow = Province & {
    country: Partial<Country>
}

export type ProvinceCreateField = ProvinceField

export type ProvinceEditField = ProvinceField

export type ProvinceCreateResult = Province & Partial<Timestamps> & {
    country: Partial<Country>
}

export type ProvinceEditResult = Province & Partial<Timestamps> & {
    country: Partial<Country>
}

export interface FetchProvinceActionType {
    type: typeof FETCH_PROVINCE
}

export interface FetchProvinceSuccessActionType {
    type: typeof FETCH_PROVINCE_SUCCESS,
    list: ProvinceList[]
}

export interface FetchProvinceErrorActionType {
    type: typeof FETCH_PROVINCE_ERROR
}

export interface SetPaginatorProvinceActionType {
    type: typeof SET_PAGINATOR_PROVINCE,
    paginate: Paginator
}

export interface AlertProvinceHideActionType {
    type: typeof ALERT_PROVINCE_HIDE
}

export interface AlertProvinceShowActionType {
    type: typeof ALERT_PROVINCE_SHOW,
    message: string,
    color: string
}

export type ProvinceActionTypes =
    | FetchProvinceActionType
    | FetchProvinceSuccessActionType
    | FetchProvinceErrorActionType
    | AlertProvinceHideActionType
    | AlertProvinceShowActionType
    | SetPaginatorProvinceActionType