import VillageList from './list/Index';
import VillageCreate from './create/Index';
import VillageEdit from './edit/Index';

export default [
    {
        path: "/admin/region/village",
        exact: true,
        component: VillageList,
        layout: "admin",
        roles: ["super admin"]
    },
    {
        path: "/admin/region/village/:id/edit",
        exact: true,
        component: VillageEdit,
        layout: "admin",
        roles: ["super admin"]
    },
    {
        path: "/admin/region/village/create",
        exact: true,
        component: VillageCreate,
        layout: "admin",
        roles: ["super admin"]
    },
];