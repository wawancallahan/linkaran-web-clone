import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import ServiceList from './List';
import ServiceCreate from './Create';
import ServiceEdit from './Edit';

class Index extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/admin/service" render={() => <ServiceList />}/>
                <Route path="/admin/service/:id/edit" render={() => <ServiceEdit />}/>
                <Route path="/admin/service/create" render={() => <ServiceCreate />}/>
            </Switch>
        );
    }
}

export default Index;