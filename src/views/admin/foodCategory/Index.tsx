import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import FoodCategoryList from './List';
import FoodCategoryCreate from './Create';
import FoodCategoryEdit from './Edit';

class Index extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/admin/food-category" render={() => <FoodCategoryList />}/>
                <Route path="/admin/food-category/:id/edit" render={() => <FoodCategoryEdit />} />
                <Route path="/admin/food-category/create" render={() => <FoodCategoryCreate />}/>
            </Switch>
        );
    }
}

export default Index;