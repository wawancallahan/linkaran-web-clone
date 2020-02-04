import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import VoucherPromoList from './List';
import VoucherPromoDetail from './Detail';
import VoucherPromoCreate from './Create';
import VoucherPromoEdit from './Edit';
import Ticket from './DetailTicket';

class Index extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/admin/voucher-promo" render={() => <VoucherPromoList />} />
                <Route exact path="/admin/voucher-promo/create" render={() => <VoucherPromoCreate />} />
                <Route exact path="/admin/voucher-promo/:id" render={() => <VoucherPromoDetail />} />
                <Route exact path="/admin/voucher-promo/:id/edit" render={() => <VoucherPromoEdit />} />
                <Route path="/admin/voucher-promo/ticket/:id" render={() => <Ticket />} />
            </Switch>
        );
    }
}

export default Index;