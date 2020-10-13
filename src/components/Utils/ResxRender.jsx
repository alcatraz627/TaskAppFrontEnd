import React, { useEffect, useState } from 'react'

import { FETCH_STATUS } from '../../constants'

function ResxRender({ render, fetchStatus, fetchMethod, fetchData }) {

    // const [status, setStatus] = useState(FETCH_STATUS.NOT_FETCHED)

    // useEffect(() => {
    //     setTimeout(() => {
    //         if (fetchStatus == FETCH_STATUS.NOT_FETCHED) fetchMethod()
    //     }, 500)
    // }, []);

    // switch (status) {
    //     case FETCH_STATUS.NOT_FETCHED:
    //         setStatus(FETCH_STATUS.FETCHING)
    //         return <div>Initializing...</div>

    //     case FETCH_STATUS.FETCHING:


    //         return <div className="loader" />

    //     case FETCH_STATUS.FETCHED:
    //         return render()

    //     case FETCH_STATUS.FETCH_ERROR:
    //     default:
    //         return <div>An error has occured. Please try later.</div>
    // }

    switch (fetchStatus) {
        case FETCH_STATUS.NOT_FETCHED:
        // return <div>Not Fetched</div>
        case FETCH_STATUS.FETCHING:
            return <div className="loaderContainer"><div className="loader" /></div>
        case FETCH_STATUS.FETCHED:
            return render(fetchData)
        case FETCH_STATUS.FETCH_ERROR:
        default:
            return <div>An error has occured. Please try later.</div>
    }
}

export default ResxRender
