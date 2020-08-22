import {  
    FETCH_INVESTOR,
    InvestorList,
    InvestorActionTypes,
    FetchInvestorActionType,
    SetPaginatorInvestorActionType,
    SET_PAGINATOR_INVESTOR,
    AlertInvestorShowActionType,
    AlertInvestorHideActionType,
    ALERT_INVESTOR_HIDE,
    ALERT_INVESTOR_SHOW,
    FETCH_INVESTOR_SUCCESS,
    FETCH_INVESTOR_ERROR,
    FetchInvestorErrorActionType,
    FetchInvestorSuccessActionType
} from '../../types/admin/investor';

import { Paginator } from '../../types/paginator';
import { Alert } from '../../types/alert';

export type State = {
    list: InvestorList[],
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

const alertHide = (state: State, action: AlertInvestorHideActionType) => {
    return {
        ...state,
        alert: {
            ...defaultState.alert
        }
    }
}

const alertShow = (state: State, action: AlertInvestorShowActionType) => {
    return {
        ...state,
        alert: {
            color: action.color,
            message: action.message,
            visible: true
        }
    }
}

const fetch = (state: State, action: FetchInvestorActionType) => {
    return {
        ...state,
        list: action.list
    }
}


const fetchSuccess = (state: State, action: FetchInvestorSuccessActionType) => {
    return {
        ...state,
        list: action.list,
        paginate: {
            ...defaultState.paginate
        }
    }
}

const fetchError = (state: State, action: FetchInvestorErrorActionType) => {
    return {
        ...defaultState
    }
}

const setPaginator = (state: State, action: SetPaginatorInvestorActionType) => {
    return {
        ...state,
        paginate: {
            ...state.paginate,
            ...action.paginate
        }
    }
}

const reducer = (state = defaultState, action: InvestorActionTypes) => {
    switch (action.type) {
        case SET_PAGINATOR_INVESTOR: return setPaginator(state, action);
        case FETCH_INVESTOR: return fetch(state, action);
        case FETCH_INVESTOR_SUCCESS: return fetchSuccess(state, action);
        case FETCH_INVESTOR_ERROR: return fetchError(state, action);
        case ALERT_INVESTOR_HIDE: return alertHide(state, action);
        case ALERT_INVESTOR_SHOW: return alertShow(state, action);
        default:
            return state;
    }
}

export default reducer;