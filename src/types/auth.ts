import { Role } from "./admin/role";
import { TokenFCM } from "./tokenFCM";

export type Login = {
    identity: string,
    type: string,
    role: string
}

export type ValidateLogin = {
    pin: string,
    token: string
}

export type Token = {
    token: string,
    accessToken: string | null
}

export type LoginResponse = {
    status: boolean,
    response: LoginResult | LoginFailResult | null,
    message: string
}

export type LoginResult = {
    metaData: {
        isError: boolean,
        message: string,
        statusCode: number
    },
    result?: Token
}

export type LoginFailResult = {
    metaData: {
        isError: boolean,
        message: string,
        statusCode: number
    },
    result: null
}

export type LoginData = {
    id: number,
    name: string,
    phoneNumber: string,
    email: string,
    tokenFCM: TokenFCM[],
    accessToken: string,
    isActive: boolean,
    roles?: Role[],
    linkWithGoogle: boolean
}

export type ValidateLoginResult = {
    metaData: {
        isError: boolean,
        message: string,
        statusCode: number
    },
    result?: LoginData
}

export type ValidateLoginFailResult = {
    metaData: {
        isError: boolean,
        message: string,
        statusCode: number
    },
    result: null
}

export type ValidateLoginResponse = {
    status: boolean,
    response: ValidateLoginResult | ValidateLoginFailResult | null,
    message: string
}