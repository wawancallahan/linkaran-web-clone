import ServicePriceList from './List';
import ServicePriceCreate from './Create';
import ServicePriceEdit from './Edit';

export default [
    {
        path: "/admin/service-price",
        exact: true,
        component: ServicePriceList,
        layout: "admin",
        roles: ["super admin"]
    },
    {
        path: "/admin/service-price/:id/edit",
        exact: true,
        component: ServicePriceEdit,
        layout: "admin",
        roles: ["super admin"]
    },
    {
        path: "/admin/service-price/create",
        exact: true,
        component: ServicePriceCreate,
        layout: "admin",
        roles: ["super admin"]
    },
];