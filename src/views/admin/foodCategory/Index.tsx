import FoodCategoryList from './list/Index';
import FoodCategoryCreate from './create/Index';
import FoodCategoryEdit from './edit/Index';

export default [
    {
        path: "/admin/food-category",
        exact: true,
        component: FoodCategoryList,
        layout: "admin",
        roles: ["admin", "super admin"]
    },
    {
        path: "/admin/food-category/:id/edit",
        exact: true,
        component: FoodCategoryEdit,
        layout: "admin",
        roles: ["admin", "super admin"]
    },
    {
        path: "/admin/food-category/create",
        exact: true,
        component: FoodCategoryCreate,
        layout: "admin",
        roles: ["admin", "super admin"]
    },
];