import React, { useEffect } from 'react'

import { connect } from 'react-redux'
import { ACTION_TYPES, createAction } from '../../constants/actions'

import { FETCH_STATUS } from '../../constants'


function ResxRender({ render, fetchStatus, fetchMethod, fetchType, clearFetchStatus }) {

    // If you provide a fetch type it will also clear it on unmount
    useEffect(() => {
        return () => { console.log("Cleared fetch status of: ", fetchType); return clearFetchStatus(fetchType) }
    }, [])

    switch (fetchStatus) {
        case FETCH_STATUS.NOT_FETCHED:
            // If a fetch method is passed then it will be called for NOT_FETCHED
            fetchMethod && fetchMethod()
        case FETCH_STATUS.FETCHING:
            return <div className="loaderContainer"><div className="loader" /></div>
        case FETCH_STATUS.FETCHED:
            return render()
        case FETCH_STATUS.FETCH_ERROR:
        default:
            return <div className="container">
                <div className="h4">An error has occured. </div>
                <div className="body1">
                    Fetch Status of type <div className="label red">{fetchStatus}</div> encountered

                </div>
            </div>
    }
}


const mapDispatchToProps = (dispatch, ownProps) => ({
    clearFetchStatus: (fetchType) => dispatch(createAction(ACTION_TYPES.CLEAR_FETCH_STATUS, { fetchType }))
})

export default connect(null, mapDispatchToProps)(ResxRender)
