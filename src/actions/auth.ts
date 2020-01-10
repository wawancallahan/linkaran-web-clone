import {
    Login,
    ValidateLogin,
    LoginResponse,
    LoginResult,
    ValidateLoginResponse,
    ValidateLoginResult
} from '../types/auth';
import { Dispatch } from 'redux';
import { AppState } from '../store/configureStore';
import axiosService from '../services/axiosService';
import { ThunkResult } from '../types/thunk';
import * as dotenv from 'dotenv';
dotenv.config();

export const authLogin = (item: Login): ThunkResult<Promise<LoginResponse>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.post(process.env.REACT_APP_API_URL + '/v1/auth/login', item)
                .then(response => {
                    
                    const data: LoginResult = response.data;

                    if (data.metaData.isError) {
                        return Promise.reject({
                            status: false,
                            response: null,
                            message: data.metaData.message
                        });
                    }

                    return Promise.resolve({
                        status: false,
                        response: data,
                        message: data.metaData.message
                    });

                }).catch(error => {
                    return Promise.reject({
                        status: false,
                        response: null,
                        message: error
                    });
                });
    }
}

export const authValidate = (item: ValidateLogin): ThunkResult<Promise<ValidateLoginResponse>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.post(process.env.REACT_APP_API_URL + '/v1/auth/login/validate', item)
                        .then(response => {
                            const data: ValidateLoginResult = response.data;

                            if (data.metaData.isError) {
                                return Promise.reject({
                                    status: false,
                                    response: null,
                                    message: data.metaData.message
                                });
                            }

                            return Promise.resolve({
                                status: false,
                                response: data,
                                message: data.metaData.message
                            });
                        }).catch(error => {
                            return Promise.reject({
                                status: false,
                                response: null,
                                message: error
                            });
                        })
    }
}