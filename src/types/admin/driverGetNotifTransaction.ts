import { User } from "./user";

export type DriverGetNotifTransaction = {
    id: number,
    datetime: string,
    getOrder: number,
    takeOrder: number,
    driverProfileView?: {
        photo: string,
        user: Partial<User>
    }
}