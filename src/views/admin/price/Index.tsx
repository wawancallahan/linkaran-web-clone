import PriceList from './list/Index';
import PriceCreate from './create/Index';
import PriceEdit from './edit/Index';

export default [
    {
        path: "/admin/price",
        exact: true,
        component: PriceList,
        layout: "admin",
        roles: ["super admin"]
    },
    {
        path: "/admin/price/:id/edit",
        exact: true,
        component: PriceEdit,
        layout: "admin",
        roles: ["super admin"]
    },
    {
        path: "/admin/price/create",
        exact: true,
        component: PriceCreate,
        layout: "admin",
        roles: ["super admin"]
    },
];