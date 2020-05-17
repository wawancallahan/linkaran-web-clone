import { Paginator } from '../paginator';
import { Timestamps } from '../timestamps';

export const FETCH_BANK = "FETCH_BANK";
export const FETCH_BANK_SUCCESS = "FETCH_BANK_SUCCESS";
export const FETCH_BANK_ERROR = "FETCH_BANK_ERROR";
export const SET_PAGINATOR_BANK = "SET_PAGINATOR_BANK";
export const SET_FILTER_BANK = "SET_FILTER_BANK";
export const CLEAR_FILTER_BANK = "CLEAR_FILTER_BANK";

export const ALERT_BANK_SHOW = "ALERT_BANK_SHOW";
export const ALERT_BANK_HIDE = "ALERT_BANK_HIDE";

export type FormField = {
    nama: string,
    bankName: string,
    accountNumber: string,
    accountName: string
}

export type BankField = {
    nama: string,
    bankName: number,
    accountNumber: string,
    accountName: string
}

export type Bank = {
    id: number,
    nama: string,
    bankName: number,
    accountName: string,
    accountNumber: string
}

export type BankList = Bank

export type BankShow = Bank

export type BankCreateField = BankField

export type BankEditField = BankField

export type BankCreateResult = Bank & Partial<Timestamps>

export type BankEditResult = Bank & Partial<Timestamps>

export type FetchBankActionType = {
    type: typeof FETCH_BANK
}

export type FetchBankSuccessActionType = {
    type: typeof FETCH_BANK_SUCCESS,
    list: BankList[]
}

export type FetchBankErrorActionType = {
    type: typeof FETCH_BANK_ERROR
}

export type SetPaginatorBankActionType = {
    type: typeof SET_PAGINATOR_BANK,
    paginate: Paginator
}

export type AlertBankHideActionType = {
    type: typeof ALERT_BANK_HIDE
}

export type AlertBankShowActionType = {
    type: typeof ALERT_BANK_SHOW,
    message: string,
    color: string
}

export type Filter = {
    nama: string
}

export type FilterKeys = keyof Filter;

export type SetFilterBankActionType = {
    type: typeof SET_FILTER_BANK,
    filter: Filter
}

export type ClearFilterBankActionType = {
    type: typeof CLEAR_FILTER_BANK
}

export type BankActionTypes =
    | FetchBankActionType
    | FetchBankSuccessActionType
    | FetchBankErrorActionType
    | AlertBankHideActionType
    | AlertBankShowActionType
    | SetPaginatorBankActionType
    | SetFilterBankActionType
    | ClearFilterBankActionType