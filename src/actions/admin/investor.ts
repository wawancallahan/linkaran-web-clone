import axiosService from '../../services/axiosService';
import { Dispatch } from "redux";
import { Paginator } from '../../types/paginator';
import { AppState } from "../../store/configureStore";
import {
    Investor,
    SET_PAGINATOR_INVESTOR,
    FETCH_INVESTOR,
    FETCH_INVESTOR_ERROR,
    FETCH_INVESTOR_SUCCESS,
    SetPaginatorInvestorActionType,
    FetchInvestorActionType,
    AlertInvestorHideActionType,
    ALERT_INVESTOR_HIDE,
    AlertInvestorShowActionType,
    ALERT_INVESTOR_SHOW,
    InvestorCreate,
    InvestorCreateResult,
    InvestorEdit,
    InvestorEditResult,
    FetchInvestorErrorActionType,
    FetchInvestorSuccessActionType
} from '../../types/admin/investor';
import { AxiosResponse, AxiosError } from 'axios';
import { ApiResponse, ApiResponseList, ApiResponseError, ApiResponseSuccess, ApiResponseSuccessList } from '../../types/api';
import { ThunkResult } from '../../types/thunk';
import * as dotenv from 'dotenv';
dotenv.config();

export const setPaginateAction = (paginate: Paginator): SetPaginatorInvestorActionType => {
    return {
        type: SET_PAGINATOR_INVESTOR,
        paginate: paginate
    }
}

export const setFetchInvestorAction = (list: Investor[]): FetchInvestorActionType => {
    return {
        type: FETCH_INVESTOR,
        list: list
    }
}

export const setFetchInvestorSuccessAction = (list: Investor[]): FetchInvestorSuccessActionType => {
    return {
        type: FETCH_INVESTOR_SUCCESS,
        list: list
    }
}

export const setFetchInvestorErrorAction = (): FetchInvestorErrorActionType => {
    return {
        type: FETCH_INVESTOR_ERROR
    }
}

export const setAlertInvestorHideAction = (): AlertInvestorHideActionType => {
    return {
        type: ALERT_INVESTOR_HIDE
    }
}

export const setAlertInvestorShowAction = (message: string, color: string): AlertInvestorShowActionType => {
    return {
        type: ALERT_INVESTOR_SHOW,
        color: color,
        message: message
    };
}

export const fetchInvestorApiAction = (page: number) => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        axiosService.get(process.env.REACT_APP_API_URL + `/v1/web/investor-profile?page=${page}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccessList<Investor> = response.data;

                dispatch(setFetchInvestorSuccessAction(data.result));

                if (data.metaData.paginate) {
                    const paginate = data.metaData.paginate as Paginator;

                    dispatch(setPaginateAction({
                        total: paginate.total,
                        currentPage: paginate.currentPage,
                        itemCount: paginate.itemCount,
                        pageCount: paginate.pageCount
                    }))
                }
            })
            .catch( (error: AxiosError) => {
                dispatch(setFetchInvestorErrorAction());

                dispatch(setPaginateAction({
                    total: 0,
                    currentPage: 0,
                    itemCount: 0,
                    pageCount: 0
                }))
            })
    }
}

export const createInvestorAction = (investor: InvestorCreate): ThunkResult<Promise<ApiResponse<InvestorCreateResult>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        
        const data = new FormData();

        data.set('name', investor.nama);
        data.set('phoneNumber', investor.no_telepon)
        data.set('email', investor.email)
        data.set('dateOfBirth', investor.tanggal_lahir)
        data.set('identityNumber', investor.no_ktp)
        data.set('gender', investor.jenis_kelamin)
        data.set('address', investor.alamat)
        data.set('countryId', investor.negara.id.toString())
        data.set('provinceId', investor.provinsi.id.toString())
        data.set('districtId', investor.kabupaten_kota.id.toString())
        data.set('subDistrictId', investor.kecamatan.id.toString())
        data.set('villageId', investor.kelurahan.id.toString())
        data.set('neighboorhoodAssociationNumber', investor.nomor_asosiasi_lingkungan);
        data.set('citizensAssociationNumber', investor.nomor_asosiasi_warga_negara);

        if (investor.ktp_file) {
            data.append('ktpPhoto', investor.ktp_file);
        }

        if (investor.foto_profil) {
            data.append('photo', investor.foto_profil);
        }
        
        return axiosService.post('/api_linkaran/v1/web/investor-profile', data, {
                headers: {
                    'Content-Type': 'multipart/form-data' 
                }
            })
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<InvestorCreateResult> = response.data;
                
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

export const findInvestorAction = (id: number): ThunkResult<Promise<ApiResponse<Investor>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.get(process.env.REACT_APP_API_URL + `/v1/web/investor-profile/${id}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<Investor> = response.data;

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

export const editInvestorAction = (investor: InvestorEdit, id: number): ThunkResult<Promise<ApiResponse<InvestorEditResult>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
         
        const data = new FormData();

        data.set('name', investor.nama);
        data.set('phoneNumber', investor.no_telepon)
        data.set('email', investor.email)
        data.set('dateOfBirth', investor.tanggal_lahir)
        data.set('identityNumber', investor.no_ktp)
        data.set('gender', investor.jenis_kelamin)
        data.set('address', investor.alamat)
        data.set('countryId', investor.negara.id.toString())
        data.set('provinceId', investor.provinsi.id.toString())
        data.set('districtId', investor.kabupaten_kota.id.toString())
        data.set('subDistrictId', investor.kecamatan.id.toString())
        data.set('villageId', investor.kelurahan.id.toString())
        data.set('neighboorhoodAssociationNumber', investor.nomor_asosiasi_lingkungan);
        data.set('citizensAssociationNumber', investor.nomor_asosiasi_warga_negara);

        if (investor.ktp_file) {
            data.append('ktpPhoto', investor.ktp_file);
        }

        if (investor.foto_profil) {
            data.append('photo', investor.foto_profil);
        }
        
        return axiosService.patch(process.env.REACT_APP_API_URL + `/v1/web/investor-profile/${id}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data' 
                }
            })
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<InvestorEditResult> = response.data;
                
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


export const deleteInvestorAction = (id: number): ThunkResult<Promise<ApiResponse<Investor>>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.delete(process.env.REACT_APP_API_URL + `/v1/web/investor-profile/${id}`)
            .then( (response: AxiosResponse) => {
                const data: ApiResponseSuccess<Investor> = response.data;

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
