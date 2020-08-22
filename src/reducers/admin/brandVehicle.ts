import {  
    FETCH_BRAND_VEHICLE_ERROR,
    FETCH_BRAND_VEHICLE_SUCCESS,
    BrandVehicleList,
    BrandVehicleActionTypes,
    FetchBrandVehicleSuccessActionType,
    FetchBrandVehicleErrorActionType,
    SetPaginatorBrandVehicleActionType,
    SET_PAGINATOR_BRAND_VEHICLE,
    AlertBrandVehicleShowActionType,
    AlertBrandVehicleHideActionType,
    ALERT_BRAND_VEHICLE_HIDE,
    ALERT_BRAND_VEHICLE_SHOW,
} from '../../types/admin/brandVehicle';

import { Paginator } from '../../types/paginator';
import { Alert } from '../../types/alert';

export type State = {
    list: BrandVehicleList[],
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

const alertHide = (state: State, action: AlertBrandVehicleHideActionType) => {
    return {
        ...state,
        alert: {
            ...defaultState.alert
        }
    }
}

const alertShow = (state: State, action: AlertBrandVehicleShowActionType) => {
    return {
        ...state,
        alert: {
            color: action.color,
            message: action.message,
            visible: true
        }
    }
}

const fetchSuccess = (state: State, action: FetchBrandVehicleSuccessActionType) => {
    return {
        ...state,
        list: action.list,
        paginate: {
            ...defaultState.paginate
        }
    }
}

const fetchError = (state: State, action: FetchBrandVehicleErrorActionType) => {
    return {
        ...defaultState
    }
}

const setPaginator = (state: State, action: SetPaginatorBrandVehicleActionType) => {
    return {
        ...state,
        paginate: {
            ...action.paginate
        }
    }
}

const reducer = (state = defaultState, action: BrandVehicleActionTypes) => {
    switch (action.type) {
        case SET_PAGINATOR_BRAND_VEHICLE: return setPaginator(state, action);
        case FETCH_BRAND_VEHICLE_SUCCESS: return fetchSuccess(state, action);
        case FETCH_BRAND_VEHICLE_ERROR: return fetchError(state, action);
        case ALERT_BRAND_VEHICLE_HIDE: return alertHide(state, action);
        case ALERT_BRAND_VEHICLE_SHOW: return alertShow(state, action);
        default:
            return state;
    }
}

export default reducer;