import SubDistrictList from './list/Index';
import SubDistrictCreate from './create/Index';
import SubDistrictEdit from './edit/Index';

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