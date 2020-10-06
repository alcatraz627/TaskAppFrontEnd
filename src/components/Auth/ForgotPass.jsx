import React, { useState, useEffect } from 'react'

import ReCAPTCHA from 'react-google-recaptcha'

import { replace } from 'connected-react-router'

import { connect } from 'react-redux'
import { createAction, ACTION_TYPES } from '../../constants/actions'

import ROUTES from '../../constants/routes'

const ForgotPass = (props) => {


    const { forgotpass_request, forgotpass_verify, forgotpass_reset, notFound } = props

    const [email, setEmail] = useState("aakarsh.chopra@vmock.com")
    const [token, setToken] = useState(props.match.params.token)
    const [password, setPassword] = useState("")
    const [password_confirmation, setPasswordConfirmed] = useState("")

    const [capVerified, setCapVerified] = useState(true)

    useEffect(() => {
        if (props.match.path == ROUTES.FORGOTPASS_RESET.url) {
            setToken(props.match.params.token)
            forgotpass_verify(props.match.params.token)
        }
    }, [])

    const submitForm = e => {
        console.log("ForgotPass", props.match.path)
        e.preventDefault()
        // TODO: Verif

        switch (props.match.path) {
            case ROUTES.FORGOTPASS_REQUEST.url:
                forgotpass_request(email)
                break;
            case ROUTES.FORGOTPASS_RESET.url:
                forgotpass_reset(token, password, password_confirmation)
                break;
        }

    }

    switch (props.match.path) {

        case ROUTES.FORGOTPASS_REQUEST.url:
            return <div className="container forgotPassContainer">
                <form className="forgotPassForm" onSubmit={submitForm}>
                    <h4>Unable to log in?</h4>
                    <div className="body1">Recover your email in three easy steps</div>
                    <br />
                    <div className="formgroup">
                        <label className="body2">Enter the email associated with your account</label>
                        <input name="email" type="email" placeholder="Enter Email" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <button type="submit" className="primary outlined" disabled={!capVerified}>Recover my account</button>
                </form>
            </div>

        case ROUTES.FORGOTPASS_RESET.url:
            return <div className="container forgotPassContainer">
                <form className="forgotPassForm" onSubmit={submitForm}>
                    <h4>Reset your password</h4>
                    <div className="body1">Email confirmed. You can now set a new password.</div>
                    <br />
                    <div className="formgroup">
                        <label className="body2">Enter a new pasword</label>
                        <input name="password" type="password" placeholder="Enter new password" value={password} onChange={e => setPassword(e.target.value)} />
                    </div>
                    <div className="formgroup">
                        <label className="body2">Re-enter the new password</label>
                        <input name="password_confirmed" type="password" placeholder="Enter password again" value={password_confirmation} onChange={e => setPasswordConfirmed(e.target.value)} />
                    </div>
                    <button type="submit" className="primary outlined" disabled={!capVerified}>Recover my account</button>
                </form>
            </div>

        default:
            notFound()
            return <div className="loader" />
    }
}

const mapStateToProps = (state, ownProps) => ({

})

const mapDispatchToProps = (dispatch, ownProps) => ({
    forgotpass_request: (email) => dispatch(createAction(ACTION_TYPES.FORGOTPASS_REQUEST, { email })),
    forgotpass_verify: (token) => dispatch(createAction(ACTION_TYPES.FORGOTPASS_VERIFY, { token })),
    forgotpass_reset: (token, password, password_confirmation) => dispatch(createAction(ACTION_TYPES.FORGOTPASS_RESET, { token, password, password_confirmation })),

    notFound: () => dispatch(replace(ROUTES.NOT_FOUND.url)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPass)
