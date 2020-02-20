import SubDistrictList from './List';
import SubDistrictCreate from './Create';
import SubDistrictEdit from './Edit';

export default [
    {
        path: "/admin/region/sub-district",
        exact: true,
        component: SubDistrictList,
        layout: "admin",
        roles: ["super admin"]
    },
    {
        path: "/admin/region/sub-district/:id/edit",
        exact: true,
        component: SubDistrictEdit,
        layout: "admin",
        roles: ["super admin"]
    },
    {
        path: "/admin/region/sub-district/create",
        exact: true,
        component: SubDistrictCreate,
        layout: "admin",
        roles: ["super admin"]
    },
];