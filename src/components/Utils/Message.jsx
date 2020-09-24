import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { ACTION_TYPES, createAction } from '../../constants/actions'

function Message({ message: { title, body }, clearNotif }) {

    useEffect(() => {
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
    clearNotif: () => dispatch(createAction(ACTION_TYPES.CLEAR_MESSAGE))
})

export default connect(mapStateToProps, mapDispatchToProps)(Message)