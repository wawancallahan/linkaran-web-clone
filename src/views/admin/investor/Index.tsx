import InvestorList from './List';
import InvestorCreate from './Create';
import InvestorEdit from './Edit';

export default [
    {
        path: "/admin/investor",
        exact: true,
        component: InvestorList,
        layout: "admin",
        roles: ["super admin"]
    },
    {
        path: "/admin/investor/:id/edit",
        exact: true,
        component: InvestorEdit,
        layout: "admin",
        roles: ["super admin"]
    },
    {
        path: "/admin/investor/create",
        exact: true,
        component: InvestorCreate,
        layout: "admin",
        roles: ["super admin"]
    },
];