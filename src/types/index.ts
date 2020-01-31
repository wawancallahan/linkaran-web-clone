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

export type AppActions = 
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