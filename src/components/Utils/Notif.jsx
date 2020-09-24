import React from 'react'
import { connect } from 'react-redux'

function Notif({notifList}) {

    return <div className="notifContainer">
        {notifList.map(({message}, i) => (<div key={i} className="notifBar visible">{message}</div>))}
        {/* <div className="notifBar">Message One</div>
        <div className="notifBar">Message Two</div> */}
    </div>
}

const mapStateToProps = (state, ownProps) => ({
    notifList: state.utils.notifList,
})

export default connect(mapStateToProps)(Notif)