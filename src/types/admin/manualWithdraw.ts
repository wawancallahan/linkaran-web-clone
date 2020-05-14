import { Paginator } from '../paginator';
import { Timestamps } from '../timestamps';
import { User } from './user';
import { Bank } from './bank';

export const FETCH_MANUAL_WITHDRAW = "FETCH_MANUAL_WITHDRAW";
export const FETCH_MANUAL_WITHDRAW_SUCCESS = "FETCH_MANUAL_WITHDRAW_SUCCESS";
export const FETCH_MANUAL_WITHDRAW_ERROR = "FETCH_MANUAL_WITHDRAW_ERROR";
export const SET_PAGINATOR_MANUAL_WITHDRAW = "SET_PAGINATOR_MANUAL_WITHDRAW";
export const SET_FILTER_MANUAL_WITHDRAW = "SET_FILTER_MANUAL_WITHDRAW";
export const CLEAR_FILTER_MANUAL_WITHDRAW = "CLEAR_FILTER_MANUAL_WITHDRAW";

export const ALERT_MANUAL_WITHDRAW_SHOW = "ALERT_MANUAL_WITHDRAW_SHOW";
export const ALERT_MANUAL_WITHDRAW_HIDE = "ALERT_MANUAL_WITHDRAW_HIDE";

export type FormField = {
    amount: string,
    driverProfile: {
        label: string,
        value: number
    },
    bank: {
        label: string,
        value: number
    },
    accountNumber: string,
    accountName: string
}

interface ManualWithDrawField {
    amount: string,
    driverProfile: {
        label: string,
        value: number
    },
    bank: {
        label: string,
        value: number
    },
    accountNumber: string,
    accountName: string
}

export interface ManualWithDraw {
    id: number,
    evidance: string | null,
    idManualTopup: number | null,
    transactionDate: string,
    isManual: boolean,
    approvedAt: string | null,   
}

export type ManualWithDrawList = ManualWithDraw & Partial<Timestamps> & {
    approvedBy?: Partial<User>,
    userMakerTopup?: Partial<User> | null,
    request?: {
        id: number,
        bankName: string,
        accountNumber: string,
        accountName: string,
        isCancel: boolean,
        bank?: Partial<Bank>,
        driverProfile?: {
            id: number,
            user?: Partial<User>
        }
    },
}

export type ManualWithDrawShow = ManualWithDraw & Partial<Timestamps> & {
    approvedBy?: Partial<User>,
    userMakerTopup?: Partial<User> | null,
    request?: {
        id: number,
        bankName: string,
        accountNumber: string,
        accountName: string,
        isCancel: boolean,
        bank?: Partial<Bank>,
        driverProfile?: {
            id: number,
            user?: Partial<User>
        }
    },
}

export type ManualWithDrawCreateField = ManualWithDrawField

export type ManualWithDrawEditField = ManualWithDrawField

export type ManualWithDrawCreateResult = ManualWithDraw & Partial<Timestamps> & {
    userMakerTopup?: Partial<User> | null,
    request?: {
        id: number,
        bankName: string,
        accountNumber: string,
        accountName: string,
        transactionDate: string,
        bank?: Partial<Bank>,
        isCancel: boolean,
        driverProfile?: {
            id: number
        }
    } & Partial<Timestamps>,
}

export type ManualWithDrawEditResult = ManualWithDraw & Partial<Timestamps> & {
    userMakerTopup?: Partial<User> | null,
    request?: {
        id: number,
        bankName: string,
        accountNumber: string,
        accountName: string,
        transactionDate: string,
        bank?: Partial<Bank>,
        isCancel: boolean,
        driverProfile?: {
            id: number
        }
    } & Partial<Timestamps>,
}

export interface FetchManualWithDrawActionType {
    type: typeof FETCH_MANUAL_WITHDRAW
}

export interface FetchManualWithDrawSuccessActionType {
    type: typeof FETCH_MANUAL_WITHDRAW_SUCCESS,
    list: ManualWithDrawList[]
}

export interface FetchManualWithDrawErrorActionType {
    type: typeof FETCH_MANUAL_WITHDRAW_ERROR
}

export interface SetPaginatorManualWithDrawActionType {
    type: typeof SET_PAGINATOR_MANUAL_WITHDRAW,
    paginate: Paginator
}

export interface AlertManualWithDrawHideActionType {
    type: typeof ALERT_MANUAL_WITHDRAW_HIDE
}

export interface AlertManualWithDrawShowActionType {
    type: typeof ALERT_MANUAL_WITHDRAW_SHOW,
    message: string,
    color: string
}

export interface Filter {
    accountName: string,
    accountNumber: string,
    bankName: string,
    isManual: string
}

export type FilterKeys = keyof Filter;

export interface SetFilterManualWithDrawActionType {
    type: typeof SET_FILTER_MANUAL_WITHDRAW,
    filter: Filter
}

export interface ClearFilterManualWithDrawActionType {
    type: typeof CLEAR_FILTER_MANUAL_WITHDRAW
}

export type ManualWithDrawActionTypes =
    | FetchManualWithDrawActionType
    | FetchManualWithDrawSuccessActionType
    | FetchManualWithDrawErrorActionType
    | AlertManualWithDrawHideActionType
    | AlertManualWithDrawShowActionType
    | SetPaginatorManualWithDrawActionType
    | SetFilterManualWithDrawActionType
    | ClearFilterManualWithDrawActionType