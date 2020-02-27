import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter, RouteComponentProps } from "react-router-dom";
import NotFound from './views/NotFound'

import AdminLayout from './layouts/Admin'

import routes, { Route as RouteInterface } from './routes'
import authRoutes from './views/auth/Index'
import { rolesToArray } from './services/auth';

type AppProps = RouteComponentProps

type Props = AppProps;
class App extends Component<Props> {
    
    // componentDidMount() {
    //     if ( ! localStorage.getItem('accessToken')) {
    //         this.props.history.push('/login');
    //     }
    // }

    getRoleRoutes = (routes: RouteInterface[]) => {
        const roles = rolesToArray();
        return routes.map((prop: RouteInterface, key: number) => {
            const rolesRoutes: string[] = prop.roles;
            const constainRole = rolesRoutes.some((value: string) => roles.includes(value))
    
            if (prop.layout === "admin" && constainRole) {
                return (
                    <Route
                        exact={prop.exact}
                        path={prop.path}
                        component={prop.component}
                        key={`${prop.path.replace('/', '_')}_${key}`}
                    />
                );
            } else {
                return null;
            }
        });
    }

    getAuthRoutes = (routes: RouteInterface[]) => {
        return routes.map((prop: RouteInterface, key: number) => {
            return <Route exact={prop.exact}
                        path={prop.path}
                        component={prop.component}
                        key={`${prop.path.replace('/', '_')}_${key}`} 
                        />
        })
    }

    render() {
        return (
            <Switch>
                {this.getAuthRoutes(authRoutes)}
                <Route path="/admin">
                    <AdminLayout {...this.props}>
                        <Switch>
                            {this.getRoleRoutes(routes)}
                        </Switch>
                    </AdminLayout>
                </Route>
                <Redirect from="/" to="/login" exact />
                <Route render={() => <Redirect to="/" />} />
            </Switch>
        );
    }

}

export default withRouter(App);