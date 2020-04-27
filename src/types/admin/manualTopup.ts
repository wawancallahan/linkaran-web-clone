import { Paginator } from '../paginator';
import { Timestamps } from '../timestamps';
import { User } from './user';
import { Bank } from './bank';

export const FETCH_MANUAL_TOPUP = "FETCH_MANUAL_TOPUP";
export const FETCH_MANUAL_TOPUP_SUCCESS = "FETCH_MANUAL_TOPUP_SUCCESS";
export const FETCH_MANUAL_TOPUP_ERROR = "FETCH_MANUAL_TOPUP_ERROR";
export const SET_PAGINATOR_MANUAL_TOPUP = "SET_PAGINATOR_MANUAL_TOPUP";

export const ALERT_MANUAL_TOPUP_SHOW = "ALERT_MANUAL_TOPUP_SHOW";
export const ALERT_MANUAL_TOPUP_HIDE = "ALERT_MANUAL_TOPUP_HIDE";

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
    image: File | null,
    image_preview: string
}

interface ManualTopUpField {
    amount: string,
    driverProfile: {
        label: string,
        value: number
    },
    bank: {
        label: string,
        value: number
    },
    image: File | null,
    image_preview: string
}

export interface ManualTopUp {
    id: number,
    evidance: string | null,
    idManualTopup: number | null,
    transactionDate: string,
    isManual: boolean,
    approvedAt: string | null,   
}

export type ManualTopUpList = ManualTopUp & Partial<Timestamps> & {
    approvedBy?: Partial<User>,
    userMakerTopup?: Partial<User> | null,
    request?: {
        id: number,
        bankName: string,
        accountNumber: string,
        accountName: string,
        uniqueCodeWithAmount: number,
        bank?: Partial<Bank>,
        driverProfile?: {
            id: number,
            user?: Partial<User>
        }
    },
}

export type ManualTopUpShow = ManualTopUp & Partial<Timestamps> & {
    approvedBy?: Partial<User>,
    userMakerTopup?: Partial<User> | null,
    request?: {
        id: number,
        bankName: string,
        accountNumber: string,
        accountName: string,
        uniqueCodeWithAmount: number,
        bank?: Partial<Bank>,
        driverProfile?: {
            id: number,
            user?: Partial<User>
        }
    },
}

export type ManualTopUpCreateField = ManualTopUpField

export type ManualTopUpEditField = ManualTopUpField

export type ManualTopUpCreateResult = ManualTopUp & Partial<Timestamps> & {
    userMakerTopup?: Partial<User> | null,
    request?: {
        id: number,
        bankName: string,
        accountNumber: string,
        accountName: string,
        amount: number,
        uniqueCode: number | null,
        uniqueCodeWithAmount: number,
        transactionDate: string,
        bank?: Partial<Bank>,
        driverProfile?: {
            id: number
        }
    } & Partial<Timestamps>,
}

export type ManualTopUpEditResult = ManualTopUp & Partial<Timestamps> & {
    userMakerTopup?: Partial<User> | null,
    request?: {
        id: number,
        bankName: string,
        accountNumber: string,
        accountName: string,
        amount: number,
        uniqueCode: number | null,
        uniqueCodeWithAmount: number,
        transactionDate: string,
        bank?: Partial<Bank>,
        driverProfile?: {
            id: number
        }
    } & Partial<Timestamps>,
}

export interface FetchManualTopUpActionType {
    type: typeof FETCH_MANUAL_TOPUP
}

export interface FetchManualTopUpSuccessActionType {
    type: typeof FETCH_MANUAL_TOPUP_SUCCESS,
    list: ManualTopUpList[]
}

export interface FetchManualTopUpErrorActionType {
    type: typeof FETCH_MANUAL_TOPUP_ERROR
}

export interface SetPaginatorManualTopUpActionType {
    type: typeof SET_PAGINATOR_MANUAL_TOPUP,
    paginate: Paginator
}

export interface AlertManualTopUpHideActionType {
    type: typeof ALERT_MANUAL_TOPUP_HIDE
}

export interface AlertManualTopUpShowActionType {
    type: typeof ALERT_MANUAL_TOPUP_SHOW,
    message: string,
    color: string
}

export type ManualTopUpActionTypes =
    | FetchManualTopUpActionType
    | FetchManualTopUpSuccessActionType
    | FetchManualTopUpErrorActionType
    | AlertManualTopUpHideActionType
    | AlertManualTopUpShowActionType
    | SetPaginatorManualTopUpActionType