import {  
    FETCH_VOUCHER_TYPE_ERROR,
    FETCH_VOUCHER_TYPE_SUCCESS,
    VoucherTypeList,
    VoucherTypeActionTypes,
    FetchVoucherTypeSuccessActionType,
    FetchVoucherTypeErrorActionType,
    SetPaginatorVoucherTypeActionType,
    SET_PAGINATOR_VOUCHER_TYPE,
    AlertVoucherTypeShowActionType,
    AlertVoucherTypeHideActionType,
    ALERT_VOUCHER_TYPE_HIDE,
    ALERT_VOUCHER_TYPE_SHOW,
} from '../../types/admin/voucherType';

import { Paginator } from '../../types/paginator';
import { Alert } from '../../types/alert';

export type State = {
    list: VoucherTypeList[],
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

const alertHide = (state: State, action: AlertVoucherTypeHideActionType) => {
    return {
        ...state,
        alert: {
            ...defaultState.alert
        }
    }
}

const alertShow = (state: State, action: AlertVoucherTypeShowActionType) => {
    return {
        ...state,
        alert: {
            color: action.color,
            message: action.message,
            visible: true
        }
    }
}

const fetchSuccess = (state: State, action: FetchVoucherTypeSuccessActionType) => {
    return {
        ...state,
        list: action.list,
        paginate: {
            ...defaultState.paginate
        }
    }
}

const fetchError = (state: State, action: FetchVoucherTypeErrorActionType) => {
    return {
        ...defaultState
    }
}

const setPaginator = (state: State, action: SetPaginatorVoucherTypeActionType) => {
    return {
        ...state,
        paginate: {
            ...action.paginate
        }
    }
}

const reducer = (state = defaultState, action: VoucherTypeActionTypes) => {
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