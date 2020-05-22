import { PaymentType } from "../paymentType";
import { Payment } from "../payment";
import { Timestamps } from "../../timestamps";

export type HistoryDataPaymentBefore = Partial<Payment> & Partial<Timestamps> & {
    paymentType?: Partial<PaymentType>
}

export type HistoryDataPaymentAfter = Partial<Payment> & Partial<Timestamps> & {
    paymentType?: Partial<PaymentType>
}