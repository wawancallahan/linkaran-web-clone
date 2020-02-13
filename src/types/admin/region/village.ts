import { Paginator } from '../../paginator';
import { SubDistrict } from './subDistrict';
import { Timestamps } from '../../timestamps';

export const FETCH_VILLAGE = "FETCH_VILLAGE";
export const FETCH_VILLAGE_SUCCESS = "FETCH_VILLAGE_SUCCESS";
export const FETCH_VILLAGE_ERROR = "FETCH_VILLAGE_ERROR";
export const SET_PAGINATOR_VILLAGE = "SET_PAGINATOR_VILLAGE";

export const ALERT_VILLAGE_SHOW = "ALERT_VILLAGE_SHOW";
export const ALERT_VILLAGE_HIDE = "ALERT_VILLAGE_HIDE";

export type FormField = {
    name: string,
    subDistrict: {
        label: string,
        value: number
    }
}

interface VillageField {
    name: string,
    subDistrict: {
        id: number
    }
}

export interface Village {
    id: number,
    name: string
}

export type VillageList = Village & {
    subDistrict: Partial<SubDistrict>
}

export type VillageShow = Village & {
    subDistrict: Partial<SubDistrict>
}

export type VillageCreateField = VillageField

export type VillageEditField = VillageField

export type VillageCreateResult = Village & Partial<Timestamps> & {
    subDistrict: Partial<SubDistrict>
}

export type VillageEditResult = Village & Partial<Timestamps> & {
    subDistrict: Partial<SubDistrict>
}

export interface FetchVillageActionType {
    type: typeof FETCH_VILLAGE
}

export interface FetchVillageSuccessActionType {
    type: typeof FETCH_VILLAGE_SUCCESS,
    list: VillageList[]
}

export interface FetchVillageErrorActionType {
    type: typeof FETCH_VILLAGE_ERROR
}

export interface SetPaginatorVillageActionType {
    type: typeof SET_PAGINATOR_VILLAGE,
    paginate: Paginator
}

export interface AlertVillageHideActionType {
    type: typeof ALERT_VILLAGE_HIDE
}

export interface AlertVillageShowActionType {
    type: typeof ALERT_VILLAGE_SHOW,
    message: string,
    color: string
}

export type VillageActionTypes =
    | FetchVillageActionType
    | FetchVillageSuccessActionType
    | FetchVillageErrorActionType
    | AlertVillageHideActionType
    | AlertVillageShowActionType
    | SetPaginatorVillageActionType