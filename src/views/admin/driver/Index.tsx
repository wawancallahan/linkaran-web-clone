import DriverList from './List';
import DriverCreate from './Create';
import DriverCreateFromCustomer from './fromCustomer/CreateFromCustomer';
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
        path: "/admin/driver/create-from-customer/:id?",
        exact: true,
        component: DriverCreateFromCustomer,
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