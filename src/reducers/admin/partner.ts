import {  
    FETCH_PARTNER_ERROR,
    FETCH_PARTNER_SUCCESS,
    PartnerList,
    PartnerActionTypes,
    FetchPartnerSuccessActionType,
    FetchPartnerErrorActionType,
    SetPaginatorPartnerActionType,
    SET_PAGINATOR_PARTNER,
    AlertPartnerShowActionType,
    AlertPartnerHideActionType,
    ALERT_PARTNER_HIDE,
    ALERT_PARTNER_SHOW,
} from '../../types/admin/partner';

import { Paginator } from '../../types/paginator';
import { Alert } from '../../types/alert';

export type State = {
    list: PartnerList[],
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

const alertHide = (state: State, action: AlertPartnerHideActionType) => {
    return {
        ...state,
        alert: {
            ...defaultState.alert
        }
    }
}

const alertShow = (state: State, action: AlertPartnerShowActionType) => {
    return {
        ...state,
        alert: {
            color: action.color,
            message: action.message,
            visible: true
        }
    }
}

const fetchSuccess = (state: State, action: FetchPartnerSuccessActionType) => {
    return {
        ...state,
        list: action.list,
        paginate: {
            ...defaultState.paginate
        }
    }
}

const fetchError = (state: State, action: FetchPartnerErrorActionType) => {
    return {
        ...defaultState
    }
}

const setPaginator = (state: State, action: SetPaginatorPartnerActionType) => {
    return {
        ...state,
        paginate: {
            ...action.paginate
        }
    }
}

const reducer = (state = defaultState, action: PartnerActionTypes) => {
    switch (action.type) {
        case SET_PAGINATOR_PARTNER: return setPaginator(state, action);
        case FETCH_PARTNER_SUCCESS: return fetchSuccess(state, action);
        case FETCH_PARTNER_ERROR: return fetchError(state, action);
        case ALERT_PARTNER_HIDE: return alertHide(state, action);
        case ALERT_PARTNER_SHOW: return alertShow(state, action);
        default:
            return state;
    }
}

export default reducer;