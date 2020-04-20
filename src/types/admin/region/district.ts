import { Paginator } from '../../paginator';
import { Province } from './province';
import { Timestamps } from '../../timestamps';

export const FETCH_DISTRICT = "FETCH_DISTRICT";
export const FETCH_DISTRICT_SUCCESS = "FETCH_DISTRICT_SUCCESS";
export const FETCH_DISTRICT_ERROR = "FETCH_DISTRICT_ERROR";
export const SET_PAGINATOR_DISTRICT = "SET_PAGINATOR_DISTRICT";
export const SET_FILTER_DISTRICT = "SET_FILTER_DISTRICT";
export const CLEAR_FILTER_DISTRICT = "CLEAR_FILTER_DISTRICT";

export const ALERT_DISTRICT_SHOW = "ALERT_DISTRICT_SHOW";
export const ALERT_DISTRICT_HIDE = "ALERT_DISTRICT_HIDE";

export type FormField = {
    name: string,
    alternativeName: string,
    province: {
        label: string,
        value: number
    }
}

interface DistrictField {
    name: string,
    alternativeName: string,
    province: {
        id: number
    }
}

export interface District {
    id: number,
    name: string,
    alternativeName: string,
}

export type DistrictList = District & {
    province?: Partial<Province>
}

export type DistrictShow = District & {
    province?: Partial<Province>
}

export type DistrictCreateField = DistrictField

export type DistrictEditField = DistrictField

export type DistrictCreateResult = District & Partial<Timestamps> & {
    province?: Partial<Province>
}

export type DistrictEditResult = District & Partial<Timestamps> & {
    province?: Partial<Province>
}

export interface FetchDistrictActionType {
    type: typeof FETCH_DISTRICT
}

export interface FetchDistrictSuccessActionType {
    type: typeof FETCH_DISTRICT_SUCCESS,
    list: DistrictList[]
}

export interface FetchDistrictErrorActionType {
    type: typeof FETCH_DISTRICT_ERROR
}

export interface SetPaginatorDistrictActionType {
    type: typeof SET_PAGINATOR_DISTRICT,
    paginate: Paginator
}

export interface AlertDistrictHideActionType {
    type: typeof ALERT_DISTRICT_HIDE
}

export interface AlertDistrictShowActionType {
    type: typeof ALERT_DISTRICT_SHOW,
    message: string,
    color: string
}

export interface Filter {
    name: string,
    provinceName: string
}

export interface SetFilterDistrictActionType {
    type: typeof SET_FILTER_DISTRICT,
    filter: Filter
}

export interface ClearFilterDistrictActionType {
    type: typeof CLEAR_FILTER_DISTRICT
}

export type DistrictActionTypes =
    | FetchDistrictActionType
    | FetchDistrictSuccessActionType
    | FetchDistrictErrorActionType
    | AlertDistrictHideActionType
    | AlertDistrictShowActionType
    | SetPaginatorDistrictActionType
    | SetFilterDistrictActionType
    | ClearFilterDistrictActionType