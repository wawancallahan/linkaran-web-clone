import { LocationPoint } from "./locationPoint";

export enum SizeLinkSendEnum {
    KECIL = 'kecil',
    SEDANG = 'sedang',
    BESAR = 'besar',
  }

export type LinkSendDetailTransaction = {
    receiverName: string,
    phoneNumberReceiver: string,
    senderName: string,
    serviceFee: number,
    phoneNumbersender: string,
    senderNote: string,
    receiverNote: string,
    receiverAddress: string,
    isUseCar: boolean,
    isUseMotorcycle: boolean,
    size: SizeLinkSendEnum,
    isFragile: boolean,
    itemNote: string | null,
    destinationPoint: LocationPoint,
    originPoint: LocationPoint,
    estimatedDistance: string,
    transactionId: number
}