import React, { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import ROUTES from '../constants/routes'
import { FALSE } from 'node-sass'

function Navbar({ isLoggedIn, user }) {

    const [notifOpen, setNotifOpen] = useState(false)

    // const catchEscapeKey = e => {
    //     console.log(e)
    //     if (e.code == 27) { // ESCAPE
    //         setNotifOpen(false)
    //     }
    // }

    // useEffect(() => {
    //     document.addEventListener("keydown", catchEscapeKey, false)
    //     return () => document.removeEventListener("keydown", catchEscapeKey, false)

    // }, [])

    const toggleNotifOpen = () => { setNotifOpen(!notifOpen) }

    return (
        <nav className="navbar">
            <div className="toolbar">
                <Link to="/"><h5>TaskApp</h5></Link>
                <div className="grow" />
                {isLoggedIn ?
                    <div className="nav-links">
                        <Link to={ROUTES.PROFILE.url} className="nav-link">{user.name} | Profile</Link>

                        <div className="navNotifButton"><i className="nav-icon fa fa-bell" onClick={toggleNotifOpen} />
                            <div className={`navNotifContainer${notifOpen ? " showNotifContainer" : ""}`}>
                                <div className="navNotifHeader">Notifications</div>
                                <div className="navNotifItem">Test Notif 1</div>
                                <div className="navNotifItem">Test Notif 2</div>
                            </div>
                        </div>

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
    state: state
})

export default connect(mapStateToProps)(Navbar)