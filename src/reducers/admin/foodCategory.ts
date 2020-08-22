import {  
    FETCH_FOOD_CATEGORY_ERROR,
    FETCH_FOOD_CATEGORY_SUCCESS,
    FoodCategoryList,
    FoodCategoryActionTypes,
    FetchFoodCategorySuccessActionType,
    FetchFoodCategoryErrorActionType,
    SetPaginatorFoodCategoryActionType,
    SET_PAGINATOR_FOOD_CATEGORY,
    AlertFoodCategoryShowActionType,
    AlertFoodCategoryHideActionType,
    ALERT_FOOD_CATEGORY_HIDE,
    ALERT_FOOD_CATEGORY_SHOW,
} from '../../types/admin/foodCategory';

import { Paginator } from '../../types/paginator';
import { Alert } from '../../types/alert';

export type State = {
    list: FoodCategoryList[],
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

const alertHide = (state: State, action: AlertFoodCategoryHideActionType) => {
    return {
        ...state,
        alert: {
            ...defaultState.alert
        }
    }
}

const alertShow = (state: State, action: AlertFoodCategoryShowActionType) => {
    return {
        ...state,
        alert: {
            color: action.color,
            message: action.message,
            visible: true
        }
    }
}

const fetchSuccess = (state: State, action: FetchFoodCategorySuccessActionType) => {
    return {
        ...state,
        list: action.list,
        paginate: {
            ...defaultState.paginate
        }
    }
}

const fetchError = (state: State, action: FetchFoodCategoryErrorActionType) => {
    return {
        ...defaultState
    }
}

const setPaginator = (state: State, action: SetPaginatorFoodCategoryActionType) => {
    return {
        ...state,
        paginate: {
            ...action.paginate
        }
    }
}

const reducer = (state = defaultState, action: FoodCategoryActionTypes) => {
    switch (action.type) {
        case SET_PAGINATOR_FOOD_CATEGORY: return setPaginator(state, action);
        case FETCH_FOOD_CATEGORY_SUCCESS: return fetchSuccess(state, action);
        case FETCH_FOOD_CATEGORY_ERROR: return fetchError(state, action);
        case ALERT_FOOD_CATEGORY_HIDE: return alertHide(state, action);
        case ALERT_FOOD_CATEGORY_SHOW: return alertShow(state, action);
        default:
            return state;
    }
}

export default reducer;