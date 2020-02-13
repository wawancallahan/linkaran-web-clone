import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import CountryList from './List';
import CountryCreate from './Create';
import CountryEdit from './Edit';

class Index extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/admin/region/country" render={() => <CountryList />}/>
                <Route path="/admin/region/country/:id/edit" render={() => <CountryEdit />} />
                <Route path="/admin/region/country/create" render={() => <CountryCreate />}/>
            </Switch>
        );
    }
}

export default Index;