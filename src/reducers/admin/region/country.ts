import {  
    FETCH_COUNTRY_ERROR,
    FETCH_COUNTRY_SUCCESS,
    CountryList,
    CountryActionTypes,
    FetchCountrySuccessActionType,
    FetchCountryErrorActionType,
    SetPaginatorCountryActionType,
    SET_PAGINATOR_COUNTRY,
    AlertCountryShowActionType,
    AlertCountryHideActionType,
    ALERT_COUNTRY_HIDE,
    ALERT_COUNTRY_SHOW,
} from '../../../types/admin/region/country';

import { Paginator } from '../../../types/paginator';
import { Alert } from '../../../types/alert';

export type State = {
    list: CountryList[],
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

const alertHide = (state: State, action: AlertCountryHideActionType) => {
    return {
        ...state,
        alert: {
            ...defaultState.alert
        }
    }
}

const alertShow = (state: State, action: AlertCountryShowActionType) => {
    return {
        ...state,
        alert: {
            color: action.color,
            message: action.message,
            visible: true
        }
    }
}

const fetchSuccess = (state: State, action: FetchCountrySuccessActionType) => {
    return {
        ...state,
        list: action.list,
        paginate: {
            ...defaultState.paginate
        }
    }
}

const fetchError = (state: State, action: FetchCountryErrorActionType) => {
    return {
        ...defaultState
    }
}

const setPaginator = (state: State, action: SetPaginatorCountryActionType) => {
    return {
        ...state,
        paginate: {
            ...action.paginate
        }
    }
}

const reducer = (state = defaultState, action: CountryActionTypes) => {
    switch (action.type) {
        case SET_PAGINATOR_COUNTRY: return setPaginator(state, action);
        case FETCH_COUNTRY_SUCCESS: return fetchSuccess(state, action);
        case FETCH_COUNTRY_ERROR: return fetchError(state, action);
        case ALERT_COUNTRY_HIDE: return alertHide(state, action);
        case ALERT_COUNTRY_SHOW: return alertShow(state, action);
        default:
            return state;
    }
}

export default reducer;