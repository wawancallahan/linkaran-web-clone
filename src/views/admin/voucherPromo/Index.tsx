import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import VoucerPromoList from './List';

class Index extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/admin/voucher-promo" render={() => <VoucerPromoList />}/>
            </Switch>
        );
    }
}

export default Index;