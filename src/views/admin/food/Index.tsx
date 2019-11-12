import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import FoodList from './List';
import FoodCreate from './Create';
import FoodEdit from './Edit';

class Index extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/admin/food" render={() => <FoodList />}/>
                <Route path="/admin/food/:id/edit" render={() => <FoodEdit />} />
                <Route path="/admin/food/create" render={() => <FoodCreate />}/>
            </Switch>
        );
    }
}

export default Index;