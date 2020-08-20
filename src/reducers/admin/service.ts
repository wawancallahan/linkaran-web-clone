import {  
    FETCH_SERVICE_ERROR,
    FETCH_SERVICE_SUCCESS,
    ServiceList,
    ServiceActionTypes,
    FetchServiceSuccessActionType,
    FetchServiceErrorActionType,
    SetPaginatorServiceActionType,
    SET_PAGINATOR_SERVICE,
    AlertServiceShowActionType,
    AlertServiceHideActionType,
    ALERT_SERVICE_HIDE,
    ALERT_SERVICE_SHOW,
} from '../../types/admin/service';

import { Paginator } from '../../types/paginator';
import { Alert } from '../../types/alert';

type initialStateInterface = {
    list: ServiceList[],
    paginate: Paginator,
    alert: Alert,
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
}

const alertHide = (state: initialStateInterface, action: AlertServiceHideActionType) => {
    return {
        ...state,
        alert: {
            ...initialState.alert
        }
    }
}

const alertShow = (state: initialStateInterface, action: AlertServiceShowActionType) => {
    return {
        ...state,
        alert: {
            color: action.color,
            message: action.message,
            visible: true
        }
    }
}

const fetchSuccess = (state: initialStateInterface, action: FetchServiceSuccessActionType) => {
    return {
        ...state,
        list: action.list,
        paginate: {
            ...initialState.paginate
        }
    }
}

const fetchError = (state: initialStateInterface, action: FetchServiceErrorActionType) => {
    return {
        ...initialState
    }
}

const setPaginator = (state: initialStateInterface, action: SetPaginatorServiceActionType) => {
    return {
        ...state,
        paginate: {
            ...action.paginate
        }
    }
}

const reducer = (state = initialState, action: ServiceActionTypes) => {
    switch (action.type) {
        case SET_PAGINATOR_SERVICE: return setPaginator(state, action);
        case FETCH_SERVICE_SUCCESS: return fetchSuccess(state, action);
        case FETCH_SERVICE_ERROR: return fetchError(state, action);
        case ALERT_SERVICE_HIDE: return alertHide(state, action);
        case ALERT_SERVICE_SHOW: return alertShow(state, action);
        default:
            return state;
    }
}

export default reducer;