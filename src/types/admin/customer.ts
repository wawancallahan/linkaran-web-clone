import { Paginator } from '../paginator';
import { Timestamps } from '../timestamps';
import { ServiceCount } from './service';

export const FETCH_CUSTOMER = "FETCH_CUSTOMER";
export const FETCH_CUSTOMER_SUCCESS = "FETCH_CUSTOMER_SUCCESS";
export const FETCH_CUSTOMER_ERROR = "FETCH_CUSTOMER_ERROR";
export const SET_PAGINATOR_CUSTOMER = "SET_PAGINATOR_CUSTOMER";
export const SET_FILTER_CUSTOMER = "SET_FILTER_CUSTOMER";
export const CLEAR_FILTER_CUSTOMER = "CLEAR_FILTER_CUSTOMER";

export const ALERT_CUSTOMER_SHOW = "ALERT_CUSTOMER_SHOW";
export const ALERT_CUSTOMER_HIDE = "ALERT_CUSTOMER_HIDE";

export type FormField = {
}

interface CustomerField {
}

export interface Customer {
    id: number,
    name: string,
    phoneNumber: string,
    email: string,
    telegramuser: string | null,
    chatId: number | null,
    gUserId: string | null,
    gUserPhoneVerified: boolean,
    isActive: boolean
}

export type CustomerList = Customer

export type CustomerShow = Customer & {
    service?: Partial<ServiceCount>[]
}

export type CustomerCreateField = CustomerField

export type CustomerEditField = CustomerField

export type CustomerCreateResult = Customer & Partial<Timestamps>

export type CustomerEditResult = Customer & Partial<Timestamps>

export interface FetchCustomerActionType {
    type: typeof FETCH_CUSTOMER
}

export interface FetchCustomerSuccessActionType {
    type: typeof FETCH_CUSTOMER_SUCCESS,
    list: CustomerList[]
}

export interface FetchCustomerErrorActionType {
    type: typeof FETCH_CUSTOMER_ERROR
}

export interface SetPaginatorCustomerActionType {
    type: typeof SET_PAGINATOR_CUSTOMER,
    paginate: Paginator
}

export interface AlertCustomerHideActionType {
    type: typeof ALERT_CUSTOMER_HIDE
}

export interface AlertCustomerShowActionType {
    type: typeof ALERT_CUSTOMER_SHOW,
    message: string,
    color: string
}

export interface Filter {
    name: string,
    email: string,
    phoneNumber: string
}

export type FilterKeys = keyof Filter;

export interface SetFilterCustomerActionType {
    type: typeof SET_FILTER_CUSTOMER,
    filter: Filter
}

export interface ClearFilterCustomerActionType {
    type: typeof CLEAR_FILTER_CUSTOMER
}

export type CustomerActionTypes =
    | FetchCustomerActionType
    | FetchCustomerSuccessActionType
    | FetchCustomerErrorActionType
    | AlertCustomerHideActionType
    | AlertCustomerShowActionType
    | SetPaginatorCustomerActionType
    | SetFilterCustomerActionType
    | ClearFilterCustomerActionType