import VoucherTypeList from './List';
import VoucherTypeCreate from './Create';
import VoucherTypeEdit from './Edit';

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