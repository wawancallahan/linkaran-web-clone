import { Paginator } from '../paginator';

export const FETCH_SUB_BRAND_VEHICLE = "FETCH_SUB_BRAND_VEHICLE";
export const FETCH_SUB_BRAND_VEHICLE_SUCCESS = "FETCH_SUB_BRAND_VEHICLE_SUCCESS";
export const FETCH_SUB_BRAND_VEHICLE_ERROR = "FETCH_SUB_BRAND_VEHICLE_ERROR";
export const SET_PAGINATOR_SUB_BRAND_VEHICLE = "SET_PAGINATOR_SUB_BRAND_VEHICLE";

export const ALERT_SUB_BRAND_VEHICLE_SHOW = "ALERT_SUB_BRAND_VEHICLE_SHOW";
export const ALERT_SUB_BRAND_VEHICLE_HIDE = "ALERT_SUB_BRAND_VEHICLE_HIDE";

export type FormField = {
    name: string,
    brandVehicle: {
        value: number,
        label: string
    }
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

export type VehicleType = {
    id: number,
    name: string
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

export type SubBrandVehicleActionTypes =
    | FetchSubBrandVehicleActionType
    | FetchSubBrandVehicleSuccessActionType
    | FetchSubBrandVehicleErrorActionType
    | AlertSubBrandVehicleHideActionType
    | AlertSubBrandVehicleShowActionType
    | SetPaginatorSubBrandVehicleActionType