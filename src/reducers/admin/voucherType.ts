import {  
    FETCH_VOUCHER_TYPE,
    FETCH_VOUCHER_TYPE_ERROR,
    FETCH_VOUCHER_TYPE_SUCCESS,
    VoucherType,
    VoucherTypeActionTypes,
    FetchVoucherTypeActionType,
    FetchVoucherTypeSuccessActionType,
    FetchVoucherTypeErrorActionType,
    SetPaginatorVoucherTypeActionType,
    SET_PAGINATOR_VOUCHER_TYPE,
    AlertVoucherTypeShowActionType,
    AlertVoucherTypeHideActionType,
    ALERT_VOUCHER_TYPE_HIDE,
    ALERT_VOUCHER_TYPE_SHOW
} from '../../types/admin/voucherType';

import { Paginator } from '../../types/paginator';
import { Alert } from '../../types/alert';

interface initialStateInterface {
    list: VoucherType[],
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

const alertHide = (state: initialStateInterface, action: AlertVoucherTypeHideActionType) => {
    return {
        ...state,
        alert: {
            ...initialState.alert
        }
    }
}

const alertShow = (state: initialStateInterface, action: AlertVoucherTypeShowActionType) => {
    return {
        ...state,
        alert: {
            color: action.color,
            message: action.message,
            visible: true
        }
    }
}

const fetchSuccess = (state: initialStateInterface, action: FetchVoucherTypeSuccessActionType) => {
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

const fetchError = (state: initialStateInterface, action: FetchVoucherTypeErrorActionType) => {
    return {
        ...initialState
    }
}

const setPaginator = (state: initialStateInterface, action: SetPaginatorVoucherTypeActionType) => {
    return {
        ...state,
        paginate: {
            ...action.paginate
        }
    }
}

const reducer = (state = initialState, action: VoucherTypeActionTypes) => {
    switch (action.type) {
        case SET_PAGINATOR_VOUCHER_TYPE: return setPaginator(state, action);
        case FETCH_VOUCHER_TYPE_SUCCESS: return fetchSuccess(state, action);
        case FETCH_VOUCHER_TYPE_ERROR: return fetchError(state, action);
        case ALERT_VOUCHER_TYPE_HIDE: return alertHide(state, action);
        case ALERT_VOUCHER_TYPE_SHOW: return alertShow(state, action);
        default:
            return state;
    }
}

export default reducer;