import {  
    FETCH_PRICE,
    FETCH_PRICE_ERROR,
    FETCH_PRICE_SUCCESS,
    PriceList,
    PriceActionTypes,
    FetchPriceActionType,
    FetchPriceSuccessActionType,
    FetchPriceErrorActionType,
    SetPaginatorPriceActionType,
    SET_PAGINATOR_PRICE,
    AlertPriceShowActionType,
    AlertPriceHideActionType,
    ALERT_PRICE_HIDE,
    ALERT_PRICE_SHOW,
    SET_FILTER_PRICE,
    Filter,
    SetFilterPriceActionType,
    ClearFilterPriceActionType,
    CLEAR_FILTER_PRICE
} from '../../types/admin/price';

import { Paginator } from '../../types/paginator';
import { Alert } from '../../types/alert';

interface initialStateInterface {
    list: PriceList[],
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
        basePrice: '',
        minKm: '',
        perKilometer: ''
    },
    filtered: false
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

const setFilter = (state: initialStateInterface, action: SetFilterPriceActionType) => {
    return {
        ...state,
        filter: {
            ...action.filter
        },
        filtered: true
    }
}

const clearFilter = (state: initialStateInterface, action: ClearFilterPriceActionType) => {
    return {
        ...state,
        filter: {
            ...initialState.filter
        },
        filtered: false
    }
}

const reducer = (state = initialState, action: PriceActionTypes) => {
    switch (action.type) {
        case SET_PAGINATOR_PRICE: return setPaginator(state, action);
        case FETCH_PRICE_SUCCESS: return fetchSuccess(state, action);
        case FETCH_PRICE_ERROR: return fetchError(state, action);
        case ALERT_PRICE_HIDE: return alertHide(state, action);
        case ALERT_PRICE_SHOW: return alertShow(state, action);
        case SET_FILTER_PRICE: return setFilter(state, action);
        case CLEAR_FILTER_PRICE: return clearFilter(state, action);
        default:
            return state;
    }
}

export default reducer;