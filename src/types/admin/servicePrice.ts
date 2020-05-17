import { Paginator } from '../paginator';
import { Service } from './service';
import { VehicleType } from './vehicleType';
import { SelectType } from '../select';
import { District } from './region/district';
import { Price } from './price';

export const FETCH_SERVICE_PRICE = "FETCH_SERVICE_PRICE";
export const FETCH_SERVICE_PRICE_SUCCESS = "FETCH_SERVICE_PRICE_SUCCESS";
export const FETCH_SERVICE_PRICE_ERROR = "FETCH_SERVICE_PRICE_ERROR";
export const SET_PAGINATOR_SERVICE_PRICE = "SET_PAGINATOR_SERVICE_PRICE";
export const SET_FILTER_SERVICE_PRICE = "SET_FILTER_SERVICE_PRICE";
export const CLEAR_FILTER_SERVICE_PRICE = "CLEAR_FILTER_SERVICE_PRICE";

export const ALERT_SERVICE_PRICE_SHOW = "ALERT_SERVICE_PRICE_SHOW";
export const ALERT_SERVICE_PRICE_HIDE = "ALERT_SERVICE_PRICE_HIDE";

export type FormField = {
    price: SelectType,
    district: SelectType,
    service: SelectType,
    vehicleType: SelectType,
    driverPaymentDeductions: string,
    servicePaymentDeductions: string,
    maxDriverDistanceRadius: string
}

export type ServicePriceField = {
    price: {
        id: number
    },
    district: {
        id: number
    },
    service: {
        id: number
    },
    vehicleType: {
        id: number
    },
    driverPaymentDeductions: number,
    servicePaymentDeductions: number,
    maxDriverDistanceRadius: number
}

export type ServicePrice = {
    id: number,
    driverPaymentDeductions: number,
    servicePaymentDeductions: number,
    maxDriverDistanceRadius: number
}

export type ServicePriceList = ServicePrice & Partial<Omit<Price, "id">> & {
    priceId?: number,
    pricePerKm?: number,
    district?: Partial<District>,
    service?: Partial<Service>,
    vehicleType?: Partial<VehicleType>,
}

export type ServicePriceShow = ServicePrice & Partial<Omit<Price, "id">> & {
    priceId?: number,
    pricePerKm?: number,
    district?: Partial<District>,
    service?: Partial<Service>,
    vehicleType?: Partial<VehicleType>,
}

export type ServicePriceCreateField = ServicePriceField;

export type ServicePriceEditField = ServicePriceField;

export type ServicePriceCreateResult = ServicePrice & {
    price?: Partial<Price>,
    district?: Partial<District>,
    service?: Partial<Service>,
    vehicleType?: Partial<VehicleType>,
}

export type ServicePriceEditResult = ServicePrice & {
    price?: Partial<Price>,
    district?: Partial<District>,
    service?: Partial<Service>,
    vehicleType?: Partial<VehicleType>,
}

export type FetchServicePriceActionType = {
    type: typeof FETCH_SERVICE_PRICE
}

export type FetchServicePriceSuccessActionType = {
    type: typeof FETCH_SERVICE_PRICE_SUCCESS,
    list: ServicePrice[]
}

export type FetchServicePriceErrorActionType = {
    type: typeof FETCH_SERVICE_PRICE_ERROR
}

export type SetPaginatorServicePriceActionType = {
    type: typeof SET_PAGINATOR_SERVICE_PRICE,
    paginate: Paginator
}

export type AlertServicePriceHideActionType = {
    type: typeof ALERT_SERVICE_PRICE_HIDE
}

export type AlertServicePriceShowActionType = {
    type: typeof ALERT_SERVICE_PRICE_SHOW,
    message: string,
    color: string
}

export type Filter = {
    districtName: string
}

export type FilterKeys = keyof Filter;

export type SetFilterServicePriceActionType = {
    type: typeof SET_FILTER_SERVICE_PRICE,
    filter: Filter
}

export type ClearFilterServicePriceActionType = {
    type: typeof CLEAR_FILTER_SERVICE_PRICE
}

export type ServicePriceActionTypes =
    | FetchServicePriceActionType
    | FetchServicePriceSuccessActionType
    | FetchServicePriceErrorActionType
    | AlertServicePriceHideActionType
    | AlertServicePriceShowActionType
    | SetPaginatorServicePriceActionType
    | SetFilterServicePriceActionType
    | ClearFilterServicePriceActionType