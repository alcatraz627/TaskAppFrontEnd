import React from 'react'
import { connect } from 'react-redux'

import { Switch } from 'react-router-dom'
import ProtectedRoute from './Utils/ProtectedRoute'
import ROUTES from '../constants/routes'


export const AppRouter = ({ isLoginAttempted }) => {
    if (!isLoginAttempted) {
        // So that no redirects based on auth happen until the user's login has been attempted and auth status finalized
        // TODO: Fancy spinner instead of this
        return <div className="loader" />

    } else
        return (
            <Switch>
                {Object.values(ROUTES).filter(f => f.hasOwnProperty('Component'))
                    .map(({ url, Component, auth = false, guestOnly = false, redirect = ROUTES.LOGIN.url, exact, extraProps = null }) =>
                        <ProtectedRoute key={url} path={url} component={Component} auth={auth} guestOnly={guestOnly} redirect={redirect} exact={exact} extraProps={extraProps} />
                    )}
                {/* <Route>
            <div className="h4">Not found</div>
        </Route> */}
            </Switch>
        )
}

const mapStateToProps = (state) => ({
    isLoginAttempted: state.user.isLoginAttempted
})

export default connect(mapStateToProps)(AppRouter)
