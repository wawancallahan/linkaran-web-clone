import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import SubDistrictList from './List';
import SubDistrictCreate from './Create';
import SubDistrictEdit from './Edit';

class Index extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/admin/region/sub-district" render={() => <SubDistrictList />}/>
                <Route path="/admin/region/sub-district/:id/edit" render={() => <SubDistrictEdit />} />
                <Route path="/admin/region/sub-district/create" render={() => <SubDistrictCreate />}/>
            </Switch>
        );
    }
}

export default Index;