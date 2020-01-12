/*!

=========================================================
* Argon Dashboard React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import Login from './views/auth/Login';
import AdminIndex from "./views/admin/Index";
import AdminUser from './views/admin/user/Index';
import AdminFood from './views/admin/food/Index';
import AdminFoodCategory from './views/admin/foodCategory/Index';
import AdminRestaurant from './views/admin/restaurant/Index';
import AdminBrandVehicle from './views/admin/brandVehicle/Index';
import AdminSubBrandVehicle from './views/admin/subBrandVehicle/Index';
import AdminDriver from './views/admin/driver/Index';
import AdminInvestor from './views/admin/investor/Index';
import AdminTransaction from './views/admin/transaction/Index';
import AdminAccount from './views/admin/account/Index';

const routes: any[] = [
    {
        path: "/",
        name: "Login",
        icon: "ni ni-tv-2 text-primary",
        component: Login,
        layout: "/auth"
    },
    {
        path: "/index",
        name: "Dashboard",
        icon: "ni ni-tv-2 text-primary",
        component: AdminIndex,
        layout: "/admin"
    },
    {
        path: "/food-category",
        name: "Food Category",
        icon: "ni ni-single-02 text-primary",
        component: AdminFoodCategory,
        layout: "/admin"
    },
    {
        path: "/food",
        name: "Food",
        icon: "ni ni-single-02 text-primary",
        component: AdminFood,
        layout: "/admin"
    },
    {
        path: "/restaurant",
        name: "Restaurant",
        icon: "ni ni-single-02 text-primary",
        component: AdminRestaurant,
        layout: "/admin"
    },
    {
        path: "/brand-vehicle",
        name: "Brand Vehicle",
        icon: "ni ni-single-02 text-primary",
        component: AdminBrandVehicle,
        layout: "/admin"
    },
    {
        path: "/sub-brand-vehicle",
        name: "Sub Brand Vehicle",
        icon: "ni ni-single-02 text-primary",
        component: AdminSubBrandVehicle,
        layout: "/admin"
    },
    {
        path: "/user",
        name: "User",
        icon: "ni ni-single-02 text-primary",
        component: AdminUser,
        layout: "/admin"
    },
    {
        path: "/driver",
        name: "Driver",
        icon: "ni ni-single-02 text-primary",
        component: AdminDriver,
        layout: "/admin"
    },
    {
        path: "/investor",
        name: "Investor",
        icon: "ni ni-single-02 text-primary",
        component: AdminInvestor,
        layout: "/admin"
    },
    {
        path: "/transaction",
        name: "Transaksi",
        icon: "ni ni-single-02 text-primary",
        component: AdminTransaction,
        layout: "/admin"
    },
    {
        path: "/account",
        name: "Account",
        icon: "ni ni-single-02 text-primary",
        component: AdminAccount,
        layout: "/admin"
    }
];

export default routes;
