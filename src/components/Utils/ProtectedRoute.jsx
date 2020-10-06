import React from 'react'

import { Route, Redirect } from 'react-router-dom'

import { connect } from 'react-redux'

import ROUTES from '../../constants/routes'

function ProtectedRoute(props) {
    const { Component, path, redir = ROUTES.LOGIN.url, guestOnly = false, auth = false, isLoggedIn, redirect, exact=false, ...rest } = props;

    const allow = guestOnly ? !isLoggedIn : (auth ? isLoggedIn : true)
    console.log("Allow", path, allow)
    return allow ? <Route path={path} component={Component} exact {...rest} /> : <Redirect to={redirect} />
}

const mapStateToProps = (state, ownProps) => ({
    isLoggedIn: !!state.user.token
})

export default connect(mapStateToProps)(ProtectedRoute)