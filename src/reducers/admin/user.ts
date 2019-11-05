import {  
    FETCH_USER,
    User,
    UserActionTypes,
    FetchUserActionType,
    SetPaginatorUserActionType,
    SET_PAGINATOR_USER
} from '../../types/admin/user';

import { Paginator } from '../../types/paginator';

interface initialStateInterface {
    list: User[],
    paginate: Paginator
};

const initialState: initialStateInterface = {
    list: [],
    paginate: {
        activePage: 0,
        itemCount: 0,
        pageCount: 0
    }
}

const fetch = (state: initialStateInterface, action: FetchUserActionType) => {
    return {
        ...state,
        list: action.list
    }
}

const setPaginator = (state: initialStateInterface, action: SetPaginatorUserActionType) => {
    return {
        ...state,
        paginate: {
            ...state.paginate,
            ...action.paginate
        }
    }
}

const reducer = (state = initialState, action: UserActionTypes) => {
    switch (action.type) {
        case SET_PAGINATOR_USER: return setPaginator(state, action);
        case FETCH_USER: return fetch(state, action);
        default:
            return state;
    }
}

export default reducer;