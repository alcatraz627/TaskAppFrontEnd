import React, { useEffect } from 'react'

import { FETCH_RESOURCES, FETCH_STATUS } from '../../constants'

function ResxRender({ render, fetchStatus, fetchMethod }) {

    useEffect(() => {
        if (fetchStatus == FETCH_STATUS.NOT_FETCHED) fetchMethod()
    }, []);

    switch (fetchStatus) {
        case FETCH_STATUS.NOT_FETCHED:
        // return <div>Not Fetched</div>
        case FETCH_STATUS.FETCHING:
            <div className="loader" />
        case FETCH_STATUS.FETCHED:
            return render()
        case FETCH_STATUS.FETCH_ERROR:
        default:
            return <div>An error has occured. Please try later.</div>
    }
}

export default ResxRender
