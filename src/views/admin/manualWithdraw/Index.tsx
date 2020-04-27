import ManualWithdrawList from './List';
import ManualWithdrawCreate from './Create';
import ManualWithdrawEdit from './Edit';

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