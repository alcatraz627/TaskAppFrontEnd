import React, { useState } from 'react'


import { ConnectedRouter } from 'connected-react-router'

import { Provider } from 'react-redux'
import store, { history } from '../store/'

import Navbar from './Navbar'
import Notif from './Utils/Notif'

import AppRouter from './AppRouter'

function App() {
    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <Navbar />
                <AppRouter />
            </ConnectedRouter>
            <Notif />
        </Provider>
    )
}


export default (App)