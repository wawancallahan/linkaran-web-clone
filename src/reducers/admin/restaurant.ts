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
    SET_PAGINATOR_RESTAURANT
} from '../../types/admin/restaurant';

import { Paginator } from '../../types/paginator';

interface initialStateInterface {
    isLoaded: boolean,
    isSuccess: boolean,
    list: Restaurant[],
    paginate: Paginator
};

const initialState: initialStateInterface = {
    isLoaded: false,
    isSuccess: false,
    list: [],
    paginate: {
        total: 0,
        currentPage: 0,
        itemCount: 0,
        pageCount: 0
    }
}

const fetchSuccess = (state: initialStateInterface, action: FetchRestaurantSuccessActionType) => {
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
        case FETCH_RESTAURANT_ERROR: return fetchError(state, action)
        default:
            return state;
    }
}

export default reducer;