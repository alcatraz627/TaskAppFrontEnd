import React, { useEffect } from 'react'

import { connect } from 'react-redux'
import { ACTION_TYPES, createAction } from '../../constants/actions'

import { FETCH_STATUS } from '../../constants'


function ResxRender({ render, fetchStatus, fetchMethod, fetchType, clearFetchStatus }) {

    // If you provide a fetch type it will also clear it on init
    useEffect(() => {
        if(fetchType && fetchStatus == FETCH_STATUS.FETCHED) {
            return () => clearFetchStatus(fetchType)
        }
    }, [])

    switch (fetchStatus) {
        case FETCH_STATUS.NOT_FETCHED:
            // If a fetch method is passed then it will be called for NOT_FETCHED
            fetchMethod && fetchMethod()
        // return <div>Not Fetched</div>
        case FETCH_STATUS.FETCHING:
            return <div className="loaderContainer"><div className="loader" /></div>
        case FETCH_STATUS.FETCHED:
            return render()
        case FETCH_STATUS.FETCH_ERROR:
        default:
            return <div>An error has occured. Please try later.</div>
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    clearFetchStatus: (fetchType) => dispatch(createAction(ACTION_TYPES.CLEAR_FETCH_STATUS, { fetchType }))
})

export default connect(null, mapDispatchToProps)(ResxRender)
