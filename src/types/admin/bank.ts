import { Paginator } from '../paginator';
import { Timestamps } from '../timestamps';

export const FETCH_BANK = "FETCH_BANK";
export const FETCH_BANK_SUCCESS = "FETCH_BANK_SUCCESS";
export const FETCH_BANK_ERROR = "FETCH_BANK_ERROR";
export const SET_PAGINATOR_BANK = "SET_PAGINATOR_BANK";

export const ALERT_BANK_SHOW = "ALERT_BANK_SHOW";
export const ALERT_BANK_HIDE = "ALERT_BANK_HIDE";

export type FormField = {
    name: string,
}

interface BankField {
}

export interface Bank {
    id: number,
}

export type BankList = Bank

export type BankShow = Bank

export type BankCreateField = BankField

export type BankEditField = BankField

export type BankCreateResult = Bank & Partial<Timestamps>

export type BankEditResult = Bank & Partial<Timestamps>

export interface FetchBankActionType {
    type: typeof FETCH_BANK
}

export interface FetchBankSuccessActionType {
    type: typeof FETCH_BANK_SUCCESS,
    list: BankList[]
}

export interface FetchBankErrorActionType {
    type: typeof FETCH_BANK_ERROR
}

export interface SetPaginatorBankActionType {
    type: typeof SET_PAGINATOR_BANK,
    paginate: Paginator
}

export interface AlertBankHideActionType {
    type: typeof ALERT_BANK_HIDE
}

export interface AlertBankShowActionType {
    type: typeof ALERT_BANK_SHOW,
    message: string,
    color: string
}

export type BankActionTypes =
    | FetchBankActionType
    | FetchBankSuccessActionType
    | FetchBankErrorActionType
    | AlertBankHideActionType
    | AlertBankShowActionType
    | SetPaginatorBankActionType