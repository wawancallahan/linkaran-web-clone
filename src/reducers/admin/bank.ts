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

type initialStateInterface = {
    list: BankList[],
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

const alertHide = (state: initialStateInterface, action: AlertBankHideActionType) => {
    return {
        ...state,
        alert: {
            ...initialState.alert
        }
    }
}

const alertShow = (state: initialStateInterface, action: AlertBankShowActionType) => {
    return {
        ...state,
        alert: {
            color: action.color,
            message: action.message,
            visible: true
        }
    }
}

const fetchSuccess = (state: initialStateInterface, action: FetchBankSuccessActionType) => {
    return {
        ...state,
        list: action.list,
        paginate: {
            ...initialState.paginate
        }
    }
}

const fetchError = (state: initialStateInterface, action: FetchBankErrorActionType) => {
    return {
        ...initialState
    }
}

const setPaginator = (state: initialStateInterface, action: SetPaginatorBankActionType) => {
    return {
        ...state,
        paginate: {
            ...action.paginate
        }
    }
}

const reducer = (state = initialState, action: BankActionTypes) => {
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