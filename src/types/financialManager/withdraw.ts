import { Paginator } from '../paginator';
import { Timestamps } from '../timestamps';
import { Bank } from '../admin/bank';
import { TokenFCM } from '../auth';
import { User } from '../admin/user';

export const FETCH_WITHDRAW = "FETCH_WITHDRAW";
export const FETCH_WITHDRAW_SUCCESS = "FETCH_WITHDRAW_SUCCESS";
export const FETCH_WITHDRAW_ERROR = "FETCH_WITHDRAW_ERROR";
export const SET_PAGINATOR_WITHDRAW = "SET_PAGINATOR_WITHDRAW";
export const SET_FILTER_WITHDRAW = "SET_FILTER_WITHDRAW";
export const CLEAR_FILTER_WITHDRAW = "CLEAR_FILTER_WITHDRAW";

export const ALERT_WITHDRAW_SHOW = "ALERT_WITHDRAW_SHOW";
export const ALERT_WITHDRAW_HIDE = "ALERT_WITHDRAW_HIDE";

export type FormField = {
    name: string,
}

interface WithDrawField {
    name: string
}

export interface WithDraw {
    id: number,
    evidance: string | null,
    idManualWithdraw: number,
    transactionDate: string | null,
    isManual: boolean,
    approvedAt: string | null,
}

export type WithDrawApprove = Partial<WithDraw> & Partial<Timestamps>

export type WithDrawList = WithDraw & {
    approvedBy?: Partial<User> | null,
    userMakerTopup?: Partial<User> | null,
    request?: {
        bankName: string,
        accountNumber: string,
        accountName: string,
        uniqueCodeWithAmount: number,
        bank?: Partial<Bank>,
        isCancel: boolean,
        driverProfile?: {
            id: number,
            user?: Partial<User>
        }
    }
}

export type WithDrawShow = WithDraw & {
    approvedBy?: Partial<User> | null,
    userMakerTopup?: Partial<User> | null,
    request?: {
        bankName: string,
        accountNumber: string,
        accountName: string,
        uniqueCodeWithAmount: number,
        bank?: Partial<Bank>,
        driverProfile?: {
            id: number,
            user?: Partial<User>
        }
    }
}

export type WithDrawCreateField = WithDrawField

export type WithDrawEditField = WithDrawField

export type WithDrawCreateResult = WithDraw & Partial<Timestamps>

export type WithDrawEditResult = WithDraw & Partial<Timestamps>

export interface FetchWithDrawActionType {
    type: typeof FETCH_WITHDRAW
}

export interface FetchWithDrawSuccessActionType {
    type: typeof FETCH_WITHDRAW_SUCCESS,
    list: WithDrawList[]
}

export interface FetchWithDrawErrorActionType {
    type: typeof FETCH_WITHDRAW_ERROR
}

export interface SetPaginatorWithDrawActionType {
    type: typeof SET_PAGINATOR_WITHDRAW,
    paginate: Paginator
}

export interface AlertWithDrawHideActionType {
    type: typeof ALERT_WITHDRAW_HIDE
}

export interface AlertWithDrawShowActionType {
    type: typeof ALERT_WITHDRAW_SHOW,
    message: string,
    color: string
}

export interface Filter {
    name: string,
    accountNumber: string,
    bankName: string,
    needApproved: string,
    isManual: string,
    isDecline: string
}

export type FilterKeys = keyof Filter;

export interface SetFilterWithDrawActionType {
    type: typeof SET_FILTER_WITHDRAW,
    filter: Filter
}

export interface ClearFilterWithDrawActionType {
    type: typeof CLEAR_FILTER_WITHDRAW
}

export type WithDrawActionTypes =
    | FetchWithDrawActionType
    | FetchWithDrawSuccessActionType
    | FetchWithDrawErrorActionType
    | AlertWithDrawHideActionType
    | AlertWithDrawShowActionType
    | SetPaginatorWithDrawActionType
    | SetFilterWithDrawActionType
    | ClearFilterWithDrawActionType