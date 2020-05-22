import {  
    FETCH_SUB_DISTRICT,
    FETCH_SUB_DISTRICT_ERROR,
    FETCH_SUB_DISTRICT_SUCCESS,
    SubDistrictList,
    SubDistrictActionTypes,
    FetchSubDistrictActionType,
    FetchSubDistrictSuccessActionType,
    FetchSubDistrictErrorActionType,
    SetPaginatorSubDistrictActionType,
    SET_PAGINATOR_SUB_DISTRICT,
    AlertSubDistrictShowActionType,
    AlertSubDistrictHideActionType,
    ALERT_SUB_DISTRICT_HIDE,
    ALERT_SUB_DISTRICT_SHOW,
    SET_FILTER_SUB_DISTRICT,
    Filter,
    SetFilterSubDistrictActionType,
    ClearFilterSubDistrictActionType,
    CLEAR_FILTER_SUB_DISTRICT
} from '../../../types/admin/region/subDistrict';

import { Paginator } from '../../../types/paginator';
import { Alert } from '../../../types/alert';

type initialStateInterface = {
    list: SubDistrictList[],
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
        districtName: ''
    },
    filtered: false
}

const alertHide = (state: initialStateInterface, action: AlertSubDistrictHideActionType) => {
    return {
        ...state,
        alert: {
            ...initialState.alert
        }
    }
}

const alertShow = (state: initialStateInterface, action: AlertSubDistrictShowActionType) => {
    return {
        ...state,
        alert: {
            color: action.color,
            message: action.message,
            visible: true
        }
    }
}

const fetchSuccess = (state: initialStateInterface, action: FetchSubDistrictSuccessActionType) => {
    return {
        ...state,
        list: action.list,
        paginate: {
            ...initialState.paginate
        }
    }
}

const fetchError = (state: initialStateInterface, action: FetchSubDistrictErrorActionType) => {
    return {
        ...initialState
    }
}

const setPaginator = (state: initialStateInterface, action: SetPaginatorSubDistrictActionType) => {
    return {
        ...state,
        paginate: {
            ...action.paginate
        }
    }
}

const setFilter = (state: initialStateInterface, action: SetFilterSubDistrictActionType) => {
    return {
        ...state,
        filter: {
            ...action.filter
        },
        filtered: true
    }
}

const clearFilter = (state: initialStateInterface, action: ClearFilterSubDistrictActionType) => {
    return {
        ...state,
        filter: {
            ...initialState.filter
        },
        filtered: false
    }
}

const reducer = (state = initialState, action: SubDistrictActionTypes) => {
    switch (action.type) {
        case SET_PAGINATOR_SUB_DISTRICT: return setPaginator(state, action);
        case FETCH_SUB_DISTRICT_SUCCESS: return fetchSuccess(state, action);
        case FETCH_SUB_DISTRICT_ERROR: return fetchError(state, action);
        case ALERT_SUB_DISTRICT_HIDE: return alertHide(state, action);
        case ALERT_SUB_DISTRICT_SHOW: return alertShow(state, action);
        case SET_FILTER_SUB_DISTRICT: return setFilter(state, action);
        case CLEAR_FILTER_SUB_DISTRICT: return clearFilter(state, action);
        default:
            return state;
    }
}

export default reducer;