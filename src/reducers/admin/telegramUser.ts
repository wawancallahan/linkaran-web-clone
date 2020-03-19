import {  
    FETCH_TELEGRAM_USER,
    FETCH_TELEGRAM_USER_ERROR,
    FETCH_TELEGRAM_USER_SUCCESS,
    TelegramUserList,
    TelegramUserActionTypes,
    FetchTelegramUserActionType,
    FetchTelegramUserSuccessActionType,
    FetchTelegramUserErrorActionType,
    SetPaginatorTelegramUserActionType,
    SET_PAGINATOR_TELEGRAM_USER,
    AlertTelegramUserShowActionType,
    AlertTelegramUserHideActionType,
    ALERT_TELEGRAM_USER_HIDE,
    ALERT_TELEGRAM_USER_SHOW
} from '../../types/admin/telegramUser';

import { Paginator } from '../../types/paginator';
import { Alert } from '../../types/alert';

interface initialStateInterface {
    list: TelegramUserList[],
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

const alertHide = (state: initialStateInterface, action: AlertTelegramUserHideActionType) => {
    return {
        ...state,
        alert: {
            ...initialState.alert
        }
    }
}

const alertShow = (state: initialStateInterface, action: AlertTelegramUserShowActionType) => {
    return {
        ...state,
        alert: {
            color: action.color,
            message: action.message,
            visible: true
        }
    }
}

const fetchSuccess = (state: initialStateInterface, action: FetchTelegramUserSuccessActionType) => {
    return {
        ...state,
        list: action.list,
        paginate: {
            ...initialState.paginate
        }
    }
}

const fetchError = (state: initialStateInterface, action: FetchTelegramUserErrorActionType) => {
    return {
        ...initialState
    }
}

const setPaginator = (state: initialStateInterface, action: SetPaginatorTelegramUserActionType) => {
    return {
        ...state,
        paginate: {
            ...action.paginate
        }
    }
}

const reducer = (state = initialState, action: TelegramUserActionTypes) => {
    switch (action.type) {
        case SET_PAGINATOR_TELEGRAM_USER: return setPaginator(state, action);
        case FETCH_TELEGRAM_USER_SUCCESS: return fetchSuccess(state, action);
        case FETCH_TELEGRAM_USER_ERROR: return fetchError(state, action);
        case ALERT_TELEGRAM_USER_HIDE: return alertHide(state, action);
        case ALERT_TELEGRAM_USER_SHOW: return alertShow(state, action);
        default:
            return state;
    }
}

export default reducer;