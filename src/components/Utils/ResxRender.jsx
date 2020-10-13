import React, { useEffect, useState } from 'react'

import { FETCH_STATUS } from '../../constants'

function ResxRender({ render, fetchStatus, fetchMethod }) {

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

export default ResxRender
