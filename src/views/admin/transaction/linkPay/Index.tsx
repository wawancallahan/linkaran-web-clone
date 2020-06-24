import LinkPayList from './list/Index';

export default [
    {
        path: "/admin/transaction/link-pay",
        exact: true,
        component: LinkPayList,
        layout: "admin",
        roles: ["super admin", "admin"]
    }
];