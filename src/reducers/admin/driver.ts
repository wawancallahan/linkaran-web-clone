import {  
    FETCH_DRIVER,
    Driver,
    DriverActionTypes,
    FetchDriverActionType,
    SetPaginatorDriverActionType,
    SET_PAGINATOR_DRIVER
} from '../../types/admin/driver';

import { Paginator } from '../../types/paginator';

interface initialStateInterface {
    list: Driver[],
    paginate: Paginator
};

const initialState: initialStateInterface = {
    list: [],
    paginate: {
        total: 0,
        currentPage: 0,
        itemCount: 0,
        pageCount: 0
    }
}

const fetch = (state: initialStateInterface, action: FetchDriverActionType) => {
    return {
        ...state,
        list: action.list
    }
}

const setPaginator = (state: initialStateInterface, action: SetPaginatorDriverActionType) => {
    return {
        ...state,
        paginate: {
            ...state.paginate,
            ...action.paginate
        }
    }
}

const reducer = (state = initialState, action: DriverActionTypes) => {
    switch (action.type) {
        case SET_PAGINATOR_DRIVER: return setPaginator(state, action);
        case FETCH_DRIVER: return fetch(state, action);
        default:
            return state;
    }
}

export default reducer;