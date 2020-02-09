import { Paginator } from '../paginator';

export const FETCH_SERVICE = "FETCH_SERVICE";
export const FETCH_SERVICE_SUCCESS = "FETCH_SERVICE_SUCCESS";
export const FETCH_SERVICE_ERROR = "FETCH_SERVICE_ERROR";
export const SET_PAGINATOR_SERVICE = "SET_PAGINATOR_SERVICE";

export const ALERT_SERVICE_SHOW = "ALERT_SERVICE_SHOW";
export const ALERT_SERVICE_HIDE = "ALERT_SERVICE_HIDE";

export type FormField = {
    name: string,
    code: string,
    canBeMultiple: string,
    passangerWithDriver: string,
    maxServiceDistanceInKm: number
}

export interface ServiceField {
    name: string,
    code: string,
    canBeMultiple: boolean,
    passangerWithDriver: boolean,
    maxServiceDistanceInKm: number
}

export interface ServiceList {
    name: string,
    code: string,
    canBeMultiple: boolean,
    passangerWithDriver: boolean,
    maxServiceDistanceInKm: number
}

interface ServiceResult {
    id: number,
    createdAt?: string,
    updatedAt?: string,
    deletedAt?: string,
}

export type ServiceCount = {
    name: string,
    code: string,
    transactionCount: number
}

export type Service = ServiceResult & ServiceList;

export type ServiceCreate = ServiceField;

export type ServiceEdit = ServiceField;

export type ServiceCreateResult = ServiceResult & ServiceList;

export type ServiceEditResult = ServiceResult &  ServiceList;

export interface FetchServiceActionType {
    type: typeof FETCH_SERVICE
}

export interface FetchServiceSuccessActionType {
    type: typeof FETCH_SERVICE_SUCCESS,
    list: Service[]
}

export interface FetchServiceErrorActionType {
    type: typeof FETCH_SERVICE_ERROR
}

export interface SetPaginatorServiceActionType {
    type: typeof SET_PAGINATOR_SERVICE,
    paginate: Paginator
}

export interface AlertServiceHideActionType {
    type: typeof ALERT_SERVICE_HIDE
}

export interface AlertServiceShowActionType {
    type: typeof ALERT_SERVICE_SHOW,
    message: string,
    color: string
}

export type ServiceActionTypes =
    | FetchServiceActionType
    | FetchServiceSuccessActionType
    | FetchServiceErrorActionType
    | AlertServiceHideActionType
    | AlertServiceShowActionType
    | SetPaginatorServiceActionType