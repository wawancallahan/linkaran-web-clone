import axiosService from '../../services/axiosService';
import { Dispatch } from "redux";
import { Paginator } from '../../types/paginator';
import { AppState } from "../../store/configureStore";
import {
    User,
    SET_PAGINATOR_USER,
    FETCH_USER,
    SetPaginatorUserActionType,
    FetchUserActionType
} from '../../types/admin/user';
import { AxiosResponse } from 'axios';

export const setPaginateAction = (paginate: Paginator): SetPaginatorUserActionType => {
    return {
        type: SET_PAGINATOR_USER,
        paginate: paginate
    }
}

export const fetchUserAction = (list: User[]): FetchUserActionType => {
    return {
        type: FETCH_USER,
        list: list
    }
}

export const fetchUserFromApiAction = (page: number) => {
    return (dispatch: Dispatch, getState: () => AppState) => {
        
    }
}
