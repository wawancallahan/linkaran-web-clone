import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter, RouteComponentProps } from "react-router-dom";

import Logout from './views/auth/Logout';
import AuthLayout from './layouts/Auth';
import AdminLayout from './layouts/Admin';

type AppProps = RouteComponentProps & {

}

type Props = AppProps;

type State = {

}

class App extends Component<Props, State> {
    render() {
        return (
            <Switch>
                <Route path="/admin" render={ (props: RouteComponentProps) => <AdminLayout {...props} />} />    
                <Route path="/login" render={ (props: RouteComponentProps) => <AuthLayout {...props} />} />
                <Route path="/logout" render={() => <Logout />} />
                <Redirect from="/" to="/login" exact />
            </Switch>
        );
    }
}

export default withRouter(App);