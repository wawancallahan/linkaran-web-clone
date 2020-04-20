import {  
    FETCH_PROVINCE,
    FETCH_PROVINCE_ERROR,
    FETCH_PROVINCE_SUCCESS,
    ProvinceList,
    ProvinceActionTypes,
    FetchProvinceActionType,
    FetchProvinceSuccessActionType,
    FetchProvinceErrorActionType,
    SetPaginatorProvinceActionType,
    SET_PAGINATOR_PROVINCE,
    AlertProvinceShowActionType,
    AlertProvinceHideActionType,
    ALERT_PROVINCE_HIDE,
    ALERT_PROVINCE_SHOW,
    SET_FILTER_PROVINCE,
    Filter,
    SetFilterProvinceActionType,
    ClearFilterProvinceActionType,
    CLEAR_FILTER_PROVINCE
} from '../../../types/admin/region/province';

import { Paginator } from '../../../types/paginator';
import { Alert } from '../../../types/alert';

interface initialStateInterface {
    list: ProvinceList[],
    paginate: Paginator,
    alert: Alert,
    filter: Filter,
    filtered: boolean
};

const initialState: initialStateInterface = {
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
    filter: {
        name: '',
        countryName: ''
    },
    filtered: false
}

const alertHide = (state: initialStateInterface, action: AlertProvinceHideActionType) => {
    return {
        ...state,
        alert: {
            ...initialState.alert
        }
    }
}

const alertShow = (state: initialStateInterface, action: AlertProvinceShowActionType) => {
    return {
        ...state,
        alert: {
            color: action.color,
            message: action.message,
            visible: true
        }
    }
}

const fetchSuccess = (state: initialStateInterface, action: FetchProvinceSuccessActionType) => {
    return {
        ...state,
        list: action.list,
        paginate: {
            ...initialState.paginate
        }
    }
}

const fetchError = (state: initialStateInterface, action: FetchProvinceErrorActionType) => {
    return {
        ...initialState
    }
}

const setPaginator = (state: initialStateInterface, action: SetPaginatorProvinceActionType) => {
    return {
        ...state,
        paginate: {
            ...action.paginate
        }
    }
}

const setFilter = (state: initialStateInterface, action: SetFilterProvinceActionType) => {
    return {
        ...state,
        filter: {
            ...action.filter
        },
        filtered: true
    }
}

const clearFilter = (state: initialStateInterface, action: ClearFilterProvinceActionType) => {
    return {
        ...state,
        filter: {
            ...initialState.filter
        },
        filtered: false
    }
}

const reducer = (state = initialState, action: ProvinceActionTypes) => {
    switch (action.type) {
        case SET_PAGINATOR_PROVINCE: return setPaginator(state, action);
        case FETCH_PROVINCE_SUCCESS: return fetchSuccess(state, action);
        case FETCH_PROVINCE_ERROR: return fetchError(state, action);
        case ALERT_PROVINCE_HIDE: return alertHide(state, action);
        case ALERT_PROVINCE_SHOW: return alertShow(state, action);
        case SET_FILTER_PROVINCE: return setFilter(state, action);
        case CLEAR_FILTER_PROVINCE: return clearFilter(state, action);
        default:
            return state;
    }
}

export default reducer;