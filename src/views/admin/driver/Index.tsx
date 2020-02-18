import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import DriverList from './List';
import DriverCreate from './Create';
import DriverEdit from './Edit';
import DriverDetail from './Detail';

class Index extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/admin/driver" render={() => <DriverList />}/>
                <Route exact path="/admin/driver/create" render={() => <DriverCreate />} />
                <Route path="/admin/driver/:id" render={() => <DriverDetail />} />
                <Route path="/admin/driver/:id/edit" render={() => <DriverEdit />} />
            </Switch>
        );
    }
}

export default Index;