import {  
    FETCH_FOOD,
    FETCH_FOOD_ERROR,
    FETCH_FOOD_SUCCESS,
    FoodList,
    FoodActionTypes,
    FetchFoodActionType,
    FetchFoodSuccessActionType,
    FetchFoodErrorActionType,
    SetPaginatorFoodActionType,
    SET_PAGINATOR_FOOD,
    AlertFoodShowActionType,
    AlertFoodHideActionType,
    ALERT_FOOD_HIDE,
    ALERT_FOOD_SHOW,
    SET_FILTER_FOOD,
    Filter,
    SetFilterFoodActionType,
    ClearFilterFoodActionType,
    CLEAR_FILTER_FOOD
} from '../../types/admin/food';

import { Paginator } from '../../types/paginator';
import { Alert } from '../../types/alert';

type initialStateInterface = {
    list: FoodList[],
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
        districtName: '',
        restaurantName: ''
    },
    filtered: false
}

const alertHide = (state: initialStateInterface, action: AlertFoodHideActionType) => {
    return {
        ...state,
        alert: {
            ...initialState.alert
        }
    }
}

const alertShow = (state: initialStateInterface, action: AlertFoodShowActionType) => {
    return {
        ...state,
        alert: {
            color: action.color,
            message: action.message,
            visible: true
        }
    }
}

const fetchSuccess = (state: initialStateInterface, action: FetchFoodSuccessActionType) => {
    return {
        ...state,
        list: action.list,
        paginate: {
            ...initialState.paginate
        }
    }
}

const fetchError = (state: initialStateInterface, action: FetchFoodErrorActionType) => {
    return {
        ...initialState
    }
}

const setPaginator = (state: initialStateInterface, action: SetPaginatorFoodActionType) => {
    return {
        ...state,
        paginate: {
            ...action.paginate
        }
    }
}

const setFilter = (state: initialStateInterface, action: SetFilterFoodActionType) => {
    return {
        ...state,
        filter: {
            ...action.filter
        },
        filtered: true
    }
}

const clearFilter = (state: initialStateInterface, action: ClearFilterFoodActionType) => {
    return {
        ...state,
        filter: {
            ...initialState.filter
        },
        filtered: false
    }
}

const reducer = (state = initialState, action: FoodActionTypes) => {
    switch (action.type) {
        case SET_PAGINATOR_FOOD: return setPaginator(state, action);
        case FETCH_FOOD_SUCCESS: return fetchSuccess(state, action);
        case FETCH_FOOD_ERROR: return fetchError(state, action);
        case ALERT_FOOD_HIDE: return alertHide(state, action);
        case ALERT_FOOD_SHOW: return alertShow(state, action);
        case SET_FILTER_FOOD: return setFilter(state, action);
        case CLEAR_FILTER_FOOD: return clearFilter(state, action);
        default:
            return state;
    }
}

export default reducer;