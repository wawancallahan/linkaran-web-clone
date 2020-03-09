import FoodList from './List';
import FoodCreate from './Create';
import FoodEdit from './Edit';

export default [
    {
        path: "/admin/food",
        exact: true,
        component: FoodList,
        layout: "admin",
        roles: ["admin", "super admin"]
    },
    {
        path: "/admin/food/:id/edit",
        exact: true,
        component: FoodEdit,
        layout: "admin",
        roles: ["admin", "super admin"]
    },
    {
        path: "/admin/food/create",
        exact: true,
        component: FoodCreate,
        layout: "admin",
        roles: ["admin", "super admin"]
    },
];