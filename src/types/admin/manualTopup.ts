import { Paginator } from '../paginator';
import { Timestamps } from '../timestamps';
import { User } from './user';
import { Bank } from './bank';
import { SelectType } from '../select';
import { Role } from './role';
import { TokenFCM } from '../tokenFCM';
import { ClaimIdentifies } from './claimIdentifies';
import { ManualTopUpRequest } from './manualTopupRequest';
import { Driver } from './driver';

export const FETCH_MANUAL_TOPUP = "FETCH_MANUAL_TOPUP";
export const FETCH_MANUAL_TOPUP_SUCCESS = "FETCH_MANUAL_TOPUP_SUCCESS";
export const FETCH_MANUAL_TOPUP_ERROR = "FETCH_MANUAL_TOPUP_ERROR";
export const SET_PAGINATOR_MANUAL_TOPUP = "SET_PAGINATOR_MANUAL_TOPUP";
export const SET_FILTER_MANUAL_TOPUP = "SET_FILTER_MANUAL_TOPUP";
export const CLEAR_FILTER_MANUAL_TOPUP = "CLEAR_FILTER_MANUAL_TOPUP";

export const ALERT_MANUAL_TOPUP_SHOW = "ALERT_MANUAL_TOPUP_SHOW";
export const ALERT_MANUAL_TOPUP_HIDE = "ALERT_MANUAL_TOPUP_HIDE";

export type FormField = {
    amount: string,
    driverProfile: SelectType,
    bank: SelectType,
    image: File | null,
    image_preview: string
}

export type ManualTopUpField = {
    amount: string,
    driverProfile: {
        id: number
    },
    bank: {
        id: number
    },
    image: File | null,
    image_preview: string
}

export type ManualTopUp = {
    id: number,
    evidance: string | null,
    idManualTopup: number | null,
    transactionDate: string,
    isManual: boolean,
    approvedAt: string | null,   
}

export type ManualTopUpList = ManualTopUp & Partial<Timestamps> & {
    approvedBy?: Partial<User>,
    userMakerTopup?: Partial<User> & Partial<ClaimIdentifies> & {
        roles?: Role[],
        linkWithGoogle?: boolean,
        tokenFCM?: TokenFCM[]
    } | null,
    request?: Partial<ManualTopUpRequest> & {
        bank?: Partial<Bank>,
        driverProfile?: Partial<Driver> & {
            user?: Partial<User>
        }
    },
}

export type ManualTopUpShow = ManualTopUp & Partial<Timestamps> & {
    approvedBy?: Partial<User>,
    userMakerTopup?: Partial<User> & Partial<ClaimIdentifies> & {
        roles?: Role[],
        linkWithGoogle?: boolean,
        tokenFCM?: TokenFCM[]
    } | null,
    request?: Partial<ManualTopUpRequest> & {
        bank?: Partial<Bank>,
        driverProfile?: Partial<Driver> & {
            user?: Partial<User>
        }
    },
}

export type ManualTopUpCreateField = ManualTopUpField

export type ManualTopUpEditField = ManualTopUpField

export type ManualTopUpCreateResult = ManualTopUp & Partial<Timestamps> & Partial<ClaimIdentifies> & {
    userMakerTopup?: Partial<User> & {
        roles?: Role[],
        linkWithGoogle?: boolean,
        tokenFCM?: TokenFCM[]
    } | null,
    request?: Partial<ManualTopUpRequest> & {
        bank?: Partial<Bank>,
        driverProfile?: Partial<Driver>
    } & Partial<Timestamps>,
}

export type ManualTopUpEditResult = ManualTopUp & Partial<Timestamps> & Partial<ClaimIdentifies> & {
    userMakerTopup?: Partial<User> & {
        roles?: Role[],
        linkWithGoogle?: boolean,
        tokenFCM?: TokenFCM[]
    } | null,
    request?: Partial<ManualTopUpRequest> & {
        bank?: Partial<Bank>,
        driverProfile?: Partial<Driver>
    } & Partial<Timestamps>,
}

export type FetchManualTopUpActionType = {
    type: typeof FETCH_MANUAL_TOPUP
}

export type FetchManualTopUpSuccessActionType = {
    type: typeof FETCH_MANUAL_TOPUP_SUCCESS,
    list: ManualTopUpList[]
}

export type FetchManualTopUpErrorActionType = {
    type: typeof FETCH_MANUAL_TOPUP_ERROR
}

export type SetPaginatorManualTopUpActionType = {
    type: typeof SET_PAGINATOR_MANUAL_TOPUP,
    paginate: Paginator
}

export type AlertManualTopUpHideActionType = {
    type: typeof ALERT_MANUAL_TOPUP_HIDE
}

export type AlertManualTopUpShowActionType = {
    type: typeof ALERT_MANUAL_TOPUP_SHOW,
    message: string,
    color: string
}

export type Filter = {
    accountName: string,
    accountNumber: string,
    bankName: string
}

export type FilterKeys = keyof Filter;

export type SetFilterManualTopUpActionType = {
    type: typeof SET_FILTER_MANUAL_TOPUP,
    filter: Filter
}

export type ClearFilterManualTopUpActionType = {
    type: typeof CLEAR_FILTER_MANUAL_TOPUP
}

export type ManualTopUpActionTypes =
    | FetchManualTopUpActionType
    | FetchManualTopUpSuccessActionType
    | FetchManualTopUpErrorActionType
    | AlertManualTopUpHideActionType
    | AlertManualTopUpShowActionType
    | SetPaginatorManualTopUpActionType
    | SetFilterManualTopUpActionType
    | ClearFilterManualTopUpActionType