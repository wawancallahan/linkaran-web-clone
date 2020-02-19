export interface Role {
    id: number,
    title: string
}

export interface Login {
    identity: string,
    type: string,
    role: string,
    tokenFCM: string
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
    response: LoginResult | LoginFailResult | null,
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
    accessToken: string,
    isActive: boolean,
    roles: Role[],
    linkWithGoogle: boolean
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