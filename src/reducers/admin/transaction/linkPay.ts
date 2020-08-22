import {  
    FETCH_LINK_PAY,
    FETCH_LINK_PAY_ERROR,
    FETCH_LINK_PAY_SUCCESS,
    LinkPay,
    LinkPayActionTypes,
    FetchLinkPayActionType,
    FetchLinkPaySuccessActionType,
    FetchLinkPayErrorActionType,
    SetPaginatorLinkPayActionType,
    SET_PAGINATOR_LINK_PAY,
    AlertLinkPayShowActionType,
    AlertLinkPayHideActionType,
    ALERT_LINK_PAY_HIDE,
    ALERT_LINK_PAY_SHOW
} from '../../../types/admin/transaction/linkPay';

import { Paginator } from '../../../types/paginator';
import { Alert } from '../../../types/alert';

export type State = {
    list: LinkPay[],
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

const alertHide = (state: State, action: AlertLinkPayHideActionType) => {
    return {
        ...state,
        alert: {
            ...defaultState.alert
        }
    }
}

const alertShow = (state: State, action: AlertLinkPayShowActionType) => {
    return {
        ...state,
        alert: {
            color: action.color,
            message: action.message,
            visible: true
        }
    }
}

const fetchSuccess = (state: State, action: FetchLinkPaySuccessActionType) => {
    return {
        ...state,
        list: action.list,
        paginate: {
            ...defaultState.paginate
        }
    }
}

const fetchError = (state: State, action: FetchLinkPayErrorActionType) => {
    return {
        ...defaultState
    }
}

const setPaginator = (state: State, action: SetPaginatorLinkPayActionType) => {
    return {
        ...state,
        paginate: {
            ...action.paginate
        }
    }
}

const reducer = (state = defaultState, action: LinkPayActionTypes) => {
    switch (action.type) {
        case SET_PAGINATOR_LINK_PAY: return setPaginator(state, action);
        case FETCH_LINK_PAY_SUCCESS: return fetchSuccess(state, action);
        case FETCH_LINK_PAY_ERROR: return fetchError(state, action);
        case ALERT_LINK_PAY_HIDE: return alertHide(state, action);
        case ALERT_LINK_PAY_SHOW: return alertShow(state, action);
        default:
            return state;
    }
}

export default reducer;