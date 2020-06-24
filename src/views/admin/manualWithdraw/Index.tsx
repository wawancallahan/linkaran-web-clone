import ManualWithdrawList from './list/Index';
import ManualWithdrawCreate from './create/Index';
import ManualWithdrawEdit from './edit/Index';

export default [
    {
        path: "/admin/manual-withdraw",
        exact: true,
        component: ManualWithdrawList,
        layout: "admin",
        roles: ["admin", "super admin"]
    },
    {
        path: "/admin/manual-withdraw/:id/edit",
        exact: true,
        component: ManualWithdrawEdit,
        layout: "admin",
        roles: ["admin", "super admin"]
    },
    {
        path: "/admin/manual-withdraw/create",
        exact: true,
        component: ManualWithdrawCreate,
        layout: "admin",
        roles: ["admin", "super admin"]
    },
];