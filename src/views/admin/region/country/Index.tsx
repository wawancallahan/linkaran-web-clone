import CountryList from './list/Index';
import CountryCreate from './create/Index';
import CountryEdit from './edit/Index';

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