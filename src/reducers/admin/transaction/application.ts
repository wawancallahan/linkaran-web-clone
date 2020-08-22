import {  
    FETCH_APPLICATION_ERROR,
    FETCH_APPLICATION_SUCCESS,
    ApplicationList,
    ApplicationActionTypes,
    FetchApplicationSuccessActionType,
    FetchApplicationErrorActionType,
    SetPaginatorApplicationActionType,
    SET_PAGINATOR_APPLICATION,
    AlertApplicationShowActionType,
    AlertApplicationHideActionType,
    ALERT_APPLICATION_HIDE,
    ALERT_APPLICATION_SHOW,
} from '../../../types/admin/transaction/application';

import { Paginator } from '../../../types/paginator';
import { Alert } from '../../../types/alert';

export type State = {
    list: ApplicationList[],
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
    }
}

const alertHide = (state: State, action: AlertApplicationHideActionType) => {
    return {
        ...state,
        alert: {
            ...defaultState.alert
        }
    }
}

const alertShow = (state: State, action: AlertApplicationShowActionType) => {
    return {
        ...state,
        alert: {
            color: action.color,
            message: action.message,
            visible: true
        }
    }
}

const fetchSuccess = (state: State, action: FetchApplicationSuccessActionType) => {
    return {
        ...state,
        list: action.list,
        paginate: {
            ...defaultState.paginate
        }
    }
}

const fetchError = (state: State, action: FetchApplicationErrorActionType) => {
    return {
        ...defaultState
    }
}

const setPaginator = (state: State, action: SetPaginatorApplicationActionType) => {
    return {
        ...state,
        paginate: {
            ...action.paginate
        }
    }
}

const reducer = (state = defaultState, action: ApplicationActionTypes) => {
    switch (action.type) {
        case SET_PAGINATOR_APPLICATION: return setPaginator(state, action);
        case FETCH_APPLICATION_SUCCESS: return fetchSuccess(state, action);
        case FETCH_APPLICATION_ERROR: return fetchError(state, action);
        case ALERT_APPLICATION_HIDE: return alertHide(state, action);
        case ALERT_APPLICATION_SHOW: return alertShow(state, action);
        default:
            return state;
    }
}

export default reducer;