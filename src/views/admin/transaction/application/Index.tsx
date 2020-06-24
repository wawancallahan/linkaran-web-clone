import ApplicationList from './list/Index';
import ApplicationDetail from './detail/Index';

export default [
    {
        path: "/admin/transaction/application/:type?",
        exact: true,
        component: ApplicationList,
        layout: "admin",
        roles: ["super admin", "admin"]
    },
    {
        path: "/admin/transaction/application/:type/:numberTransaction",
        exact: true,
        component: ApplicationDetail,
        layout: "admin",
        roles: ["super admin", "admin"]
    },
];