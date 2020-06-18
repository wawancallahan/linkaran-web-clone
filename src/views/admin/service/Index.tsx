import ServiceList from './list/Index';
import ServiceCreate from './create/Index';
import ServiceEdit from './edit/Index';

export default [
    {
        path: "/admin/service",
        exact: true,
        component: ServiceList,
        layout: "admin",
        roles: ["super admin"]
    },
    {
        path: "/admin/service/:id/edit",
        exact: true,
        component: ServiceEdit,
        layout: "admin",
        roles: ["super admin"]
    },
    {
        path: "/admin/service/create",
        exact: true,
        component: ServiceCreate,
        layout: "admin",
        roles: ["super admin"]
    },
];