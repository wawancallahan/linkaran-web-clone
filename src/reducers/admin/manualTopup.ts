import {  
    FETCH_MANUAL_TOPUP,
    FETCH_MANUAL_TOPUP_ERROR,
    FETCH_MANUAL_TOPUP_SUCCESS,
    ManualTopUpList,
    ManualTopUpActionTypes,
    FetchManualTopUpActionType,
    FetchManualTopUpSuccessActionType,
    FetchManualTopUpErrorActionType,
    SetPaginatorManualTopUpActionType,
    SET_PAGINATOR_MANUAL_TOPUP,
    AlertManualTopUpShowActionType,
    AlertManualTopUpHideActionType,
    ALERT_MANUAL_TOPUP_HIDE,
    ALERT_MANUAL_TOPUP_SHOW,
    SET_FILTER_MANUAL_TOPUP,
    Filter,
    SetFilterManualTopUpActionType,
    ClearFilterManualTopUpActionType,
    CLEAR_FILTER_MANUAL_TOPUP
} from '../../types/admin/manualTopup';

import { Paginator } from '../../types/paginator';
import { Alert } from '../../types/alert';

type initialStateInterface = {
    list: ManualTopUpList[],
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
        bankName: ''
    },
    filtered: false
}

const alertHide = (state: initialStateInterface, action: AlertManualTopUpHideActionType) => {
    return {
        ...state,
        alert: {
            ...initialState.alert
        }
    }
}

const alertShow = (state: initialStateInterface, action: AlertManualTopUpShowActionType) => {
    return {
        ...state,
        alert: {
            color: action.color,
            message: action.message,
            visible: true
        }
    }
}

const fetchSuccess = (state: initialStateInterface, action: FetchManualTopUpSuccessActionType) => {
    return {
        ...state,
        list: action.list,
        paginate: {
            ...initialState.paginate
        }
    }
}

const fetchError = (state: initialStateInterface, action: FetchManualTopUpErrorActionType) => {
    return {
        ...initialState
    }
}

const setPaginator = (state: initialStateInterface, action: SetPaginatorManualTopUpActionType) => {
    return {
        ...state,
        paginate: {
            ...action.paginate
        }
    }
}

const setFilter = (state: initialStateInterface, action: SetFilterManualTopUpActionType) => {
    return {
        ...state,
        filter: {
            ...action.filter
        },
        filtered: true
    }
}

const clearFilter = (state: initialStateInterface, action: ClearFilterManualTopUpActionType) => {
    return {
        ...state,
        filter: {
            ...initialState.filter
        },
        filtered: false
    }
}

const reducer = (state = initialState, action: ManualTopUpActionTypes) => {
    switch (action.type) {
        case SET_PAGINATOR_MANUAL_TOPUP: return setPaginator(state, action);
        case FETCH_MANUAL_TOPUP_SUCCESS: return fetchSuccess(state, action);
        case FETCH_MANUAL_TOPUP_ERROR: return fetchError(state, action);
        case ALERT_MANUAL_TOPUP_HIDE: return alertHide(state, action);
        case ALERT_MANUAL_TOPUP_SHOW: return alertShow(state, action);
        case SET_FILTER_MANUAL_TOPUP: return setFilter(state, action);
        case CLEAR_FILTER_MANUAL_TOPUP: return clearFilter(state, action);
        default:
            return state;
    }
}

export default reducer;