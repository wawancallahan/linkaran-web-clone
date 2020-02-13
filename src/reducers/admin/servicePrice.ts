import {  
    FETCH_SERVICE_PRICE,
    FETCH_SERVICE_PRICE_ERROR,
    FETCH_SERVICE_PRICE_SUCCESS,
    ServicePrice,
    ServicePriceActionTypes,
    FetchServicePriceActionType,
    FetchServicePriceSuccessActionType,
    FetchServicePriceErrorActionType,
    SetPaginatorServicePriceActionType,
    SET_PAGINATOR_SERVICE_PRICE,
    AlertServicePriceShowActionType,
    AlertServicePriceHideActionType,
    ALERT_SERVICE_PRICE_HIDE,
    ALERT_SERVICE_PRICE_SHOW
} from '../../types/admin/servicePrice';

import { Paginator } from '../../types/paginator';
import { Alert } from '../../types/alert';

interface initialStateInterface {
    list: ServicePrice[],
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

const alertHide = (state: initialStateInterface, action: AlertServicePriceHideActionType) => {
    return {
        ...state,
        alert: {
            ...initialState.alert
        }
    }
}

const alertShow = (state: initialStateInterface, action: AlertServicePriceShowActionType) => {
    return {
        ...state,
        alert: {
            color: action.color,
            message: action.message,
            visible: true
        }
    }
}

const fetchSuccess = (state: initialStateInterface, action: FetchServicePriceSuccessActionType) => {
    return {
        ...state,
        list: action.list,
        paginate: {
            ...initialState.paginate
        }
    }
}

const fetchError = (state: initialStateInterface, action: FetchServicePriceErrorActionType) => {
    return {
        ...initialState
    }
}

const setPaginator = (state: initialStateInterface, action: SetPaginatorServicePriceActionType) => {
    return {
        ...state,
        paginate: {
            ...action.paginate
        }
    }
}

const reducer = (state = initialState, action: ServicePriceActionTypes) => {
    switch (action.type) {
        case SET_PAGINATOR_SERVICE_PRICE: return setPaginator(state, action);
        case FETCH_SERVICE_PRICE_SUCCESS: return fetchSuccess(state, action);
        case FETCH_SERVICE_PRICE_ERROR: return fetchError(state, action);
        case ALERT_SERVICE_PRICE_HIDE: return alertHide(state, action);
        case ALERT_SERVICE_PRICE_SHOW: return alertShow(state, action);
        default:
            return state;
    }
}

export default reducer;