import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import ProvinceList from './List';
import ProvinceCreate from './Create';
import ProvinceEdit from './Edit';

class Index extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/admin/region/province" render={() => <ProvinceList />}/>
                <Route path="/admin/region/province/:id/edit" render={() => <ProvinceEdit />} />
                <Route path="/admin/region/province/create" render={() => <ProvinceCreate />}/>
            </Switch>
        );
    }
}

export default Index;