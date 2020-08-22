import {  
    FETCH_ACCOUNT_LINK_PAY,
    FETCH_ACCOUNT_LINK_PAY_ERROR,
    FETCH_ACCOUNT_LINK_PAY_SUCCESS,
    AccountLinkPay,
    AccountLinkPayActionTypes,
    FetchAccountLinkPayActionType,
    FetchAccountLinkPaySuccessActionType,
    FetchAccountLinkPayErrorActionType,
    SetPaginatorAccountLinkPayActionType,
    SET_PAGINATOR_ACCOUNT_LINK_PAY,
    AlertAccountLinkPayShowActionType,
    AlertAccountLinkPayHideActionType,
    ALERT_ACCOUNT_LINK_PAY_HIDE,
    ALERT_ACCOUNT_LINK_PAY_SHOW
} from '../../../types/admin/account/linkPay';

import { Paginator } from '../../../types/paginator';
import { Alert } from '../../../types/alert';

export type State = {
    list: AccountLinkPay[],
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

const alertHide = (state: State, action: AlertAccountLinkPayHideActionType) => {
    return {
        ...state,
        alert: {
            ...defaultState.alert
        }
    }
}

const alertShow = (state: State, action: AlertAccountLinkPayShowActionType) => {
    return {
        ...state,
        alert: {
            color: action.color,
            message: action.message,
            visible: true
        }
    }
}

const fetchSuccess = (state: State, action: FetchAccountLinkPaySuccessActionType) => {
    return {
        ...state,
        list: action.list,
        paginate: {
            ...defaultState.paginate
        }
    }
}

const fetchError = (state: State, action: FetchAccountLinkPayErrorActionType) => {
    return {
        ...defaultState
    }
}

const setPaginator = (state: State, action: SetPaginatorAccountLinkPayActionType) => {
    return {
        ...state,
        paginate: {
            ...action.paginate
        }
    }
}

const reducer = (state = defaultState, action: AccountLinkPayActionTypes) => {
    switch (action.type) {
        case SET_PAGINATOR_ACCOUNT_LINK_PAY: return setPaginator(state, action);
        case FETCH_ACCOUNT_LINK_PAY_SUCCESS: return fetchSuccess(state, action);
        case FETCH_ACCOUNT_LINK_PAY_ERROR: return fetchError(state, action);
        case ALERT_ACCOUNT_LINK_PAY_HIDE: return alertHide(state, action);
        case ALERT_ACCOUNT_LINK_PAY_SHOW: return alertShow(state, action);
        default:
            return state;
    }
}

export default reducer;