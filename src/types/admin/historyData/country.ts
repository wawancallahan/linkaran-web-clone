import { Country } from "../region/country"
import { Timestamps } from "../../timestamps"

export type HistoryDataCountryBefore = Partial<Country> & Partial<Timestamps>

export type HistoryDataCountryAfter = Partial<Country> & Partial<Timestamps>