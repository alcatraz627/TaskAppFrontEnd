import React, { useState, useEffect } from 'react'

import { NavLink as Link } from 'react-router-dom'

import { connect } from 'react-redux'

import ROUTES from '../constants/routes'
import { createAction, ACTION_TYPES } from '../constants/actions'

const useClickOutside = (ref, callback) => {
    const handleClick = e => {
        if (ref.current && !ref.current.contains(e.target)) {
            callback();
        }
    };
    React.useEffect(() => {
        document.addEventListener('click', handleClick);
        return () => {
            document.removeEventListener('click', handleClick);
        };
    });
}

function Navbar({ isLoggedIn, user, notifHistory, runSync, shouldRender, clearNotifs }) {

    const [notifOpen, setNotifOpen] = useState(false)
    const [notifUndead, setNotifUnread] = useState(false)

    // To close notif dropdown when clicked outisde.
    const clickRef = React.useRef();
    useClickOutside(clickRef, () => setNotifOpen(false));

    // To close notif dropdown when escape key is pressed
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

    useEffect(() => {
        if(notifOpen) setNotifUnread(false)
    }, [notifOpen])

    useEffect(() => {
        if(notifHistory.length > 0) setNotifUnread(true)
    }, [notifHistory])

    return (
        // <nav className={"navbar" + (shouldRender ? " loadingNavbar" : "")}>
        <nav className="navbar">
            <div className="toolbar">
                <Link to="/"><h5>TaskApp</h5></Link>

                {isLoggedIn && <>
                    <Link to={ROUTES.USER_LIST.url} exact className="nav-link" activeClassName="activeLink">User List</Link>
                    <Link to={ROUTES.TASK_LIST.url} exact className="nav-link" activeClassName="activeLink">Task List</Link>
                    <Link to={ROUTES.TASK_CREATE.url} exact className="nav-link" activeClassName="activeLink"><i className="fa fa-plus" /> New Task</Link>
                </>
                }
                <div className="grow" />

                <div ref={clickRef} className={"navButton" + (notifUndead ? " navBellUnread" : "")}><i className={`nav-icon fa fa-bell ${notifOpen && "active"}`} onClick={toggleNotifOpen} />
                    <div className={`navNotifContainer${notifOpen ? " showNotifContainer" : ""}`}>
                        <div className="navNotifHeader">
                            <i className="fa fa-caret-up fa-3x notifBoxArrow" />
                            Notifications
                            <div className="grow" />
                            <div className="clearNotifButton" onClick={clearNotifs}>Clear</div>
                        </div>
                        <div className="notifScroll">
                {notifHistory.slice().reverse().map(({ message, id, type, timestamp }, i) => message && <div key={i} className={`navNotifItem ${type.toLowerCase() || ""}`}>{message}<span className="navNotifTimestamp">{timestamp}</span></div>)}
                        </div>
                    </div>
                </div>
                {isLoggedIn ?
                    <>
                        <div className="navButton" onClick={runSync}><i className={`nav-icon fa fa-refresh ${shouldRender && 'fa-spin'}`} /></div>
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

    isOnline: state.utils.isOnline,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    runSync: () => dispatch(createAction(ACTION_TYPES.RUN_SYNC)),
    clearNotifs: () => dispatch(createAction(ACTION_TYPES.CLEAR_NOTIF_HISTORY))
})

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)