import React from 'react'

import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import ROUTES from '../constants/routes'

function Navbar({ isLoggedIn, user }) {
    return (
        <nav className="navbar">
            <div className="toolbar">
                <Link to="/"><h5>TaskApp</h5></Link>
                {/* {JSON.stringify(isLoggedIn ? 'Ye':'Nay')} */}
                <div className="grow" />
                {isLoggedIn ?
                    <div className="nav-links">
                        <Link to={ROUTES.PROFILE.url} className="nav-link">Profile</Link>
                        <Link to={ROUTES.LOGOUT.url} className="nav-link">Log out</Link>
                    </div>
                    :
                    <div className="nav-links">
                        <Link to={ROUTES.LOGIN.url} className="nav-link">Login</Link>
                        <Link to={ROUTES.REGISTER.url} className="nav-link">Register</Link>
                    </div>
                }
            </div>
        </nav>
    )
}

const mapStateToProps = (state, ownProps) => ({
    isLoggedIn: !!state.user.token,
    user: state.user,
})

export default connect(mapStateToProps)(Navbar)