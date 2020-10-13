import React, { useState } from 'react'

import ReCAPTCHA from 'react-google-recaptcha'

import { connect } from 'react-redux'
import { createAction, ACTION_TYPES } from '../../constants/actions'

import { Link } from 'react-router-dom'
import ROUTES from '../../constants/routes'

function Login({ attempt_login, push_notif }) {

    const [email, setEmail] = useState("aakarsh.chopra@vmock.com")
    const [password, setPassword] = useState("12017")

    const [capVerified, setCapVerified] = useState(false)

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
                <div className="formgroup">
                    {/* ReCAPTCHA keys for testing on localhost: 
                    https://stackoverflow.com/questions/46421887/how-to-use-recaptcha-v2-on-localhost?rq=1 */}
                    <ReCAPTCHA sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" onChange={() => setCapVerified(true)} />
                </div>
                <button type="submit" className="primary contained lg" disabled={!(capVerified && email.length && password.length)}>Log in</button>
                <div className="body1">Don't have an account? <Link className="link" to={ROUTES.REGISTER.url}>Sign up</Link> here</div>
                <div className="body1">Forgot password? <Link className="link" to={ROUTES.FORGOTPASS_REQUEST.url}>Recover your password here</Link></div>
            </form>
        </div>)
}

const mapStateToProps = (state, ownProps) => ({

})

const mapDispatchToProps = (dispatch, ownProps) => ({
    attempt_login: (email, password) => dispatch(createAction(ACTION_TYPES.ATTEMPT_LOGIN, { email, password })),
    push_notif: (message) => dispatch(createAction(ACTION_TYPES.PUSH_NOTIF, { message: message })),
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);