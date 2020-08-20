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

type initialStateInterface = {
    list: PartnerList[],
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

const alertHide = (state: initialStateInterface, action: AlertPartnerHideActionType) => {
    return {
        ...state,
        alert: {
            ...initialState.alert
        }
    }
}

const alertShow = (state: initialStateInterface, action: AlertPartnerShowActionType) => {
    return {
        ...state,
        alert: {
            color: action.color,
            message: action.message,
            visible: true
        }
    }
}

const fetchSuccess = (state: initialStateInterface, action: FetchPartnerSuccessActionType) => {
    return {
        ...state,
        list: action.list,
        paginate: {
            ...initialState.paginate
        }
    }
}

const fetchError = (state: initialStateInterface, action: FetchPartnerErrorActionType) => {
    return {
        ...initialState
    }
}

const setPaginator = (state: initialStateInterface, action: SetPaginatorPartnerActionType) => {
    return {
        ...state,
        paginate: {
            ...action.paginate
        }
    }
}

const reducer = (state = initialState, action: PartnerActionTypes) => {
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