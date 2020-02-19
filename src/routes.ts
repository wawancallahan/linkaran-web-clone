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
import AdminPrice from './views/admin/price/Index';
import AdminVoucherPromo from './views/admin/voucherPromo/Index';
import AdminVoucherType from './views/admin/voucherType/Index';
import AdminService from './views/admin/service/Index'
import AdminRegion from './views/admin/region/Index'
import AdminCountry from './views/admin/region/country/Index'
import AdminProvince from './views/admin/region/province/Index'
import AdminDistrict from './views/admin/region/district/Index'
import AdminSubDistrict from './views/admin/region/subDistrict/Index'
import AdminVillage from './views/admin/region/village/Index'
import AdminCustomer from './views/admin/customer/Index'

const routes: any[] = [
    {
        path: "/",
        name: "Login",
        icon: "ni ni-tv-2 text-primary",
        component: Login,
        layout: "/auth",
        roles: []
    },
    {
        path: "/index",
        name: "Dashboard",
        icon: "ni ni-tv-2 text-primary",
        component: AdminIndex,
        layout: "/admin",
        roles: ["admin", "superadmin"]
    },
    {
        path: "/food-category",
        name: "Food Category",
        icon: "ni ni-ungroup text-danger",
        component: AdminFoodCategory,
        layout: "/admin",
        roles: ["superadmin"]
    },
    {
        path: "/food",
        name: "Food",
        icon: "ni ni-bag-17 text-success",
        component: AdminFood,
        layout: "/admin",
        roles: ["superadmin"]
    },
    {
        path: "/restaurant",
        name: "Restaurant",
        icon: "ni ni-shop text-info",
        component: AdminRestaurant,
        layout: "/admin",
        roles: ["superadmin"]
    },
    {
        path: "/brand-vehicle",
        name: "Brand Vehicle",
        icon: "ni ni-app text-warning",
        component: AdminBrandVehicle,
        layout: "/admin",
        roles: ["superadmin", "admin"]
    },
    {
        path: "/sub-brand-vehicle",
        name: "Sub Brand Vehicle",
        icon: "ni ni-briefcase-24 text-info",
        component: AdminSubBrandVehicle,
        layout: "/admin",
        roles: ["superadmin", "admin"]
    },
    {
        path: "/user",
        name: "User",
        icon: "ni ni-single-02 text-danger",
        component: AdminUser,
        layout: "/admin",
        roles: ["superadmin"]
    },
    {
        path: "/driver",
        name: "Driver",
        icon: "ni ni-badge text-success",
        component: AdminDriver,
        layout: "/admin",
        roles: ["superadmin", "admin"]
    },
    {
        path: "/customer",
        name: "Customer",
        icon: "ni ni-single-02 text-primary",
        component: AdminCustomer,
        layout: "/admin",
        roles: ["superadmin"]
    },
    {
        path: "/investor",
        name: "Investor",
        icon: "ni ni-hat-3 text-warning",
        component: AdminInvestor,
        layout: "/admin",
        roles: ["superadmin"]
    },
    {
        path: "/transaction",
        name: "Transaksi",
        icon: "ni ni-collection text-primary",
        component: AdminTransaction,
        layout: "/admin",
        roles: ["superadmin", "admin"],
        child: [
            {
                path: "/transaction/application",
                name: "Aplikasi",
                icon: "ni ni-fat-delete text-default",
                component: AdminTransactionApplication,
                layout: "/admin",
                roles: ["superadmin", "admin"]
            },
            {
                path: "/transaction/link-pay",
                name: "Link Pay",
                icon: "ni ni-fat-delete text-default",
                component: AdminTransactionLinkPay,
                layout: "/admin",
                roles: ["superadmin", "admin"]
            },
        ]
    },
    {
        path: "/account",
        name: "Account",
        icon: "ni ni-circle-08 text-info",
        component: AdminAccount,
        layout: "/admin",
        roles: ["superadmin", "admin"],
        child: [
            {
                path: "/account/link-pay",
                name: "Link Pay",
                icon: "ni ni-fat-delete text-default",
                component: AdminAccountLinkPay,
                layout: "/admin",
                roles: ["superadmin", "admin"]
            },
        ]
    },
    {
        path: "/service",
        name: "Layanan",
        icon: "ni ni-mobile-button text-danger",
        component: AdminService,
        layout: "/admin",
        roles: ["superadmin"]
    },
    {
        path: "/price",
        name: "Harga",
        icon: "ni ni-money-coins text-success",
        component: AdminPrice,
        layout: "/admin",
        roles: ["superadmin"]
    },
    {
        path: "/service-price",
        name: "Harga Layanan",
        icon: "ni ni-credit-card text-primary",
        component: AdminServicePrice,
        layout: "/admin",
        roles: ["superadmin"]
    },
    {
        path: "/voucher-promo",
        name: "Voucher",
        icon: "ni ni-paper-diploma text-info",
        component: AdminVoucherPromo,
        layout: "/admin",
        roles: ["superadmin"]
    },
    {
        path: "/voucher-type",
        name: "Tipe Voucher",
        icon: "ni ni-ungroup text-warning",
        component: AdminVoucherType,
        layout: "/admin",
        roles: ["superadmin"]
    },
    {
        path: "/region",
        name: "Region",
        icon: "ni ni-compass-04 text-success",
        component: AdminRegion,
        layout: "/admin",
        roles: ["superadmin"],
        child: [
            {
                path: "/region/country",
                name: "Country",
                icon: "ni ni-fat-delete text-default",
                component: AdminCountry,
                layout: "/admin",
                roles: ["superadmin"]
            },
            {
                path: "/region/province",
                name: "Province",
                icon: "ni ni-fat-delete text-default",
                component: AdminProvince,
                layout: "/admin",
                roles: ["superadmin"]
            },
            {
                path: "/region/district",
                name: "District",
                icon: "ni ni-fat-delete text-default",
                component: AdminDistrict,
                layout: "/admin",
                roles: ["superadmin"]
            },
            {
                path: "/region/sub-district",
                name: "Sub District",
                icon: "ni ni-fat-delete text-default",
                component: AdminSubDistrict,
                layout: "/admin",
                roles: ["superadmin"]
            },
            {
                path: "/region/village",
                name: "Village",
                icon: "ni ni-fat-delete text-default",
                component: AdminVillage,
                layout: "/admin",
                roles: ["superadmin"]
            }
        ]
    },
];

export default routes;
