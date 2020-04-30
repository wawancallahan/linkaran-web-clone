import {  
    FETCH_BRAND_VEHICLE,
    FETCH_BRAND_VEHICLE_ERROR,
    FETCH_BRAND_VEHICLE_SUCCESS,
    BrandVehicle,
    BrandVehicleActionTypes,
    FetchBrandVehicleActionType,
    FetchBrandVehicleSuccessActionType,
    FetchBrandVehicleErrorActionType,
    SetPaginatorBrandVehicleActionType,
    SET_PAGINATOR_BRAND_VEHICLE,
    AlertBrandVehicleShowActionType,
    AlertBrandVehicleHideActionType,
    ALERT_BRAND_VEHICLE_HIDE,
    ALERT_BRAND_VEHICLE_SHOW,
    SET_FILTER_BRAND_VEHICLE,
    Filter,
    SetFilterBrandVehicleActionType,
    ClearFilterBrandVehicleActionType,
    CLEAR_FILTER_BRAND_VEHICLE
} from '../../types/admin/brandVehicle';

import { Paginator } from '../../types/paginator';
import { Alert } from '../../types/alert';

interface initialStateInterface {
    list: BrandVehicle[],
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

const alertHide = (state: initialStateInterface, action: AlertBrandVehicleHideActionType) => {
    return {
        ...state,
        alert: {
            ...initialState.alert
        }
    }
}

const alertShow = (state: initialStateInterface, action: AlertBrandVehicleShowActionType) => {
    return {
        ...state,
        alert: {
            color: action.color,
            message: action.message,
            visible: true
        }
    }
}

const fetchSuccess = (state: initialStateInterface, action: FetchBrandVehicleSuccessActionType) => {
    return {
        ...state,
        list: action.list,
        paginate: {
            ...initialState.paginate
        }
    }
}

const fetchError = (state: initialStateInterface, action: FetchBrandVehicleErrorActionType) => {
    return {
        ...initialState
    }
}

const setPaginator = (state: initialStateInterface, action: SetPaginatorBrandVehicleActionType) => {
    return {
        ...state,
        paginate: {
            ...action.paginate
        }
    }
}

const setFilter = (state: initialStateInterface, action: SetFilterBrandVehicleActionType) => {
    return {
        ...state,
        filter: {
            ...action.filter
        },
        filtered: true
    }
}

const clearFilter = (state: initialStateInterface, action: ClearFilterBrandVehicleActionType) => {
    return {
        ...state,
        filter: {
            ...initialState.filter
        },
        filtered: false
    }
}

const reducer = (state = initialState, action: BrandVehicleActionTypes) => {
    switch (action.type) {
        case SET_PAGINATOR_BRAND_VEHICLE: return setPaginator(state, action);
        case FETCH_BRAND_VEHICLE_SUCCESS: return fetchSuccess(state, action);
        case FETCH_BRAND_VEHICLE_ERROR: return fetchError(state, action);
        case ALERT_BRAND_VEHICLE_HIDE: return alertHide(state, action);
        case ALERT_BRAND_VEHICLE_SHOW: return alertShow(state, action);
        case SET_FILTER_BRAND_VEHICLE: return setFilter(state, action);
        case CLEAR_FILTER_BRAND_VEHICLE: return clearFilter(state, action);
        default:
            return state;
    }
}

export default reducer;