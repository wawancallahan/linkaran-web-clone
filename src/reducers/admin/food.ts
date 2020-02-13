import {  
    FETCH_FOOD,
    FETCH_FOOD_ERROR,
    FETCH_FOOD_SUCCESS,
    Food,
    FoodActionTypes,
    FetchFoodActionType,
    FetchFoodSuccessActionType,
    FetchFoodErrorActionType,
    SetPaginatorFoodActionType,
    SET_PAGINATOR_FOOD,
    AlertFoodShowActionType,
    AlertFoodHideActionType,
    ALERT_FOOD_HIDE,
    ALERT_FOOD_SHOW
} from '../../types/admin/food';

import { Paginator } from '../../types/paginator';
import { Alert } from '../../types/alert';

interface initialStateInterface {
    list: Food[],
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

const reducer = (state = initialState, action: FoodActionTypes) => {
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