export interface Login {
    identity: string,
    type: string,
    tokenFCM: ""
}

export interface ValidateLogin {
    pin: string,
    token: string
}

export interface Token {
    token: string
}

export interface LoginResponse {
    status: boolean,
    response: LoginResult | null,
    message: string
}

export interface LoginResult {
    metaData: {
        isError: boolean,
        message: string,
        statusCode: number,
        statusMessage: string
    },
    result?: Token
}

export interface TokenFCM {
    token: string,
    user: {
        id: number
    }
}

export interface LoginData {
    id: number,
    createdAt: string,
    updatedAt: string,
    deletedAt: string,
    name: string,
    phoneNumber: string,
    email: string,
    tokenFCM: TokenFCM[],
    accessToken: string
}

export interface ValidateLoginResult {
    metaData: {
        isError: boolean,
        message: string,
        statusCode: number,
        statusMessage: string
    },
    result?: LoginData
}

export interface ValidateLoginResponse {
    status: boolean,
    response: ValidateLoginResult | null,
    message: string
}