import {  
    FETCH_TOPUP_ERROR,
    FETCH_TOPUP_SUCCESS,
    TopUpList,
    TopUpActionTypes,
    FetchTopUpSuccessActionType,
    FetchTopUpErrorActionType,
    SetPaginatorTopUpActionType,
    SET_PAGINATOR_TOPUP,
    AlertTopUpShowActionType,
    AlertTopUpHideActionType,
    ALERT_TOPUP_HIDE,
    ALERT_TOPUP_SHOW,
} from '../../types/financialManager/topup';

import { Paginator } from '../../types/paginator';
import { Alert } from '../../types/alert';

export type State = {
    list: TopUpList[],
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
    },
}

const alertHide = (state: State, action: AlertTopUpHideActionType) => {
    return {
        ...state,
        alert: {
            ...defaultState.alert
        }
    }
}

const alertShow = (state: State, action: AlertTopUpShowActionType) => {
    return {
        ...state,
        alert: {
            color: action.color,
            message: action.message,
            visible: true
        }
    }
}

const fetchSuccess = (state: State, action: FetchTopUpSuccessActionType) => {
    return {
        ...state,
        list: action.list,
        paginate: {
            ...defaultState.paginate
        }
    }
}

const fetchError = (state: State, action: FetchTopUpErrorActionType) => {
    return {
        ...defaultState
    }
}

const setPaginator = (state: State, action: SetPaginatorTopUpActionType) => {
    return {
        ...state,
        paginate: {
            ...action.paginate
        }
    }
}

const reducer = (state = defaultState, action: TopUpActionTypes) => {
    switch (action.type) {
        case SET_PAGINATOR_TOPUP: return setPaginator(state, action);
        case FETCH_TOPUP_SUCCESS: return fetchSuccess(state, action);
        case FETCH_TOPUP_ERROR: return fetchError(state, action);
        case ALERT_TOPUP_HIDE: return alertHide(state, action);
        case ALERT_TOPUP_SHOW: return alertShow(state, action);
        default:
            return state;
    }
}

export default reducer;