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
    
    // componentDidMount() {
    //     if ( ! localStorage.getItem('accessToken')) {
    //         this.props.history.push('/login');
    //     }
    // }

    render() {
        return (
            <Switch>
                <Route path="/admin" render={ (props: RouteComponentProps) => <AdminLayout {...props} />} />    
                <Route path="/login" render={ (props: RouteComponentProps) => {
                    return <AuthLayout {...props} />
                }} />
                <Route path="/logout" render={() => <Logout />} />
                <Redirect from="/" to="/login" exact />
                <Route path="*" render={() => {
                    return <Redirect to="/admin" />
                }} />
            </Switch>
        );
    }

}

export default withRouter(App);