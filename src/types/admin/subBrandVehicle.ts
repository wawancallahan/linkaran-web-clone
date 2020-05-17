import { Paginator } from '../paginator';
import { SelectType } from '../select';
import { BrandVehicle } from './brandVehicle';
import { Timestamps } from '../timestamps';

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

export type SubBrandVehicleField = {
    name: string,
    brandVehicle: {
        id: number
    }
}

export type SubBrandVehicle = {
    id: number,
    name: string
}

export type SubBrandVehicleList = SubBrandVehicle & {
    brandVehicle?: Partial<BrandVehicle>
}

export type SubBrandVehicleShow = SubBrandVehicle & {
    brandVehicle?: Partial<BrandVehicle>
}

export type SubBrandVehicleCreateField = SubBrandVehicleField;

export type SubBrandVehicleEditField = SubBrandVehicleField;

export type SubBrandVehicleCreateResult = SubBrandVehicle & Partial<Timestamps> & {
    brandVehicle?: Partial<BrandVehicle>
}

export type SubBrandVehicleEditResult = SubBrandVehicle & Partial<Timestamps> & {
    brandVehicle?: Partial<BrandVehicle>
}

export type FetchSubBrandVehicleActionType = {
    type: typeof FETCH_SUB_BRAND_VEHICLE
}

export type FetchSubBrandVehicleSuccessActionType = {
    type: typeof FETCH_SUB_BRAND_VEHICLE_SUCCESS,
    list: SubBrandVehicle[]
}

export type FetchSubBrandVehicleErrorActionType = {
    type: typeof FETCH_SUB_BRAND_VEHICLE_ERROR
}

export type SetPaginatorSubBrandVehicleActionType = {
    type: typeof SET_PAGINATOR_SUB_BRAND_VEHICLE,
    paginate: Paginator
}

export type AlertSubBrandVehicleHideActionType = {
    type: typeof ALERT_SUB_BRAND_VEHICLE_HIDE
}

export type AlertSubBrandVehicleShowActionType = {
    type: typeof ALERT_SUB_BRAND_VEHICLE_SHOW,
    message: string,
    color: string
}

export type Filter = {
    name: string,
    brandName: string
}

export type FilterKeys = keyof Filter;

export type SetFilterSubBrandVehicleActionType = {
    type: typeof SET_FILTER_SUB_BRAND_VEHICLE,
    filter: Filter
}

export type ClearFilterSubBrandVehicleActionType = {
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