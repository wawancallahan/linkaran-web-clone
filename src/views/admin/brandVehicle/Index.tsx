import BrandVehicleList from './list/Index';
import BrandVehicleCreate from './create/Index';
import BrandVehicleEdit from './edit/Index';

export default [
    {
        path: "/admin/brand-vehicle",
        exact: true,
        component: BrandVehicleList,
        layout: "admin",
        roles: ["super admin", "admin"]
    },
    {
        path: "/admin/brand-vehicle/:id/edit",
        exact: true,
        component: BrandVehicleEdit,
        layout: "admin",
        roles: ["super admin", "admin"]
    },
    {
        path: "/admin/brand-vehicle/create",
        exact: true,
        component: BrandVehicleCreate,
        layout: "admin",
        roles: ["super admin", "admin"]
    },
];