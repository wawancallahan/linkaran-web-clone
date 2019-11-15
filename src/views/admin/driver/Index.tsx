import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import DriverList from './List';
import DriveCreate from './Create';
import DriverEdit from './Edit';

class Index extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/admin/driver" render={() => <DriverList />}/>
                <Route path="/admin/driver/:id/edit" render={() => <DriverEdit />} />
                <Route path="/admin/driver/create" render={() => <DriveCreate />} />
            </Switch>
        );
    }
}

export default Index;