import {  
    FETCH_COUNTRY,
    FETCH_COUNTRY_ERROR,
    FETCH_COUNTRY_SUCCESS,
    CountryList,
    CountryActionTypes,
    FetchCountryActionType,
    FetchCountrySuccessActionType,
    FetchCountryErrorActionType,
    SetPaginatorCountryActionType,
    SET_PAGINATOR_COUNTRY,
    AlertCountryShowActionType,
    AlertCountryHideActionType,
    ALERT_COUNTRY_HIDE,
    ALERT_COUNTRY_SHOW,
    SET_FILTER_COUNTRY,
    Filter,
    SetFilterCountryActionType,
    ClearFilterCountryActionType,
    CLEAR_FILTER_COUNTRY
} from '../../../types/admin/region/country';

import { Paginator } from '../../../types/paginator';
import { Alert } from '../../../types/alert';

type initialStateInterface = {
    list: CountryList[],
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
        name: ''
    },
    filtered: false
}

const alertHide = (state: initialStateInterface, action: AlertCountryHideActionType) => {
    return {
        ...state,
        alert: {
            ...initialState.alert
        }
    }
}

const alertShow = (state: initialStateInterface, action: AlertCountryShowActionType) => {
    return {
        ...state,
        alert: {
            color: action.color,
            message: action.message,
            visible: true
        }
    }
}

const fetchSuccess = (state: initialStateInterface, action: FetchCountrySuccessActionType) => {
    return {
        ...state,
        list: action.list,
        paginate: {
            ...initialState.paginate
        }
    }
}

const fetchError = (state: initialStateInterface, action: FetchCountryErrorActionType) => {
    return {
        ...initialState
    }
}

const setPaginator = (state: initialStateInterface, action: SetPaginatorCountryActionType) => {
    return {
        ...state,
        paginate: {
            ...action.paginate
        }
    }
}

const setFilter = (state: initialStateInterface, action: SetFilterCountryActionType) => {
    return {
        ...state,
        filter: {
            ...action.filter
        },
        filtered: true
    }
}

const clearFilter = (state: initialStateInterface, action: ClearFilterCountryActionType) => {
    return {
        ...state,
        filter: {
            ...initialState.filter
        },
        filtered: false
    }
}

const reducer = (state = initialState, action: CountryActionTypes) => {
    switch (action.type) {
        case SET_PAGINATOR_COUNTRY: return setPaginator(state, action);
        case FETCH_COUNTRY_SUCCESS: return fetchSuccess(state, action);
        case FETCH_COUNTRY_ERROR: return fetchError(state, action);
        case ALERT_COUNTRY_HIDE: return alertHide(state, action);
        case ALERT_COUNTRY_SHOW: return alertShow(state, action);
        case SET_FILTER_COUNTRY: return setFilter(state, action);
        case CLEAR_FILTER_COUNTRY: return clearFilter(state, action);
        default:
            return state;
    }
}

export default reducer;