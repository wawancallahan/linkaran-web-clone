import ApplicationList from './List';
import ApplicationDetail from './Detail';

export default [
    {
        path: "/admin/transaction/application",
        exact: true,
        component: ApplicationList,
        layout: "admin",
        roles: ["super admin", "admin"]
    },
    {
        path: "/admin/transaction/application/:id",
        exact: true,
        component: ApplicationDetail,
        layout: "admin",
        roles: ["super admin", "admin"]
    },
];