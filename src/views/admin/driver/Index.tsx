import DriverList from './List';
import DriverCreate from './Create';
import DriverEdit from './Edit';
import DriverDetail from './Detail';

export default [
    {
        path: "/admin/driver",
        exact: true,
        component: DriverList,
        layout: "admin",
        roles: ["super admin", "admin"]
    },
    {
        path: "/admin/driver/create",
        exact: true,
        component: DriverCreate,
        layout: "admin",
        roles: ["super admin", "admin"]
    },
    {
        path: "/admin/driver/:id",
        exact: true,
        component: DriverDetail,
        layout: "admin",
        roles: ["super admin", "admin"]
    },
    {
        path: "/admin/driver/:id/edit",
        exact: true,
        component: DriverEdit,
        layout: "admin",
        roles: ["super admin", "admin"]
    },
];