import React from 'react'

import { connect } from 'react-redux'
import { createAction, ACTION_TYPES } from '../constants/actions'
import { set_message } from '../sagas/utils'

import { Link } from 'react-router-dom'
import ROUTES from '../constants/routes'

function Home({ notifList, push_notif, set_message }) {

    return (
        <div className="container">
            <h3>Home Page</h3>
            <div className="body1">Flex your UI skills and fill this up</div>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => ({
    notifList: state.utils.notifList
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    push_notif: (message) => dispatch(createAction(ACTION_TYPES.PUSH_NOTIF, { message: message })),
    set_message: (message) => dispatch(createAction(ACTION_TYPES.SET_MESSAGE, message)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);