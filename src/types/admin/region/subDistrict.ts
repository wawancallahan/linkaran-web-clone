import { Paginator } from '../../paginator';
import { District } from './district';
import { Timestamps } from '../../timestamps';
import { SelectType } from '../../select';

export const FETCH_SUB_DISTRICT = "FETCH_SUB_DISTRICT";
export const FETCH_SUB_DISTRICT_SUCCESS = "FETCH_SUB_DISTRICT_SUCCESS";
export const FETCH_SUB_DISTRICT_ERROR = "FETCH_SUB_DISTRICT_ERROR";
export const SET_PAGINATOR_SUB_DISTRICT = "SET_PAGINATOR_SUB_DISTRICT";
export const SET_FILTER_SUB_DISTRICT = "SET_FILTER_SUB_DISTRICT";
export const CLEAR_FILTER_SUB_DISTRICT = "CLEAR_FILTER_SUB_DISTRICT";

export const ALERT_SUB_DISTRICT_SHOW = "ALERT_SUB_DISTRICT_SHOW";
export const ALERT_SUB_DISTRICT_HIDE = "ALERT_SUB_DISTRICT_HIDE";

export type FormField = {
    name: string,
    district: SelectType
}

export type SubDistrictField = {
    name: string,
    district: {
        id: number
    }
}

export type SubDistrict = {
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

export type FetchSubDistrictActionType = {
    type: typeof FETCH_SUB_DISTRICT
}

export type FetchSubDistrictSuccessActionType = {
    type: typeof FETCH_SUB_DISTRICT_SUCCESS,
    list: SubDistrictList[]
}

export type FetchSubDistrictErrorActionType = {
    type: typeof FETCH_SUB_DISTRICT_ERROR
}

export type SetPaginatorSubDistrictActionType = {
    type: typeof SET_PAGINATOR_SUB_DISTRICT,
    paginate: Paginator
}

export type AlertSubDistrictHideActionType = {
    type: typeof ALERT_SUB_DISTRICT_HIDE
}

export type AlertSubDistrictShowActionType = {
    type: typeof ALERT_SUB_DISTRICT_SHOW,
    message: string,
    color: string
}

export type Filter = {
    name: string,
    districtName: string
}

export type FilterKeys = keyof Filter

export type SetFilterSubDistrictActionType = {
    type: typeof SET_FILTER_SUB_DISTRICT,
    filter: Filter
}

export type ClearFilterSubDistrictActionType = {
    type: typeof CLEAR_FILTER_SUB_DISTRICT
}

export type SubDistrictActionTypes =
    | FetchSubDistrictActionType
    | FetchSubDistrictSuccessActionType
    | FetchSubDistrictErrorActionType
    | AlertSubDistrictHideActionType
    | AlertSubDistrictShowActionType
    | SetPaginatorSubDistrictActionType
    | SetFilterSubDistrictActionType
    | ClearFilterSubDistrictActionType