import {  
    FETCH_PROVINCE_ERROR,
    FETCH_PROVINCE_SUCCESS,
    ProvinceList,
    ProvinceActionTypes,
    FetchProvinceSuccessActionType,
    FetchProvinceErrorActionType,
    SetPaginatorProvinceActionType,
    SET_PAGINATOR_PROVINCE,
    AlertProvinceShowActionType,
    AlertProvinceHideActionType,
    ALERT_PROVINCE_HIDE,
    ALERT_PROVINCE_SHOW,
} from '../../../types/admin/region/province';

import { Paginator } from '../../../types/paginator';
import { Alert } from '../../../types/alert';

export type State = {
    list: ProvinceList[],
    paginate: Paginator,
    alert: Alert,
};

const defaultState: State = {
    list: [],
    paginate: {
        total: 0,
        currentPage: 0,
        itemCount: 0,
        pageCount: 0
    },
    alert: {
        message: '',
        color: '',
        visible: false
    },
}

const alertHide = (state: State, action: AlertProvinceHideActionType) => {
    return {
        ...state,
        alert: {
            ...defaultState.alert
        }
    }
}

const alertShow = (state: State, action: AlertProvinceShowActionType) => {
    return {
        ...state,
        alert: {
            color: action.color,
            message: action.message,
            visible: true
        }
    }
}

const fetchSuccess = (state: State, action: FetchProvinceSuccessActionType) => {
    return {
        ...state,
        list: action.list,
        paginate: {
            ...defaultState.paginate
        }
    }
}

const fetchError = (state: State, action: FetchProvinceErrorActionType) => {
    return {
        ...defaultState
    }
}

const setPaginator = (state: State, action: SetPaginatorProvinceActionType) => {
    return {
        ...state,
        paginate: {
            ...action.paginate
        }
    }
}

const reducer = (state = defaultState, action: ProvinceActionTypes) => {
    switch (action.type) {
        case SET_PAGINATOR_PROVINCE: return setPaginator(state, action);
        case FETCH_PROVINCE_SUCCESS: return fetchSuccess(state, action);
        case FETCH_PROVINCE_ERROR: return fetchError(state, action);
        case ALERT_PROVINCE_HIDE: return alertHide(state, action);
        case ALERT_PROVINCE_SHOW: return alertShow(state, action);
        default:
            return state;
    }
}

export default reducer;