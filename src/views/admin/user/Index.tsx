import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import UserList from './List';
import UserCreate from './Create';
import UserEdit from './Edit';

class Index extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/admin/user" render={() => <UserList />}/>
                <Route path="/admin/user/:id/edit" render={() => <UserEdit />} />
                <Route path="/admin/user/create" render={() => <UserCreate />}/>
            </Switch>
        );
    }
}

export default Index;