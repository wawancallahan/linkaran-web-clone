import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import LinkPay from './linkPay/Index';

class Index extends Component {
    render() {
        return (
            <Switch>
                <Route path="/admin/transaction/link-pay" render={() => <LinkPay />}/>
            </Switch>
        );
    }
}

export default Index;