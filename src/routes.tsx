import { Component } from 'react';
import AdminRoutes from "./views/admin/Index";
import AdminUserRoutes from './views/admin/user/Index';
import AdminFoodRoutes from './views/admin/food/Index';
import AdminFoodCategoryRoutes from './views/admin/foodCategory/Index';
import AdminRestaurantRoutes from './views/admin/restaurant/Index';
import AdminBrandVehicleRoutes from './views/admin/brandVehicle/Index';
import AdminSubBrandVehicleRoutes from './views/admin/subBrandVehicle/Index';
import AdminDriverRoutes from './views/admin/driver/Index';
import AdminInvestorRoutes from './views/admin/investor/Index';
import AdminTransactionRoutes from './views/admin/transaction/Index';
import AdminAccountRoutes from './views/admin/account/Index';
import AdminServicePriceRoutes from './views/admin/servicePrice/Index';
import AdminPriceRoutes from './views/admin/price/Index';
import AdminVoucherPromoRoutes from './views/admin/voucherPromo/Index';
import AdminVoucherTypeRoutes from './views/admin/voucherType/Index';
import AdminServiceRoutes from './views/admin/service/Index'
import AdminRegionRoutes from './views/admin/region/Index'
import AdminCustomerRoutes from './views/admin/customer/Index'
import AdminBankRoutes from './views/admin/bank/Index'
import AdminManualTopupRoutes from './views/admin/manualTopup/Index'
import AdminTelegramUserRoutes from './views/admin/telegramUser/Index'

import FinancialManagerTopUpRoutes from './views/financialManager/topup/Index'

export interface Route {
    exact: boolean,
    path: string,
    component: any,
    layout: string,
    roles: string[]
}

const routes: Route[] = [
    ...AdminRoutes,
    ...AdminUserRoutes,
    ...AdminFoodRoutes,
    ...AdminFoodCategoryRoutes,
    ...AdminRestaurantRoutes,
    ...AdminBrandVehicleRoutes,
    ...AdminSubBrandVehicleRoutes,
    ...AdminDriverRoutes,
    ...AdminInvestorRoutes,
    ...AdminTransactionRoutes,
    ...AdminAccountRoutes,
    ...AdminServicePriceRoutes,
    ...AdminPriceRoutes,
    ...AdminVoucherPromoRoutes,
    ...AdminVoucherTypeRoutes,
    ...AdminServiceRoutes,
    ...AdminRegionRoutes,
    ...AdminCustomerRoutes,
    ...AdminBankRoutes,
    ...AdminManualTopupRoutes,
    ...AdminTelegramUserRoutes,
    ...FinancialManagerTopUpRoutes,
]

export default routes;