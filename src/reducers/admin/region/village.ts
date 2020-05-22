import {  
    FETCH_VILLAGE,
    FETCH_VILLAGE_ERROR,
    FETCH_VILLAGE_SUCCESS,
    VillageList,
    VillageActionTypes,
    FetchVillageActionType,
    FetchVillageSuccessActionType,
    FetchVillageErrorActionType,
    SetPaginatorVillageActionType,
    SET_PAGINATOR_VILLAGE,
    AlertVillageShowActionType,
    AlertVillageHideActionType,
    ALERT_VILLAGE_HIDE,
    ALERT_VILLAGE_SHOW,
    SET_FILTER_VILLAGE,
    Filter,
    SetFilterVillageActionType,
    ClearFilterVillageActionType,
    CLEAR_FILTER_VILLAGE
} from '../../../types/admin/region/village';

import { Paginator } from '../../../types/paginator';
import { Alert } from '../../../types/alert';

type initialStateInterface = {
    list: VillageList[],
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
        subDistrictName: ''
    },
    filtered: false
}

const alertHide = (state: initialStateInterface, action: AlertVillageHideActionType) => {
    return {
        ...state,
        alert: {
            ...initialState.alert
        }
    }
}

const alertShow = (state: initialStateInterface, action: AlertVillageShowActionType) => {
    return {
        ...state,
        alert: {
            color: action.color,
            message: action.message,
            visible: true
        }
    }
}

const fetchSuccess = (state: initialStateInterface, action: FetchVillageSuccessActionType) => {
    return {
        ...state,
        list: action.list,
        paginate: {
            ...initialState.paginate
        }
    }
}

const fetchError = (state: initialStateInterface, action: FetchVillageErrorActionType) => {
    return {
        ...initialState
    }
}

const setPaginator = (state: initialStateInterface, action: SetPaginatorVillageActionType) => {
    return {
        ...state,
        paginate: {
            ...action.paginate
        }
    }
}

const setFilter = (state: initialStateInterface, action: SetFilterVillageActionType) => {
    return {
        ...state,
        filter: {
            ...action.filter
        },
        filtered: true
    }
}

const clearFilter = (state: initialStateInterface, action: ClearFilterVillageActionType) => {
    return {
        ...state,
        filter: {
            ...initialState.filter
        },
        filtered: false
    }
}

const reducer = (state = initialState, action: VillageActionTypes) => {
    switch (action.type) {
        case SET_PAGINATOR_VILLAGE: return setPaginator(state, action);
        case FETCH_VILLAGE_SUCCESS: return fetchSuccess(state, action);
        case FETCH_VILLAGE_ERROR: return fetchError(state, action);
        case ALERT_VILLAGE_HIDE: return alertHide(state, action);
        case ALERT_VILLAGE_SHOW: return alertShow(state, action);
        case SET_FILTER_VILLAGE: return setFilter(state, action);
        case CLEAR_FILTER_VILLAGE: return clearFilter(state, action);
        default:
            return state;
    }
}

export default reducer;