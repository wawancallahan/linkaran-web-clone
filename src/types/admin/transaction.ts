export type Transaction = {
    id: number,
    numberTransaction: string,
    dateTime: string | null,
    driverTakeOrderAt: string | null,
    cancelAt: string | null,
    note: string | null,
    cost: number,
    discount: number | null,
    totalCost: number,
    totalCostBeforeCut: number,
    paymentFromVoucher: number,
}