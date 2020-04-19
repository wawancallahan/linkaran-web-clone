import { Paginator } from '../paginator';
import { Service } from './service';
import { VehicleType } from './vehicleType';

export const FETCH_SERVICE_PRICE = "FETCH_SERVICE_PRICE";
export const FETCH_SERVICE_PRICE_SUCCESS = "FETCH_SERVICE_PRICE_SUCCESS";
export const FETCH_SERVICE_PRICE_ERROR = "FETCH_SERVICE_PRICE_ERROR";
export const SET_PAGINATOR_SERVICE_PRICE = "SET_PAGINATOR_SERVICE_PRICE";

export const ALERT_SERVICE_PRICE_SHOW = "ALERT_SERVICE_PRICE_SHOW";
export const ALERT_SERVICE_PRICE_HIDE = "ALERT_SERVICE_PRICE_HIDE";

export type FormField = {
    price: {
        value: number,
        label: string
    },
    district: {
        value: number,
        label: string
    },
    service: {
        value: number,
        label: string
    },
    vehicleType: {
        value: number,
        label: string
    },
    driverPaymentDeductions: string,
    servicePaymentDeductions: string
}

interface ServicePriceField {
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
    servicePaymentDeductions: number
}

interface ServicePriceList {
    basePrice: number,
    pricePerKm: number,
    minKm: number,
    priceId: number,
    district: {
        id: number,
        name: string,
        alternativeName: string
    },
    service: Service,
    vehicleType: VehicleType,
    driverPaymentDeductions?: number,
    servicePaymentDeductions?: number
}

interface ServicePriceResult {
    id: number,
    createdAt?: string,
    updatedAt?: string,
    deletedAt?: string,
}

type ServicePriceStoreResponse = ServicePriceResult & {
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
    driverPaymentDeductions?: number,
    servicePaymentDeductions?: number
}

export type ServicePrice = ServicePriceResult & ServicePriceList;

export type ServicePriceCreate = ServicePriceField;

export type ServicePriceEdit = ServicePriceField;

export type ServicePriceCreateResult = ServicePriceResult & ServicePriceStoreResponse;

export type ServicePriceEditResult = ServicePriceResult  & ServicePriceStoreResponse

export interface FetchServicePriceActionType {
    type: typeof FETCH_SERVICE_PRICE
}

export interface FetchServicePriceSuccessActionType {
    type: typeof FETCH_SERVICE_PRICE_SUCCESS,
    list: ServicePrice[]
}

export interface FetchServicePriceErrorActionType {
    type: typeof FETCH_SERVICE_PRICE_ERROR
}

export interface SetPaginatorServicePriceActionType {
    type: typeof SET_PAGINATOR_SERVICE_PRICE,
    paginate: Paginator
}

export interface AlertServicePriceHideActionType {
    type: typeof ALERT_SERVICE_PRICE_HIDE
}

export interface AlertServicePriceShowActionType {
    type: typeof ALERT_SERVICE_PRICE_SHOW,
    message: string,
    color: string
}

export type ServicePriceActionTypes =
    | FetchServicePriceActionType
    | FetchServicePriceSuccessActionType
    | FetchServicePriceErrorActionType
    | AlertServicePriceHideActionType
    | AlertServicePriceShowActionType
    | SetPaginatorServicePriceActionType