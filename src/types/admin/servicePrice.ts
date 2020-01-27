import { Paginator } from '../paginator';

export const FETCH_SERVICE_PRICE = "FETCH_SERVICE_PRICE";
export const FETCH_SERVICE_PRICE_SUCCESS = "FETCH_SERVICE_PRICE_SUCCESS";
export const FETCH_SERVICE_PRICE_ERROR = "FETCH_SERVICE_PRICE_ERROR";
export const SET_PAGINATOR_SERVICE_PRICE = "SET_PAGINATOR_SERVICE_PRICE";

export const ALERT_SERVICE_PRICE_SHOW = "ALERT_SERVICE_PRICE_SHOW";
export const ALERT_SERVICE_PRICE_HIDE = "ALERT_SERVICE_PRICE_HIDE";

export type FormField = {
    basePrice: string,
    pricePerKm: string,
    minKm: string,
    district: {
        value: number,
        label: string
    },
    service: {
        value: number,
        label: string
    },
    vechicleType: {
        value: number,
        label: string
    }
}

interface ServicePriceField {
    basePrice: number,
    pricePerKm: number,
    minKm: number,
    district: {
        id: number
    }
}

interface ServicePriceList {
    basePrice: number,
    pricePerKm: number,
    minKm: number,
    district: {
        name: string,
        alternativeName: string
    },
    service: {
        name: string,
        code: string,
        canBeMultiple: boolean
    },
    vehicleType: {
        name: string,
        code: string,
        seat: string
    }
}

interface ServicePriceResult {
    id: number,
    createdAt?: string,
    updatedAt?: string,
    deletedAt?: string,
}

export type ServicePrice = ServicePriceResult & ServicePriceList;

export type ServicePriceCreate = ServicePriceField;

export type ServicePriceEdit = ServicePriceField;

export type ServicePriceCreateResult = ServicePriceResult;

export type ServicePriceEditResult = ServicePriceResult;

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