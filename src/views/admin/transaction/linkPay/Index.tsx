import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import LinkPayList from './List';
import LinkPayDetail from './Detail';

class Index extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/admin/transaction/link-pay" render={() => <LinkPayList />}/>
                <Route path="/admin/transaction/link-pay/:id" render={() => <LinkPayDetail />}/>
            </Switch>
        );
    }
}

export default Index;