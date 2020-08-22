import {  
    FETCH_RESTAURANT_ERROR,
    FETCH_RESTAURANT_SUCCESS,
    RestaurantList,
    RestaurantActionTypes,
    FetchRestaurantSuccessActionType,
    FetchRestaurantErrorActionType,
    SetPaginatorRestaurantActionType,
    SET_PAGINATOR_RESTAURANT,
    AlertRestaurantShowActionType,
    AlertRestaurantHideActionType,
    ALERT_RESTAURANT_HIDE,
    ALERT_RESTAURANT_SHOW,
} from '../../types/admin/restaurant';

import { Paginator } from '../../types/paginator';
import { Alert } from '../../types/alert';

export type State = {
    list: RestaurantList[],
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

const alertHide = (state: State, action: AlertRestaurantHideActionType) => {
    return {
        ...state,
        alert: {
            ...defaultState.alert
        }
    }
}

const alertShow = (state: State, action: AlertRestaurantShowActionType) => {
    return {
        ...state,
        alert: {
            color: action.color,
            message: action.message,
            visible: true
        }
    }
}

const fetchSuccess = (state: State, action: FetchRestaurantSuccessActionType) => {
    return {
        ...state,
        list: action.list,
        paginate: {
            ...defaultState.paginate
        }
    }
}

const fetchError = (state: State, action: FetchRestaurantErrorActionType) => {
    return {
        ...defaultState
    }
}

const setPaginator = (state: State, action: SetPaginatorRestaurantActionType) => {
    return {
        ...state,
        paginate: {
            ...action.paginate
        }
    }
}

const reducer = (state = defaultState, action: RestaurantActionTypes) => {
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