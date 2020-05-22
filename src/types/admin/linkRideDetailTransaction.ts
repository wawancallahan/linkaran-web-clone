import { LocationPoint } from "./locationPoint";

export type LinkRideDetailTransaction = {
    destinationPoint: LocationPoint,
    originPoint: LocationPoint,
    addressOrigin: string,
    addressDestination: string,
    estimatedDistance: string,
    transactionId: number
}