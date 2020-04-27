import WithDrawList from './List'
import WithDrawDetail from './Detail'

export default [
    {
        path: "/admin/withdraw",
        exact: true,
        component: WithDrawList,
        layout: "admin",
        roles: ["financial manager"]
    },
    {
        path: "/admin/withdraw/:id",
        exact: true,
        component: WithDrawDetail,
        layout: "admin",
        roles: ["financial manager"]
    }
];