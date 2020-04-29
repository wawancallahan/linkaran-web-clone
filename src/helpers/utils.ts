import moment from 'moment'
import 'moment/locale/id'
import { icoLinkRide, icoLinkCar, icoLinkBox, icoLinkFood } from './Assets'

moment.locale('id');

export interface OptionObjectString {
    [key: string]: string
}

export interface OptionObjectNumber {
    [key: string]: number
}

export interface OptionObjectAny {
    [key: string]: any
}

export const addZeroOnNumber = (number: number) => {
    let parseNumber = number.toString()
    if (number < 10) {
        parseNumber = `0${parseNumber}`
    }

    return parseNumber
}

export const typeOfTransaction = (is_deposit: number, is_withdraw: number, is_transfer: number): string => {
    let transaction = "";

    if (is_deposit == 1) transaction = "Deposit"
    else if (is_withdraw == 1) transaction = "Withdraw"
    else if (is_transfer == 1) transaction = "Transfer"

    return transaction;
}

export const colorStatusFormat = (status: string) => {
    let color = "default"
    
    switch (status) {
        case "complete": color = "success"
            break;
        case "cancel": color = "danger"
            break;
    }

    return color;
}

export const typeTransactionFormat = (status?: string) => {
    let type = "complete"

    if (status) {
        if (["inprogress", "complete"].includes(status)) {
            type = status
        }
    }

    return type;
}

export const parseDateFormat = (date: string) => {
    const dateParse = moment(date);

    return dateParse.format('DD MMMM YYYY');
}

export const parseDateTimeFormat = (date: string) => {
    const dateParse = moment(new Date(date))

    return dateParse.format('D MMMM YYYY hh:mm');
}
export const getOnlyDateFromDateNull = (date: Date | null) => {
    if (date) {
        return `${date.getFullYear()}-${addZeroOnNumber(date.getMonth() + 1)}-${addZeroOnNumber(date.getDate())}`
    }
    
    return '';
}

export const getOnlyDateFromDate = (date: Date) => {
    return `${date.getFullYear()}-${addZeroOnNumber(date.getMonth() + 1)}-${addZeroOnNumber(date.getDate())}`
}

export const getTimeFromDate = (date: Date) => {
    return `${addZeroOnNumber(date.getHours())}:${addZeroOnNumber(date.getMinutes())}`
}

export const booleanToString = (data: boolean) => {
    return data ? "true" : "false"
}

export const booleanToIndonesiaText = (data: boolean) => {
    return data ? "Ya" : "Tidak"
}

export const booleanToActiveStatus = (data: boolean) => {
    return data ? "Aktif" : "Tidak Aktif";
}

export const midnightDate = () => {
    var d = new Date();
    d.setHours(0,0,0,0);

    return d
}

export const voucherUsedFormat = (date_start: string, date_end: string) => {
    let label = 'Sedang Berlangsung';

    const dateStartParse = new Date(date_start);
    const dateEndParse = new Date(date_end);

    if (dateStartParse > dateEndParse) {
        label = 'Sudah Berakhir'
    }

    return label;
}

export const objectToParamsUrl = (params: OptionObjectString | OptionObjectNumber) => {

    let obj: OptionObjectString | OptionObjectNumber = {...params};

    return Object.keys(obj).map((value: string) => {
        return value + '=' + obj[value]
    }).join('&')
}

export const icoLinkImage = (code: string): string => {
    const icoLink: OptionObjectString = {
        linkride: icoLinkRide,
        linkcar: icoLinkCar,
        linksend: icoLinkBox,
        linkfood: icoLinkFood
    }

    if (code in icoLink) {
        return icoLink[code]
    }

    return '';
}

export const getKeyValue = <U extends keyof T, T extends object>(key: U) => (obj: T) => obj[key];

export const setUrlParams = <U extends keyof T, T extends object>(objParams: T, addObjParams: OptionObjectAny = {}) => {
    let currentUrlParams = new URLSearchParams(window.location.search);

    Object.keys(objParams).forEach((obj: string, index: number) => {
        currentUrlParams.set(obj, getKeyValue<keyof T, T>(obj as U)(objParams) as any);
    });

    Object.keys(addObjParams).forEach((obj: string, index: number) => {
        currentUrlParams.set(obj, addObjParams[obj]);
    });

    return window.location.pathname + "?" + currentUrlParams.toString();
}