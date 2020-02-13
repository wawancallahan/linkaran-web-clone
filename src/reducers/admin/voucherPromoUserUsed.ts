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

interface initialStateInterface {
    list: VoucherPromoUserUsed[],
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

const fetchSuccess = (state: initialStateInterface, action: FetchVoucherPromoUserUsedSuccessActionType) => {
    return {
        ...state,
        list: action.list,
        paginate: {
            ...initialState.paginate
        }
    }
}

const fetchError = (state: initialStateInterface, action: FetchVoucherPromoUserUsedErrorActionType) => {
    return {
        ...initialState
    }
}

const setPaginator = (state: initialStateInterface, action: SetPaginatorVoucherPromoUserUsedActionType) => {
    return {
        ...state,
        paginate: {
            ...action.paginate
        }
    }
}

const reducer = (state = initialState, action: VoucherPromoActionTypes) => {
    switch (action.type) {
        case SET_PAGINATOR_VOUCHER_PROMO_USER_USED: return setPaginator(state, action);
        case FETCH_VOUCHER_PROMO_USER_USED_SUCCESS: return fetchSuccess(state, action);
        case FETCH_VOUCHER_PROMO_USER_USED_ERROR: return fetchError(state, action);
        default:
            return state;
    }
}

export default reducer;