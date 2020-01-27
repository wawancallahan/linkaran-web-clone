import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import VoucherPromoList from './List';
import VoucherPromoDetail from './Detail';
import Ticket from './Tiket';

class Index extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/admin/voucher-promo" render={() => <VoucherPromoList />} />
                <Route exact path="/admin/voucher-promo/:id" render={() => <VoucherPromoDetail />} />
                <Route path="/admin/voucher-promo/ticket/:id" render={() => <Ticket />} />
            </Switch>
        );
    }
}

export default Index;