import { Transaction } from "../transaction";
import { TransactionStatus } from "../transactionStatus";
import { Driver } from "../driver";
import { Vehicle } from "../vehicle";
import { SubBrandVehicle } from "../subBrandVehicle";
import { VehicleType } from "../vehicleType";
import { User } from "../user";
import { TokenFCM } from "../../tokenFCM";
import { ClaimIdentifies } from "../claimIdentifies";
import { TransactionFeedback } from "../transactionFeedback";
import { Timestamps } from "../../timestamps";

export type HistoryDataTransactionFeedbackBefore = Partial<TransactionFeedback> & Partial<Timestamps> & {
    transaction?: Partial<Transaction> & {
        transactionStatus?: Partial<TransactionStatus>
    },
    user?: Partial<User> & Partial<ClaimIdentifies> & {
        driverProfile?: Partial<Driver>,
        vehicle?: Partial<Vehicle> & {
            subBrandVehicle?: Partial<SubBrandVehicle>,
            vehicleType?: Partial<VehicleType>
        },
        tokenFCM: string[]
    }
}