import React, { useState } from 'react'

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Navbar from './Navbar';
import Main from './Main';
import Login from './Pages/Login';

const App = () => {

    return (
        <Router>
            <Navbar />
            <Switch>
                <Route path="/login">
                    <Login />
                </Route>
                <Route>
                    <Main />
                </Route>
            </Switch>
        </Router>
    )
}

export default App