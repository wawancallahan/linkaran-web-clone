import { Paginator } from '../../paginator';
import { Timestamps } from '../../timestamps';
import { VehicleType } from '../vehicleType';
import { Service } from '../service';
import { Restaurant } from '../restaurant';

export const FETCH_APPLICATION = "FETCH_APPLICATION";
export const FETCH_APPLICATION_SUCCESS = "FETCH_APPLICATION_SUCCESS";
export const FETCH_APPLICATION_ERROR = "FETCH_APPLICATION_ERROR";
export const SET_PAGINATOR_APPLICATION = "SET_PAGINATOR_APPLICATION";

export const ALERT_APPLICATION_SHOW = "ALERT_APPLICATION_SHOW";
export const ALERT_APPLICATION_HIDE = "ALERT_APPLICATION_HIDE";

export type FormField = {
}

interface ApplicationField {
}

export interface Application {
    id: number,
    date: string,
    numberTransaction: string,
    costumerName: string,
    driverName: string,
    service: string,
    totalCost: number,
    status: string
}

export type ApplicationList = Application

export type ApplicationShowComplete = {
    driverId: number,
    costumer: {
        userInfo: {
            email: string,
            name: string,
            phoneNumber: string
        },
        id: number
    },
    driverInformation?: {
        name: string,
        policeNumber: string,
        profileImage: string | null,
        phoneNumber: string,
        rating: string,
        vehicleTypeCode: string,
        vehicleMerk: string
    },
    transaction: {
        code: string,
        service: {
            name: string,
            code: string
        },
        dateTime: string,
        note: string,
        vehicleType: {
            code: string,
            name: string,
            seat: number
        },
        paymentFromVoucher: number,
        totalCost: number,
        totalCostBeforeCut: number,
        typePayment: string,
        priceSplit: number[],
        cost: number,
        status: string,
        addressDestination?: string,
        addressOrigin?: string,
        origin?: {
            $reql_type$: string,
            coordinates: number[],
            type: string
        },
        distance: string
    },
    driverFeedback?: {
        rating: number,
        description: string
    } | null,
    costumerFeedback?: {
        rating: number,
        description: string,
        tip: number
    } | null,
    foodTransaction?: {
        foodCost: number,
        foods: {
            id: string,
            price: number,
            quantity: number,
            subPrice: number,
            note: string,
            name: string,
            description: string,
            image: number
        }[],
        freightCost: number,
        restaurantId: number,
        restaurant?: Partial<Restaurant>
    } | null,
    sendTransaction?: {
        isFragile: any,
        stuffSize: any,
        sender: {
            name: string,
            note: string,
            phoneNumber: string
        },
        recipient: {
            name: string,
            note: string,
            phoneNumber: string
        }
    } | null
}

export type ApplicationShowInprogress = {
    costumer: {
        id: number,
        userInfo: {
            email: string,
            isActive: boolean,
            linkWithGoogle: boolean,
            name: string,
            phoneNumber: string,
            tokenFCM: string[]
        }
    },
    id: string,
    transaction: {
        addressDestination: string,
        addressOrigin: string,
        code: string,
        cost: number,
        dateTime: number,
        destination: {
            $reql_type$: string,
            coordinates: number[],
            type: string
        },
        distance: string,
        driverPaymentDeductions: number,
        foodFee: number,
        note: string,
        origin: {
            $reql_type$: string,
            coordinates: number[],
            type: string
        },
        paymentFromVoucher: number,
        priceSplit: number[],
        service: Partial<Service>,
        status: string,
        totalCost: number,
        totalCostBeforeCut: number,
        transportationFee: number,
        typePayment: string,
        vehicleType: Partial<VehicleType>
    } | null
}

export type ApplicationShow = {
    type: "complete" | "inprogress",
    item: ApplicationShowComplete | ApplicationShowInprogress
}

export type ApplicationCreateField = ApplicationField

export type ApplicationEditField = ApplicationField

export type ApplicationCreateResult = Application & Partial<Timestamps>

export type ApplicationEditResult = Application & Partial<Timestamps>

export interface FetchApplicationActionType {
    type: typeof FETCH_APPLICATION
}

export interface FetchApplicationSuccessActionType {
    type: typeof FETCH_APPLICATION_SUCCESS,
    list: ApplicationList[]
}

export interface FetchApplicationErrorActionType {
    type: typeof FETCH_APPLICATION_ERROR
}

export interface SetPaginatorApplicationActionType {
    type: typeof SET_PAGINATOR_APPLICATION,
    paginate: Paginator
}

export interface AlertApplicationHideActionType {
    type: typeof ALERT_APPLICATION_HIDE
}

export interface AlertApplicationShowActionType {
    type: typeof ALERT_APPLICATION_SHOW,
    message: string,
    color: string
}

export type ApplicationActionTypes =
    | FetchApplicationActionType
    | FetchApplicationSuccessActionType
    | FetchApplicationErrorActionType
    | AlertApplicationHideActionType
    | AlertApplicationShowActionType
    | SetPaginatorApplicationActionType