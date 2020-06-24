import ManualTopupList from './list/Index';
import ManualTopupCreate from './create/Index';
import ManualTopupEdit from './edit/Index';

export default [
    {
        path: "/admin/manual-topup",
        exact: true,
        component: ManualTopupList,
        layout: "admin",
        roles: ["admin", "super admin"]
    },
    {
        path: "/admin/manual-topup/:id/edit",
        exact: true,
        component: ManualTopupEdit,
        layout: "admin",
        roles: ["admin", "super admin"]
    },
    {
        path: "/admin/manual-topup/create",
        exact: true,
        component: ManualTopupCreate,
        layout: "admin",
        roles: ["admin", "super admin"]
    },
];