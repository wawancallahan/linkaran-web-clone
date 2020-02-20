import PriceList from './List';
import PriceCreate from './Create';
import PriceEdit from './Edit';

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