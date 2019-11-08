import {  
    FETCH_DRIVER,
    Driver,
    DriverActionTypes,
    FetchDriverActionType,
    SetPaginatorDriverActionType,
    SET_PAGINATOR_DRIVER,
    AlertDriverShowActionType,
    AlertDriverHideActionType,
    ALERT_DRIVER_HIDE,
    ALERT_DRIVER_SHOW
} from '../../types/admin/driver';

import { Paginator } from '../../types/paginator';
import { Alert } from '../../types/alert';

interface initialStateInterface {
    list: Driver[],
    paginate: Paginator,
    alert: Alert
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
    }
}

const alertHide = (state: initialStateInterface, action: AlertDriverHideActionType) => {
    return {
        ...state,
        alert: {
            ...initialState.alert
        }
    }
}

const alertShow = (state: initialStateInterface, action: AlertDriverShowActionType) => {
    return {
        ...state,
        alert: {
            color: action.color,
            message: action.message,
            visible: true
        }
    }
}

const fetch = (state: initialStateInterface, action: FetchDriverActionType) => {
    return {
        ...state,
        list: action.list
    }
}

const setPaginator = (state: initialStateInterface, action: SetPaginatorDriverActionType) => {
    return {
        ...state,
        paginate: {
            ...state.paginate,
            ...action.paginate
        }
    }
}

const reducer = (state = initialState, action: DriverActionTypes) => {
    switch (action.type) {
        case SET_PAGINATOR_DRIVER: return setPaginator(state, action);
        case FETCH_DRIVER: return fetch(state, action);
        case ALERT_DRIVER_HIDE: return alertHide(state, action);
        case ALERT_DRIVER_SHOW: return alertShow(state, action);
        default:
            return state;
    }
}

export default reducer;