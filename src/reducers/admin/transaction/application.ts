import {  
    FETCH_APPLICATION,
    FETCH_APPLICATION_ERROR,
    FETCH_APPLICATION_SUCCESS,
    Application,
    ApplicationActionTypes,
    FetchApplicationActionType,
    FetchApplicationSuccessActionType,
    FetchApplicationErrorActionType,
    SetPaginatorApplicationActionType,
    SET_PAGINATOR_APPLICATION,
    AlertApplicationShowActionType,
    AlertApplicationHideActionType,
    ALERT_APPLICATION_HIDE,
    ALERT_APPLICATION_SHOW
} from '../../../types/admin/transaction/application';

import { Paginator } from '../../../types/paginator';
import { Alert } from '../../../types/alert';

interface initialStateInterface {
    list: Application[],
    paginate: Paginator,
    alert: Alert
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
    }
}

const alertHide = (state: initialStateInterface, action: AlertApplicationHideActionType) => {
    return {
        ...state,
        alert: {
            ...initialState.alert
        }
    }
}

const alertShow = (state: initialStateInterface, action: AlertApplicationShowActionType) => {
    return {
        ...state,
        alert: {
            color: action.color,
            message: action.message,
            visible: true
        }
    }
}

const fetchSuccess = (state: initialStateInterface, action: FetchApplicationSuccessActionType) => {
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

const fetchError = (state: initialStateInterface, action: FetchApplicationErrorActionType) => {
    return {
        ...initialState
    }
}

const setPaginator = (state: initialStateInterface, action: SetPaginatorApplicationActionType) => {
    return {
        ...state,
        paginate: {
            ...action.paginate
        }
    }
}

const reducer = (state = initialState, action: ApplicationActionTypes) => {
    switch (action.type) {
        case SET_PAGINATOR_APPLICATION: return setPaginator(state, action);
        case FETCH_APPLICATION_SUCCESS: return fetchSuccess(state, action);
        case FETCH_APPLICATION_ERROR: return fetchError(state, action);
        case ALERT_APPLICATION_HIDE: return alertHide(state, action);
        case ALERT_APPLICATION_SHOW: return alertShow(state, action);
        default:
            return state;
    }
}

export default reducer;