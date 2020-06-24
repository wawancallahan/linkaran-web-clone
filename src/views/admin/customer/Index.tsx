import CustomerList from './list/Index';
import CustomerDetail from './detail/Index';

export default [
    {
        path: "/admin/customer",
        exact: true,
        component: CustomerList,
        layout: "admin",
        roles: ["super admin"]
    },
    {
        path: "/admin/customer/:id",
        exact: true,
        component: CustomerDetail,
        layout: "admin",
        roles: ["super admin"]
    },
];