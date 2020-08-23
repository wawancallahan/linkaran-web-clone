import { UserActionTypes as AdminUserActionTypes } from './admin/user';
import { FoodActionTypes as AdminFoodActionTypes } from './admin/food';
import { FoodCategoryActionTypes as AdminFoodCategoryActionTypes } from './admin/foodCategory';
import { RestaurantActionTypes as AdminRestaurantActionTypes } from './admin/restaurant';
import { BrandVehicleActionTypes as AdminBrandVehicleActionTypes } from './admin/brandVehicle';
import { SubBrandVehicleActionTypes as AdminSubBrandVehicleActionTypes } from './admin/subBrandVehicle';
import { DriverActionTypes as AdminDriverActionTypes } from './admin/driver'; 
import { InvestorActionTypes as AdminInvestorActionTypes } from './admin/investor'; 
import { LinkPayActionTypes as AdminTransactionLinkPayActionTypes } from './admin/transaction/linkPay';
import { ApplicationActionTypes as AdminTransactionApplicationActionTypes } from './admin/transaction/application';
import { AccountLinkPayActionTypes as AdminAccountLinkPayActionTypes } from './admin/account/linkPay';
import { ServicePriceActionTypes as AdminServicePriceActionTypes } from './admin/servicePrice';
import { PriceActionTypes as AdminPriceActionTypes } from './admin/price';
import { VoucherPromoActionTypes as AdminVoucherPromoActionTypes } from './admin/voucherPromo';
import { VoucherTypeActionTypes as AdminVoucherTypeActionTypes  } from './admin/voucherType'
import { ServiceActionTypes as AdminServiceActionTypes } from './admin/service'
import { CountryActionTypes as AdminCountryActionTypes } from './admin/region/country'
import { ProvinceActionTypes as AdminProvinceActionTypes } from './admin/region/province'
import { DistrictActionTypes as AdminDistrictActionTypes } from './admin/region/district'
import { SubDistrictActionTypes as AdminSubDistrictActionTypes } from './admin/region/subDistrict'
import { VillageActionTypes as AdminVillageActionTypes } from './admin/region/village'
import { CustomerActionTypes as AdminCustomerActionTypes } from './admin/customer'
import { BankActionTypes as AdminBankActionTypes } from './admin/bank'
import { ManualTopUpActionTypes as AdminManualTopUpActionTypes } from './admin/manualTopup'
import { ManualWithDrawActionTypes as AdminManualWithDrawActionTypes } from './admin/manualWithdraw'
import { PartnerActionTypes as AdminPartnerActionTypes } from './admin/partner'
import { HistoryDataActionTypes as AdminHistoryDataActionTypes } from './admin/historyData/historyData'

import { TopUpActionTypes as FinancialManagerTopUpActionTypes } from './financialManager/topup'
import { WithDrawActionTypes as FinancialManagerWithDrawActionTypes } from './financialManager/withdraw'

import { RouterAction } from 'connected-react-router'

export type AppActions =
    | RouterAction
    | AdminUserActionTypes
    | AdminFoodActionTypes
    | AdminFoodCategoryActionTypes
    | AdminRestaurantActionTypes
    | AdminBrandVehicleActionTypes
    | AdminSubBrandVehicleActionTypes
    | AdminDriverActionTypes
    | AdminInvestorActionTypes
    | AdminTransactionLinkPayActionTypes
    | AdminTransactionApplicationActionTypes
    | AdminAccountLinkPayActionTypes
    | AdminServicePriceActionTypes
    | AdminPriceActionTypes
    | AdminVoucherPromoActionTypes
    | AdminVoucherTypeActionTypes
    | AdminServiceActionTypes
    | AdminCountryActionTypes
    | AdminProvinceActionTypes
    | AdminDistrictActionTypes
    | AdminSubDistrictActionTypes
    | AdminVillageActionTypes
    | AdminCustomerActionTypes
    | AdminBankActionTypes
    | AdminManualTopUpActionTypes
    | AdminManualWithDrawActionTypes
    | AdminPartnerActionTypes
    | AdminHistoryDataActionTypes
    | FinancialManagerTopUpActionTypes
    | FinancialManagerWithDrawActionTypes