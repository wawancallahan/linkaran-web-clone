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
    ALERT_RESTAURANT_SHOW,
    SET_FILTER_RESTAURANT,
    Filter,
    SetFilterRestaurantActionType,
    ClearFilterRestaurantActionType,
    CLEAR_FILTER_RESTAURANT
} from '../../types/admin/restaurant';

import { Paginator } from '../../types/paginator';
import { Alert } from '../../types/alert';

interface initialStateInterface {
    list: Restaurant[],
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
        name: '',
        provinceName: '',
        districtName: ''
    },
    filtered: false
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

const setFilter = (state: initialStateInterface, action: SetFilterRestaurantActionType) => {
    return {
        ...state,
        filter: {
            ...action.filter
        },
        filtered: true
    }
}

const clearFilter = (state: initialStateInterface, action: ClearFilterRestaurantActionType) => {
    return {
        ...state,
        filter: {
            ...initialState.filter
        },
        filtered: false
    }
}

const reducer = (state = initialState, action: RestaurantActionTypes) => {
    switch (action.type) {
        case SET_PAGINATOR_RESTAURANT: return setPaginator(state, action);
        case FETCH_RESTAURANT_SUCCESS: return fetchSuccess(state, action);
        case FETCH_RESTAURANT_ERROR: return fetchError(state, action);
        case ALERT_RESTAURANT_HIDE: return alertHide(state, action);
        case ALERT_RESTAURANT_SHOW: return alertShow(state, action);
        case SET_FILTER_RESTAURANT: return setFilter(state, action);
        case CLEAR_FILTER_RESTAURANT: return clearFilter(state, action);
        default:
            return state;
    }
}

export default reducer;