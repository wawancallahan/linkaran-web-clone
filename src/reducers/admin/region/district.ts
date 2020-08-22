import {  
    FETCH_DISTRICT_ERROR,
    FETCH_DISTRICT_SUCCESS,
    DistrictList,
    DistrictActionTypes,
    FetchDistrictSuccessActionType,
    FetchDistrictErrorActionType,
    SetPaginatorDistrictActionType,
    SET_PAGINATOR_DISTRICT,
    AlertDistrictShowActionType,
    AlertDistrictHideActionType,
    ALERT_DISTRICT_HIDE,
    ALERT_DISTRICT_SHOW,
} from '../../../types/admin/region/district';

import { Paginator } from '../../../types/paginator';
import { Alert } from '../../../types/alert';

export type State = {
    list: DistrictList[],
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

const alertHide = (state: State, action: AlertDistrictHideActionType) => {
    return {
        ...state,
        alert: {
            ...defaultState.alert
        }
    }
}

const alertShow = (state: State, action: AlertDistrictShowActionType) => {
    return {
        ...state,
        alert: {
            color: action.color,
            message: action.message,
            visible: true
        }
    }
}

const fetchSuccess = (state: State, action: FetchDistrictSuccessActionType) => {
    return {
        ...state,
        list: action.list,
        paginate: {
            ...defaultState.paginate
        }
    }
}

const fetchError = (state: State, action: FetchDistrictErrorActionType) => {
    return {
        ...defaultState
    }
}

const setPaginator = (state: State, action: SetPaginatorDistrictActionType) => {
    return {
        ...state,
        paginate: {
            ...action.paginate
        }
    }
}

const reducer = (state = defaultState, action: DistrictActionTypes) => {
    switch (action.type) {
        case SET_PAGINATOR_DISTRICT: return setPaginator(state, action);
        case FETCH_DISTRICT_SUCCESS: return fetchSuccess(state, action);
        case FETCH_DISTRICT_ERROR: return fetchError(state, action);
        case ALERT_DISTRICT_HIDE: return alertHide(state, action);
        case ALERT_DISTRICT_SHOW: return alertShow(state, action);
        default:
            return state;
    }
}

export default reducer;