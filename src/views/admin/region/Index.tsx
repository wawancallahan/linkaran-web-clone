import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Country from './country/Index';
import Province from './province/Index';
import District from './district/Index';
import SubDistrict from './subDistrict/Index';
import Village from './village/Index';

class Index extends Component {
    render() {
        return (
            <Switch>
                <Route path="/admin/region/country" render={() => <Country />}/>
                <Route path="/admin/region/province" render={() => <Province />}/>
                <Route path="/admin/region/district" render={() => <District />}/>
                <Route path="/admin/region/sub-district" render={() => <SubDistrict />}/>
                <Route path="/admin/region/village" render={() => <Village />}/>
            </Switch>
        );
    }
}

export default Index;