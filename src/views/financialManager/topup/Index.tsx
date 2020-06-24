import TopUpList from './list/Index'
import TopUpDetail from './detail/Index'

export default [
    {
        path: "/admin/topup",
        exact: true,
        component: TopUpList,
        layout: "admin",
        roles: ["financial manager"]
    },
    {
        path: "/admin/topup/:id",
        exact: true,
        component: TopUpDetail,
        layout: "admin",
        roles: ["financial manager"]
    }
];