import React, { useState } from 'react'

import { Router, Switch, Route } from 'react-router-dom'

import ProtectedRoute from '../components/ProtectedRoute'

import { Provider } from 'react-redux'
import store from '../utils/store'
import history from '../utils/history'

import ROUTES from '../constants/routes'

import Navbar from './Navbar'
import Home from './Home'
// import Login from './Pages/Login'
// import Logout from './Pages/Logout'

function App() {
    return (
        <Provider store={store}>
            <Router history={history}>
                <Navbar />
                <Switch>
                    {Object.values(ROUTES).filter(f => f.hasOwnProperty('Component'))
                        .map(({ url, Component, auth = false, guestOnly = false, redirect = ROUTES.LOGIN.url }) =>
                            // <Route key={url} path={url} component={Component} />
                            <ProtectedRoute key={url} path={url} component={Component} auth={auth} guestOnly={guestOnly} redirect={redirect} />
                        )}
                    <Route>
                        <div>Not found</div>
                    </Route>
                </Switch>
            </Router>
        </Provider>
    )
}


export default (App)