import React from 'react'
import { connect } from 'react-redux'

import { Route } from 'react-router-dom'

import { Switch } from 'react-router-dom'
import ProtectedRoute from './Utils/ProtectedRoute'
import ROUTES from '../constants/routes'

export const AppRouter = ({ shouldRender }) => {

    if (!shouldRender) {
        // So that no redirects based on auth happen until the user's login has been attempted and auth status finalized
        // TODO: Fancy spinner instead of this
        return <div className="loader" />
    } else
        return (<>
            <Switch>
                {Object.values(ROUTES).filter(f => f.hasOwnProperty('Component'))
                    .map(({ url, Component, auth = false, guestOnly = false, redirect = ROUTES.LOGIN.url, exact }) =>
                        <ProtectedRoute key={url} path={url} component={Component} auth={auth}
                            guestOnly={guestOnly} redirect={redirect} exact={exact} />
                    )}
                <Route component={ROUTES.NOT_FOUND.Component} />
            </Switch>
        </>
        )
}

const mapStateToProps = (state) => ({
    shouldRender: state.utils.shouldRender == 0
})

export default connect(mapStateToProps)(AppRouter)
