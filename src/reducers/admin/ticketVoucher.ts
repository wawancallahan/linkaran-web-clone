import {  
    FETCH_TICKET_VOUCHER,
    FETCH_TICKET_VOUCHER_ERROR,
    FETCH_TICKET_VOUCHER_SUCCESS,
    TicketList,
    TicketActionTypes,
    FetchTicketVoucherActionType,
    FetchTicketVoucherSuccessActionType,
    FetchTicketVoucherErrorActionType,
    SetPaginatorTicketVoucherActionType,
    SET_PAGINATOR_TICKET_VOUCHER,
} from '../../types/admin/ticket';

import { Paginator } from '../../types/paginator';
import { Alert } from '../../types/alert';

export type State = {
    list: TicketList[],
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

const fetchSuccess = (state: State, action: FetchTicketVoucherSuccessActionType) => {
    return {
        ...state,
        list: action.list,
        paginate: {
            ...defaultState.paginate
        }
    }
}

const fetchError = (state: State, action: FetchTicketVoucherErrorActionType) => {
    return {
        ...defaultState
    }
}

const setPaginator = (state: State, action: SetPaginatorTicketVoucherActionType) => {
    return {
        ...state,
        paginate: {
            ...action.paginate
        }
    }
}

const reducer = (state = defaultState, action: TicketActionTypes) => {
    switch (action.type) {
        case SET_PAGINATOR_TICKET_VOUCHER: return setPaginator(state, action);
        case FETCH_TICKET_VOUCHER_SUCCESS: return fetchSuccess(state, action);
        case FETCH_TICKET_VOUCHER_ERROR: return fetchError(state, action);
        default:
            return state;
    }
}

export default reducer;