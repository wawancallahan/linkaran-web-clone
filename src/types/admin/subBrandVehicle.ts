import { Paginator } from '../paginator';
import { SelectType } from '../select';

export const FETCH_SUB_BRAND_VEHICLE = "FETCH_SUB_BRAND_VEHICLE";
export const FETCH_SUB_BRAND_VEHICLE_SUCCESS = "FETCH_SUB_BRAND_VEHICLE_SUCCESS";
export const FETCH_SUB_BRAND_VEHICLE_ERROR = "FETCH_SUB_BRAND_VEHICLE_ERROR";
export const SET_PAGINATOR_SUB_BRAND_VEHICLE = "SET_PAGINATOR_SUB_BRAND_VEHICLE";
export const SET_FILTER_SUB_BRAND_VEHICLE = "SET_FILTER_SUB_BRAND_VEHICLE";
export const CLEAR_FILTER_SUB_BRAND_VEHICLE = "CLEAR_FILTER_SUB_BRAND_VEHICLE";

export const ALERT_SUB_BRAND_VEHICLE_SHOW = "ALERT_SUB_BRAND_VEHICLE_SHOW";
export const ALERT_SUB_BRAND_VEHICLE_HIDE = "ALERT_SUB_BRAND_VEHICLE_HIDE";

export type FormField = {
    name: string,
    brandVehicle: SelectType
}

interface SubBrandVehicleField {
    name: string,
    brandVehicle: {
        id: number
    }
}

interface SubBrandVehicleList {
    name: string,
    brandVehicle: {
        id: number,
        name: string
    }
}

interface SubBrandVehicleList2 {
    name: string,
    brandVehicle: {
        id: number
    }
}

interface SubBrandVehicleResult {
    id: number,
    createdAt: string,
    updatedAt: string,
    deletedAt: string,
}

export type SubBrandVehicle = SubBrandVehicleResult & SubBrandVehicleList;

export type SubBrandVehicleCreate = SubBrandVehicleField;

export type SubBrandVehicleEdit = SubBrandVehicleField;

export type SubBrandVehicleCreateResult = SubBrandVehicleResult & SubBrandVehicleList2;

export type SubBrandVehicleEditResult = SubBrandVehicleResult &  SubBrandVehicleList2;

export interface FetchSubBrandVehicleActionType {
    type: typeof FETCH_SUB_BRAND_VEHICLE
}

export interface FetchSubBrandVehicleSuccessActionType {
    type: typeof FETCH_SUB_BRAND_VEHICLE_SUCCESS,
    list: SubBrandVehicle[]
}

export interface FetchSubBrandVehicleErrorActionType {
    type: typeof FETCH_SUB_BRAND_VEHICLE_ERROR
}

export interface SetPaginatorSubBrandVehicleActionType {
    type: typeof SET_PAGINATOR_SUB_BRAND_VEHICLE,
    paginate: Paginator
}

export interface AlertSubBrandVehicleHideActionType {
    type: typeof ALERT_SUB_BRAND_VEHICLE_HIDE
}

export interface AlertSubBrandVehicleShowActionType {
    type: typeof ALERT_SUB_BRAND_VEHICLE_SHOW,
    message: string,
    color: string
}

export interface Filter {
    name: string,
    brandName: string
}

export type FilterKeys = keyof Filter;

export interface SetFilterSubBrandVehicleActionType {
    type: typeof SET_FILTER_SUB_BRAND_VEHICLE,
    filter: Filter
}

export interface ClearFilterSubBrandVehicleActionType {
    type: typeof CLEAR_FILTER_SUB_BRAND_VEHICLE
}

export type SubBrandVehicleActionTypes =
    | FetchSubBrandVehicleActionType
    | FetchSubBrandVehicleSuccessActionType
    | FetchSubBrandVehicleErrorActionType
    | AlertSubBrandVehicleHideActionType
    | AlertSubBrandVehicleShowActionType
    | SetPaginatorSubBrandVehicleActionType
    | SetFilterSubBrandVehicleActionType
    | ClearFilterSubBrandVehicleActionType