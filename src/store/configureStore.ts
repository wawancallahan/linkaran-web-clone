import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import userReducer from '../reducers/admin/user';
import foodCategoryReducer from '../reducers/admin/foodCategory';
import restaurantReducer from '../reducers/admin/restaurant';
import driverReducer from '../reducers/admin/driver';

const rootReducer = combineReducers({
    user: userReducer,
    foodCategory: foodCategoryReducer,
    driver: driverReducer,
    restaurant: restaurantReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppState = ReturnType<typeof rootReducer>;

export default store;