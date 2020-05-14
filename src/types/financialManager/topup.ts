import { Paginator } from '../paginator';
import { Timestamps } from '../timestamps';
import { Bank } from '../admin/bank';
import { TokenFCM } from '../auth';
import { User } from '../admin/user';

export const FETCH_TOPUP = "FETCH_TOPUP";
export const FETCH_TOPUP_SUCCESS = "FETCH_TOPUP_SUCCESS";
export const FETCH_TOPUP_ERROR = "FETCH_TOPUP_ERROR";
export const SET_PAGINATOR_TOPUP = "SET_PAGINATOR_TOPUP";
export const SET_FILTER_TOPUP = "SET_FILTER_TOPUP";
export const CLEAR_FILTER_TOPUP = "CLEAR_FILTER_TOPUP";

export const ALERT_TOPUP_SHOW = "ALERT_TOPUP_SHOW";
export const ALERT_TOPUP_HIDE = "ALERT_TOPUP_HIDE";

export type FormField = {
    name: string,
}

interface TopUpField {
    name: string
}

export interface TopUp {
    id: number,
    evidance: string | null,
    idManualTopup: number,
    transactionDate: string | null,
    isManual: boolean,
    approvedAt: string | null,
}

export type TopUpApprove = Partial<TopUp> & Partial<Timestamps>

export type TopUpList = TopUp & {
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

export type TopUpShow = TopUp & {
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

export type TopUpCreateField = TopUpField

export type TopUpEditField = TopUpField

export type TopUpCreateResult = TopUp & Partial<Timestamps>

export type TopUpEditResult = TopUp & Partial<Timestamps>

export interface FetchTopUpActionType {
    type: typeof FETCH_TOPUP
}

export interface FetchTopUpSuccessActionType {
    type: typeof FETCH_TOPUP_SUCCESS,
    list: TopUpList[]
}

export interface FetchTopUpErrorActionType {
    type: typeof FETCH_TOPUP_ERROR
}

export interface SetPaginatorTopUpActionType {
    type: typeof SET_PAGINATOR_TOPUP,
    paginate: Paginator
}

export interface AlertTopUpHideActionType {
    type: typeof ALERT_TOPUP_HIDE
}

export interface AlertTopUpShowActionType {
    type: typeof ALERT_TOPUP_SHOW,
    message: string,
    color: string
}

export interface Filter {
    name: string,
    accountNumber: string,
    bankName: string,
    isManual: string
}

export type FilterKeys = keyof Filter;

export interface SetFilterTopUpActionType {
    type: typeof SET_FILTER_TOPUP,
    filter: Filter
}

export interface ClearFilterTopUpActionType {
    type: typeof CLEAR_FILTER_TOPUP
}

export type TopUpActionTypes =
    | FetchTopUpActionType
    | FetchTopUpSuccessActionType
    | FetchTopUpErrorActionType
    | AlertTopUpHideActionType
    | AlertTopUpShowActionType
    | SetPaginatorTopUpActionType
    | SetFilterTopUpActionType
    | ClearFilterTopUpActionType