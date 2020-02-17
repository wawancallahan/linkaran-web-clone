import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import CustomerList from './List';
import CustomerDetail from './Detail';

class Index extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/admin/customer" render={() => <CustomerList />} />
                <Route exact path="/admin/customer/:id" render={() => <CustomerDetail />} />
            </Switch>
        );
    }
}

export default Index;