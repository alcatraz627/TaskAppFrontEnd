import React, { useState } from 'react'

import { Switch } from 'react-router-dom'

import { ConnectedRouter } from 'connected-react-router'

import { Provider } from 'react-redux'
import store, { history } from '../store/'

import ROUTES from '../constants/routes'

import Navbar from './Navbar'
import Notif from './Utils/Notif'
import ProtectedRoute from './Utils/ProtectedRoute'

function App() {
    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <Navbar />
                <Switch>
                    {Object.values(ROUTES).filter(f => f.hasOwnProperty('Component'))
                        .map(({ url, Component, auth = false, guestOnly = false, redirect = ROUTES.LOGIN.url, exact }) =>
                            <ProtectedRoute key={url} path={url} component={Component} auth={auth} guestOnly={guestOnly} redirect={redirect} exact={exact} />
                        )}
                    {/* <Route>
                        <div className="h4">Not found</div>
                    </Route> */}
                </Switch>
            </ConnectedRouter>
            <Notif />
        </Provider>
    )
}


export default (App)