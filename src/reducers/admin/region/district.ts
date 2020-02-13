import {  
    FETCH_DISTRICT,
    FETCH_DISTRICT_ERROR,
    FETCH_DISTRICT_SUCCESS,
    DistrictList,
    DistrictActionTypes,
    FetchDistrictActionType,
    FetchDistrictSuccessActionType,
    FetchDistrictErrorActionType,
    SetPaginatorDistrictActionType,
    SET_PAGINATOR_DISTRICT,
    AlertDistrictShowActionType,
    AlertDistrictHideActionType,
    ALERT_DISTRICT_HIDE,
    ALERT_DISTRICT_SHOW
} from '../../../types/admin/region/district';

import { Paginator } from '../../../types/paginator';
import { Alert } from '../../../types/alert';

interface initialStateInterface {
    list: DistrictList[],
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

const alertHide = (state: initialStateInterface, action: AlertDistrictHideActionType) => {
    return {
        ...state,
        alert: {
            ...initialState.alert
        }
    }
}

const alertShow = (state: initialStateInterface, action: AlertDistrictShowActionType) => {
    return {
        ...state,
        alert: {
            color: action.color,
            message: action.message,
            visible: true
        }
    }
}

const fetchSuccess = (state: initialStateInterface, action: FetchDistrictSuccessActionType) => {
    return {
        ...state,
        list: action.list,
        paginate: {
            ...initialState.paginate
        }
    }
}

const fetchError = (state: initialStateInterface, action: FetchDistrictErrorActionType) => {
    return {
        ...initialState
    }
}

const setPaginator = (state: initialStateInterface, action: SetPaginatorDistrictActionType) => {
    return {
        ...state,
        paginate: {
            ...action.paginate
        }
    }
}

const reducer = (state = initialState, action: DistrictActionTypes) => {
    switch (action.type) {
        case SET_PAGINATOR_DISTRICT: return setPaginator(state, action);
        case FETCH_DISTRICT_SUCCESS: return fetchSuccess(state, action);
        case FETCH_DISTRICT_ERROR: return fetchError(state, action);
        case ALERT_DISTRICT_HIDE: return alertHide(state, action);
        case ALERT_DISTRICT_SHOW: return alertShow(state, action);
        default:
            return state;
    }
}

export default reducer;