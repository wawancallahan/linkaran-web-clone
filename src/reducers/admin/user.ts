import {  
    FETCH_USER,
    FETCH_USER_ERROR,
    FETCH_USER_SUCCESS,
    User,
    UserActionTypes,
    FetchUserActionType,
    FetchUserSuccessActionType,
    FetchUserErrorActionType,
    SetPaginatorUserActionType,
    SET_PAGINATOR_USER
} from '../../types/admin/user';

import { Paginator } from '../../types/paginator';

interface initialStateInterface {
    isLoaded: boolean,
    isSuccess: boolean,
    list: User[],
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

const fetchSuccess = (state: initialStateInterface, action: FetchUserSuccessActionType) => {
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

const fetchError = (state: initialStateInterface, action: FetchUserErrorActionType) => {
    return {
        ...initialState
    }
}

const setPaginator = (state: initialStateInterface, action: SetPaginatorUserActionType) => {
    return {
        ...state,
        paginate: {
            ...action.paginate
        }
    }
}

const reducer = (state = initialState, action: UserActionTypes) => {
    switch (action.type) {
        case SET_PAGINATOR_USER: return setPaginator(state, action);
        case FETCH_USER_SUCCESS: return fetchSuccess(state, action);
        case FETCH_USER_ERROR: return fetchError(state, action)
        default:
            return state;
    }
}

export default reducer;