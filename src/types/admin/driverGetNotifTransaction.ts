import { User } from "./user";

export type DriverGetNotifTransaction = {
    id: number,
    datetime: string,
    getOrder: number,
    takeOrder: number,
    driverProfileView?: {
        photo: string | null,
        user: Partial<User>
    },
    driverProfile?: {
        photo: string | null,
        user: Partial<User>
    }
}