import Dashboard from "./Dashboard";

export default [
    {
        path: "/partner",
        name: "Dashboard",
        exact: true,
        component: Dashboard,
        layout: "partner",
        roles: ["partner"]
    },
    {
        path: "/partner/index",
        name: "Dashboard",
        exact: true,
        component: Dashboard,
        layout: "partner",
        roles: ["partner"]
    },
]