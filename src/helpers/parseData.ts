export const typeOfTransaction = (is_deposit: number, is_withdraw: number, is_transfer: number): string => {
    let transaction = "";

    if (is_deposit == 1) transaction = "Deposit"
    else if (is_withdraw == 1) transaction = "Withdraw"
    else if (is_transfer == 1) transaction = "Transfer"

    return transaction;
}

export const parseDateTimeFormat = () => {
    
}