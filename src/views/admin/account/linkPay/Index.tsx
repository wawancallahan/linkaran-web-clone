import LinkPayList from './List';
import LinkPayDetail from './Detail';

export default [
    {
        path: "/admin/account/link-pay",
        exact: true,
        component: LinkPayList,
        layout: "admin",
        roles: ["super admin", "admin"]
    },
    {
        path: "/admin/account/link-pay/:id",
        exact: true,
        component: LinkPayDetail,
        layout: "admin",
        roles: ["super admin", "admin"]
    }
];