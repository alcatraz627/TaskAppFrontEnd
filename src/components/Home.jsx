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
            <button className="primary outlined sm">Small</button>
            <button className="primary outlined" onClick={() => push_notif("Test Message " + notifList.length)}>Push Notif</button>
            <button className="primary outlined lg">Large</button>

            <button className="primary contained sm">Small</button>
            <button className="primary contained" onClick={() => set_message({ title: "This works", body: "YepYep" })}>Set message</button>
            <button className="primary contained lg">Large</button>
            <hr />
            <Link className="button primary" to={ROUTES.USER_LIST.url}>User List</Link>
            <Link className="button primary" to={ROUTES.TASK_LIST.url}>Task List</Link>
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