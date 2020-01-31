export const typeOfTransaction = (is_deposit: number, is_withdraw: number, is_transfer: number): string => {
    let transaction = "";

    if (is_deposit == 1) transaction = "Deposit"
    else if (is_withdraw == 1) transaction = "Withdraw"
    else if (is_transfer == 1) transaction = "Transfer"

    return transaction;
}

export const parseDateTimeFormat = (date: string) => {
    const dateParse = new Date(date)

    return `${dateParse.getDate()} ${dateParse.getMonth() + 1} ${dateParse.getFullYear()} ${dateParse.getHours()}:${dateParse.getMinutes()}`
}

export const booleanToString = (data: boolean) => {
    return data ? "true" : "false"
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