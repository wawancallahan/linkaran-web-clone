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
import * as dotenv from 'dotenv';
import { booleanToString } from '../../helpers/parseData';
dotenv.config();

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
        axiosService.get(process.env.REACT_APP_API_URL + `/web/driver-profile?page=${page}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccessList<Driver> = response.data;

                dispatch(setFetchDriverSuccessAction(data.result));

                if (data.metaData.paginate) {
                    const paginate = data.metaData.paginate as Paginator;

                    dispatch(setPaginateAction({
                        total: paginate.itemCount * paginate.pageCount,
                        currentPage: page,
                        itemCount: paginate.itemCount,
                        pageCount: paginate.pageCount
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

        data.set('user.name', driver.nama);
        data.set('user.phoneNumber', driver.no_telepon)
        data.set('user.email', driver.email)
        data.set('dateOfBirth', driver.tanggal_lahir)
        data.set('identityNumber', driver.no_ktp)
        data.set('gender', driver.jenis_kelamin == 1 ? 'L' : 'P')
        data.set('address', driver.alamat)
        data.set('country.id', driver.negara.id.toString())
        data.set('province.id', driver.provinsi.id.toString())
        data.set('district.id', driver.kabupaten_kota.id.toString())
        data.set('subDistrict.id', driver.kecamatan.id.toString())
        data.set('village.id', driver.kelurahan.id.toString())
        data.set('rating', driver.rating.toString())
        data.set('user.vehicle.vehicleType.id', driver.tipe_kendaraan.id.toString())
        data.set('user.vehicle.policeNumber', driver.no_polisi)
        data.set('user.vehicle.stnkNumber', driver.no_stnk)
        data.set('user.vehicle.chassisNumber', driver.no_rangka)
        data.set('user.vehicle.subBrandVehicle.id', driver.merek.id.toString())
        data.set('user.vehicle.description', driver.keterangan)
        // data.set('user.vehicle.seat', driver.jumlah_seat.toString())
        data.set('user.vehicle.color', driver.warna)
        data.set('wasOnceAnOnlineDriver', booleanToString(driver.wasOnceAnOnlineDriver))
        data.set('isActivelyBecomingAnotherOnlineDriver', booleanToString(driver.isActivelyBecomingAnotherOnlineDriver))
        data.set('isJoiningTheDriverCommunity', booleanToString(driver.isJoiningTheDriverCommunity))
        data.set('isJoiningLinkaranAsmainJob', booleanToString(driver.isJoiningLinkaranAsmainJob))
        data.set('choiceOfActiveWorkHourse', driver.choiceOfActiveWorkHours)

        if (driver.ktp_file) {
            data.append('ktpPhoto', driver.ktp_file);
        }

        if (driver.foto_profil) {
            data.append('photo', driver.foto_profil);
        }
        
        return axiosService.post('/api_linkaran/web/driver-profile', data, {
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
        return axiosService.get(process.env.REACT_APP_API_URL + `/web/driver-profile/${id}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<Driver> = response.data;

                return Promise.resolve({
                    response: data,
                    error: null
                });
            })
            .catch( (error: AxiosError) => {

                console.log(error.response)

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

        data.set('user.name', driver.nama);
        data.set('user.phoneNumber', driver.no_telepon)
        data.set('user.email', driver.email)
        data.set('dateOfBirth', driver.tanggal_lahir)
        data.set('identityNumber', driver.no_ktp)
        data.set('gender', driver.jenis_kelamin == 1 ? 'L' : 'P')
        data.set('address', driver.alamat)
        data.set('country.id', driver.negara.id.toString())
        data.set('province.id', driver.provinsi.id.toString())
        data.set('district.id', driver.kabupaten_kota.id.toString())
        data.set('subDistrict.id', driver.kecamatan.id.toString())
        data.set('village.id', driver.kelurahan.id.toString())
        data.set('rating', driver.rating.toString())
        data.set('user.vehicle.vehicleType.id', driver.tipe_kendaraan.id.toString())
        data.set('user.vehicle.policeNumber', driver.no_polisi)
        data.set('user.vehicle.stnkNumber', driver.no_stnk)
        data.set('user.vehicle.chassisNumber', driver.no_rangka)
        data.set('user.vehicle.subBrandVehicle.id', driver.merek.id.toString())
        data.set('user.vehicle.description', driver.keterangan)
        // data.set('user.vehicle.seat', driver.jumlah_seat.toString())
        data.set('user.vehicle.color', driver.warna)
        data.set('wasOnceAnOnlineDriver', booleanToString(driver.wasOnceAnOnlineDriver))
        data.set('isActivelyBecomingAnotherOnlineDriver', booleanToString(driver.isActivelyBecomingAnotherOnlineDriver))
        data.set('isJoiningTheDriverCommunity', booleanToString(driver.isJoiningTheDriverCommunity))
        data.set('isJoiningLinkaranAsmainJob', booleanToString(driver.isJoiningLinkaranAsmainJob))
        data.set('choiceOfActiveWorkHourse', driver.choiceOfActiveWorkHours)

        if (driver.ktp_file) {
            data.append('ktpPhoto', driver.ktp_file);
        }

        if (driver.foto_profil) {
            data.append('photo', driver.foto_profil);
        }
        return axiosService.patch(process.env.REACT_APP_API_URL + `/web/driver-profile/${id}`, data, {
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
        return axiosService.delete(process.env.REACT_APP_API_URL + `/web/driver-profile/${id}`)
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
