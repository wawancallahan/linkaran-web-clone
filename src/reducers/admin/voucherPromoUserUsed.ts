import {  
    FETCH_VOUCHER_PROMO_USER_USED_ERROR,
    FETCH_VOUCHER_PROMO_USER_USED_SUCCESS,
    VoucherPromoUserUsed,
    VoucherPromoActionTypes,
    FetchVoucherPromoUserUsedSuccessActionType,
    FetchVoucherPromoUserUsedErrorActionType,
    SetPaginatorVoucherPromoUserUsedActionType,
    SET_PAGINATOR_VOUCHER_PROMO_USER_USED
} from '../../types/admin/voucherPromo';

import { Paginator } from '../../types/paginator';
import { Alert } from '../../types/alert';

export type State = {
    list: VoucherPromoUserUsed[],
    paginate: Paginator,
    alert: Alert
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
    }
}

const fetchSuccess = (state: State, action: FetchVoucherPromoUserUsedSuccessActionType) => {
    return {
        ...state,
        list: action.list,
        paginate: {
            ...defaultState.paginate
        }
    }
}

const fetchError = (state: State, action: FetchVoucherPromoUserUsedErrorActionType) => {
    return {
        ...defaultState
    }
}

const setPaginator = (state: State, action: SetPaginatorVoucherPromoUserUsedActionType) => {
    return {
        ...state,
        paginate: {
            ...action.paginate
        }
    }
}

const reducer = (state = defaultState, action: VoucherPromoActionTypes) => {
    switch (action.type) {
        case SET_PAGINATOR_VOUCHER_PROMO_USER_USED: return setPaginator(state, action);
        case FETCH_VOUCHER_PROMO_USER_USED_SUCCESS: return fetchSuccess(state, action);
        case FETCH_VOUCHER_PROMO_USER_USED_ERROR: return fetchError(state, action);
        default:
            return state;
    }
}

export default reducer;