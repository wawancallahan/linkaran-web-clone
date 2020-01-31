import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import VoucherTypeList from './List';
import VoucherTypeCreate from './Create';
import VoucherTypeEdit from './Edit';

class Index extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/admin/voucher-type" render={() => <VoucherTypeList />}/>
                <Route path="/admin/voucher-type/:id/edit" render={() => <VoucherTypeEdit />} />
                <Route path="/admin/voucher-type/create" render={() => <VoucherTypeCreate />}/>
            </Switch>
        );
    }
}

export default Index;