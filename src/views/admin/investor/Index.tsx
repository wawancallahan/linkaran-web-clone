import InvestorList from './list/Index';
import InvestorCreate from './create/Index';
import InvestorEdit from './edit/Index';

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