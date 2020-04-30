import { Paginator } from '../paginator';

export const FETCH_BRAND_VEHICLE = "FETCH_BRAND_VEHICLE";
export const FETCH_BRAND_VEHICLE_SUCCESS = "FETCH_BRAND_VEHICLE_SUCCESS";
export const FETCH_BRAND_VEHICLE_ERROR = "FETCH_BRAND_VEHICLE_ERROR";
export const SET_PAGINATOR_BRAND_VEHICLE = "SET_PAGINATOR_BRAND_VEHICLE";
export const SET_FILTER_BRAND_VEHICLE = "SET_FILTER_BRAND_VEHICLE";
export const CLEAR_FILTER_BRAND_VEHICLE = "CLEAR_FILTER_BRAND_VEHICLE";

export const ALERT_BRAND_VEHICLE_SHOW = "ALERT_BRAND_VEHICLE_SHOW";
export const ALERT_BRAND_VEHICLE_HIDE = "ALERT_BRAND_VEHICLE_HIDE";

export type FormField = {
    name: string
}

interface BrandVehicleField {
    name: string
}

interface BrandVehicleList {
    name: string
}
interface BrandVehicleResult {
    id: number,
    createdAt: string,
    updatedAt: string,
    deletedAt: string,
}

export type BrandVehicle = BrandVehicleResult & BrandVehicleList;

export type BrandVehicleCreate = BrandVehicleField;

export type BrandVehicleEdit = BrandVehicleField;

export type BrandVehicleCreateResult = BrandVehicleResult;

export type BrandVehicleEditResult = BrandVehicleResult;

export interface FetchBrandVehicleActionType {
    type: typeof FETCH_BRAND_VEHICLE
}

export interface FetchBrandVehicleSuccessActionType {
    type: typeof FETCH_BRAND_VEHICLE_SUCCESS,
    list: BrandVehicle[]
}

export interface FetchBrandVehicleErrorActionType {
    type: typeof FETCH_BRAND_VEHICLE_ERROR
}

export interface SetPaginatorBrandVehicleActionType {
    type: typeof SET_PAGINATOR_BRAND_VEHICLE,
    paginate: Paginator
}

export interface AlertBrandVehicleHideActionType {
    type: typeof ALERT_BRAND_VEHICLE_HIDE
}

export interface AlertBrandVehicleShowActionType {
    type: typeof ALERT_BRAND_VEHICLE_SHOW,
    message: string,
    color: string
}

export interface Filter {
    name: string
}

export type FilterKeys = keyof Filter;

export interface SetFilterBrandVehicleActionType {
    type: typeof SET_FILTER_BRAND_VEHICLE,
    filter: Filter
}

export interface ClearFilterBrandVehicleActionType {
    type: typeof CLEAR_FILTER_BRAND_VEHICLE
}

export type BrandVehicleActionTypes =
    | FetchBrandVehicleActionType
    | FetchBrandVehicleSuccessActionType
    | FetchBrandVehicleErrorActionType
    | AlertBrandVehicleHideActionType
    | AlertBrandVehicleShowActionType
    | SetPaginatorBrandVehicleActionType
    | SetFilterBrandVehicleActionType
    | ClearFilterBrandVehicleActionType