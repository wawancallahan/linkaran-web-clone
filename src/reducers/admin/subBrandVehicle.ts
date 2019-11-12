import {  
    FETCH_SUB_BRAND_VEHICLE,
    FETCH_SUB_BRAND_VEHICLE_ERROR,
    FETCH_SUB_BRAND_VEHICLE_SUCCESS,
    SubBrandVehicle,
    SubBrandVehicleActionTypes,
    FetchSubBrandVehicleActionType,
    FetchSubBrandVehicleSuccessActionType,
    FetchSubBrandVehicleErrorActionType,
    SetPaginatorSubBrandVehicleActionType,
    SET_PAGINATOR_SUB_BRAND_VEHICLE,
    AlertSubBrandVehicleShowActionType,
    AlertSubBrandVehicleHideActionType,
    ALERT_SUB_BRAND_VEHICLE_HIDE,
    ALERT_SUB_BRAND_VEHICLE_SHOW
} from '../../types/admin/subBrandVehicle';

import { Paginator } from '../../types/paginator';
import { Alert } from '../../types/alert';

interface initialStateInterface {
    list: SubBrandVehicle[],
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

const alertHide = (state: initialStateInterface, action: AlertSubBrandVehicleHideActionType) => {
    return {
        ...state,
        alert: {
            ...initialState.alert
        }
    }
}

const alertShow = (state: initialStateInterface, action: AlertSubBrandVehicleShowActionType) => {
    return {
        ...state,
        alert: {
            color: action.color,
            message: action.message,
            visible: true
        }
    }
}

const fetchSuccess = (state: initialStateInterface, action: FetchSubBrandVehicleSuccessActionType) => {
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

const fetchError = (state: initialStateInterface, action: FetchSubBrandVehicleErrorActionType) => {
    return {
        ...initialState
    }
}

const setPaginator = (state: initialStateInterface, action: SetPaginatorSubBrandVehicleActionType) => {
    return {
        ...state,
        paginate: {
            ...action.paginate
        }
    }
}

const reducer = (state = initialState, action: SubBrandVehicleActionTypes) => {
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