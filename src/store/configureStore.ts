import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import userReducer from '../reducers/admin/user';
import foodReducer from '../reducers/admin/food';
import foodCategoryReducer from '../reducers/admin/foodCategory';
import restaurantReducer from '../reducers/admin/restaurant';
import driverReducer from '../reducers/admin/driver';
import investorReducer from '../reducers/admin/investor';
import brandVehicleReducer from '../reducers/admin/brandVehicle';
import subBrandVehicleReducer from '../reducers/admin/subBrandVehicle';

const rootReducer = combineReducers({
    user: userReducer,
    food: foodReducer,
    foodCategory: foodCategoryReducer,
    driver: driverReducer,
    restaurant: restaurantReducer,
    brandVehicle: brandVehicleReducer,
    subBrandVehicle: subBrandVehicleReducer,
    investor: investorReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppState = ReturnType<typeof rootReducer>;

export default store;