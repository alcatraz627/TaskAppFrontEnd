import React from 'react'

function Login(props) {
    return (
        <div className="container loginBg">
            <div className="loginForm">
                <h3>Log In</h3>
                <div className="formgroup">
                    <label className="body2">Email</label>
                    <input type="text" placeholder="Enter email address" />
                </div>
                <div className="formgroup">
                <label className="body2">Password</label>
                    <input type="password" placeholder="Enter password" />
                </div>
                <button type="submit" className="primaryButton">Log in</button>
            </div>
        </div>)
}

export default Login;