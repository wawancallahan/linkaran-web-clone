import Dashboard from "./Dashboard";

export default [
    {
        path: "/admin",
        name: "Dashboard",
        exact: true,
        component: Dashboard,
        layout: "admin",
        roles: ["super admin", "admin"]
    },
    {
        path: "/admin/index",
        name: "Dashboard",
        exact: true,
        component: Dashboard,
        layout: "admin",
        roles: ["super admin", "admin"]
    },
]