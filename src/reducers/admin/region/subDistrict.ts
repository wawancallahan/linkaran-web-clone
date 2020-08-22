import {  
    FETCH_SUB_DISTRICT_ERROR,
    FETCH_SUB_DISTRICT_SUCCESS,
    SubDistrictList,
    SubDistrictActionTypes,
    FetchSubDistrictSuccessActionType,
    FetchSubDistrictErrorActionType,
    SetPaginatorSubDistrictActionType,
    SET_PAGINATOR_SUB_DISTRICT,
    AlertSubDistrictShowActionType,
    AlertSubDistrictHideActionType,
    ALERT_SUB_DISTRICT_HIDE,
    ALERT_SUB_DISTRICT_SHOW,
} from '../../../types/admin/region/subDistrict';

import { Paginator } from '../../../types/paginator';
import { Alert } from '../../../types/alert';

export type State = {
    list: SubDistrictList[],
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

const alertHide = (state: State, action: AlertSubDistrictHideActionType) => {
    return {
        ...state,
        alert: {
            ...defaultState.alert
        }
    }
}

const alertShow = (state: State, action: AlertSubDistrictShowActionType) => {
    return {
        ...state,
        alert: {
            color: action.color,
            message: action.message,
            visible: true
        }
    }
}

const fetchSuccess = (state: State, action: FetchSubDistrictSuccessActionType) => {
    return {
        ...state,
        list: action.list,
        paginate: {
            ...defaultState.paginate
        }
    }
}

const fetchError = (state: State, action: FetchSubDistrictErrorActionType) => {
    return {
        ...defaultState
    }
}

const setPaginator = (state: State, action: SetPaginatorSubDistrictActionType) => {
    return {
        ...state,
        paginate: {
            ...action.paginate
        }
    }
}

const reducer = (state = defaultState, action: SubDistrictActionTypes) => {
    switch (action.type) {
        case SET_PAGINATOR_SUB_DISTRICT: return setPaginator(state, action);
        case FETCH_SUB_DISTRICT_SUCCESS: return fetchSuccess(state, action);
        case FETCH_SUB_DISTRICT_ERROR: return fetchError(state, action);
        case ALERT_SUB_DISTRICT_HIDE: return alertHide(state, action);
        case ALERT_SUB_DISTRICT_SHOW: return alertShow(state, action);
        default:
            return state;
    }
}

export default reducer;