import { Paginator } from '../../paginator';
import { Timestamps } from '../../timestamps';
import { User } from '../user';

export const FETCH_HISTORY_DATA = "FETCH_HISTORY_DATA";
export const FETCH_HISTORY_DATA_SUCCESS = "FETCH_HISTORY_DATA_SUCCESS";
export const FETCH_HISTORY_DATA_ERROR = "FETCH_HISTORY_DATA_ERROR";
export const SET_PAGINATOR_HISTORY_DATA = "SET_PAGINATOR_HISTORY_DATA";
export const SET_FILTER_HISTORY_DATA = "SET_FILTER_HISTORY_DATA";
export const CLEAR_FILTER_HISTORY_DATA = "CLEAR_FILTER_HISTORY_DATA";

export const ALERT_HISTORY_DATA_SHOW = "ALERT_HISTORY_DATA_SHOW";
export const ALERT_HISTORY_DATA_HIDE = "ALERT_HISTORY_DATA_HIDE";

export enum EntityNameEnum {
    EMONEY_USER = "EmoneyUser",
    TIMELINE_DRIVER = "TimelineDriver",
    TRANSACTION_FEEDBACK = "TransactionFeedback",
    CLAIM_VOUCHER = "ClaimVoucher",
    TRANSACTION = "Transaction",
    COUNTRY = "Country"
}

export enum EventEnum {
    INSERT = "insert",
    UPDATE = "update",
    DELETE = "delete"
}

export type HistoryData = {
    id: number,
    event: EventEnum,
    dateCreate: string,
    before: any,
    after: any,
    entityName: EntityNameEnum,
    user: Partial<User>
}

export type HistoryDataList = HistoryData

export type HistoryDataShow = HistoryData

export type FetchHistoryDataActionType = {
    type: typeof FETCH_HISTORY_DATA
}

export type FetchHistoryDataSuccessActionType = {
    type: typeof FETCH_HISTORY_DATA_SUCCESS,
    list: HistoryData[]
}

export type FetchHistoryDataErrorActionType = {
    type: typeof FETCH_HISTORY_DATA_ERROR
}

export type SetPaginatorHistoryDataActionType = {
    type: typeof SET_PAGINATOR_HISTORY_DATA,
    paginate: Paginator
}

export type AlertHistoryDataHideActionType = {
    type: typeof ALERT_HISTORY_DATA_HIDE
}

export type AlertHistoryDataShowActionType = {
    type: typeof ALERT_HISTORY_DATA_SHOW,
    message: string,
    color: string
}

export type Filter = {
    userName: string,
    dateCreate: Date | null
}

export type FilterOmit = Omit<Filter, 'dateCreate'> & { 
    dateCreate: string
}

export type FilterKeys = keyof Filter;

export type SetFilterHistoryDataActionType = {
    type: typeof SET_FILTER_HISTORY_DATA,
    filter: Filter
}

export type ClearFilterHistoryDataActionType = {
    type: typeof CLEAR_FILTER_HISTORY_DATA
}

export type HistoryDataActionTypes =
    | FetchHistoryDataActionType
    | FetchHistoryDataSuccessActionType
    | FetchHistoryDataErrorActionType
    | AlertHistoryDataHideActionType
    | AlertHistoryDataShowActionType
    | SetPaginatorHistoryDataActionType
    | SetFilterHistoryDataActionType
    | ClearFilterHistoryDataActionType