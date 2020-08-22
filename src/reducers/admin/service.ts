import {  
    FETCH_SERVICE_ERROR,
    FETCH_SERVICE_SUCCESS,
    ServiceList,
    ServiceActionTypes,
    FetchServiceSuccessActionType,
    FetchServiceErrorActionType,
    SetPaginatorServiceActionType,
    SET_PAGINATOR_SERVICE,
    AlertServiceShowActionType,
    AlertServiceHideActionType,
    ALERT_SERVICE_HIDE,
    ALERT_SERVICE_SHOW,
} from '../../types/admin/service';

import { Paginator } from '../../types/paginator';
import { Alert } from '../../types/alert';

export type State = {
    list: ServiceList[],
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

const alertHide = (state: State, action: AlertServiceHideActionType) => {
    return {
        ...state,
        alert: {
            ...defaultState.alert
        }
    }
}

const alertShow = (state: State, action: AlertServiceShowActionType) => {
    return {
        ...state,
        alert: {
            color: action.color,
            message: action.message,
            visible: true
        }
    }
}

const fetchSuccess = (state: State, action: FetchServiceSuccessActionType) => {
    return {
        ...state,
        list: action.list,
        paginate: {
            ...defaultState.paginate
        }
    }
}

const fetchError = (state: State, action: FetchServiceErrorActionType) => {
    return {
        ...defaultState
    }
}

const setPaginator = (state: State, action: SetPaginatorServiceActionType) => {
    return {
        ...state,
        paginate: {
            ...action.paginate
        }
    }
}

const reducer = (state = defaultState, action: ServiceActionTypes) => {
    switch (action.type) {
        case SET_PAGINATOR_SERVICE: return setPaginator(state, action);
        case FETCH_SERVICE_SUCCESS: return fetchSuccess(state, action);
        case FETCH_SERVICE_ERROR: return fetchError(state, action);
        case ALERT_SERVICE_HIDE: return alertHide(state, action);
        case ALERT_SERVICE_SHOW: return alertShow(state, action);
        default:
            return state;
    }
}

export default reducer;