export type Transaction = {
    id: number,
    numberTransaction: string,
    dateTime: string,
    driverTakeOrderAt: string | null,
    cancelAt: string | null,
    note: string,
    cost: number,
    discount: number | null,
    totalCost: number,
    totalCostBeforeCut: number
}