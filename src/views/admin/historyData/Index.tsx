import HistoryDataList from './list/Index';

export default [
    {
        path: "/admin/history-data",
        exact: true,
        component: HistoryDataList,
        layout: "admin",
        roles: ["admin", "super admin"]
    }
];