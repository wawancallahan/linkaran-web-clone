import {  
    FETCH_TOPUP,
    FETCH_TOPUP_ERROR,
    FETCH_TOPUP_SUCCESS,
    TopUpList,
    TopUpActionTypes,
    FetchTopUpActionType,
    FetchTopUpSuccessActionType,
    FetchTopUpErrorActionType,
    SetPaginatorTopUpActionType,
    SET_PAGINATOR_TOPUP,
    AlertTopUpShowActionType,
    AlertTopUpHideActionType,
    ALERT_TOPUP_HIDE,
    ALERT_TOPUP_SHOW,
    SET_FILTER_TOPUP,
    Filter,
    SetFilterTopUpActionType,
    ClearFilterTopUpActionType,
    CLEAR_FILTER_TOPUP
} from '../../types/financialManager/topup';

import { Paginator } from '../../types/paginator';
import { Alert } from '../../types/alert';

interface initialStateInterface {
    list: TopUpList[],
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
        accountNumber: '',
        bankName: '',
        isManual: '0'
    },
    filtered: false
}

const alertHide = (state: initialStateInterface, action: AlertTopUpHideActionType) => {
    return {
        ...state,
        alert: {
            ...initialState.alert
        }
    }
}

const alertShow = (state: initialStateInterface, action: AlertTopUpShowActionType) => {
    return {
        ...state,
        alert: {
            color: action.color,
            message: action.message,
            visible: true
        }
    }
}

const fetchSuccess = (state: initialStateInterface, action: FetchTopUpSuccessActionType) => {
    return {
        ...state,
        list: action.list,
        paginate: {
            ...initialState.paginate
        }
    }
}

const fetchError = (state: initialStateInterface, action: FetchTopUpErrorActionType) => {
    return {
        ...initialState
    }
}

const setPaginator = (state: initialStateInterface, action: SetPaginatorTopUpActionType) => {
    return {
        ...state,
        paginate: {
            ...action.paginate
        }
    }
}

const setFilter = (state: initialStateInterface, action: SetFilterTopUpActionType) => {
    return {
        ...state,
        filter: {
            ...action.filter
        },
        filtered: true
    }
}

const clearFilter = (state: initialStateInterface, action: ClearFilterTopUpActionType) => {
    return {
        ...state,
        filter: {
            ...initialState.filter
        },
        filtered: false
    }
}

const reducer = (state = initialState, action: TopUpActionTypes) => {
    switch (action.type) {
        case SET_PAGINATOR_TOPUP: return setPaginator(state, action);
        case FETCH_TOPUP_SUCCESS: return fetchSuccess(state, action);
        case FETCH_TOPUP_ERROR: return fetchError(state, action);
        case ALERT_TOPUP_HIDE: return alertHide(state, action);
        case ALERT_TOPUP_SHOW: return alertShow(state, action);
        case SET_FILTER_TOPUP: return setFilter(state, action);
        case CLEAR_FILTER_TOPUP: return clearFilter(state, action);
        default:
            return state;
    }
}

export default reducer;