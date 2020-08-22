import {  
    FETCH_DRIVER,
    DriverList,
    DriverActionTypes,
    FetchDriverActionType,
    SetPaginatorDriverActionType,
    SET_PAGINATOR_DRIVER,
    AlertDriverShowActionType,
    AlertDriverHideActionType,
    ALERT_DRIVER_HIDE,
    ALERT_DRIVER_SHOW,
    FETCH_DRIVER_SUCCESS,
    FETCH_DRIVER_ERROR,
    FetchDriverErrorActionType,
    FetchDriverSuccessActionType,
} from '../../types/admin/driver';

import { Paginator } from '../../types/paginator';
import { Alert } from '../../types/alert';

export type State = {
    list: DriverList[],
    paginate: Paginator,
    alert: Alert
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
    }
}

const alertHide = (state: State, action: AlertDriverHideActionType) => {
    return {
        ...state,
        alert: {
            ...defaultState.alert
        }
    }
}

const alertShow = (state: State, action: AlertDriverShowActionType) => {
    return {
        ...state,
        alert: {
            color: action.color,
            message: action.message,
            visible: true
        }
    }
}

const fetch = (state: State, action: FetchDriverActionType) => {
    return {
        ...state,
        list: action.list
    }
}


const fetchSuccess = (state: State, action: FetchDriverSuccessActionType) => {
    return {
        ...state,
        list: action.list,
        paginate: {
            ...defaultState.paginate
        }
    }
}

const fetchError = (state: State, action: FetchDriverErrorActionType) => {
    return {
        ...defaultState
    }
}

const setPaginator = (state: State, action: SetPaginatorDriverActionType) => {
    return {
        ...state,
        paginate: {
            ...state.paginate,
            ...action.paginate
        }
    }
}

const reducer = (state = defaultState, action: DriverActionTypes) => {
    switch (action.type) {
        case SET_PAGINATOR_DRIVER: return setPaginator(state, action);
        case FETCH_DRIVER: return fetch(state, action);
        case FETCH_DRIVER_SUCCESS: return fetchSuccess(state, action);
        case FETCH_DRIVER_ERROR: return fetchError(state, action);
        case ALERT_DRIVER_HIDE: return alertHide(state, action);
        case ALERT_DRIVER_SHOW: return alertShow(state, action);
        default:
            return state;
    }
}

export default reducer;