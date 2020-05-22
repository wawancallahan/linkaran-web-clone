import {  
    FETCH_CUSTOMER,
    FETCH_CUSTOMER_ERROR,
    FETCH_CUSTOMER_SUCCESS,
    CustomerList,
    CustomerActionTypes,
    FetchCustomerActionType,
    FetchCustomerSuccessActionType,
    FetchCustomerErrorActionType,
    SetPaginatorCustomerActionType,
    SET_PAGINATOR_CUSTOMER,
    AlertCustomerShowActionType,
    AlertCustomerHideActionType,
    ALERT_CUSTOMER_HIDE,
    ALERT_CUSTOMER_SHOW,
    SET_FILTER_CUSTOMER,
    Filter,
    SetFilterCustomerActionType,
    ClearFilterCustomerActionType,
    CLEAR_FILTER_CUSTOMER
} from '../../types/admin/customer';

import { Paginator } from '../../types/paginator';
import { Alert } from '../../types/alert';

type initialStateInterface = {
    list: CustomerList[],
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
        email: '',
        phoneNumber: ''
    },
    filtered: false
}

const alertHide = (state: initialStateInterface, action: AlertCustomerHideActionType) => {
    return {
        ...state,
        alert: {
            ...initialState.alert
        }
    }
}

const alertShow = (state: initialStateInterface, action: AlertCustomerShowActionType) => {
    return {
        ...state,
        alert: {
            color: action.color,
            message: action.message,
            visible: true
        }
    }
}

const fetchSuccess = (state: initialStateInterface, action: FetchCustomerSuccessActionType) => {
    return {
        ...state,
        list: action.list,
        paginate: {
            ...initialState.paginate
        }
    }
}

const fetchError = (state: initialStateInterface, action: FetchCustomerErrorActionType) => {
    return {
        ...initialState
    }
}

const setPaginator = (state: initialStateInterface, action: SetPaginatorCustomerActionType) => {
    return {
        ...state,
        paginate: {
            ...action.paginate
        }
    }
}

const setFilter = (state: initialStateInterface, action: SetFilterCustomerActionType) => {
    return {
        ...state,
        filter: {
            ...action.filter
        },
        filtered: true
    }
}

const clearFilter = (state: initialStateInterface, action: ClearFilterCustomerActionType) => {
    return {
        ...state,
        filter: {
            ...initialState.filter
        },
        filtered: false
    }
}


const reducer = (state = initialState, action: CustomerActionTypes) => {
    switch (action.type) {
        case SET_PAGINATOR_CUSTOMER: return setPaginator(state, action);
        case FETCH_CUSTOMER_SUCCESS: return fetchSuccess(state, action);
        case FETCH_CUSTOMER_ERROR: return fetchError(state, action);
        case ALERT_CUSTOMER_HIDE: return alertHide(state, action);
        case ALERT_CUSTOMER_SHOW: return alertShow(state, action);
        case SET_FILTER_CUSTOMER: return setFilter(state, action);
        case CLEAR_FILTER_CUSTOMER: return clearFilter(state, action);
        default:
            return state;
    }
}

export default reducer;