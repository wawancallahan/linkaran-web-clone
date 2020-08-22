import {  
    FETCH_VOUCHER_PROMO_ERROR,
    FETCH_VOUCHER_PROMO_SUCCESS,
    VoucherPromoList,
    VoucherPromoActionTypes,
    FetchVoucherPromoSuccessActionType,
    FetchVoucherPromoErrorActionType,
    SetPaginatorVoucherPromoActionType,
    SET_PAGINATOR_VOUCHER_PROMO,
    AlertVoucherPromoShowActionType,
    AlertVoucherPromoHideActionType,
    ALERT_VOUCHER_PROMO_HIDE,
    ALERT_VOUCHER_PROMO_SHOW,
} from '../../types/admin/voucherPromo';

import { Paginator } from '../../types/paginator';
import { Alert } from '../../types/alert';

export type State = {
    list: VoucherPromoList[],
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

const alertHide = (state: State, action: AlertVoucherPromoHideActionType) => {
    return {
        ...state,
        alert: {
            ...defaultState.alert
        }
    }
}

const alertShow = (state: State, action: AlertVoucherPromoShowActionType) => {
    return {
        ...state,
        alert: {
            color: action.color,
            message: action.message,
            visible: true
        }
    }
}

const fetchSuccess = (state: State, action: FetchVoucherPromoSuccessActionType) => {
    return {
        ...state,
        list: action.list,
        paginate: {
            ...defaultState.paginate
        }
    }
}

const fetchError = (state: State, action: FetchVoucherPromoErrorActionType) => {
    return {
        ...defaultState
    }
}

const setPaginator = (state: State, action: SetPaginatorVoucherPromoActionType) => {
    return {
        ...state,
        paginate: {
            ...action.paginate
        }
    }
}

const reducer = (state = defaultState, action: VoucherPromoActionTypes) => {
    switch (action.type) {
        case SET_PAGINATOR_VOUCHER_PROMO: return setPaginator(state, action);
        case FETCH_VOUCHER_PROMO_SUCCESS: return fetchSuccess(state, action);
        case FETCH_VOUCHER_PROMO_ERROR: return fetchError(state, action);
        case ALERT_VOUCHER_PROMO_HIDE: return alertHide(state, action);
        case ALERT_VOUCHER_PROMO_SHOW: return alertShow(state, action);
        default:
            return state;
    }
}

export default reducer;