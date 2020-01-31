import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import ServicePriceList from './List';
import ServicePriceCreate from './Create';
import ServicePriceEdit from './Edit';

class Index extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/admin/service-price" render={() => <ServicePriceList />}/>
                <Route path="/admin/service-price/:id/edit" render={() => <ServicePriceEdit />}/>
                <Route path="/admin/service-price/create" render={() => <ServicePriceCreate />}/>
            </Switch>
        );
    }
}

export default Index;