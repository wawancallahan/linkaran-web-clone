import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import InvestorList from './List';
import InvestorCreate from './Create';
import InvestorEdit from './Edit';

class Index extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/admin/investor" render={() => <InvestorList />}/>
                <Route path="/admin/investor/:id/edit" render={() => <InvestorEdit />} />
                <Route path="/admin/investor/create" render={() => <InvestorCreate />} />
            </Switch>
        );
    }
}

export default Index;