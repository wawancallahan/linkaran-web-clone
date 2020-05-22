export type ManualWithDrawRequest = {
    id: number,
    bankName: string,
    accountNumber: string,
    accountName: string,
    amount: number,
    isCancel: boolean,
    transactionDate: string | null,
}