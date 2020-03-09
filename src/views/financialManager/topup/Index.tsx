import TopUpList from './List'
import TopUpDetail from './Detail'

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