import {  
    FETCH_VOUCHER_PROMO,
    FETCH_VOUCHER_PROMO_ERROR,
    FETCH_VOUCHER_PROMO_SUCCESS,
    VoucherPromo,
    VoucherPromoActionTypes,
    FetchVoucherPromoActionType,
    FetchVoucherPromoSuccessActionType,
    FetchVoucherPromoErrorActionType,
    SetPaginatorVoucherPromoActionType,
    SET_PAGINATOR_VOUCHER_PROMO,
    AlertVoucherPromoShowActionType,
    AlertVoucherPromoHideActionType,
    ALERT_VOUCHER_PROMO_HIDE,
    ALERT_VOUCHER_PROMO_SHOW,
    SET_FILTER_VOUCHER_PROMO,
    Filter,
    SetFilterVoucherPromoActionType,
    ClearFilterVoucherPromoActionType,
    CLEAR_FILTER_VOUCHER_PROMO
} from '../../types/admin/voucherPromo';

import { Paginator } from '../../types/paginator';
import { Alert } from '../../types/alert';

interface initialStateInterface {
    list: VoucherPromo[],
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
        amount: '',
        code: '',
        minimumPurchase: '',
        name: '',
        isLimited: '0',
        quantity: '',
        quota: ''
    },
    filtered: false
}

const alertHide = (state: initialStateInterface, action: AlertVoucherPromoHideActionType) => {
    return {
        ...state,
        alert: {
            ...initialState.alert
        }
    }
}

const alertShow = (state: initialStateInterface, action: AlertVoucherPromoShowActionType) => {
    return {
        ...state,
        alert: {
            color: action.color,
            message: action.message,
            visible: true
        }
    }
}

const fetchSuccess = (state: initialStateInterface, action: FetchVoucherPromoSuccessActionType) => {
    return {
        ...state,
        list: action.list,
        paginate: {
            ...initialState.paginate
        }
    }
}

const fetchError = (state: initialStateInterface, action: FetchVoucherPromoErrorActionType) => {
    return {
        ...initialState
    }
}

const setPaginator = (state: initialStateInterface, action: SetPaginatorVoucherPromoActionType) => {
    return {
        ...state,
        paginate: {
            ...action.paginate
        }
    }
}

const setFilter = (state: initialStateInterface, action: SetFilterVoucherPromoActionType) => {
    return {
        ...state,
        filter: {
            ...action.filter
        },
        filtered: true
    }
}

const clearFilter = (state: initialStateInterface, action: ClearFilterVoucherPromoActionType) => {
    return {
        ...state,
        filter: {
            ...initialState.filter
        },
        filtered: false
    }
}

const reducer = (state = initialState, action: VoucherPromoActionTypes) => {
    switch (action.type) {
        case SET_PAGINATOR_VOUCHER_PROMO: return setPaginator(state, action);
        case FETCH_VOUCHER_PROMO_SUCCESS: return fetchSuccess(state, action);
        case FETCH_VOUCHER_PROMO_ERROR: return fetchError(state, action);
        case ALERT_VOUCHER_PROMO_HIDE: return alertHide(state, action);
        case ALERT_VOUCHER_PROMO_SHOW: return alertShow(state, action);
        case SET_FILTER_VOUCHER_PROMO: return setFilter(state, action);
        case CLEAR_FILTER_VOUCHER_PROMO: return clearFilter(state, action);
        default:
            return state;
    }
}

export default reducer;