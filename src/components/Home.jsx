import React from 'react'

import { connect } from 'react-redux'
import { createAction, ACTION_TYPES } from '../constants/actions'

function Home({ notif, push_notif }) {

    return (
        <div className="container">
            <h3>Home Page</h3>
            <button className="primary outlined" onClick={() => push_notif("Test Message " + notif.length)}>Push Notif</button>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => ({
    notif: state.notif
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    push_notif: (message) => dispatch(createAction(ACTION_TYPES.PUSH_NOTIF, { message: message }))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);