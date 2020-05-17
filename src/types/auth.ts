import { Role } from "./admin/role";

export interface Login {
    identity: string,
    type: string,
    role: string
}

export interface ValidateLogin {
    pin: string,
    token: string
}

export interface Token {
    token: string,
    accessToken: string | null
}

export interface LoginResponse {
    status: boolean,
    response: LoginResult | LoginFailResult | null,
    message: string
}

export interface LoginResult {
    metaData: {
        isError: boolean,
        message: string,
        statusCode: number
    },
    result?: Token
}

export interface LoginFailResult {
    metaData: {
        isError: boolean,
        message: string,
        statusCode: number
    },
    result: null
}

export interface TokenFCM {
    token: string,
    id: number
}

export interface LoginData {
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

export interface ValidateLoginResult {
    metaData: {
        isError: boolean,
        message: string,
        statusCode: number
    },
    result?: LoginData
}

export interface ValidateLoginFailResult {
    metaData: {
        isError: boolean,
        message: string,
        statusCode: number
    },
    result: null
}

export interface ValidateLoginResponse {
    status: boolean,
    response: ValidateLoginResult | ValidateLoginFailResult | null,
    message: string
}