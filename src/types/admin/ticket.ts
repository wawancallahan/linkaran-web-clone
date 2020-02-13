import { Paginator } from '../paginator';
import { VoucherPromo } from './voucherPromo';

export const FETCH_TICKET = "FETCH_TICKET";
export const FETCH_TICKET_SUCCESS = "FETCH_TICKET_SUCCESS";
export const FETCH_TICKET_ERROR = "FETCH_TICKET_ERROR";
export const SET_PAGINATOR_TICKET = "SET_PAGINATOR_TICKET";

export const FETCH_TICKET_VOUCHER = "FETCH_TICKET_VOUCHER";
export const FETCH_TICKET_VOUCHER_SUCCESS = "FETCH_TICKET_VOUCHER_SUCCESS";
export const FETCH_TICKET_VOUCHER_ERROR = "FETCH_TICKET_VOUCHER_ERROR";
export const SET_PAGINATOR_TICKET_VOUCHER = "SET_PAGINATOR_TICKET_VOUCHER";

export const ALERT_TICKET_SHOW = "ALERT_TICKET_SHOW";
export const ALERT_TICKET_HIDE = "ALERT_TICKET_HIDE";

export type FormField = {
    redeemCode: string,
}

interface TicketField {
    redeemCode: string,
    voucher: {
        id: number
    }
}

interface TicketList {
    redeemCode: string,
    claimAt: string,
    voucher: VoucherPromo
}

interface TicketResult {
    id: number,
    createdAt?: string,
    updatedAt?: string,
    deletedAt?: string,
}

export type Ticket = TicketResult & TicketList;

export type TicketCreate = TicketField;

export type TicketEdit = TicketField;

export type TicketCreateResult = TicketResult;

export type TicketEditResult = TicketResult;

export interface FetchTicketActionType {
    type: typeof FETCH_TICKET
}

export interface FetchTicketSuccessActionType {
    type: typeof FETCH_TICKET_SUCCESS,
    list: Ticket[]
}

export interface FetchTicketErrorActionType {
    type: typeof FETCH_TICKET_ERROR
}

export interface SetPaginatorTicketActionType {
    type: typeof SET_PAGINATOR_TICKET,
    paginate: Paginator
}

export interface FetchTicketVoucherActionType {
    type: typeof FETCH_TICKET_VOUCHER
}

export interface FetchTicketVoucherSuccessActionType {
    type: typeof FETCH_TICKET_VOUCHER_SUCCESS,
    list: Ticket[]
}

export interface FetchTicketVoucherErrorActionType {
    type: typeof FETCH_TICKET_VOUCHER_ERROR
}

export interface SetPaginatorTicketVoucherActionType {
    type: typeof SET_PAGINATOR_TICKET_VOUCHER,
    paginate: Paginator
}

export interface AlertTicketHideActionType {
    type: typeof ALERT_TICKET_HIDE
}

export interface AlertTicketShowActionType {
    type: typeof ALERT_TICKET_SHOW,
    message: string,
    color: string
}

export type TicketActionTypes =
    | FetchTicketActionType
    | FetchTicketSuccessActionType
    | FetchTicketErrorActionType
    | FetchTicketVoucherActionType
    | FetchTicketVoucherSuccessActionType
    | FetchTicketVoucherErrorActionType
    | AlertTicketHideActionType
    | AlertTicketShowActionType
    | SetPaginatorTicketActionType
    | SetPaginatorTicketVoucherActionType