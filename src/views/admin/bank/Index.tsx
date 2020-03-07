import BankList from './List';
import BankCreate from './Create';
import BankEdit from './Edit';

export default [
    {
        path: "/admin/bank",
        exact: true,
        component: BankList,
        layout: "admin",
        roles: ["super admin"]
    },
    {
        path: "/admin/bank/:id/edit",
        exact: true,
        component: BankEdit,
        layout: "admin",
        roles: ["super admin"]
    },
    {
        path: "/admin/bank/create",
        exact: true,
        component: BankCreate,
        layout: "admin",
        roles: ["super admin"]
    },
];