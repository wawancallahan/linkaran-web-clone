import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import SubBrandVehicleList from './List';
import SubBrandVehicleCreate from './Create';
import SubBrandVehicleEdit from './Edit';

class Index extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/admin/sub-brand-vehicle" render={() => <SubBrandVehicleList />}/>
                <Route path="/admin/sub-brand-vehicle/:id/edit" render={() => <SubBrandVehicleEdit />} />
                <Route path="/admin/sub-brand-vehicle/create" render={() => <SubBrandVehicleCreate />}/>
            </Switch>
        );
    }
}

export default Index;