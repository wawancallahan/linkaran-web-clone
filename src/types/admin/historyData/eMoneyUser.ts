import { EMoneyUser } from "../eMoneyUser";
import { Timestamps } from "../../timestamps";
import { User } from "../user";
import { TokenFCM } from "../../tokenFCM";

export type HistoryDataEMoneyUserBefore = Partial<EMoneyUser> & Partial<Timestamps> & {
    user?: Partial<User> & {
        tokenFCM?: Partial<TokenFCM>[]
    }
}

export type HistoryDataEMoneyUserAfter = Partial<EMoneyUser> & Partial<Timestamps> & {
    user?: Partial<User> & {
        tokenFCM?: Partial<TokenFCM>[]
    }
}