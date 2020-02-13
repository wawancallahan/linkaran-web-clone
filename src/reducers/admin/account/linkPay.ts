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

interface initialStateInterface {
    list: AccountLinkPay[],
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

const alertHide = (state: initialStateInterface, action: AlertAccountLinkPayHideActionType) => {
    return {
        ...state,
        alert: {
            ...initialState.alert
        }
    }
}

const alertShow = (state: initialStateInterface, action: AlertAccountLinkPayShowActionType) => {
    return {
        ...state,
        alert: {
            color: action.color,
            message: action.message,
            visible: true
        }
    }
}

const fetchSuccess = (state: initialStateInterface, action: FetchAccountLinkPaySuccessActionType) => {
    return {
        ...state,
        list: action.list,
        paginate: {
            ...initialState.paginate
        }
    }
}

const fetchError = (state: initialStateInterface, action: FetchAccountLinkPayErrorActionType) => {
    return {
        ...initialState
    }
}

const setPaginator = (state: initialStateInterface, action: SetPaginatorAccountLinkPayActionType) => {
    return {
        ...state,
        paginate: {
            ...action.paginate
        }
    }
}

const reducer = (state = initialState, action: AccountLinkPayActionTypes) => {
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