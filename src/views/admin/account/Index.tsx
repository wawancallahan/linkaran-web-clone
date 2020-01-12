import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import LinkPayList from './linkPay/List';

class Index extends Component {
    render() {
        return (
            <Switch>
                <Route path="/admin/account/link-pay" render={() => <LinkPayList />}/>
            </Switch>
        );
    }
}

export default Index;