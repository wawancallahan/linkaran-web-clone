import {  
    FETCH_HISTORY_DATA_ERROR,
    FETCH_HISTORY_DATA_SUCCESS,
    HistoryDataList,
    HistoryDataActionTypes,
    FetchHistoryDataSuccessActionType,
    FetchHistoryDataErrorActionType,
    SetPaginatorHistoryDataActionType,
    SET_PAGINATOR_HISTORY_DATA,
    AlertHistoryDataShowActionType,
    AlertHistoryDataHideActionType,
    ALERT_HISTORY_DATA_HIDE,
    ALERT_HISTORY_DATA_SHOW,
} from '../../types/admin/historyData/historyData';

import { Paginator } from '../../types/paginator';
import { Alert } from '../../types/alert';

export type State = {
    list: HistoryDataList[],
    paginate: Paginator,
    alert: Alert,
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
    },
}

const alertHide = (state: State, action: AlertHistoryDataHideActionType) => {
    return {
        ...state,
        alert: {
            ...defaultState.alert
        }
    }
}

const alertShow = (state: State, action: AlertHistoryDataShowActionType) => {
    return {
        ...state,
        alert: {
            color: action.color,
            message: action.message,
            visible: true
        }
    }
}

const fetchSuccess = (state: State, action: FetchHistoryDataSuccessActionType) => {
    return {
        ...state,
        list: action.list,
        paginate: {
            ...defaultState.paginate
        }
    }
}

const fetchError = (state: State, action: FetchHistoryDataErrorActionType) => {
    return {
        ...defaultState
    }
}

const setPaginator = (state: State, action: SetPaginatorHistoryDataActionType) => {
    return {
        ...state,
        paginate: {
            ...action.paginate
        }
    }
}

const reducer = (state = defaultState, action: HistoryDataActionTypes) => {
    switch (action.type) {
        case SET_PAGINATOR_HISTORY_DATA: return setPaginator(state, action);
        case FETCH_HISTORY_DATA_SUCCESS: return fetchSuccess(state, action);
        case FETCH_HISTORY_DATA_ERROR: return fetchError(state, action);
        case ALERT_HISTORY_DATA_HIDE: return alertHide(state, action);
        case ALERT_HISTORY_DATA_SHOW: return alertShow(state, action);
        default:
            return state;
    }
}

export default reducer;