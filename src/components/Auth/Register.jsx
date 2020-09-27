import React, { useState, useEffect } from 'react'

import ReCAPTCHA from 'react-google-recaptcha'

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

    const [passwordStrength, setPasswordStrength] = useState(0)

    const [capVerified, setCapVerified] = useState(false)

    useEffect(() => {
        if (props.match.path == ROUTES.EMAIL_VERIF.url) {
            // TODO: Show loading screen while the verification is happening
            verif_email_token(props.match.params.token)
        }
    }, [])

    // Ranked in order of increasing strength
    const passwordStengthRegex = [
        new RegExp("(?=.{6,}).*", "g"),
        new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g"),
        new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g"),
    ]

    useEffect(() => {
        setPasswordStrength(
            ((password.length > 0) ? 1 : 0) +
            (passwordStengthRegex[0].test(password) ? 1 : 0) +
            (passwordStengthRegex[1].test(password) ? 1 : 0) +
            (passwordStengthRegex[2].test(password) ? 1 : 0)
        )
    }, [password])

    const login = (e) => {
        // TODO: Validate
        e.preventDefault();
        attempt_register(name, email, password, password_confirmation)
    }

    const getPwSColor = ['black', 'red', 'oragne', '#fda50f', 'green']
    const getPwSText = ['Type password', 'Please type at least 6 characters', 'Weak', 'Medium', 'Strong']

    if(props.match.path == ROUTES.EMAIL_VERIF.url) return(<div className="h3">Loading...</div>)

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
                <div className="formgroup">
                    <div align="left" className="body2">
                        Password Strength: &nbsp;&nbsp; 
                    <span style={{ color: getPwSColor[passwordStrength] }}>{getPwSText[passwordStrength]}</span>
                    </div>
                </div>
                <div className="formgroup">
                    {/* ReCAPTCHA keys for testing on localhost: 
                    https://stackoverflow.com/questions/46421887/how-to-use-recaptcha-v2-on-localhost?rq=1 */}
                    <ReCAPTCHA sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" theme="dark" onChange={() => setCapVerified(true)} />
                </div>
                <button type="submit" className="primary contained lg" disabled={!capVerified}>Create my account</button>
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