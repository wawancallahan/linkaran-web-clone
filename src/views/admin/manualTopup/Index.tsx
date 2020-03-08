import ManualTopupList from './List';
import ManualTopupCreate from './Create';
import ManualTopupEdit from './Edit';

export default [
    {
        path: "/admin/manual-topup",
        exact: true,
        component: ManualTopupList,
        layout: "admin",
        roles: ["super admin"]
    },
    {
        path: "/admin/manual-topup/:id/edit",
        exact: true,
        component: ManualTopupEdit,
        layout: "admin",
        roles: ["super admin"]
    },
    {
        path: "/admin/manual-topup/create",
        exact: true,
        component: ManualTopupCreate,
        layout: "admin",
        roles: ["super admin"]
    },
];