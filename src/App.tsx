import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter, RouteComponentProps } from "react-router-dom";
import NotFound from './views/NotFound'

import AdminLayout from './layouts/Admin'

import routes, { Route as RouteInterface } from './routes'
import authRoutes from './views/auth/Index'
import { rolesToArray, accessToken } from './services/auth';

type AppProps = RouteComponentProps

type Props = AppProps;
class App extends Component<Props> {
    
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
                <Route path="/admin" render={() => {
                    if ( ! accessToken()) {
                        return <Redirect to="/login" />
                    } else {
                        return (
                            <AdminLayout {...this.props} />
                        )
                    }
                }} />
                <Redirect from="/" to="/login" exact />
                <Route render={() => <Redirect to="/" />} />
            </Switch>
        );
    }

}

export default withRouter(App);