import React from 'react'

import { Link } from 'react-router-dom';

import ROUTES from '../constants/routes';

function Navbar(props) {
    return (
        <nav className="navbar">
            <div className="toolbar">
                <Link to="/"><h5>TaskApp</h5></Link>
                <div className="grow" />
                <Link to={ROUTES.LOGIN.url} className="nav-link">Login</Link>
                <Link to={ROUTES.REGISTER.url} className="nav-link">Register</Link>
            </div>
        </nav>
    )
}

export default Navbar;