import { Paginator } from '../../paginator';

export const FETCH_APPLICATION = "FETCH_APPLICATION";
export const FETCH_APPLICATION_SUCCESS = "FETCH_APPLICATION_SUCCESS";
export const FETCH_APPLICATION_ERROR = "FETCH_APPLICATION_ERROR";
export const SET_PAGINATOR_APPLICATION = "SET_PAGINATOR_APPLICATION";

export const ALERT_APPLICATION_SHOW = "ALERT_APPLICATION_SHOW";
export const ALERT_APPLICATION_HIDE = "ALERT_APPLICATION_HIDE";

export type FormField = {
   
}

interface ApplicationField {
    
}

interface ApplicationList {
    date: string,
    numberTransaction: string,
    costumerName: string,
    driverName: string,
    service: string,
    totalCost: number,
    status: string
}

interface ApplicationResult {
   id: number
}

export type Application = ApplicationResult & ApplicationList;

export type ApplicationCreate = ApplicationField;

export type ApplicationEdit = ApplicationField;

export type ApplicationCreateResult = ApplicationResult;

export type ApplicationEditResult = ApplicationResult;

export interface FetchApplicationActionType {
    type: typeof FETCH_APPLICATION
}

export interface FetchApplicationSuccessActionType {
    type: typeof FETCH_APPLICATION_SUCCESS,
    list: Application[]
}

export interface FetchApplicationErrorActionType {
    type: typeof FETCH_APPLICATION_ERROR
}

export interface SetPaginatorApplicationActionType {
    type: typeof SET_PAGINATOR_APPLICATION,
    paginate: Paginator
}

export interface AlertApplicationHideActionType {
    type: typeof ALERT_APPLICATION_HIDE
}

export interface AlertApplicationShowActionType {
    type: typeof ALERT_APPLICATION_SHOW,
    message: string,
    color: string
}

export type ApplicationActionTypes =
    | FetchApplicationActionType
    | FetchApplicationSuccessActionType
    | FetchApplicationErrorActionType
    | AlertApplicationHideActionType
    | AlertApplicationShowActionType
    | SetPaginatorApplicationActionType