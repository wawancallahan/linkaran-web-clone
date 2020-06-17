import PartnerList from './list/Index';
import PartnerCreate from './create/Index';
import PartnerEdit from './edit/Index';

export default [
    {
        path: "/admin/partner",
        exact: true,
        component: PartnerList,
        layout: "admin",
        roles: ["super admin", "admin"]
    },
    {
        path: "/admin/partner/:id/edit",
        exact: true,
        component: PartnerEdit,
        layout: "admin",
        roles: ["super admin", "admin"]
    },
    {
        path: "/admin/partner/create",
        exact: true,
        component: PartnerCreate,
        layout: "admin",
        roles: ["super admin", "admin"]
    },
];