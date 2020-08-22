import {  
    FETCH_PRICE_ERROR,
    FETCH_PRICE_SUCCESS,
    PriceList,
    PriceActionTypes,
    FetchPriceSuccessActionType,
    FetchPriceErrorActionType,
    SetPaginatorPriceActionType,
    SET_PAGINATOR_PRICE,
    AlertPriceShowActionType,
    AlertPriceHideActionType,
    ALERT_PRICE_HIDE,
    ALERT_PRICE_SHOW,
} from '../../types/admin/price';

import { Paginator } from '../../types/paginator';
import { Alert } from '../../types/alert';

export type State = {
    list: PriceList[],
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

const alertHide = (state: State, action: AlertPriceHideActionType) => {
    return {
        ...state,
        alert: {
            ...defaultState.alert
        }
    }
}

const alertShow = (state: State, action: AlertPriceShowActionType) => {
    return {
        ...state,
        alert: {
            color: action.color,
            message: action.message,
            visible: true
        }
    }
}

const fetchSuccess = (state: State, action: FetchPriceSuccessActionType) => {
    return {
        ...state,
        list: action.list,
        paginate: {
            ...defaultState.paginate
        }
    }
}

const fetchError = (state: State, action: FetchPriceErrorActionType) => {
    return {
        ...defaultState
    }
}

const setPaginator = (state: State, action: SetPaginatorPriceActionType) => {
    return {
        ...state,
        paginate: {
            ...action.paginate
        }
    }
}

const reducer = (state = defaultState, action: PriceActionTypes) => {
    switch (action.type) {
        case SET_PAGINATOR_PRICE: return setPaginator(state, action);
        case FETCH_PRICE_SUCCESS: return fetchSuccess(state, action);
        case FETCH_PRICE_ERROR: return fetchError(state, action);
        case ALERT_PRICE_HIDE: return alertHide(state, action);
        case ALERT_PRICE_SHOW: return alertShow(state, action);
        default:
            return state;
    }
}

export default reducer;