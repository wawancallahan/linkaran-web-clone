import DistrictList from './List';
import DistrictCreate from './Create';
import DistrictEdit from './Edit';

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