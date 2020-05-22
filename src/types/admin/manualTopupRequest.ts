export type ManualTopUpRequest = {
    id: number,
    bankName: string,
    accountNumber: string,
    accountName: string,
    amount: number,
    uniqueCode: number | null,
    uniqueCodeWithAmount: number,
    isCancel: boolean,
    transactionDate: string
}