import CountryList from './List';
import CountryCreate from './Create';
import CountryEdit from './Edit';

export default [
    {
        path: "/admin/region/country",
        exact: true,
        component: CountryList,
        layout: "admin",
        roles: ["super admin"]
    },
    {
        path: "/admin/region/country/:id/edit",
        exact: true,
        component: CountryEdit,
        layout: "admin",
        roles: ["super admin"]
    },
    {
        path: "/admin/region/country/create",
        exact: true,
        component: CountryCreate,
        layout: "admin",
        roles: ["super admin"]
    },
];