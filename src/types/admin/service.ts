import { Paginator } from '../paginator';
import { Timestamps } from '../timestamps';

export const FETCH_SERVICE = "FETCH_SERVICE";
export const FETCH_SERVICE_SUCCESS = "FETCH_SERVICE_SUCCESS";
export const FETCH_SERVICE_ERROR = "FETCH_SERVICE_ERROR";
export const SET_PAGINATOR_SERVICE = "SET_PAGINATOR_SERVICE";
export const SET_FILTER_SERVICE = "SET_FILTER_SERVICE";
export const CLEAR_FILTER_SERVICE = "CLEAR_FILTER_SERVICE";

export const ALERT_SERVICE_SHOW = "ALERT_SERVICE_SHOW";
export const ALERT_SERVICE_HIDE = "ALERT_SERVICE_HIDE";

export type FormField = {
    name: string,
    code: string,
    canBeMultiple: string,
    passangerWithDriver: string,
    maxServiceDistanceInKm: number
}

export type ServiceField = {
    name: string,
    code: string,
    canBeMultiple: boolean,
    passangerWithDriver: boolean,
    maxServiceDistanceInKm: number
}

export type Service = {
    id: number,
    name: string,
    code: string,
    canBeMultiple: boolean,
    passangerWithDriver: boolean,
    maxServiceDistanceInKm: number
}

export type ServiceCount = {
    name: string,
    code: string,
    transactionCount: number
}

export type ServiceList = Service

export type ServiceShow = Service

export type ServiceCreateField = ServiceField;

export type ServiceEditField = ServiceField;

export type ServiceCreateResult = Service & Partial<Timestamps>;

export type ServiceEditResult = Service & Partial<Timestamps>;

export type FetchServiceActionType = {
    type: typeof FETCH_SERVICE
}

export type FetchServiceSuccessActionType = {
    type: typeof FETCH_SERVICE_SUCCESS,
    list: Service[]
}

export type FetchServiceErrorActionType = {
    type: typeof FETCH_SERVICE_ERROR
}

export type SetPaginatorServiceActionType = {
    type: typeof SET_PAGINATOR_SERVICE,
    paginate: Paginator
}

export type AlertServiceHideActionType = {
    type: typeof ALERT_SERVICE_HIDE
}

export type AlertServiceShowActionType = {
    type: typeof ALERT_SERVICE_SHOW,
    message: string,
    color: string
}

export type Filter = {
    name: string,
    code: string,
    canBeMultiple: string,
    passangerWithDriver: string,
}

export type FilterKeys = keyof Filter;

export type SetFilterServiceActionType = {
    type: typeof SET_FILTER_SERVICE,
    filter: Filter
}

export type ClearFilterServiceActionType = {
    type: typeof CLEAR_FILTER_SERVICE
}

export type ServiceActionTypes =
    | FetchServiceActionType
    | FetchServiceSuccessActionType
    | FetchServiceErrorActionType
    | AlertServiceHideActionType
    | AlertServiceShowActionType
    | SetPaginatorServiceActionType
    | SetFilterServiceActionType
    | ClearFilterServiceActionType