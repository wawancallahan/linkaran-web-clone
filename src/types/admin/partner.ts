import { Paginator } from '../paginator';
import { Timestamps } from '../timestamps';
import { User } from './user';

export const FETCH_PARTNER = "FETCH_PARTNER";
export const FETCH_PARTNER_SUCCESS = "FETCH_PARTNER_SUCCESS";
export const FETCH_PARTNER_ERROR = "FETCH_PARTNER_ERROR";
export const SET_PAGINATOR_PARTNER = "SET_PAGINATOR_PARTNER";
export const SET_FILTER_PARTNER = "SET_FILTER_PARTNER";
export const CLEAR_FILTER_PARTNER = "CLEAR_FILTER_PARTNER";

export const ALERT_PARTNER_SHOW = "ALERT_PARTNER_SHOW";
export const ALERT_PARTNER_HIDE = "ALERT_PARTNER_HIDE";

export type FormField = {
    name: string,
    email: string,
    phoneNumber: string,
    companyName: string,
    secret: string,
    startWorkingTogether: Date | null,
    endWorkingTogether: Date | null,
    ips: string[]
}

export type PartnerField = {
    name: string,
    email: string,
    phoneNumber: string,
    companyName: string,
    secret: string,
    startWorkingTogether: string,
    endWorkingTogether: string,
    ips: string[]
}

export type Partner = {
    id: number,
    companyName: string,
    startWorkingTogether: string,
    endWorkingTogether: string,
    active: boolean,
    ips: string[],
    secret?: string
}

export type PartnerList = Partner & {
    user: Partial<User>
}

export type PartnerShow = Partner & {
    user: Partial<User>
}

export type PartnerCreateField = PartnerField

export type PartnerEditField = PartnerField

export type PartnerCreateResult = Partner & Partial<Timestamps>

export type PartnerEditResult = Partner & Partial<Timestamps>

export type FetchPartnerActionType = {
    type: typeof FETCH_PARTNER
}

export type FetchPartnerSuccessActionType = {
    type: typeof FETCH_PARTNER_SUCCESS,
    list: PartnerList[]
}

export type FetchPartnerErrorActionType = {
    type: typeof FETCH_PARTNER_ERROR
}

export type SetPaginatorPartnerActionType = {
    type: typeof SET_PAGINATOR_PARTNER,
    paginate: Paginator
}

export type AlertPartnerHideActionType = {
    type: typeof ALERT_PARTNER_HIDE
}

export type AlertPartnerShowActionType = {
    type: typeof ALERT_PARTNER_SHOW,
    message: string,
    color: string
}

export type Filter = {
    name: string,
    companyName: string,
    startWorkingTogether: Date | null,
    endWorkingTogether: Date | null,
    email: string,
    phoneNumber: string,
}

export type FilterOmit = Omit<Filter, 'startWorkingTogether' | 'endWorkingTogether'> & { 
    startWorkingTogether: string,
    endWorkingTogether: string
}

export type FilterKeys = keyof Filter;

export type SetFilterPartnerActionType = {
    type: typeof SET_FILTER_PARTNER,
    filter: Filter
}

export type ClearFilterPartnerActionType = {
    type: typeof CLEAR_FILTER_PARTNER
}

export type PartnerActionTypes =
    | FetchPartnerActionType
    | FetchPartnerSuccessActionType
    | FetchPartnerErrorActionType
    | AlertPartnerHideActionType
    | AlertPartnerShowActionType
    | SetPaginatorPartnerActionType
    | SetFilterPartnerActionType
    | ClearFilterPartnerActionType