import React from 'react'
import { connect } from 'react-redux'

function Notif({notif}) {

    return <div className="notifContainer">
        {notif.map(({message}, i) => (<div key={i} className="notifBar visible">{message}</div>))}
        {/* <div className="notifBar">Message One</div>
        <div className="notifBar">Message Two</div> */}
    </div>
}

const mapStateToProps = (state, ownProps) => ({
    notif: state.notif,
})

export default connect(mapStateToProps)(Notif)