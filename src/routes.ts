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
import AdminTransactionLinkPay from './views/admin/transaction/linkPay/Index';
import AdminTransactionApplication from './views/admin/transaction/application/Index';
import AdminAccount from './views/admin/account/Index';
import AdminAccountLinkPay from './views/admin/account/linkPay/Index';
import AdminServicePrice from './views/admin/servicePrice/Index';
import AdminVoucherPromo from './views/admin/voucherPromo/Index';

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
        layout: "/admin",
        child: [
            {
                path: "/transaction/application",
                name: "Aplikasi",
                icon: "ni ni-pin-3 text-primary",
                component: AdminTransactionApplication,
                layout: "/admin"
            },
            {
                path: "/transaction/link-pay",
                name: "Link Pay",
                icon: "ni ni-pin-3 text-primary",
                component: AdminTransactionLinkPay,
                layout: "/admin"
            },
        ]
    },
    {
        path: "/account",
        name: "Account",
        icon: "ni ni-single-02 text-primary",
        component: AdminAccount,
        layout: "/admin",
        child: [
            {
                path: "/account/link-pay",
                name: "Link Pay",
                icon: "ni ni-pin-3 text-primary",
                component: AdminAccountLinkPay,
                layout: "/admin"
            },
        ]
    },
    {
        path: "/service-price",
        name: "Harga Layanan",
        icon: "ni ni-single-02 text-primary",
        component: AdminServicePrice,
        layout: "/admin"
    },
    {
        path: "/voucher-promo",
        name: "Voucher",
        icon: "ni ni-single-02 text-primary",
        component: AdminVoucherPromo,
        layout: "/admin"
    }
];

export default routes;
