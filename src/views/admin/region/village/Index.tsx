import VillageList from './List';
import VillageCreate from './Create';
import VillageEdit from './Edit';

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