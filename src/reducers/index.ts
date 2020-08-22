import { combineReducers } from 'redux';
import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history'

import userReducer, { State as UserState } from './admin/user';
import foodReducer, { State as FoodState } from './admin/food';
import foodCategoryReducer, { State as FoodCategoryState } from './admin/foodCategory';
import restaurantReducer, { State as RestaurantState } from './admin/restaurant';
import driverReducer, { State as DriverState } from './admin/driver';
import investorReducer, { State as InvestorState } from './admin/investor';
import brandVehicleReducer, { State as BrandVehicleState } from './admin/brandVehicle';
import subBrandVehicleReducer, { State as SubBrandVehicleState } from './admin/subBrandVehicle';
import transactionLinkPayReducer, { State as TransactionLinkPayState } from './admin/transaction/linkPay';
import transactionApplicationReducer, { State as TransactionApplicationState } from './admin/transaction/application';
import accountLinkPayReducer, { State as AccountLinkPayState } from './admin/account/linkPay';
import servicePriceReducer, { State as ServicePriceState } from './admin/servicePrice';
import priceReducer, { State as PriceState } from './admin/price';
import voucherPromoReducer, { State as VoucherPromoState } from './admin/voucherPromo';
import voucherPromoUserUsedReducer, { State as VoucherPromoUserUsedState } from './admin/voucherPromoUserUsed';
import voucherTypeReducer, { State as VoucherTypeState } from './admin/voucherType';
import serviceReducer, { State as ServiceState } from './admin/service'
import ticketReducer, { State as TicketState } from './admin/ticket'
import ticketVoucherReducer, { State as TicketVoucherState } from './admin/ticketVoucher'
import countryReducer, { State as CountryState } from './admin/region/country'
import provinceReducer, { State as ProvinceState } from './admin/region/province'
import districtReducer, { State as DistrictState } from './admin/region/district'
import subDistrictReducer, { State as SubDistrictState } from './admin/region/subDistrict'
import villageReducer, { State as VillageState } from './admin/region/village'
import customerReducer, { State as CustomerState } from './admin/customer'
import bankReducer, { State as BankState } from './admin/bank'
import manualTopupReducer, { State as ManualTopupState } from './admin/manualTopup'
import manualWithdrawReducer, { State as ManualWithdrawState } from './admin/manualWithdraw'
import partnerReducer, { State as PartnerState } from './admin/partner'
import historyDataReducer, { State as HistoryDataState } from './admin/historyData'

import topUpReducer, { State as TopUpState } from './financialManager/topup'
import withDrawReducer, { State as WithDrawState } from './financialManager/withdraw'

const createRootReducer = (history: History) => combineReducers({
    router: connectRouter(history),
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
    partner: partnerReducer,
    historyData: historyDataReducer,
    manualWithdraw: manualWithdrawReducer,
    withdraw: withDrawReducer
});

export type AppState = {
    router: RouterState,
    user: UserState,
    food: FoodState,
    foodCategory: FoodCategoryState,
    driver: DriverState,
    restaurant: RestaurantState,
    brandVehicle: BrandVehicleState,
    subBrandVehicle: SubBrandVehicleState,
    investor: InvestorState,
    transactionLinkPay: TransactionLinkPayState,
    transactionApplication: TransactionApplicationState,
    accountLinkPay: AccountLinkPayState,
    servicePrice: ServicePriceState,
    price: PriceState,
    voucherPromo: VoucherPromoState,
    voucherPromoUserUsed: VoucherPromoUserUsedState,
    voucherType: VoucherTypeState,
    service: ServiceState,
    ticket: TicketState,
    ticketVoucher: TicketVoucherState,
    country: CountryState,
    province: ProvinceState,
    district: DistrictState,
    subDistrict: SubDistrictState,
    village: VillageState,
    customer: CustomerState,
    bank: BankState,
    topup: TopUpState,
    manualTopup: ManualTopupState,
    partner: PartnerState,
    historyData: HistoryDataState,
    manualWithdraw: ManualWithdrawState,
    withdraw: WithDrawState
};

export default createRootReducer