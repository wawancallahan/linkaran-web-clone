import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import PriceList from './List';
import PriceCreate from './Create';
import PriceEdit from './Edit';

class Index extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/admin/price" render={() => <PriceList />}/>
                <Route path="/admin/price/:id/edit" render={() => <PriceEdit />}/>
                <Route path="/admin/price/create" render={() => <PriceCreate />}/>
            </Switch>
        );
    }
}

export default Index;