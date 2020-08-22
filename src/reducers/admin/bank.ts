import {  
    FETCH_BANK_ERROR,
    FETCH_BANK_SUCCESS,
    BankList,
    BankActionTypes,
    FetchBankSuccessActionType,
    FetchBankErrorActionType,
    SetPaginatorBankActionType,
    SET_PAGINATOR_BANK,
    AlertBankShowActionType,
    AlertBankHideActionType,
    ALERT_BANK_HIDE,
    ALERT_BANK_SHOW,
} from '../../types/admin/bank';

import { Paginator } from '../../types/paginator';
import { Alert } from '../../types/alert';

export type State = {
    list: BankList[],
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

const alertHide = (state: State, action: AlertBankHideActionType) => {
    return {
        ...state,
        alert: {
            ...defaultState.alert
        }
    }
}

const alertShow = (state: State, action: AlertBankShowActionType) => {
    return {
        ...state,
        alert: {
            color: action.color,
            message: action.message,
            visible: true
        }
    }
}

const fetchSuccess = (state: State, action: FetchBankSuccessActionType) => {
    return {
        ...state,
        list: action.list,
        paginate: {
            ...defaultState.paginate
        }
    }
}

const fetchError = (state: State, action: FetchBankErrorActionType) => {
    return {
        ...defaultState
    }
}

const setPaginator = (state: State, action: SetPaginatorBankActionType) => {
    return {
        ...state,
        paginate: {
            ...action.paginate
        }
    }
}

const reducer = (state = defaultState, action: BankActionTypes) => {
    switch (action.type) {
        case SET_PAGINATOR_BANK: return setPaginator(state, action);
        case FETCH_BANK_SUCCESS: return fetchSuccess(state, action);
        case FETCH_BANK_ERROR: return fetchError(state, action);
        case ALERT_BANK_HIDE: return alertHide(state, action);
        case ALERT_BANK_SHOW: return alertShow(state, action);
        default:
            return state;
    }
}

export default reducer;