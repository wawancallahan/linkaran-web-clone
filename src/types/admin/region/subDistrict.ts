import { Paginator } from '../../paginator';
import { District } from './district';
import { Timestamps } from '../../timestamps';

export const FETCH_SUB_DISTRICT = "FETCH_SUB_DISTRICT";
export const FETCH_SUB_DISTRICT_SUCCESS = "FETCH_SUB_DISTRICT_SUCCESS";
export const FETCH_SUB_DISTRICT_ERROR = "FETCH_SUB_DISTRICT_ERROR";
export const SET_PAGINATOR_SUB_DISTRICT = "SET_PAGINATOR_SUB_DISTRICT";

export const ALERT_SUB_DISTRICT_SHOW = "ALERT_SUB_DISTRICT_SHOW";
export const ALERT_SUB_DISTRICT_HIDE = "ALERT_SUB_DISTRICT_HIDE";

export type FormField = {
    name: string,
    district: {
        label: string,
        value: number
    }
}

interface SubDistrictField {
    name: string,
    district: {
        id: number
    }
}

export interface SubDistrict {
    id: number,
    name: string
}

export type SubDistrictList = SubDistrict & {
    district?: Partial<District>
}

export type SubDistrictShow = SubDistrict & {
    district?: Partial<District>
}

export type SubDistrictCreateField = SubDistrictField

export type SubDistrictEditField = SubDistrictField

export type SubDistrictCreateResult = SubDistrict & Partial<Timestamps> & {
    district?: Partial<District>
}

export type SubDistrictEditResult = SubDistrict & Partial<Timestamps> & {
    district?: Partial<District>
}

export interface FetchSubDistrictActionType {
    type: typeof FETCH_SUB_DISTRICT
}

export interface FetchSubDistrictSuccessActionType {
    type: typeof FETCH_SUB_DISTRICT_SUCCESS,
    list: SubDistrictList[]
}

export interface FetchSubDistrictErrorActionType {
    type: typeof FETCH_SUB_DISTRICT_ERROR
}

export interface SetPaginatorSubDistrictActionType {
    type: typeof SET_PAGINATOR_SUB_DISTRICT,
    paginate: Paginator
}

export interface AlertSubDistrictHideActionType {
    type: typeof ALERT_SUB_DISTRICT_HIDE
}

export interface AlertSubDistrictShowActionType {
    type: typeof ALERT_SUB_DISTRICT_SHOW,
    message: string,
    color: string
}

export type SubDistrictActionTypes =
    | FetchSubDistrictActionType
    | FetchSubDistrictSuccessActionType
    | FetchSubDistrictErrorActionType
    | AlertSubDistrictHideActionType
    | AlertSubDistrictShowActionType
    | SetPaginatorSubDistrictActionType