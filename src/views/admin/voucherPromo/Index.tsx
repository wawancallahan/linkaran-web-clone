import VoucherPromoList from './list/Index';
import VoucherPromoDetail from './detail/Index';
import VoucherPromoCreate from './create/Index';
import VoucherPromoEdit from './edit/Index';
import Ticket from './ticket/detail/Index';

export default [
    {
        path: "/admin/voucher-promo",
        exact: true,
        component: VoucherPromoList,
        layout: "admin",
        roles: ["super admin"]
    },
    {
        path: "/admin/voucher-promo/:id/edit",
        exact: true,
        component: VoucherPromoEdit,
        layout: "admin",
        roles: ["super admin"]
    },
    {
        path: "/admin/voucher-promo/create",
        exact: true,
        component: VoucherPromoCreate,
        layout: "admin",
        roles: ["super admin"]
    },
    {
        path: "/admin/voucher-promo/:id",
        exact: true,
        component: VoucherPromoDetail,
        layout: "admin",
        roles: ["super admin"]
    },
    {
        path: "/admin/voucher-promo/ticket/:id",
        exact: true,
        component: Ticket,
        layout: "admin",
        roles: ["super admin"]
    },
];