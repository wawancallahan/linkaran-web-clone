import { TimelineDriver } from "../timelineDriver"
import { Driver } from "../driver"
import { Timestamps } from "../../timestamps"

export type HistoryDataTimelineDriverBefore = Partial<TimelineDriver> & Partial<Timestamps> & {
    driverProfile?: Partial<Driver>
}

export type HistoryDataTimelineDriverAfter = Partial<TimelineDriver> & Partial<Timestamps> & {
    driverProfile?: Partial<Driver>
}