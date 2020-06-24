import RestaurantList from './list/Index';
import RestaurantCreate from './create/Index';
import RestaurantEdit from './edit/Index';

export default [
    {
        path: "/admin/restaurant",
        exact: true,
        component: RestaurantList,
        layout: "admin",
        roles: ["admin", "super admin"]
    },
    {
        path: "/admin/restaurant/:id/edit",
        exact: true,
        component: RestaurantEdit,
        layout: "admin",
        roles: ["admin", "super admin"]
    },
    {
        path: "/admin/restaurant/create",
        exact: true,
        component: RestaurantCreate,
        layout: "admin",
        roles: ["admin", "super admin"]
    },
];