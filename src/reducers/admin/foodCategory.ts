import {  
    FETCH_FOOD_CATEGORY,
    FETCH_FOOD_CATEGORY_ERROR,
    FETCH_FOOD_CATEGORY_SUCCESS,
    FoodCategoryList,
    FoodCategoryActionTypes,
    FetchFoodCategoryActionType,
    FetchFoodCategorySuccessActionType,
    FetchFoodCategoryErrorActionType,
    SetPaginatorFoodCategoryActionType,
    SET_PAGINATOR_FOOD_CATEGORY,
    AlertFoodCategoryShowActionType,
    AlertFoodCategoryHideActionType,
    ALERT_FOOD_CATEGORY_HIDE,
    ALERT_FOOD_CATEGORY_SHOW,
    SET_FILTER_FOOD_CATEGORY,
    Filter,
    SetFilterFoodCategoryActionType,
    ClearFilterFoodCategoryActionType,
    CLEAR_FILTER_FOOD_CATEGORY
} from '../../types/admin/foodCategory';

import { Paginator } from '../../types/paginator';
import { Alert } from '../../types/alert';

interface initialStateInterface {
    list: FoodCategoryList[],
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
        name: ''
    },
    filtered: false
}

const alertHide = (state: initialStateInterface, action: AlertFoodCategoryHideActionType) => {
    return {
        ...state,
        alert: {
            ...initialState.alert
        }
    }
}

const alertShow = (state: initialStateInterface, action: AlertFoodCategoryShowActionType) => {
    return {
        ...state,
        alert: {
            color: action.color,
            message: action.message,
            visible: true
        }
    }
}

const fetchSuccess = (state: initialStateInterface, action: FetchFoodCategorySuccessActionType) => {
    return {
        ...state,
        list: action.list,
        paginate: {
            ...initialState.paginate
        }
    }
}

const fetchError = (state: initialStateInterface, action: FetchFoodCategoryErrorActionType) => {
    return {
        ...initialState
    }
}

const setPaginator = (state: initialStateInterface, action: SetPaginatorFoodCategoryActionType) => {
    return {
        ...state,
        paginate: {
            ...action.paginate
        }
    }
}

const setFilter = (state: initialStateInterface, action: SetFilterFoodCategoryActionType) => {
    return {
        ...state,
        filter: {
            ...action.filter
        },
        filtered: true
    }
}

const clearFilter = (state: initialStateInterface, action: ClearFilterFoodCategoryActionType) => {
    return {
        ...state,
        filter: {
            ...initialState.filter
        },
        filtered: false
    }
}

const reducer = (state = initialState, action: FoodCategoryActionTypes) => {
    switch (action.type) {
        case SET_PAGINATOR_FOOD_CATEGORY: return setPaginator(state, action);
        case FETCH_FOOD_CATEGORY_SUCCESS: return fetchSuccess(state, action);
        case FETCH_FOOD_CATEGORY_ERROR: return fetchError(state, action);
        case ALERT_FOOD_CATEGORY_HIDE: return alertHide(state, action);
        case ALERT_FOOD_CATEGORY_SHOW: return alertShow(state, action);
        case SET_FILTER_FOOD_CATEGORY: return setFilter(state, action);
        case CLEAR_FILTER_FOOD_CATEGORY: return clearFilter(state, action);
        default:
            return state;
    }
}

export default reducer;