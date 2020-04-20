import {  
    FETCH_PARTNER,
    FETCH_PARTNER_ERROR,
    FETCH_PARTNER_SUCCESS,
    PartnerList,
    PartnerActionTypes,
    FetchPartnerActionType,
    FetchPartnerSuccessActionType,
    FetchPartnerErrorActionType,
    SetPaginatorPartnerActionType,
    SET_PAGINATOR_PARTNER,
    AlertPartnerShowActionType,
    AlertPartnerHideActionType,
    ALERT_PARTNER_HIDE,
    ALERT_PARTNER_SHOW,
    SET_FILTER_PARTNER,
    Filter,
    SetFilterPartnerActionType,
    ClearFilterPartnerActionType,
    CLEAR_FILTER_PARTNER
} from '../../types/admin/partner';

import { Paginator } from '../../types/paginator';
import { Alert } from '../../types/alert';

interface initialStateInterface {
    list: PartnerList[],
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
        name: '',
        companyName: '',
        startWorkingTogether: null,
        endWorkingTogether: null,
        email: '',
        phoneNumber: '',
    },
    filtered: false
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

const setFilter = (state: initialStateInterface, action: SetFilterPartnerActionType) => {
    return {
        ...state,
        filter: {
            ...action.filter
        },
        filtered: true
    }
}

const clearFilter = (state: initialStateInterface, action: ClearFilterPartnerActionType) => {
    return {
        ...state,
        filter: {
            ...initialState.filter
        },
        filtered: false
    }
}

const reducer = (state = initialState, action: PartnerActionTypes) => {
    switch (action.type) {
        case SET_PAGINATOR_PARTNER: return setPaginator(state, action);
        case FETCH_PARTNER_SUCCESS: return fetchSuccess(state, action);
        case FETCH_PARTNER_ERROR: return fetchError(state, action);
        case ALERT_PARTNER_HIDE: return alertHide(state, action);
        case ALERT_PARTNER_SHOW: return alertShow(state, action);
        case SET_FILTER_PARTNER: return setFilter(state, action);
        case CLEAR_FILTER_PARTNER: return clearFilter(state, action);
        default:
            return state;
    }
}

export default reducer;