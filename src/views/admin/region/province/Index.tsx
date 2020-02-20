import ProvinceList from './List';
import ProvinceCreate from './Create';
import ProvinceEdit from './Edit';

export default [
    {
        path: "/admin/region/province",
        exact: true,
        component: ProvinceList,
        layout: "admin",
        roles: ["super admin"]
    },
    {
        path: "/admin/region/province/:id/edit",
        exact: true,
        component: ProvinceEdit,
        layout: "admin",
        roles: ["super admin"]
    },
    {
        path: "/admin/region/province/create",
        exact: true,
        component: ProvinceCreate,
        layout: "admin",
        roles: ["super admin"]
    },
];