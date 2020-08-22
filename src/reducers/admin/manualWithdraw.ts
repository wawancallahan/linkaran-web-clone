import {  
    FETCH_MANUAL_WITHDRAW_ERROR,
    FETCH_MANUAL_WITHDRAW_SUCCESS,
    ManualWithDrawList,
    ManualWithDrawActionTypes,
    FetchManualWithDrawSuccessActionType,
    FetchManualWithDrawErrorActionType,
    SetPaginatorManualWithDrawActionType,
    SET_PAGINATOR_MANUAL_WITHDRAW,
    AlertManualWithDrawShowActionType,
    AlertManualWithDrawHideActionType,
    ALERT_MANUAL_WITHDRAW_HIDE,
    ALERT_MANUAL_WITHDRAW_SHOW,
} from '../../types/admin/manualWithdraw';

import { Paginator } from '../../types/paginator';
import { Alert } from '../../types/alert';

export type State = {
    list: ManualWithDrawList[],
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

const alertHide = (state: State, action: AlertManualWithDrawHideActionType) => {
    return {
        ...state,
        alert: {
            ...defaultState.alert
        }
    }
}

const alertShow = (state: State, action: AlertManualWithDrawShowActionType) => {
    return {
        ...state,
        alert: {
            color: action.color,
            message: action.message,
            visible: true
        }
    }
}

const fetchSuccess = (state: State, action: FetchManualWithDrawSuccessActionType) => {
    return {
        ...state,
        list: action.list,
        paginate: {
            ...defaultState.paginate
        }
    }
}

const fetchError = (state: State, action: FetchManualWithDrawErrorActionType) => {
    return {
        ...defaultState
    }
}

const setPaginator = (state: State, action: SetPaginatorManualWithDrawActionType) => {
    return {
        ...state,
        paginate: {
            ...action.paginate
        }
    }
}

const reducer = (state = defaultState, action: ManualWithDrawActionTypes) => {
    switch (action.type) {
        case SET_PAGINATOR_MANUAL_WITHDRAW: return setPaginator(state, action);
        case FETCH_MANUAL_WITHDRAW_SUCCESS: return fetchSuccess(state, action);
        case FETCH_MANUAL_WITHDRAW_ERROR: return fetchError(state, action);
        case ALERT_MANUAL_WITHDRAW_HIDE: return alertHide(state, action);
        case ALERT_MANUAL_WITHDRAW_SHOW: return alertShow(state, action);
        default:
            return state;
    }
}

export default reducer;