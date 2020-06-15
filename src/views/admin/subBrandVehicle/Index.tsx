import SubBrandVehicleList from './list/Index';
import SubBrandVehicleCreate from './create/Index';
import SubBrandVehicleEdit from './edit/Index';

export default [
    {
        path: "/admin/sub-brand-vehicle",
        exact: true,
        component: SubBrandVehicleList,
        layout: "admin",
        roles: ["super admin", "admin"]
    },
    {
        path: "/admin/sub-brand-vehicle/:id/edit",
        exact: true,
        component: SubBrandVehicleEdit,
        layout: "admin",
        roles: ["super admin", "admin"]
    },
    {
        path: "/admin/sub-brand-vehicle/create",
        exact: true,
        component: SubBrandVehicleCreate,
        layout: "admin",
        roles: ["super admin", "admin"]
    },
];