import {  
    FETCH_WITHDRAW_ERROR,
    FETCH_WITHDRAW_SUCCESS,
    WithDrawList,
    WithDrawActionTypes,
    FetchWithDrawSuccessActionType,
    FetchWithDrawErrorActionType,
    SetPaginatorWithDrawActionType,
    SET_PAGINATOR_WITHDRAW,
    AlertWithDrawShowActionType,
    AlertWithDrawHideActionType,
    ALERT_WITHDRAW_HIDE,
    ALERT_WITHDRAW_SHOW,
} from '../../types/financialManager/withdraw';

import { Paginator } from '../../types/paginator';
import { Alert } from '../../types/alert';

type initialStateInterface = {
    list: WithDrawList[],
    paginate: Paginator,
    alert: Alert,
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
}

const alertHide = (state: initialStateInterface, action: AlertWithDrawHideActionType) => {
    return {
        ...state,
        alert: {
            ...initialState.alert
        }
    }
}

const alertShow = (state: initialStateInterface, action: AlertWithDrawShowActionType) => {
    return {
        ...state,
        alert: {
            color: action.color,
            message: action.message,
            visible: true
        }
    }
}

const fetchSuccess = (state: initialStateInterface, action: FetchWithDrawSuccessActionType) => {
    return {
        ...state,
        list: action.list,
        paginate: {
            ...initialState.paginate
        }
    }
}

const fetchError = (state: initialStateInterface, action: FetchWithDrawErrorActionType) => {
    return {
        ...initialState
    }
}

const setPaginator = (state: initialStateInterface, action: SetPaginatorWithDrawActionType) => {
    return {
        ...state,
        paginate: {
            ...action.paginate
        }
    }
}

const reducer = (state = initialState, action: WithDrawActionTypes) => {
    switch (action.type) {
        case SET_PAGINATOR_WITHDRAW: return setPaginator(state, action);
        case FETCH_WITHDRAW_SUCCESS: return fetchSuccess(state, action);
        case FETCH_WITHDRAW_ERROR: return fetchError(state, action);
        case ALERT_WITHDRAW_HIDE: return alertHide(state, action);
        case ALERT_WITHDRAW_SHOW: return alertShow(state, action);
        default:
            return state;
    }
}

export default reducer;