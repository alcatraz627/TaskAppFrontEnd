import React, { useState } from 'react'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { Provider } from 'react-redux'
import store from '../store'

import Navbar from './Navbar'
import Main from './Main'
import Login from './Pages/Login'

const App = () => {

    return (
        <Provider store={store}>
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
        </Provider>
    )
}

export default App