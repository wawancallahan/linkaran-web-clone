import LinkPayList from './List';
import LinkPayDetail from './Detail';

export default [
    {
        path: "/admin/transaction/link-pay",
        exact: true,
        component: LinkPayList,
        layout: "admin",
        roles: ["super admin", "admin"]
    },
    {
        path: "/admin/transaction/link-pay/:id",
        exact: true,
        component: LinkPayDetail,
        layout: "admin",
        roles: ["super admin", "admin"]
    },
];