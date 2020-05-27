import { Paginator } from '../paginator';
import { VoucherPromo } from './voucherPromo';
import { Timestamps } from '../timestamps';

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

export type TicketField = {
    redeemCode: string,
    voucher: {
        id: number
    }
}

export type Ticket = {
    id: number,
    redeemCode: string,
    claimAt: string | null
}

export type TicketList = Ticket & {
    voucher?: Partial<VoucherPromo>
}

export type TicketShow = Ticket & {
    voucher?: Partial<VoucherPromo>
}

export type TicketCreateField = TicketField;

export type TicketEditField = TicketField;

export type TicketGenerateField = TicketField

export type TicketCreateResult = Ticket& Partial<Timestamps> & {
    voucher?: Partial<VoucherPromo>
};

export type TicketEditResult = Ticket & Partial<Timestamps> & {
    voucher?: Partial<VoucherPromo>
};

export type TicketGenerateResult = Ticket & Partial<Timestamps> & {
    voucher?: Partial<VoucherPromo>
};

export type FetchTicketActionType = {
    type: typeof FETCH_TICKET
}

export type FetchTicketSuccessActionType = {
    type: typeof FETCH_TICKET_SUCCESS,
    list: Ticket[]
}

export type FetchTicketErrorActionType = {
    type: typeof FETCH_TICKET_ERROR
}

export type SetPaginatorTicketActionType = {
    type: typeof SET_PAGINATOR_TICKET,
    paginate: Paginator
}

export type FetchTicketVoucherActionType = {
    type: typeof FETCH_TICKET_VOUCHER
}

export type FetchTicketVoucherSuccessActionType = {
    type: typeof FETCH_TICKET_VOUCHER_SUCCESS,
    list: Ticket[]
}

export type FetchTicketVoucherErrorActionType = {
    type: typeof FETCH_TICKET_VOUCHER_ERROR
}

export type SetPaginatorTicketVoucherActionType = {
    type: typeof SET_PAGINATOR_TICKET_VOUCHER,
    paginate: Paginator
}

export type AlertTicketHideActionType = {
    type: typeof ALERT_TICKET_HIDE
}

export type AlertTicketShowActionType = {
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