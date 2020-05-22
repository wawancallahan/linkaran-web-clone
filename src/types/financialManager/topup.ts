import { Paginator } from '../paginator';
import { Timestamps } from '../timestamps';
import { Bank } from '../admin/bank';
import { User } from '../admin/user';
import { ManualTopUp } from '../admin/manualTopup';
import { ManualTopUpRequest } from '../admin/manualTopupRequest';
import { Driver } from '../admin/driver';

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

export type TopUpField = {
    name: string
}

export type TopUp = ManualTopUp

export type TopUpApprove = Partial<TopUp> & Partial<Timestamps>

export type TopUpList = TopUp & {
    approvedBy?: Partial<User> | null,
    userMakerTopup?: Partial<User> | null,
    request?: Partial<ManualTopUpRequest> & {
        bank?: Partial<Bank>,
        driverProfile?: Partial<Driver> & {
            user?: Partial<User>
        }
    },
}

export type TopUpShow = TopUp & {
    approvedBy?: Partial<User> | null,
    userMakerTopup?: Partial<User> | null,
    request?: Partial<ManualTopUpRequest> & {
        bank?: Partial<Bank>,
        driverProfile?: Partial<Driver> & {
            user?: Partial<User>
        }
    },
}

export type TopUpCreateField = TopUpField

export type TopUpEditField = TopUpField

export type TopUpCreateResult = TopUp & Partial<Timestamps>

export type TopUpEditResult = TopUp & Partial<Timestamps>

export type FetchTopUpActionType = {
    type: typeof FETCH_TOPUP
}

export type FetchTopUpSuccessActionType = {
    type: typeof FETCH_TOPUP_SUCCESS,
    list: TopUpList[]
}

export type FetchTopUpErrorActionType = {
    type: typeof FETCH_TOPUP_ERROR
}

export type SetPaginatorTopUpActionType = {
    type: typeof SET_PAGINATOR_TOPUP,
    paginate: Paginator
}

export type AlertTopUpHideActionType = {
    type: typeof ALERT_TOPUP_HIDE
}

export type AlertTopUpShowActionType = {
    type: typeof ALERT_TOPUP_SHOW,
    message: string,
    color: string
}

export type Filter = {
    name: string,
    accountNumber: string,
    bankName: string,
    needApproved: string,
    isManual: string
}

export type FilterKeys = keyof Filter;

export type SetFilterTopUpActionType = {
    type: typeof SET_FILTER_TOPUP,
    filter: Filter
}

export type ClearFilterTopUpActionType = {
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