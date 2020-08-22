import {  
    FETCH_SUB_BRAND_VEHICLE_ERROR,
    FETCH_SUB_BRAND_VEHICLE_SUCCESS,
    SubBrandVehicleList,
    SubBrandVehicleActionTypes,
    FetchSubBrandVehicleSuccessActionType,
    FetchSubBrandVehicleErrorActionType,
    SetPaginatorSubBrandVehicleActionType,
    SET_PAGINATOR_SUB_BRAND_VEHICLE,
    AlertSubBrandVehicleShowActionType,
    AlertSubBrandVehicleHideActionType,
    ALERT_SUB_BRAND_VEHICLE_HIDE,
    ALERT_SUB_BRAND_VEHICLE_SHOW,
} from '../../types/admin/subBrandVehicle';

import { Paginator } from '../../types/paginator';
import { Alert } from '../../types/alert';

export type State = {
    list: SubBrandVehicleList[],
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

const alertHide = (state: State, action: AlertSubBrandVehicleHideActionType) => {
    return {
        ...state,
        alert: {
            ...defaultState.alert
        }
    }
}

const alertShow = (state: State, action: AlertSubBrandVehicleShowActionType) => {
    return {
        ...state,
        alert: {
            color: action.color,
            message: action.message,
            visible: true
        }
    }
}

const fetchSuccess = (state: State, action: FetchSubBrandVehicleSuccessActionType) => {
    return {
        ...state,
        list: action.list,
        paginate: {
            ...defaultState.paginate
        }
    }
}

const fetchError = (state: State, action: FetchSubBrandVehicleErrorActionType) => {
    return {
        ...defaultState
    }
}

const setPaginator = (state: State, action: SetPaginatorSubBrandVehicleActionType) => {
    return {
        ...state,
        paginate: {
            ...action.paginate
        }
    }
}

const reducer = (state = defaultState, action: SubBrandVehicleActionTypes) => {
    switch (action.type) {
        case SET_PAGINATOR_SUB_BRAND_VEHICLE: return setPaginator(state, action);
        case FETCH_SUB_BRAND_VEHICLE_SUCCESS: return fetchSuccess(state, action);
        case FETCH_SUB_BRAND_VEHICLE_ERROR: return fetchError(state, action);
        case ALERT_SUB_BRAND_VEHICLE_HIDE: return alertHide(state, action);
        case ALERT_SUB_BRAND_VEHICLE_SHOW: return alertShow(state, action);
        default:
            return state;
    }
}

export default reducer;