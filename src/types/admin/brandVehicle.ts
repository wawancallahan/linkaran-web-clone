import { Paginator } from '../paginator'
import { Timestamps } from '../timestamps'

export const FETCH_BRAND_VEHICLE = "FETCH_BRAND_VEHICLE"
export const FETCH_BRAND_VEHICLE_SUCCESS = "FETCH_BRAND_VEHICLE_SUCCESS"
export const FETCH_BRAND_VEHICLE_ERROR = "FETCH_BRAND_VEHICLE_ERROR"
export const SET_PAGINATOR_BRAND_VEHICLE = "SET_PAGINATOR_BRAND_VEHICLE"
export const SET_FILTER_BRAND_VEHICLE = "SET_FILTER_BRAND_VEHICLE"
export const CLEAR_FILTER_BRAND_VEHICLE = "CLEAR_FILTER_BRAND_VEHICLE"

export const ALERT_BRAND_VEHICLE_SHOW = "ALERT_BRAND_VEHICLE_SHOW"
export const ALERT_BRAND_VEHICLE_HIDE = "ALERT_BRAND_VEHICLE_HIDE";

export type FormField = {
    name: string
}

export type BrandVehicleField = {
    name: string
}

export type BrandVehicle = {
    id: number,
    name: string
}

export type BrandVehicleList = BrandVehicle & Partial<Timestamps>

export type BrandVehicleCreateField = BrandVehicleField

export type BrandVehicleEditField = BrandVehicleField

export type BrandVehicleCreateResult = BrandVehicle & Partial<Timestamps>

export type BrandVehicleEditResult = BrandVehicle & Partial<Timestamps>

export type FetchBrandVehicleActionType = {
    type: typeof FETCH_BRAND_VEHICLE
}

export type FetchBrandVehicleSuccessActionType = {
    type: typeof FETCH_BRAND_VEHICLE_SUCCESS,
    list: BrandVehicle[]
}

export type FetchBrandVehicleErrorActionType = {
    type: typeof FETCH_BRAND_VEHICLE_ERROR
}

export type SetPaginatorBrandVehicleActionType = {
    type: typeof SET_PAGINATOR_BRAND_VEHICLE,
    paginate: Paginator
}

export type AlertBrandVehicleHideActionType = {
    type: typeof ALERT_BRAND_VEHICLE_HIDE
}

export type AlertBrandVehicleShowActionType = {
    type: typeof ALERT_BRAND_VEHICLE_SHOW,
    message: string,
    color: string
}

export type Filter = {
    name: string
}

export type FilterKeys = keyof Filter

export type SetFilterBrandVehicleActionType = {
    type: typeof SET_FILTER_BRAND_VEHICLE,
    filter: Filter
}

export type ClearFilterBrandVehicleActionType = {
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