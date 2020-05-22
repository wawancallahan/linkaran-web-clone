import { Paginator, PaginatorLinkPay } from "./paginator";

export type MetaData = {
    isError: boolean,
    message: string,
    statusCode: number
}

export type MetaDataSuccess = MetaData & {
    statusMessage: string,
    paginate?: Paginator | PaginatorLinkPay
}

export type ApiResponseSuccess<T> = {
    metaData: MetaDataSuccess,
    result: T
}

export type ApiResponseSuccessList<T> = {
    metaData: MetaDataSuccess,
    result: T[]
}

export type MetaDataError = MetaData

export type ApiResponseError = {
    metaData: MetaDataError,
    result: null
}

export type ApiResponse<T> = {
    response: ApiResponseSuccess<T> | null,
    error: ApiResponseError | null
}

export type ApiResponseList<T> = {
    response: ApiResponseSuccessList<T> | null,
    error: ApiResponseError | null
}

export type NonResult = null;