import React, { useState, useEffect } from 'react'

import { NavLink as Link } from 'react-router-dom'

import { connect } from 'react-redux'

import ROUTES from '../constants/routes'
import { createAction, ACTION_TYPES } from '../constants/actions'

function Navbar({ isLoggedIn, user, notifHistory, fetchTasks, fetchUsers, shouldRender, clearNotifs }) {

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
                    <Link to={ROUTES.TASK_CREATE.url} exact className="nav-link" activeClassName="activeLink"><i className="fa fa-plus" /> New Task</Link>
                </>
                }
                <div className="grow" />

                <div className="navButton"><i className={`nav-icon fa fa-bell ${notifOpen && "active"}`} onClick={toggleNotifOpen} />
                    <div className={`navNotifContainer${notifOpen ? " showNotifContainer" : ""}`}>
                        <div className="navNotifHeader">
                            <i className="fa fa-caret-up fa-3x notifBoxArrow" />
                            Notifications
                            <div className="grow" />
                            <div className="clearNotifButton" onClick={clearNotifs}>Clear</div>
                        </div>
                        <div className="notifScroll">
                            {notifHistory.slice().reverse().map( ({ message, id, type }, i) => message && <div key={i} className={`navNotifItem ${type.toLowerCase() || ""}`}>{message}</div>)}
                        </div>
                    </div>
                </div>
                {isLoggedIn ?
                    <>
                        <div className="navButton" onClick={refreshStore}><i className={`nav-icon fa fa-refresh ${shouldRender && 'fa-spin'}`} /></div>
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
    shouldRender: state.utils.shouldRender,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    fetchUsers: () => dispatch(createAction(ACTION_TYPES.FETCH_USER_LIST)),
    fetchTasks: () => dispatch(createAction(ACTION_TYPES.FETCH_TASK_LIST)),
    clearNotifs: () => dispatch(createAction(ACTION_TYPES.CLEAR_NOTIF_HISTORY))
})

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)