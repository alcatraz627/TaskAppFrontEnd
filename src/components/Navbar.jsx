import React, { useState, useEffect } from 'react'

import { NavLink as Link } from 'react-router-dom'

import { connect } from 'react-redux'

import ROUTES from '../constants/routes'
import { createAction, ACTION_TYPES } from '../constants/actions'

function Navbar({ isLoggedIn, user, notifHistory, fetchTasks, fetchUsers }) {

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

    const refreshStore = () => {
        fetchUsers()
        fetchTasks()
    }
    // const isActiveLink = (route)

    return (
        <nav className="navbar">
            <div className="toolbar">
                <Link to="/"><h5>TaskApp</h5></Link>

                {/* <div className="grow" /> */}

                {isLoggedIn && <>
                    <Link to={ROUTES.USER_LIST.url} exact className="nav-link" activeClassName="activeLink">User List</Link>
                    <Link to={ROUTES.TASK_LIST.url} exact className="nav-link" activeClassName="activeLink">Task List</Link>
                </>
                }
                <div className="grow" />

                <div className="navButton"><i className="nav-icon fa fa-bell" onClick={toggleNotifOpen} />
                    <div className={`navNotifContainer${notifOpen ? " showNotifContainer" : ""}`}>
                        <div className="navNotifHeader">Notifications</div>
                        <div className="notifScroll">
                            {notifHistory.slice().reverse().map(({ message }, i) => <div key={i} className="navNotifItem">{message}</div>)}
                        </div>
                    </div>
                </div>
                {isLoggedIn ?
                    <>
                        <div className="navButton" onClick={refreshStore}><i className="nav-icon fa fa-refresh" /></div>
                        <Link to={ROUTES.USER_PROFILE.getUrl(user.id)} className="nav-link" activeClassName="activeLink">{user.name}</Link>
                        <Link to={ROUTES.LOGOUT.url} className="nav-link" activeClassName="activeLink">Log out</Link>
                    </>
                    :
                    <>
                        <Link to={ROUTES.LOGIN.url} className="nav-link" activeClassName="activeLink">Login</Link>
                        <Link to={ROUTES.REGISTER.url} className="nav-link" activeClassName="activeLink">Register</Link>
                    </>
                }
            </div>
        </nav>
    )
}

const mapStateToProps = (state, ownProps) => ({
    isLoggedIn: !!state.user.token,
    user: state.user,
    notifHistory: state.utils.notifHistory,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    fetchUsers: () => dispatch(createAction(ACTION_TYPES.FETCH_USER_LIST)),
    fetchTasks: () => dispatch(createAction(ACTION_TYPES.FETCH_TASK_LIST)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)