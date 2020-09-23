import React from 'react'

import { connect } from 'react-redux'

function Profile({ user }) {
    return (
        <div className="container">
            <h3>User Profile</h3>
            <h5>Name: {user.name}</h5>
            <h5>Email: {user.email}</h5>
            <h5>Role: {user.role}</h5>
            {/* <div className="body1">{JSON.stringify(user)}</div> */}
        </div>
    )
}

const mapStateToProps = (state, ownProps) => ({
    user: state.user
})

export default connect(mapStateToProps)(Profile);