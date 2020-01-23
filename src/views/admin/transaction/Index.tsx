import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import LinkPay from './linkPay/Index';
import Application from './application/Index';

class Index extends Component {
    render() {
        return (
            <Switch>
                <Route path="/admin/transaction/link-pay" render={() => <LinkPay />}/>
                <Route path="/admin/transaction/application" render={() => <Application />}/>
            </Switch>
        );
    }
}

export default Index;