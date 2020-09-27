import React, { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import ROUTES from '../constants/routes'

function Navbar({ isLoggedIn, user, notifHistory }) {

    const [notifOpen, setNotifOpen] = useState(false)

    const catchEscapeKey = e => {
        if (e.code == "Escape") {
            setNotifOpen(false)
        }
    }

    useEffect(() => {
        document.addEventListener("keydown", catchEscapeKey, false)
        return () => document.removeEventListener("keydown", catchEscapeKey, false)
    }, [])

    const toggleNotifOpen = () => { setNotifOpen(!notifOpen) }

    return (
        <nav className="navbar">
            <div className="toolbar">
                <Link to="/"><h5>TaskApp</h5></Link>

                <div className="grow" />
                <div className="navNotifButton"><i className="nav-icon fa fa-bell" onClick={toggleNotifOpen} />
                    <div className={`navNotifContainer${notifOpen ? " showNotifContainer" : ""}`}>
                        <div className="navNotifHeader">Notifications</div>
                        <div className="notifScroll">
                            {notifHistory.slice().reverse().map(({ message }, i) => <div key={i} className="navNotifItem">{message}</div>)}
                        </div>
                    </div>
                </div>

                {isLoggedIn ?
                    <div className="nav-links">
                        <Link to={ROUTES.USER_PROFILE.getUrl("me")} className="nav-link">{user.name} | Profile</Link>
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
    notifHistory: state.utils.notifHistory
})

export default connect(mapStateToProps)(Navbar)