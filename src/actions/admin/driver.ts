import axiosService from '../../services/axiosService';
import { Dispatch } from "redux";
import { Paginator } from '../../types/paginator';
import { AppState } from "../../store/configureStore";
import {
    Driver,
    SET_PAGINATOR_DRIVER,
    FETCH_DRIVER,
    FETCH_DRIVER_ERROR,
    FETCH_DRIVER_SUCCESS,
    SetPaginatorDriverActionType,
    FetchDriverActionType,
    AlertDriverHideActionType,
    ALERT_DRIVER_HIDE,
    AlertDriverShowActionType,
    ALERT_DRIVER_SHOW,
    DriverCreate,
    DriverCreateResult,
    DriverEdit,
    DriverEditResult,
    FetchDriverErrorActionType,
    FetchDriverSuccessActionType
} from '../../types/admin/driver';
import { AxiosResponse, AxiosError } from 'axios';
import { ApiResponse, ApiResponseList, ApiResponseError, ApiResponseSuccess, ApiResponseSuccessList } from '../../types/api';
import { ThunkResult } from '../../types/thunk';

export const setPaginateAction = (paginate: Paginator): SetPaginatorDriverActionType => {
    return {
        type: SET_PAGINATOR_DRIVER,
        paginate: paginate
    }
}

export const setFetchDriverAction = (list: Driver[]): FetchDriverActionType => {
    return {
        type: FETCH_DRIVER,
        list: list
    }
}

export const setFetchDriverSuccessAction = (list: Driver[]): FetchDriverSuccessActionType => {
    return {
        type: FETCH_DRIVER_SUCCESS,
        list: list
    }
}

export const setFetchDriverErrorAction = (): FetchDriverErrorActionType => {
    return {
        type: FETCH_DRIVER_ERROR
    }
}

export const setAlertDriverHideAction = (): AlertDriverHideActionType => {
    return {
        type: ALERT_DRIVER_HIDE
    }
}

export const setAlertDriverShowAction = (message: string, color: string): AlertDriverShowActionType => {
    return {
        type: ALERT_DRIVER_SHOW,
        color: color,
        message: message
    };
}

export const fetchDriverApiAction = (page: number) => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        axiosService.get(`/v1/web/driver-profile?page=${page}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccessList<Driver> = response.data;

                dispatch(setFetchDriverSuccessAction(data.result));

                if (data.metaData.paginate) {
                    dispatch(setPaginateAction({
                        total: data.metaData.paginate.total,
                        currentPage: data.metaData.paginate.currentPage,
                        itemCount: data.metaData.paginate.itemCount,
                        pageCount: data.metaData.paginate.pageCount
                    }))
                }
            })
            .catch( (error: AxiosError) => {
                dispatch(setFetchDriverErrorAction());

                dispatch(setPaginateAction({
                    total: 0,
                    currentPage: 0,
                    itemCount: 0,
                    pageCount: 0
                }))
            })
    }
}

export const createDriverAction = (driver: DriverCreate): ThunkResult<Promise<ApiResponse<DriverCreateResult>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        
        const data = new FormData();

        data.set('name', driver.nama);
        data.set('phoneNumber', driver.no_telepon)
        data.set('email', driver.email)
        data.set('dateOfBirth', driver.tanggal_lahir)
        data.set('identityNumber', driver.no_ktp)
        data.set('gender', driver.jenis_kelamin == 1 ? 'L' : 'P')
        data.set('address', driver.alamat)
        data.set('countryId', driver.negara.id.toString())
        data.set('provinceId', driver.provinsi.id.toString())
        data.set('districtId', driver.kabupaten_kota.id.toString())
        data.set('subDistrictId', driver.kecamatan.id.toString())
        data.set('villageId', driver.kelurahan.id.toString())
        data.set('rating', driver.rating.toString())
        data.set('vehicleTypeId', driver.tipe_kendaraan.id.toString())
        data.set('policeNumber', driver.no_polisi)
        data.set('stnkNumber', driver.no_stnk)
        data.set('chassisNumber', driver.no_rangka)
        data.set('subBrandVehicleId', driver.merek.id.toString())
        data.set('description', driver.keterangan)
        data.set('seat', driver.jumlah_seat.toString())
        data.set('color', driver.warna)

        if (driver.ktp_file) {
            data.append('ktpPhoto', driver.ktp_file);
        }

        if (driver.foto_profil) {
            data.append('photo', driver.foto_profil);
        }
        
        return axiosService.post('/v1/web/driver-profile', data, {
                headers: {
                    'Content-Type': 'multipart/form-data' 
                }
            })
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<DriverCreateResult> = response.data;
                
                return Promise.resolve({
                    response: data,
                    error: null
                });
            })
            .catch( (error: AxiosError) => {
                 if (error.response) {
                    if (error.response.status == 500) {
                        const errorResponse: ApiResponseError = {
                            metaData: {
                                isError: true,
                                message: error.message,
                                statusCode: 500
                            },
                            result: null
                        }
    
                        return Promise.reject({
                            response: null,
                            error: errorResponse
                        });
                    } else {
                        return Promise.reject({
                            response: null,
                            error: error.response.data
                        });
                    }
                } else {

                    const errorResponse: ApiResponseError = {
                        metaData: {
                            isError: true,
                            message: error.message,
                            statusCode: 500
                        },
                        result: null
                    }

                    return Promise.reject({
                        response: null,
                        error: errorResponse
                    });
                }
            })
    }
}

export const findDriverAction = (id: number): ThunkResult<Promise<ApiResponse<Driver>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.get(`/v1/web/driver-profile/${id}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<Driver> = response.data;

                return Promise.resolve({
                    response: data,
                    error: null
                });
            })
            .catch( (error: AxiosError) => {
                 if (error.response) {
                    if (error.response.status == 500) {
                        const errorResponse: ApiResponseError = {
                            metaData: {
                                isError: true,
                                message: error.message,
                                statusCode: 500
                            },
                            result: null
                        }
    
                        return Promise.reject({
                            response: null,
                            error: errorResponse
                        });
                    } else {
                        return Promise.reject({
                            response: null,
                            error: error.response.data
                        });
                    }
                } else {

                    const errorResponse: ApiResponseError = {
                        metaData: {
                            isError: true,
                            message: error.message,
                            statusCode: 500
                        },
                        result: null
                    }

                    return Promise.reject({
                        response: null,
                        error: errorResponse
                    });
                }
            })
    }
}

