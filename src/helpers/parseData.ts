import moment from 'moment'

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

export const parseDateTimeFormat = (date: string) => {
    const dateParse = moment(new Date(date))

    return dateParse.format('dd MMMM YYYY hh:mm');
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