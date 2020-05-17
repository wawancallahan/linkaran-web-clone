import {  
    FETCH_TICKET,
    FETCH_TICKET_ERROR,
    FETCH_TICKET_SUCCESS,
    TicketList,
    TicketActionTypes,
    FetchTicketActionType,
    FetchTicketSuccessActionType,
    FetchTicketErrorActionType,
    SetPaginatorTicketActionType,
    SET_PAGINATOR_TICKET,
    AlertTicketShowActionType,
    AlertTicketHideActionType,
    ALERT_TICKET_HIDE,
    ALERT_TICKET_SHOW
} from '../../types/admin/ticket';

import { Paginator } from '../../types/paginator';
import { Alert } from '../../types/alert';

interface initialStateInterface {
    list: TicketList[],
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

const alertHide = (state: initialStateInterface, action: AlertTicketHideActionType) => {
    return {
        ...state,
        alert: {
            ...initialState.alert
        }
    }
}

const alertShow = (state: initialStateInterface, action: AlertTicketShowActionType) => {
    return {
        ...state,
        alert: {
            color: action.color,
            message: action.message,
            visible: true
        }
    }
}

const fetchSuccess = (state: initialStateInterface, action: FetchTicketSuccessActionType) => {
    return {
        ...state,
        list: action.list,
        paginate: {
            ...initialState.paginate
        }
    }
}

const fetchError = (state: initialStateInterface, action: FetchTicketErrorActionType) => {
    return {
        ...initialState
    }
}

const setPaginator = (state: initialStateInterface, action: SetPaginatorTicketActionType) => {
    return {
        ...state,
        paginate: {
            ...action.paginate
        }
    }
}

const reducer = (state = initialState, action: TicketActionTypes) => {
    switch (action.type) {
        case SET_PAGINATOR_TICKET: return setPaginator(state, action);
        case FETCH_TICKET_SUCCESS: return fetchSuccess(state, action);
        case FETCH_TICKET_ERROR: return fetchError(state, action);
        case ALERT_TICKET_HIDE: return alertHide(state, action);
        case ALERT_TICKET_SHOW: return alertShow(state, action);
        default:
            return state;
    }
}

export default reducer;