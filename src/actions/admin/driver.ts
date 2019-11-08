import axiosService from '../../services/axiosService';
import { Dispatch } from "redux";
import { Paginator } from '../../types/paginator';
import { AppState } from "../../store/configureStore";
import {
    Driver,
    SET_PAGINATOR_DRIVER,
    FETCH_DRIVER,
    SetPaginatorDriverActionType,
    FetchDriverActionType
} from '../../types/admin/driver';
import { AxiosResponse } from 'axios';

export const setPaginateAction = (paginate: Paginator): SetPaginatorDriverActionType => {
    return {
        type: SET_PAGINATOR_DRIVER,
        paginate: paginate
    }
}

export const fetchDriverAction = (list: Driver[]): FetchDriverActionType => {
    return {
        type: FETCH_DRIVER,
        list: list
    }
}

export const fetchDriverFromApiAction = (page: number) => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        
    }
}
