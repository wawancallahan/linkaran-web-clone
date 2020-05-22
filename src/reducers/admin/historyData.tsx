import {  
    FETCH_HISTORY_DATA,
    FETCH_HISTORY_DATA_ERROR,
    FETCH_HISTORY_DATA_SUCCESS,
    HistoryDataList,
    HistoryDataActionTypes,
    FetchHistoryDataActionType,
    FetchHistoryDataSuccessActionType,
    FetchHistoryDataErrorActionType,
    SetPaginatorHistoryDataActionType,
    SET_PAGINATOR_HISTORY_DATA,
    AlertHistoryDataShowActionType,
    AlertHistoryDataHideActionType,
    ALERT_HISTORY_DATA_HIDE,
    ALERT_HISTORY_DATA_SHOW,
    SET_FILTER_HISTORY_DATA,
    Filter,
    SetFilterHistoryDataActionType,
    ClearFilterHistoryDataActionType,
    CLEAR_FILTER_HISTORY_DATA
} from '../../types/admin/historyData/historyData';

import { Paginator } from '../../types/paginator';
import { Alert } from '../../types/alert';

type initialStateInterface = {
    list: HistoryDataList[],
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
        userName: '',
        dateCreate: null
    },
    filtered: false
}

const alertHide = (state: initialStateInterface, action: AlertHistoryDataHideActionType) => {
    return {
        ...state,
        alert: {
            ...initialState.alert
        }
    }
}

const alertShow = (state: initialStateInterface, action: AlertHistoryDataShowActionType) => {
    return {
        ...state,
        alert: {
            color: action.color,
            message: action.message,
            visible: true
        }
    }
}

const fetchSuccess = (state: initialStateInterface, action: FetchHistoryDataSuccessActionType) => {
    return {
        ...state,
        list: action.list,
        paginate: {
            ...initialState.paginate
        }
    }
}

const fetchError = (state: initialStateInterface, action: FetchHistoryDataErrorActionType) => {
    return {
        ...initialState
    }
}

const setPaginator = (state: initialStateInterface, action: SetPaginatorHistoryDataActionType) => {
    return {
        ...state,
        paginate: {
            ...action.paginate
        }
    }
}

const setFilter = (state: initialStateInterface, action: SetFilterHistoryDataActionType) => {
    return {
        ...state,
        filter: {
            ...action.filter
        },
        filtered: true
    }
}

const clearFilter = (state: initialStateInterface, action: ClearFilterHistoryDataActionType) => {
    return {
        ...state,
        filter: {
            ...initialState.filter
        },
        filtered: false
    }
}

const reducer = (state = initialState, action: HistoryDataActionTypes) => {
    switch (action.type) {
        case SET_PAGINATOR_HISTORY_DATA: return setPaginator(state, action);
        case FETCH_HISTORY_DATA_SUCCESS: return fetchSuccess(state, action);
        case FETCH_HISTORY_DATA_ERROR: return fetchError(state, action);
        case ALERT_HISTORY_DATA_HIDE: return alertHide(state, action);
        case ALERT_HISTORY_DATA_SHOW: return alertShow(state, action);
        case SET_FILTER_HISTORY_DATA: return setFilter(state, action);
        case CLEAR_FILTER_HISTORY_DATA: return clearFilter(state, action);
        default:
            return state;
    }
}

export default reducer;