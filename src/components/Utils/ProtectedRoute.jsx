import React from 'react'

import { Route, Redirect } from 'react-router-dom'

import { connect } from 'react-redux'

import { NOTIF_DELAY, NOTIF_TYPE } from '../../constants'
import { ACTION_TYPES, createAction } from '../../constants/actions'

import ROUTES from '../../constants/routes'

function ProtectedRoute(props) {
    const { Component, path, redir = ROUTES.LOGIN.url, guestOnly = false,
        auth = false, isLoggedIn, isOnline, redirect,
        exact = false, onlineReq = true, sendNotif, ...rest } = props;

    let allow = (guestOnly ? !isLoggedIn : (auth ? isLoggedIn : true))

    if (onlineReq) { allow = allow && isOnline }
    
    console.log("Allow", path, allow, isOnline, auth)

    if (!isOnline && onlineReq) {
        sendNotif(path)
    }
    return allow ? <Route path={path} component={Component} exact {...rest} /> : <Redirect to={redirect} />
}

const mapStateToProps = (state, ownProps) => ({
    isLoggedIn: !!state.user.token,
    isOnline: state.utils.isOnline,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    sendNotif: (path) => dispatch(createAction(ACTION_TYPES.PUSH_NOTIF, { type: NOTIF_TYPE.ERROR, message: `The path ${path} is unavailable offline. Please try again later.` }))

})

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute)