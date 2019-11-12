import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import BrandVehicleList from './List';
import BrandVehicleCreate from './Create';
import BrandVehicleEdit from './Edit';

class Index extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/admin/brand-vehicle" render={() => <BrandVehicleList />}/>
                <Route path="/admin/brand-vehicle/:id/edit" render={() => <BrandVehicleEdit />} />
                <Route path="/admin/brand-vehicle/create" render={() => <BrandVehicleCreate />}/>
            </Switch>
        );
    }
}

export default Index;