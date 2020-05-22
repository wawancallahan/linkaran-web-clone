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

type initialStateInterface = {
    list: InvestorList[],
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

const alertHide = (state: initialStateInterface, action: AlertInvestorHideActionType) => {
    return {
        ...state,
        alert: {
            ...initialState.alert
        }
    }
}

const alertShow = (state: initialStateInterface, action: AlertInvestorShowActionType) => {
    return {
        ...state,
        alert: {
            color: action.color,
            message: action.message,
            visible: true
        }
    }
}

const fetch = (state: initialStateInterface, action: FetchInvestorActionType) => {
    return {
        ...state,
        list: action.list
    }
}


const fetchSuccess = (state: initialStateInterface, action: FetchInvestorSuccessActionType) => {
    return {
        ...state,
        list: action.list,
        paginate: {
            ...initialState.paginate
        }
    }
}

const fetchError = (state: initialStateInterface, action: FetchInvestorErrorActionType) => {
    return {
        ...initialState
    }
}

const setPaginator = (state: initialStateInterface, action: SetPaginatorInvestorActionType) => {
    return {
        ...state,
        paginate: {
            ...state.paginate,
            ...action.paginate
        }
    }
}

const reducer = (state = initialState, action: InvestorActionTypes) => {
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