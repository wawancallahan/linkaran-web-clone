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
import transactionLinkPayReducer from '../reducers/admin/transaction/linkPay';
import transactionApplicationReducer from '../reducers/admin/transaction/application';
import accountLinkPayReducer from '../reducers/admin/account/linkPay';
import servicePriceReducer from '../reducers/admin/servicePrice';
import priceReducer from '../reducers/admin/price';
import voucherPromoReducer from '../reducers/admin/voucherPromo';
import voucherTypeReducer from '../reducers/admin/voucherType';

const rootReducer = combineReducers({
    user: userReducer,
    food: foodReducer,
    foodCategory: foodCategoryReducer,
    driver: driverReducer,
    restaurant: restaurantReducer,
    brandVehicle: brandVehicleReducer,
    subBrandVehicle: subBrandVehicleReducer,
    investor: investorReducer,
    transactionLinkPay: transactionLinkPayReducer,
    transactionApplication: transactionApplicationReducer,
    accountLinkPay: accountLinkPayReducer,
    servicePrice: servicePriceReducer,
    price: priceReducer,
    voucherPromo: voucherPromoReducer,
    voucherType: voucherTypeReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppState = ReturnType<typeof rootReducer>;

export default store;