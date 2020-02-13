import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import VillageList from './List';
import VillageCreate from './Create';
import VillageEdit from './Edit';

class Index extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/admin/region/village" render={() => <VillageList />}/>
                <Route path="/admin/region/village/:id/edit" render={() => <VillageEdit />} />
                <Route path="/admin/region/village/create" render={() => <VillageCreate />}/>
            </Switch>
        );
    }
}

export default Index;