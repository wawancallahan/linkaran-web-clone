import {  
    FETCH_PRICE,
    FETCH_PRICE_ERROR,
    FETCH_PRICE_SUCCESS,
    Price,
    PriceActionTypes,
    FetchPriceActionType,
    FetchPriceSuccessActionType,
    FetchPriceErrorActionType,
    SetPaginatorPriceActionType,
    SET_PAGINATOR_PRICE,
    AlertPriceShowActionType,
    AlertPriceHideActionType,
    ALERT_PRICE_HIDE,
    ALERT_PRICE_SHOW
} from '../../types/admin/price';

import { Paginator } from '../../types/paginator';
import { Alert } from '../../types/alert';

interface initialStateInterface {
    list: Price[],
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

const alertHide = (state: initialStateInterface, action: AlertPriceHideActionType) => {
    return {
        ...state,
        alert: {
            ...initialState.alert
        }
    }
}

const alertShow = (state: initialStateInterface, action: AlertPriceShowActionType) => {
    return {
        ...state,
        alert: {
            color: action.color,
            message: action.message,
            visible: true
        }
    }
}

const fetchSuccess = (state: initialStateInterface, action: FetchPriceSuccessActionType) => {
    return {
        ...state,
        isLoaded: true,
        isSuccess: true,
        list: action.list,
        paginate: {
            ...initialState.paginate
        }
    }
}

const fetchError = (state: initialStateInterface, action: FetchPriceErrorActionType) => {
    return {
        ...initialState
    }
}

const setPaginator = (state: initialStateInterface, action: SetPaginatorPriceActionType) => {
    return {
        ...state,
        paginate: {
            ...action.paginate
        }
    }
}

const reducer = (state = initialState, action: PriceActionTypes) => {
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