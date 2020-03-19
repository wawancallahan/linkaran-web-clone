import TelegramUserList from './List';
import TelegramUserCreate from './Create';
import TelegramUserEdit from './Edit';

export default [
    {
        path: "/admin/telegram-user",
        exact: true,
        component: TelegramUserList,
        layout: "admin",
        roles: ["super admin"]
    },
    {
        path: "/admin/telegram-user/:id/edit",
        exact: true,
        component: TelegramUserEdit,
        layout: "admin",
        roles: ["super admin"]
    },
    {
        path: "/admin/telegram-user/create",
        exact: true,
        component: TelegramUserCreate,
        layout: "admin",
        roles: ["super admin"]
    },
];