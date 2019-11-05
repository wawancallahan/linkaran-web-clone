import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import userReducer from '../reducers/admin/user';
import driverReducer from '../reducers/admin/driver';

const rootReducer = combineReducers({
    user: userReducer,
    driver: driverReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppState = ReturnType<typeof rootReducer>;

export default store;