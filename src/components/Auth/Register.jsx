import React, { useState } from 'react'

import { connect } from 'react-redux'
import { createAction, ACTION_TYPES } from '../../constants/actions'

function Register({ attempt_register }) {

    const [name, setName] = useState("User With a Name");
    const [email, setEmail] = useState("user_email@gmail.com");
    const [password, setPassword] = useState("12017");
    const [password_confirmation, setPasswordConfirmation] = useState("12017");

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
            </form>
        </div>)
}

const mapStateToProps = (state, ownProps) => ({

})

const mapDispatchToProps = (dispatch, ownProps) => ({
    attempt_register: (name, email, password, password_confirmation) => dispatch(createAction(ACTION_TYPES.ATTEMPT_REGISTER, { name, email, password, password_confirmation }))
})

export default connect(mapStateToProps, mapDispatchToProps)(Register);