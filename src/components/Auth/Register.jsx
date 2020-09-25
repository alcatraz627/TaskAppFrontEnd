import React, { useState, useEffect } from 'react'

import { connect } from 'react-redux'
import { createAction, ACTION_TYPES } from '../../constants/actions'

import { Link } from 'react-router-dom'
import ROUTES from '../../constants/routes'

function Register(props) {

    const { attempt_register, verif_email_token } = props

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password_confirmation, setPasswordConfirmation] = useState("");

    useEffect(() => {
        if (props.match.path == ROUTES.EMAIL_VERIF.url) {
            // TODO: Loading=true
            verif_email_token(props.match.params.token)
        }
    }, [])

    const login = (e) => {
        // TODO: Validate
        e.preventDefault();
        attempt_register(name, email, password, password_confirmation)
    }

    return (
        <div className="container registerBg">
            <form className="registerForm" onSubmit={login}>
                <h3>Create an Account</h3>
                <div className="body1">It's free, and takes no time</div>
                <div className="formgroup">
                    <label className="body2">Name</label>
                    <input name="name" type="text" placeholder="Enter your name" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className="formgroup">
                    <label className="body2">Email</label>
                    <input name="email" type="text" placeholder="Enter email address" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="formgroup">
                    <label className="body2">Password</label>
                    <input type="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <div className="formgroup">
                    <label className="body2">Re-enter Password</label>
                    <input type="password" placeholder="Enter password confirmation" value={password_confirmation} onChange={e => setPasswordConfirmation(e.target.value)} />
                </div>
                <button type="submit" className="primary contained lg">Create my account</button>
                <div className="body1">Have an account? <Link className="link" to={ROUTES.LOGIN.url}>Log in</Link> instead</div>
            </form>
        </div>)
}

const mapStateToProps = (state, ownProps) => ({
    // ...ownProps
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    attempt_register: (name, email, password, password_confirmation) => dispatch(createAction(ACTION_TYPES.ATTEMPT_REGISTER, { name, email, password, password_confirmation })),
    verif_email_token: token => dispatch(createAction(ACTION_TYPES.ATTEMPT_EMAIL_VERIF, { token })),
})

export default connect(mapStateToProps, mapDispatchToProps)(Register);