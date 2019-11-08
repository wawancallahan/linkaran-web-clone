import {  
    FETCH_FOOD_CATEGORY,
    FETCH_FOOD_CATEGORY_ERROR,
    FETCH_FOOD_CATEGORY_SUCCESS,
    FoodCategory,
    FoodCategoryActionTypes,
    FetchFoodCategoryActionType,
    FetchFoodCategorySuccessActionType,
    FetchFoodCategoryErrorActionType,
    SetPaginatorFoodCategoryActionType,
    SET_PAGINATOR_FOOD_CATEGORY
} from '../../types/admin/foodCategory';

import { Paginator } from '../../types/paginator';

interface initialStateInterface {
    isLoaded: boolean,
    isSuccess: boolean,
    list: FoodCategory[],
    paginate: Paginator
};

const initialState: initialStateInterface = {
    isLoaded: false,
    isSuccess: false,
    list: [],
    paginate: {
        activePage: 0,
        itemCount: 0,
        pageCount: 0
    }
}

const fetchSuccess = (state: initialStateInterface, action: FetchFoodCategorySuccessActionType) => {
    return {
        ...state,
        isLoaded: true,
        isSuccess: true,
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

const reducer = (state = initialState, action: FoodCategoryActionTypes) => {
    switch (action.type) {
        case SET_PAGINATOR_FOOD_CATEGORY: return setPaginator(state, action);
        case FETCH_FOOD_CATEGORY_SUCCESS: return fetchSuccess(state, action);
        case FETCH_FOOD_CATEGORY_ERROR: return fetchError(state, action)
        default:
            return state;
    }
}

export default reducer;