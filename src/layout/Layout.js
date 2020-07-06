import React, { Suspense, lazy, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from '../components/Home';
import Customers from '../components/Customers';
import ActivityLog from '../components/ActivityLog';
import AddCustomer from '../components/AddCustomer';
import EditCustomer from '../components/EditCustomer';

import Header from './Header';
import Sidebar from './Sidebar';


const Layout = (props) => {
    return(
        <div className="main-content">
            <div>
                <Header />
                <Sidebar />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/customers" component={Customers} />
                    <Route exact path="/logs" component={ActivityLog} />
                    <Route exact path="/add-customer" component={AddCustomer} />
                    <Route exact path="/edit-customer" component={EditCustomer} />
                </Switch>
            </div>
        </div>
    )
}
export default Layout;