export const editDriverAction = (driver: DriverEdit, id: number): ThunkResult<Promise<ApiResponse<DriverEditResult>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
         
        const data = new FormData();

        data.set('name', driver.nama);
        data.set('phoneNumber', driver.no_telepon)
        data.set('email', driver.email)
        data.set('dateOfBirth', driver.tanggal_lahir)
        data.set('identityNumber', driver.no_ktp)
        data.set('gender', driver.jenis_kelamin == 1 ? 'L' : 'P')
        data.set('address', driver.alamat)
        data.set('countryId', driver.negara.id.toString())
        data.set('provinceId', driver.provinsi.id.toString())
        data.set('districtId', driver.kabupaten_kota.id.toString())
        data.set('subDistrictId', driver.kecamatan.id.toString())
        data.set('villageId', driver.kelurahan.id.toString())
        data.set('rating', driver.rating.toString())
        data.set('vehicleTypeId', driver.tipe_kendaraan.id.toString())
        data.set('policeNumber', driver.no_polisi)
        data.set('stnkNumber', driver.no_stnk)
        data.set('chassisNumber', driver.no_rangka)
        data.set('subBrandVehicleId', driver.merek.id.toString())
        data.set('description', driver.keterangan)
        data.set('seat', driver.jumlah_seat.toString())
        data.set('color', driver.warna)

        if (driver.ktp_file) {
            data.append('ktpPhoto', driver.ktp_file);
        }

        if (driver.foto_profil) {
            data.append('photo', driver.foto_profil);
        }
        
        return axiosService.patch(`/v1/web/driver-profile/${id}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data' 
                }
            })
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<DriverEditResult> = response.data;
                
                return Promise.resolve({
                    response: data,
                    error: null
                });
            })
            .catch( (error: AxiosError) => {
                 if (error.response) {
                    if (error.response.status == 500) {
                        const errorResponse: ApiResponseError = {
                            metaData: {
                                isError: true,
                                message: error.message,
                                statusCode: 500
                            },
                            result: null
                        }
    
                        return Promise.reject({
                            response: null,
                            error: errorResponse
                        });
                    } else {
                        return Promise.reject({
                            response: null,
                            error: error.response.data
                        });
                    }
                } else {

                    const errorResponse: ApiResponseError = {
                        metaData: {
                            isError: true,
                            message: error.message,
                            statusCode: 500
                        },
                        result: null
                    }

                    return Promise.reject({
                        response: null,
                        error: errorResponse
                    });
                }
            })
    }
}


export const deleteDriverAction = (id: number): ThunkResult<Promise<ApiResponse<Driver>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.delete(`/v1/web/driver-profile/${id}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<Driver> = response.data;

                return Promise.resolve({
                    response: data,
                    error: null
                });
            })
            .catch( (error: AxiosError) => {
                 if (error.response) {
                    if (error.response.status == 500) {
                        const errorResponse: ApiResponseError = {
                            metaData: {
                                isError: true,
                                message: error.message,
                                statusCode: 500
                            },
                            result: null
                        }
    
                        return Promise.reject({
                            response: null,
                            error: errorResponse
                        });
                    } else {
                        return Promise.reject({
                            response: null,
                            error: error.response.data
                        });
                    }
                } else {

                    const errorResponse: ApiResponseError = {
                        metaData: {
                            isError: true,
                            message: error.message,
                            statusCode: 500
                        },
                        result: null
                    }

                    return Promise.reject({
                        response: null,
                        error: errorResponse
                    });
                }
            })
    }
}
