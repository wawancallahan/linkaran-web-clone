import FoodCategoryList from './List';
import FoodCategoryCreate from './Create';
import FoodCategoryEdit from './Edit';

export default [
    {
        path: "/admin/food-category",
        exact: true,
        component: FoodCategoryList,
        layout: "admin",
        roles: ["super admin"]
    },
    {
        path: "/admin/food-category/:id/edit",
        exact: true,
        component: FoodCategoryEdit,
        layout: "admin",
        roles: ["super admin"]
    },
    {
        path: "/admin/food-category/create",
        exact: true,
        component: FoodCategoryCreate,
        layout: "admin",
        roles: ["super admin"]
    },
];