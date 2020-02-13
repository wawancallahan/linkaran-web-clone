import {  
    FETCH_RESTAURANT,
    FETCH_RESTAURANT_ERROR,
    FETCH_RESTAURANT_SUCCESS,
    Restaurant,
    RestaurantActionTypes,
    FetchRestaurantActionType,
    FetchRestaurantSuccessActionType,
    FetchRestaurantErrorActionType,
    SetPaginatorRestaurantActionType,
    SET_PAGINATOR_RESTAURANT,
    AlertRestaurantShowActionType,
    AlertRestaurantHideActionType,
    ALERT_RESTAURANT_HIDE,
    ALERT_RESTAURANT_SHOW
} from '../../types/admin/restaurant';

import { Paginator } from '../../types/paginator';
import { Alert } from '../../types/alert';

interface initialStateInterface {
    list: Restaurant[],
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

const alertHide = (state: initialStateInterface, action: AlertRestaurantHideActionType) => {
    return {
        ...state,
        alert: {
            ...initialState.alert
        }
    }
}

const alertShow = (state: initialStateInterface, action: AlertRestaurantShowActionType) => {
    return {
        ...state,
        alert: {
            color: action.color,
            message: action.message,
            visible: true
        }
    }
}

const fetchSuccess = (state: initialStateInterface, action: FetchRestaurantSuccessActionType) => {
    return {
        ...state,
        list: action.list,
        paginate: {
            ...initialState.paginate
        }
    }
}

const fetchError = (state: initialStateInterface, action: FetchRestaurantErrorActionType) => {
    return {
        ...initialState
    }
}

const setPaginator = (state: initialStateInterface, action: SetPaginatorRestaurantActionType) => {
    return {
        ...state,
        paginate: {
            ...action.paginate
        }
    }
}

const reducer = (state = initialState, action: RestaurantActionTypes) => {
    switch (action.type) {
        case SET_PAGINATOR_RESTAURANT: return setPaginator(state, action);
        case FETCH_RESTAURANT_SUCCESS: return fetchSuccess(state, action);
        case FETCH_RESTAURANT_ERROR: return fetchError(state, action);
        case ALERT_RESTAURANT_HIDE: return alertHide(state, action);
        case ALERT_RESTAURANT_SHOW: return alertShow(state, action);
        default:
            return state;
    }
}

export default reducer;