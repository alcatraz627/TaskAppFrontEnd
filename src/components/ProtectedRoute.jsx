import React from 'react'

import { Route, Redirect } from 'react-router-dom'

import { connect } from 'react-redux'

import ROUTES from '../constants/routes'

function ProtectedRoute(props) {
    const { Component, path, redir = ROUTES.LOGIN, guestOnly = false, auth = false, isLoggedIn, redirect, ...rest } = props;

    const allow = guestOnly ? !auth : (auth ? isLoggedIn : true)

    return allow ? <Route path={path} component={Component} {...rest} /> : <Redirect to={redirect} />
}

const mapStateToProps = (state, ownProps) => ({
    isLoggedIn: !!state.user.token
})

export default connect(mapStateToProps)(ProtectedRoute)