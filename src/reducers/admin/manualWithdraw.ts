import {  
    FETCH_MANUAL_WITHDRAW,
    FETCH_MANUAL_WITHDRAW_ERROR,
    FETCH_MANUAL_WITHDRAW_SUCCESS,
    ManualWithDrawList,
    ManualWithDrawActionTypes,
    FetchManualWithDrawActionType,
    FetchManualWithDrawSuccessActionType,
    FetchManualWithDrawErrorActionType,
    SetPaginatorManualWithDrawActionType,
    SET_PAGINATOR_MANUAL_WITHDRAW,
    AlertManualWithDrawShowActionType,
    AlertManualWithDrawHideActionType,
    ALERT_MANUAL_WITHDRAW_HIDE,
    ALERT_MANUAL_WITHDRAW_SHOW,
    SET_FILTER_MANUAL_WITHDRAW,
    Filter,
    SetFilterManualWithDrawActionType,
    ClearFilterManualWithDrawActionType,
    CLEAR_FILTER_MANUAL_WITHDRAW
} from '../../types/admin/manualWithdraw';

import { Paginator } from '../../types/paginator';
import { Alert } from '../../types/alert';

interface initialStateInterface {
    list: ManualWithDrawList[],
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
        accountName: '',
        accountNumber: '',
        bankName: '',
        isManual: '0'
    },
    filtered: false
}

const alertHide = (state: initialStateInterface, action: AlertManualWithDrawHideActionType) => {
    return {
        ...state,
        alert: {
            ...initialState.alert
        }
    }
}

const alertShow = (state: initialStateInterface, action: AlertManualWithDrawShowActionType) => {
    return {
        ...state,
        alert: {
            color: action.color,
            message: action.message,
            visible: true
        }
    }
}

const fetchSuccess = (state: initialStateInterface, action: FetchManualWithDrawSuccessActionType) => {
    return {
        ...state,
        list: action.list,
        paginate: {
            ...initialState.paginate
        }
    }
}

const fetchError = (state: initialStateInterface, action: FetchManualWithDrawErrorActionType) => {
    return {
        ...initialState
    }
}

const setPaginator = (state: initialStateInterface, action: SetPaginatorManualWithDrawActionType) => {
    return {
        ...state,
        paginate: {
            ...action.paginate
        }
    }
}

const setFilter = (state: initialStateInterface, action: SetFilterManualWithDrawActionType) => {
    return {
        ...state,
        filter: {
            ...action.filter
        },
        filtered: true
    }
}

const clearFilter = (state: initialStateInterface, action: ClearFilterManualWithDrawActionType) => {
    return {
        ...state,
        filter: {
            ...initialState.filter
        },
        filtered: false
    }
}

const reducer = (state = initialState, action: ManualWithDrawActionTypes) => {
    switch (action.type) {
        case SET_PAGINATOR_MANUAL_WITHDRAW: return setPaginator(state, action);
        case FETCH_MANUAL_WITHDRAW_SUCCESS: return fetchSuccess(state, action);
        case FETCH_MANUAL_WITHDRAW_ERROR: return fetchError(state, action);
        case ALERT_MANUAL_WITHDRAW_HIDE: return alertHide(state, action);
        case ALERT_MANUAL_WITHDRAW_SHOW: return alertShow(state, action);
        case SET_FILTER_MANUAL_WITHDRAW: return setFilter(state, action);
        case CLEAR_FILTER_MANUAL_WITHDRAW: return clearFilter(state, action);
        default:
            return state;
    }
}

export default reducer;