import { Paginator } from "./paginator";

export interface MetaData {
    isError: boolean,
    message: string,
    statusCode: number
}

export interface MetaDataSuccess extends MetaData {
    statusMessage: string,
    paginate?: Paginator
}

export interface ApiResponseSuccess<T> {
    metaData: MetaDataSuccess,
    result: T
}

export interface ApiResponseSuccessList<T> {
    metaData: MetaDataSuccess,
    result: T[]
}

export interface MetaDataError extends MetaData {

}

export interface ApiResponseError {
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