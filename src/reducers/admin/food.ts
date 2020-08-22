import {  
    FETCH_FOOD_ERROR,
    FETCH_FOOD_SUCCESS,
    FoodList,
    FoodActionTypes,
    FetchFoodSuccessActionType,
    FetchFoodErrorActionType,
    SetPaginatorFoodActionType,
    SET_PAGINATOR_FOOD,
    AlertFoodShowActionType,
    AlertFoodHideActionType,
    ALERT_FOOD_HIDE,
    ALERT_FOOD_SHOW,
} from '../../types/admin/food';

import { Paginator } from '../../types/paginator';
import { Alert } from '../../types/alert';

export type State = {
    list: FoodList[],
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

const alertHide = (state: State, action: AlertFoodHideActionType) => {
    return {
        ...state,
        alert: {
            ...defaultState.alert
        }
    }
}

const alertShow = (state: State, action: AlertFoodShowActionType) => {
    return {
        ...state,
        alert: {
            color: action.color,
            message: action.message,
            visible: true
        }
    }
}

const fetchSuccess = (state: State, action: FetchFoodSuccessActionType) => {
    return {
        ...state,
        list: action.list,
        paginate: {
            ...defaultState.paginate
        }
    }
}

const fetchError = (state: State, action: FetchFoodErrorActionType) => {
    return {
        ...defaultState
    }
}

const setPaginator = (state: State, action: SetPaginatorFoodActionType) => {
    return {
        ...state,
        paginate: {
            ...action.paginate
        }
    }
}

const reducer = (state = defaultState, action: FoodActionTypes) => {
    switch (action.type) {
        case SET_PAGINATOR_FOOD: return setPaginator(state, action);
        case FETCH_FOOD_SUCCESS: return fetchSuccess(state, action);
        case FETCH_FOOD_ERROR: return fetchError(state, action);
        case ALERT_FOOD_HIDE: return alertHide(state, action);
        case ALERT_FOOD_SHOW: return alertShow(state, action);
        default:
            return state;
    }
}

export default reducer;