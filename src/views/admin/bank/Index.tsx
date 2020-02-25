import BankList from './List';

export default [
    {
        path: "/admin/bank",
        exact: true,
        component: BankList,
        layout: "admin",
        roles: ["super admin"]
    }
];