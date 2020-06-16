import * as React from 'react';
import { Route, Switch, Redirect, withRouter, RouteComponentProps } from "react-router-dom";
import NotFound from './views/NotFound'

import AdminLayout from './layouts/Admin'

import routes, { Route as RouteInterface } from './routes'
import authRoutes from './views/auth/Index'
import { rolesToArray, accessToken, roles } from './services/auth';

type OwnProps = RouteComponentProps

type Props = OwnProps;

const App: React.FC<Props> = (props) => {
    const getAuthRoutes = (routes: RouteInterface[]) => {
        return routes.map((prop: RouteInterface, key: number) => {
            return <Route exact={prop.exact}
                        path={prop.path}
                        component={prop.component}
                        key={`${prop.path.replace('/', '_')}_${key}`} 
                        />
        })
    }

    return (
        <Switch>
            {getAuthRoutes(authRoutes)}
            <Route path="/admin" render={() => {
                if ( ! accessToken()) {
                    return <Redirect to="/login" />
                } else {
                    if (rolesToArray().includes('admin') || rolesToArray().includes('super admin') || rolesToArray().includes('financial manager')) {
                        return <AdminLayout {...props} />
                    }

                    return '403';
                }
            }} />
            <Route path="/partner" render={() => {
                if (rolesToArray().includes('partner')) {
                    return <AdminLayout {...props} />
                }

                return '403';
            }} />
            <Redirect from="/" to="/login" exact />
            <Route render={() => <Redirect to="/" />} />
        </Switch>
    )
}

export default withRouter(App);