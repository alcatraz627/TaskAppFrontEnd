import React, { useState } from 'react'

import { connect } from 'react-redux'
import { createAction, ACTION_TYPES } from '../../constants/actions'

function Login({ attempt_login }) {

    const [email, setEmail] = useState("aakarsh.chopra@vmock.com");
    const [password, setPassword] = useState("12017");

    const login = (e) => {
        // TODO: Validate
        e.preventDefault();
        attempt_login(email, password)
    }

    return (
        <div className="container loginBg">
            <form className="loginForm" onSubmit={login}>
                <h3>Log In</h3>
                <div className="formgroup">
                    <label className="body2">Email</label>
                    <input name="email" type="text" placeholder="Enter email address" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="formgroup">
                    <label className="body2">Password</label>
                    <input type="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <button type="submit" className="primary contained">Log in</button>
            </form>
        </div>)
}

const mapStateToProps = (state, ownProps) => ({

})

const mapDispatchToProps = (dispatch, ownProps) => ({
    attempt_login: (email, password) => dispatch(createAction(ACTION_TYPES.ATTEMPT_LOGIN, { email, password }))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);