import { Paginator } from '../paginator';
import { Timestamps } from '../timestamps';
import { User } from './user';
import { Bank } from './bank';
import { SelectType } from '../select';
import { Role } from './role';
import { TokenFCM } from '../tokenFCM';
import { ClaimIdentifies } from './claimIdentifies';
import { ManualWithDrawRequest } from './ManualWithdrawRequest';
import { Driver } from './driver';

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
    driverProfile: SelectType,
    bank: SelectType,
    bankName: string,
    accountNumber: string,
    accountName: string
}

export type ManualWithDrawField = {
    amount: string,
    driverProfile: {
        id: number
    },
    bank: {
        id: number
    },
    bankName: string,
    accountNumber: string,
    accountName: string
}

export type ManualWithDraw = {
    id: number,
    evidance: string | null,
    idManualWithdraw: number | null,
    transactionDate: string,
    isManual: boolean,
    approvedAt: string | null,   
}

export type ManualWithDrawList = ManualWithDraw & Partial<Timestamps> & Partial<ClaimIdentifies> & {
    approvedBy?: Partial<User>,
    userMakerWithdraw?: Partial<User> & {
        roles?: Role[],
        linkWithGoogle?: boolean,
        tokenFCM?: TokenFCM[]
    } | null,
    request?: Partial<ManualWithDrawRequest> & {
        bank?: Partial<Bank>,
        driverProfile?: Partial<Driver> & {
            user?: Partial<User>
        }
    },
}

export type ManualWithDrawShow = ManualWithDraw & Partial<Timestamps> & Partial<ClaimIdentifies> & {
    approvedBy?: Partial<User>,
    userMakerWithdraw?: Partial<User> & {
        roles?: Role[],
        linkWithGoogle?: boolean,
        tokenFCM?: TokenFCM[]
    } | null,
    request?: Partial<ManualWithDrawRequest> & {
        bank?: Partial<Bank>,
        driverProfile?: Partial<Driver> & {
            user?: Partial<User>
        }
    },
}

export type ManualWithDrawCreateField = ManualWithDrawField

export type ManualWithDrawEditField = ManualWithDrawField

export type ManualWithDrawCreateResult = ManualWithDraw & Partial<Timestamps> & Partial<ClaimIdentifies> & {
    userMakerTopup?: Partial<User> & {
        roles?: Role[],
        linkWithGoogle?: boolean,
        tokenFCM?: TokenFCM[]
    } | null,
    request?: Partial<ManualWithDrawRequest> & {
        bank?: Partial<Bank>,
        driverProfile?: Partial<Driver>
    } & Partial<Timestamps>,
}

export type ManualWithDrawEditResult = ManualWithDraw & Partial<Timestamps> & Partial<ClaimIdentifies> & {
    userMakerTopup?: Partial<User> & {
        roles?: Role[],
        linkWithGoogle?: boolean,
        tokenFCM?: TokenFCM[]
    } | null,
    request?: Partial<ManualWithDrawRequest> & {
        bank?: Partial<Bank>,
        driverProfile?: Partial<Driver>
    } & Partial<Timestamps>,
}

export type FetchManualWithDrawActionType = {
    type: typeof FETCH_MANUAL_WITHDRAW
}

export type FetchManualWithDrawSuccessActionType = {
    type: typeof FETCH_MANUAL_WITHDRAW_SUCCESS,
    list: ManualWithDrawList[]
}

export type FetchManualWithDrawErrorActionType = {
    type: typeof FETCH_MANUAL_WITHDRAW_ERROR
}

export type SetPaginatorManualWithDrawActionType = {
    type: typeof SET_PAGINATOR_MANUAL_WITHDRAW,
    paginate: Paginator
}

export type AlertManualWithDrawHideActionType = {
    type: typeof ALERT_MANUAL_WITHDRAW_HIDE
}

export type AlertManualWithDrawShowActionType = {
    type: typeof ALERT_MANUAL_WITHDRAW_SHOW,
    message: string,
    color: string
}

export type Filter = {
    accountName: string,
    accountNumber: string,
    bankName: string,
    isManual: string
}

export type FilterKeys = keyof Filter;

export type SetFilterManualWithDrawActionType = {
    type: typeof SET_FILTER_MANUAL_WITHDRAW,
    filter: Filter
}

export type ClearFilterManualWithDrawActionType = {
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