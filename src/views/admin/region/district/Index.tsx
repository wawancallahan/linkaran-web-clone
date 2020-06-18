import DistrictList from './list/Index';
import DistrictCreate from './create/Index';
import DistrictEdit from './edit/Index';

export default [
    {
        path: "/admin/region/district",
        exact: true,
        component: DistrictList,
        layout: "admin",
        roles: ["super admin"]
    },
    {
        path: "/admin/region/district/:id/edit",
        exact: true,
        component: DistrictEdit,
        layout: "admin",
        roles: ["super admin"]
    },
    {
        path: "/admin/region/district/create",
        exact: true,
        component: DistrictCreate,
        layout: "admin",
        roles: ["super admin"]
    },
];