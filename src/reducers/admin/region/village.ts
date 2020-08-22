import {  
    FETCH_VILLAGE_ERROR,
    FETCH_VILLAGE_SUCCESS,
    VillageList,
    VillageActionTypes,
    FetchVillageSuccessActionType,
    FetchVillageErrorActionType,
    SetPaginatorVillageActionType,
    SET_PAGINATOR_VILLAGE,
    AlertVillageShowActionType,
    AlertVillageHideActionType,
    ALERT_VILLAGE_HIDE,
    ALERT_VILLAGE_SHOW,
} from '../../../types/admin/region/village';

import { Paginator } from '../../../types/paginator';
import { Alert } from '../../../types/alert';

export type State = {
    list: VillageList[],
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

const alertHide = (state: State, action: AlertVillageHideActionType) => {
    return {
        ...state,
        alert: {
            ...defaultState.alert
        }
    }
}

const alertShow = (state: State, action: AlertVillageShowActionType) => {
    return {
        ...state,
        alert: {
            color: action.color,
            message: action.message,
            visible: true
        }
    }
}

const fetchSuccess = (state: State, action: FetchVillageSuccessActionType) => {
    return {
        ...state,
        list: action.list,
        paginate: {
            ...defaultState.paginate
        }
    }
}

const fetchError = (state: State, action: FetchVillageErrorActionType) => {
    return {
        ...defaultState
    }
}

const setPaginator = (state: State, action: SetPaginatorVillageActionType) => {
    return {
        ...state,
        paginate: {
            ...action.paginate
        }
    }
}

const reducer = (state = defaultState, action: VillageActionTypes) => {
    switch (action.type) {
        case SET_PAGINATOR_VILLAGE: return setPaginator(state, action);
        case FETCH_VILLAGE_SUCCESS: return fetchSuccess(state, action);
        case FETCH_VILLAGE_ERROR: return fetchError(state, action);
        case ALERT_VILLAGE_HIDE: return alertHide(state, action);
        case ALERT_VILLAGE_SHOW: return alertShow(state, action);
        default:
            return state;
    }
}

export default reducer;