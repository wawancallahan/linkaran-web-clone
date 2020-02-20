import SubBrandVehicleList from './List';
import SubBrandVehicleCreate from './Create';
import SubBrandVehicleEdit from './Edit';

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