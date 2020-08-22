import {  
    FETCH_CUSTOMER_ERROR,
    FETCH_CUSTOMER_SUCCESS,
    CustomerList,
    CustomerActionTypes,
    FetchCustomerSuccessActionType,
    FetchCustomerErrorActionType,
    SetPaginatorCustomerActionType,
    SET_PAGINATOR_CUSTOMER,
    AlertCustomerShowActionType,
    AlertCustomerHideActionType,
    ALERT_CUSTOMER_HIDE,
    ALERT_CUSTOMER_SHOW,
} from '../../types/admin/customer';

import { Paginator } from '../../types/paginator';
import { Alert } from '../../types/alert';

export type State = {
    list: CustomerList[],
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

const alertHide = (state: State, action: AlertCustomerHideActionType) => {
    return {
        ...state,
        alert: {
            ...defaultState.alert
        }
    }
}

const alertShow = (state: State, action: AlertCustomerShowActionType) => {
    return {
        ...state,
        alert: {
            color: action.color,
            message: action.message,
            visible: true
        }
    }
}

const fetchSuccess = (state: State, action: FetchCustomerSuccessActionType) => {
    return {
        ...state,
        list: action.list,
        paginate: {
            ...defaultState.paginate
        }
    }
}

const fetchError = (state: State, action: FetchCustomerErrorActionType) => {
    return {
        ...defaultState
    }
}

const setPaginator = (state: State, action: SetPaginatorCustomerActionType) => {
    return {
        ...state,
        paginate: {
            ...action.paginate
        }
    }
}

const reducer = (state = defaultState, action: CustomerActionTypes) => {
    switch (action.type) {
        case SET_PAGINATOR_CUSTOMER: return setPaginator(state, action);
        case FETCH_CUSTOMER_SUCCESS: return fetchSuccess(state, action);
        case FETCH_CUSTOMER_ERROR: return fetchError(state, action);
        case ALERT_CUSTOMER_HIDE: return alertHide(state, action);
        case ALERT_CUSTOMER_SHOW: return alertShow(state, action);
        default:
            return state;
    }
}

export default reducer;