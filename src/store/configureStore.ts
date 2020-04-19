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
import voucherPromoUserUsedReducer from '../reducers/admin/voucherPromoUserUsed';
import voucherTypeReducer from '../reducers/admin/voucherType';
import serviceReducer from '../reducers/admin/service'
import ticketReducer from '../reducers/admin/ticket'
import ticketVoucherReducer from '../reducers/admin/ticketVoucher'
import countryReducer from '../reducers/admin/region/country'
import provinceReducer from '../reducers/admin/region/province'
import districtReducer from '../reducers/admin/region/district'
import subDistrictReducer from '../reducers/admin/region/subDistrict'
import villageReducer from '../reducers/admin/region/village'
import customerReducer from '../reducers/admin/customer'
import bankReducer from '../reducers/admin/bank'
import manualTopupReducer from '../reducers/admin/manualTopup'
import partnerReducer from '../reducers/admin/partner'

import topUpReducer from '../reducers/financialManager/topup'

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
    voucherPromoUserUsed: voucherPromoUserUsedReducer,
    voucherType: voucherTypeReducer,
    service: serviceReducer,
    ticket: ticketReducer,
    ticketVoucher: ticketVoucherReducer,
    country: countryReducer,
    province: provinceReducer,
    district: districtReducer,
    subDistrict: subDistrictReducer,
    village: villageReducer,
    customer: customerReducer,
    bank: bankReducer,
    topup: topUpReducer,
    manualTopup: manualTopupReducer,
    partner: partnerReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppState = ReturnType<typeof rootReducer>;

export default store;