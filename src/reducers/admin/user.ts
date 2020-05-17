import {  
    FETCH_USER,
    FETCH_USER_ERROR,
    FETCH_USER_SUCCESS,
    UserList,
    UserActionTypes,
    FetchUserActionType,
    FetchUserSuccessActionType,
    FetchUserErrorActionType,
    SetPaginatorUserActionType,
    SET_PAGINATOR_USER,
    AlertUserShowActionType,
    AlertUserHideActionType,
    ALERT_USER_HIDE,
    ALERT_USER_SHOW,
    SET_FILTER_USER,
    Filter,
    SetFilterUserActionType,
    ClearFilterUserActionType,
    CLEAR_FILTER_USER
} from '../../types/admin/user';

import { Paginator } from '../../types/paginator';
import { Alert } from '../../types/alert';

interface initialStateInterface {
    list: UserList[],
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
        name: ''
    },
    filtered: false
}

const alertHide = (state: initialStateInterface, action: AlertUserHideActionType) => {
    return {
        ...state,
        alert: {
            ...initialState.alert
        }
    }
}

const alertShow = (state: initialStateInterface, action: AlertUserShowActionType) => {
    return {
        ...state,
        alert: {
            color: action.color,
            message: action.message,
            visible: true
        }
    }
}

const fetchSuccess = (state: initialStateInterface, action: FetchUserSuccessActionType) => {
    return {
        ...state,
        list: action.list,
        paginate: {
            ...initialState.paginate
        }
    }
}

const fetchError = (state: initialStateInterface, action: FetchUserErrorActionType) => {
    return {
        ...initialState
    }
}

const setPaginator = (state: initialStateInterface, action: SetPaginatorUserActionType) => {
    return {
        ...state,
        paginate: {
            ...action.paginate
        }
    }
}

const setFilter = (state: initialStateInterface, action: SetFilterUserActionType) => {
    return {
        ...state,
        filter: {
            ...action.filter
        },
        filtered: true
    }
}

const clearFilter = (state: initialStateInterface, action: ClearFilterUserActionType) => {
    return {
        ...state,
        filter: {
            ...initialState.filter
        },
        filtered: false
    }
}

const reducer = (state = initialState, action: UserActionTypes) => {
    switch (action.type) {
        case SET_PAGINATOR_USER: return setPaginator(state, action);
        case FETCH_USER_SUCCESS: return fetchSuccess(state, action);
        case FETCH_USER_ERROR: return fetchError(state, action);
        case ALERT_USER_HIDE: return alertHide(state, action);
        case ALERT_USER_SHOW: return alertShow(state, action);
        case SET_FILTER_USER: return setFilter(state, action);
        case CLEAR_FILTER_USER: return clearFilter(state, action);
        default:
            return state;
    }
}

export default reducer;