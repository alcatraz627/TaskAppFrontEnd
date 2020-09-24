import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { ACTION_TYPES, createAction } from '../../constants/actions'

import { push } from 'connected-react-router'
import ROUTES from '../../constants/routes'

function Message({ message: { title, body }, clearNotif, navAway }) {

    useEffect(() => {
        if (!(title || body)) {
            console.log(title, body ,!(title || body))
            navAway()
        }
        return clearNotif
    }, [])

    return <div className="container center">
        <h3>{title}</h3>
        <div className="body1">{body}</div>
    </div>
}

const mapStateToProps = (state, ownProps) => ({
    message: state.utils.message,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    clearNotif: () => dispatch(createAction(ACTION_TYPES.CLEAR_MESSAGE)),
    navAway: () => dispatch(push(ROUTES.ROOT.url)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Message)