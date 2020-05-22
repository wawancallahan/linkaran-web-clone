import { Paginator } from '../paginator';
import { Timestamps } from '../timestamps';
import { Bank } from '../admin/bank';
import { User } from '../admin/user';
import { ManualWithDraw } from '../admin/manualWithdraw';
import { ManualWithDrawRequest } from '../admin/ManualWithdrawRequest';
import { Driver } from '../admin/driver';

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

export type WithDrawField = {
    name: string
}

export type WithDraw = ManualWithDraw

export type WithDrawApprove = Partial<WithDraw> & Partial<Timestamps>

export type WithDrawList = WithDraw & {
    approvedBy?: Partial<User> | null,
    userMakerTopup?: Partial<User> | null,
    request?: Partial<ManualWithDrawRequest> & {
        bank?: Partial<Bank>,
        driverProfile?: Partial<Driver> & {
            user?: Partial<User>
        }
    },
}

export type WithDrawShow = WithDraw & {
    approvedBy?: Partial<User> | null,
    userMakerTopup?: Partial<User> | null,
    request?: Partial<ManualWithDrawRequest> & {
        bank?: Partial<Bank>,
        driverProfile?: Partial<Driver> & {
            user?: Partial<User>
        }
    },
}

export type WithDrawCreateField = WithDrawField

export type WithDrawEditField = WithDrawField

export type WithDrawCreateResult = WithDraw & Partial<Timestamps>

export type WithDrawEditResult = WithDraw & Partial<Timestamps>

export type FetchWithDrawActionType = {
    type: typeof FETCH_WITHDRAW
}

export type FetchWithDrawSuccessActionType = {
    type: typeof FETCH_WITHDRAW_SUCCESS,
    list: WithDrawList[]
}

export type FetchWithDrawErrorActionType = {
    type: typeof FETCH_WITHDRAW_ERROR
}

export type SetPaginatorWithDrawActionType = {
    type: typeof SET_PAGINATOR_WITHDRAW,
    paginate: Paginator
}

export type AlertWithDrawHideActionType = {
    type: typeof ALERT_WITHDRAW_HIDE
}

export type AlertWithDrawShowActionType = {
    type: typeof ALERT_WITHDRAW_SHOW,
    message: string,
    color: string
}

export type Filter = {
    name: string,
    accountNumber: string,
    bankName: string,
    needApproved: string,
    isManual: string,
    isDecline: string
}

export type FilterKeys = keyof Filter;

export type SetFilterWithDrawActionType = {
    type: typeof SET_FILTER_WITHDRAW,
    filter: Filter
}

export type ClearFilterWithDrawActionType = {
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