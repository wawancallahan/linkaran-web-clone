import { Paginator } from '../../paginator';
import { Timestamps } from '../../timestamps';
import { VehicleType } from '../vehicleType';
import { Service } from '../service';
import { Restaurant } from '../restaurant';
import { User } from '../user';
import { Partner } from '../partner';
import { Customer } from '../customer';

export const FETCH_APPLICATION = "FETCH_APPLICATION";
export const FETCH_APPLICATION_SUCCESS = "FETCH_APPLICATION_SUCCESS";
export const FETCH_APPLICATION_ERROR = "FETCH_APPLICATION_ERROR";
export const SET_PAGINATOR_APPLICATION = "SET_PAGINATOR_APPLICATION";
export const SET_FILTER_APPLICATION = "SET_FILTER_APPLICATION";
export const CLEAR_FILTER_APPLICATION = "CLEAR_FILTER_APPLICATION";

export const ALERT_APPLICATION_SHOW = "ALERT_APPLICATION_SHOW";
export const ALERT_APPLICATION_HIDE = "ALERT_APPLICATION_HIDE";

export type FormField = {
}

export type ApplicationField = {
}

export type Application = {
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

export type FoodTransactionDetail = {
    id: string,
    price: number,
    quantity: number,
    subPrice: number,
    note: string,
    name: string,
    description: string,
    image: string
}

export type RestaurantTransactionDetail = Partial<Restaurant> & {
    district: string | null,
    province: string | null,
    openTime: string,
    closeTime: string,
    isClosed: boolean,
    distance: string
}

export type ApplicationShowComplete = {
    driverId: number | null,
    costumer: {
        userInfo: Partial<Customer>,
        id: number
    },
    driverInformation?: null | {
        name: string,
        policeNumber: string,
        profileImage: string | null,
        phoneNumber: string,
        rating: string,
        vehicleTypeCode: string,
        vehicleMerk: string
    },
    transaction: {
        voucherCode?: string,   
        code: string,
        service: Partial<Service>,
        dateTime: string,
        note: string,
        vehicleType: Partial<VehicleType>,
        paymentFromVoucher: number,
        serviceFee: number,
        totalCost: number,
        totalCostBeforeCut: number,
        typePayment: string,
        priceSplit: number[],
        transportationFee: number,
        cost: number,
        status: string,
        addressDestination?: string,
        addressOrigin?: string,
        origin?: {
            $reql_type$: string,
            coordinates: number[],
            type: string
        },
        distance: string,
        destination: string
    },
    driverFeedback?: null | {
        rating: number,
        description: string
    },
    costumerFeedback?: null | {
        rating: number,
        description: string,
        tip: number
    },
    foodTransaction?: null | {
        foodCost: number,
        foods: FoodTransactionDetail[],
        freightCost: number,
        restaurantId: number,
        restaurant?: RestaurantTransactionDetail
    },
    sendTransaction?: null | {
        isFragile: boolean,
        stuffSize: string,
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
    },
    cancelFeedback?: null | {
        description: string;
        cancelAt: string;
    }
}

export type ApplicationShowInprogress = {
    costumer: {
        id: number,
        userInfo: Partial<User> & {
            partner?: Partial<Partner>
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
        foodFee?: number,
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

export type FetchApplicationActionType = {
    type: typeof FETCH_APPLICATION
}

export type FetchApplicationSuccessActionType = {
    type: typeof FETCH_APPLICATION_SUCCESS,
    list: ApplicationList[]
}

export type FetchApplicationErrorActionType = {
    type: typeof FETCH_APPLICATION_ERROR
}

export type SetPaginatorApplicationActionType = {
    type: typeof SET_PAGINATOR_APPLICATION,
    paginate: Paginator
}

export type AlertApplicationHideActionType = {
    type: typeof ALERT_APPLICATION_HIDE
}

export type AlertApplicationShowActionType = {
    type: typeof ALERT_APPLICATION_SHOW,
    message: string,
    color: string
}

export type Filter = {
    numberTransaction: string,
    userName: string,
    date: Date | null,
    type: string,
    serviceCode: string,
    statusOrder: string,
    driverName: string
}

export type FilterOmit = Omit<Filter, 'date'> & { 
    date: string
}

export type FilterKeys = keyof Filter;

export type SetFilterApplicationActionType = {
    type: typeof SET_FILTER_APPLICATION,
    filter: Filter
}

export type ClearFilterApplicationActionType = {
    type: typeof CLEAR_FILTER_APPLICATION
}

export type ApplicationActionTypes =
    | FetchApplicationActionType
    | FetchApplicationSuccessActionType
    | FetchApplicationErrorActionType
    | AlertApplicationHideActionType
    | AlertApplicationShowActionType
    | SetPaginatorApplicationActionType
    | SetFilterApplicationActionType
    | ClearFilterApplicationActionType