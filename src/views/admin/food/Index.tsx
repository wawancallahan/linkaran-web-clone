import FoodList from './List';
import FoodCreate from './Create';
import FoodEdit from './Edit';

export default [
    {
        path: "/admin/driver",
        exact: true,
        component: FoodList,
        layout: "admin",
        roles: ["super admin"]
    },
    {
        path: "/admin/driver/:id/edit",
        exact: true,
        component: FoodEdit,
        layout: "admin",
        roles: ["super admin"]
    },
    {
        path: "/admin/driver/create",
        exact: true,
        component: FoodCreate,
        layout: "admin",
        roles: ["super admin"]
    },
];