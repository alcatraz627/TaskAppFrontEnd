import React, { useEffect } from 'react'

import { connect } from 'react-redux'
import { action, ACTION_TYPES } from '../../constants/actions'

function Logout({logout}) {

    useEffect(() => {
        // console.log("Logging out...")
        logout()
    },[])

    return <div>Logging out...</div>
}

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(action(ACTION_TYPES.ATTEMPT_LOGOUT))
})

export default connect(null, mapDispatchToProps)(Logout)