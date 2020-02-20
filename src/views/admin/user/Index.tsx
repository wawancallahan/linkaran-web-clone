import UserList from './List';
import UserCreate from './Create';
import UserEdit from './Edit';

export default [
    {
        path: "/admin/user",
        exact: true,
        component: UserList,
        layout: "admin",
        roles: ["super admin"]
    },
    {
        path: "/admin/user/:id/edit",
        exact: true,
        component: UserEdit,
        layout: "admin",
        roles: ["super admin"]
    },
    {
        path: "/admin/user/create",
        exact: true,
        component: UserCreate,
        layout: "admin",
        roles: ["super admin"]
    },
];