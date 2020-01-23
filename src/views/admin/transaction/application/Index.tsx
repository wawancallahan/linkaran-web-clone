import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import ApplicationList from './List';
import ApplicationDetail from './Detail';

class Index extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/admin/transaction/application" render={() => <ApplicationList />}/>
                <Route path="/admin/transaction/application/:id" render={() => <ApplicationDetail />}/>
            </Switch>
        );
    }
}

export default Index;