import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import DistrictList from './List';
import DistrictCreate from './Create';
import DistrictEdit from './Edit';

class Index extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/admin/region/district" render={() => <DistrictList />}/>
                <Route path="/admin/region/district/:id/edit" render={() => <DistrictEdit />} />
                <Route path="/admin/region/district/create" render={() => <DistrictCreate />}/>
            </Switch>
        );
    }
}

export default Index;