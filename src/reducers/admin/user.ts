import {  
    FETCH_USER_ERROR,
    FETCH_USER_SUCCESS,
    UserList,
    UserActionTypes,
    FetchUserSuccessActionType,
    FetchUserErrorActionType,
    SetPaginatorUserActionType,
    SET_PAGINATOR_USER,
    AlertUserShowActionType,
    AlertUserHideActionType,
    ALERT_USER_HIDE,
    ALERT_USER_SHOW,
} from '../../types/admin/user';

import { Paginator } from '../../types/paginator';
import { Alert } from '../../types/alert';

export type State = {
    list: UserList[],
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

const alertHide = (state: State, action: AlertUserHideActionType) => {
    return {
        ...state,
        alert: {
            ...defaultState.alert
        }
    }
}

const alertShow = (state: State, action: AlertUserShowActionType) => {
    return {
        ...state,
        alert: {
            color: action.color,
            message: action.message,
            visible: true
        }
    }
}

const fetchSuccess = (state: State, action: FetchUserSuccessActionType) => {
    return {
        ...state,
        list: action.list,
        paginate: {
            ...defaultState.paginate
        }
    }
}

const fetchError = (state: State, action: FetchUserErrorActionType) => {
    return {
        ...defaultState
    }
}

const setPaginator = (state: State, action: SetPaginatorUserActionType) => {
    return {
        ...state,
        paginate: {
            ...action.paginate
        }
    }
}

const reducer = (state = defaultState, action: UserActionTypes) => {
    switch (action.type) {
        case SET_PAGINATOR_USER: return setPaginator(state, action);
        case FETCH_USER_SUCCESS: return fetchSuccess(state, action);
        case FETCH_USER_ERROR: return fetchError(state, action);
        case ALERT_USER_HIDE: return alertHide(state, action);
        case ALERT_USER_SHOW: return alertShow(state, action);
        default:
            return state;
    }
}

export default reducer;