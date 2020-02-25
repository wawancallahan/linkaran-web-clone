import ApplicationList from './List';
import ApplicationDetail from './Detail';

export default [
    {
        path: "/admin/transaction/application/:type?",
        exact: true,
        component: ApplicationList,
        layout: "admin",
        roles: ["super admin", "admin"]
    },
    {
        path: "/admin/transaction/application/:type/:id",
        exact: true,
        component: ApplicationDetail,
        layout: "admin",
        roles: ["super admin", "admin"]
    },
];