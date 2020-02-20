import Login from './Login';
import Logout from './Logout';

import { Route as RouteInterface } from '../../routes'

const routes: RouteInterface[] = [
    {
        exact: true,
        path: "/login",
        component: Login,
        layout: "/auth",
        roles: []
    },
    {
        exact: true,
        path: "/logout",
        component: Logout,
        layout: "/auth",
        roles: []
    },
]

export default routes