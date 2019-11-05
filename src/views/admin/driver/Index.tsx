import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import DriverList from './List';
import DriveCreate from './Create';

class Index extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/admin/driver" render={() => <DriverList />}/>
                <Route path="/admin/driver/create" render={() => <DriveCreate />} />
            </Switch>
        );
    }
}

export default Index;