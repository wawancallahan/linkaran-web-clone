import VoucherTypeList from './list/Index';
import VoucherTypeCreate from './create/Index';
import VoucherTypeEdit from './edit/Index';

export default [
    {
        path: "/admin/voucher-type",
        exact: true,
        component: VoucherTypeList,
        layout: "admin",
        roles: ["super admin"]
    },
    {
        path: "/admin/voucher-type/:id/edit",
        exact: true,
        component: VoucherTypeEdit,
        layout: "admin",
        roles: ["super admin"]
    },
    {
        path: "/admin/voucher-type/create",
        exact: true,
        component: VoucherTypeCreate,
        layout: "admin",
        roles: ["super admin"]
    },
];