import { LocationPoint } from "./locationPoint";

export type LinkFoodDetailTransaction = {
    id: number,
    estimatedDistance: string,
    userLocationPoint: LocationPoint,
    userAddress: string,
    freight: number,
    transactionId: number,
    serviceFee: number
}