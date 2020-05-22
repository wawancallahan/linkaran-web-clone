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
    SET_FILTER_DRIVER,
    Filter,
    SetFilterDriverActionType,
    ClearFilterDriverActionType,
    CLEAR_FILTER_DRIVER
} from '../../types/admin/driver';

import { Paginator } from '../../types/paginator';
import { Alert } from '../../types/alert';

type initialStateInterface = {
    list: DriverList[],
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
        address: '',
        email: '',
        name: '',
        phoneNumber: ''
    },
    filtered: false
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


const fetchSuccess = (state: initialStateInterface, action: FetchDriverSuccessActionType) => {
    return {
        ...state,
        list: action.list,
        paginate: {
            ...initialState.paginate
        }
    }
}

const fetchError = (state: initialStateInterface, action: FetchDriverErrorActionType) => {
    return {
        ...initialState
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

const setFilter = (state: initialStateInterface, action: SetFilterDriverActionType) => {
    return {
        ...state,
        filter: {
            ...action.filter
        },
        filtered: true
    }
}

const clearFilter = (state: initialStateInterface, action: ClearFilterDriverActionType) => {
    return {
        ...state,
        filter: {
            ...initialState.filter
        },
        filtered: false
    }
}

const reducer = (state = initialState, action: DriverActionTypes) => {
    switch (action.type) {
        case SET_PAGINATOR_DRIVER: return setPaginator(state, action);
        case FETCH_DRIVER: return fetch(state, action);
        case FETCH_DRIVER_SUCCESS: return fetchSuccess(state, action);
        case FETCH_DRIVER_ERROR: return fetchError(state, action);
        case ALERT_DRIVER_HIDE: return alertHide(state, action);
        case ALERT_DRIVER_SHOW: return alertShow(state, action);
        case SET_FILTER_DRIVER: return setFilter(state, action);
        case CLEAR_FILTER_DRIVER: return clearFilter(state, action);
        default:
            return state;
    }
}

export default reducer;