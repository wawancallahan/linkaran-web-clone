import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import RestaurantList from './List';
import RestaurantCreate from './Create';
import RestaurantEdit from './Edit';

class Index extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/admin/restaurant" render={() => <RestaurantList />}/>
                <Route path="/admin/restaurant/:id/edit" render={() => <RestaurantEdit />} />
                <Route path="/admin/restaurant/create" render={() => <RestaurantCreate />}/>
            </Switch>
        );
    }
}

export default Index;