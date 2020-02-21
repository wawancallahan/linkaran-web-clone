import {
    Login,
    ValidateLogin,
    LoginResponse,
    LoginResult,
    LoginFailResult,
    ValidateLoginResponse,
    ValidateLoginResult,
    ValidateLoginFailResult
} from '../types/auth';
import { Dispatch } from 'redux';
import { AppState } from '../store/configureStore';
import axiosService from '../services/axiosService';
import { ThunkResult } from '../types/thunk';
import * as dotenv from 'dotenv';
dotenv.config();

export const authLogin = (item: Login): ThunkResult<Promise<LoginResponse>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.post(process.env.REACT_APP_API_URL + '/auth/login', item)
                .then(response => {
                    
                    const data: LoginResult = response.data;

                    if (data.metaData.isError) {
                        
                        const dataFail: LoginFailResult = response.data;

                        return Promise.reject({
                            status: false,
                            response: dataFail,
                            message: dataFail.metaData.message
                        });
                    }

                    return Promise.resolve({
                        status: true,
                        response: data,
                        message: data.metaData.message
                    });

                }).catch(error => {

                    const data: LoginFailResult = error.response.data;

                    return Promise.reject({
                        status: false,
                        response: data,
                        message: data.metaData.message
                    });
                });
    }
}

export const authValidate = (item: ValidateLogin): ThunkResult<Promise<ValidateLoginResponse>> => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        return axiosService.post(process.env.REACT_APP_API_URL + '/auth/login/validate', item)
                        .then(response => {
                            const data: ValidateLoginResult = response.data;

                            if (data.metaData.isError) {

                                const dataFail: ValidateLoginFailResult = response.data;

                                return Promise.reject({
                                    status: false,
                                    response: dataFail,
                                    message: dataFail.metaData.message
                                });
                            }

                            return Promise.resolve({
                                status: true,
                                response: data,
                                message: data.metaData.message
                            });
                        }).catch(error => {
                            const data: ValidateLoginFailResult = error.response.data;
                            
                            return Promise.reject({
                                status: false,
                                response: data,
                                message: data.metaData.message
                            });
                        })
    }
}