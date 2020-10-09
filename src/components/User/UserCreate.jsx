import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { push, replace } from 'connected-react-router'

import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

import { FETCH_RESOURCES, MESSAGES } from '../../constants'
import { ACTION_TYPES, createAction } from '../../constants/actions'
import ROUTES from '../../constants/routes'

// import { getDate } from '../../services/helpers'

function UserCreate(props) {

    const { createUser, closeModal, unauthorized } = props

    const [formData, setFormData] = useState({ name: "", email: "", password: "", password_confirmation: "" })

    const [passwordStrength, setPasswordStrength] = useState(0)

    const passwordStengthRegex = [
        new RegExp("(?=.{6,}).*", "g"),
        new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g"),
        new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g"),
    ]

    useEffect(() => {
        setPasswordStrength(
            ((formData.password.length > 0) ? 1 : 0) +
            (passwordStengthRegex[0].test(formData.password) ? 1 : 0) +
            (passwordStengthRegex[1].test(formData.password) ? 1 : 0) +
            (passwordStengthRegex[2].test(formData.password) ? 1 : 0)
        )
    }, [formData.password])


    const updateForm = ({ target: { name, value } }) => { setFormData(data => ({ ...data, [name]: value })) }

    const submitForm = e => {
        e.preventDefault()
        // TODO: Validation
        createUser(formData)
    }
    

    const getPwSColor = ['black', 'red', 'oragne', '#fda50f', 'green']
    const getPwSText = ['Type password', 'Please type at least 6 characters', 'Weak', 'Medium', 'Strong']


    return (
        <div className="modal" id="editTaskModal">
            <div className="userContainer">
                <h4>Create User</h4>
                {/* <div className="modalLabel">Create User</div> */}

                <form className="modalForm fullWidth" onSubmit={submitForm}>
                    <div className="modalFormData">
                        <div className="modalLabel">Enter the user's name</div>
                        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={updateForm} className="modalTextField fullWidth" />
                    </div>
                    <div className="modalFormData">
                        <div className="modalLabel">Enter the user's email</div>
                        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={updateForm} className="modalTextField fullWidth" />
                    </div>
                    <div className="modalFormData">
                        <div className="modalLabel">Create a temporary password</div>
                        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={updateForm} className="modalTextField fullWidth" />
                        <div align="left" className="body2">
                            Password Strength: &nbsp;&nbsp;
                            <span style={{ color: getPwSColor[passwordStrength] }}>{getPwSText[passwordStrength]}</span>
                        </div>
                    </div>
                    <div className="modalFormData">
                        <div className="modalLabel">Re-enter the temporary password</div>
                        <input type="password" name="password_confirmation" placeholder="Confirm Password" value={formData.password_confirmation} onChange={updateForm} className="modalTextField fullWidth" />
                    </div>

                    <br />
                    <button type="submit" className="primary contained fullWidth">Create User</button>

                </form>

            </div>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => ({

})

const mapDispatchToProps = (dispatch, ownProps) => ({
    createUser: (formData) => dispatch(createAction(ACTION_TYPES.ATTEMPT_USER_CREATE, { formData })),
    closeModal: () => dispatch(push(ROUTES.USER_LIST.url)),

    unauthorized: (message) => dispatch(createAction(ACTION_TYPES.SET_MESSAGE, MESSAGES.UNAUTHORIZED)),
    // notFound: () => dispatch(replace(ROUTES.NOT_FOUND.url)),
})

export default connect(mapStateToProps, mapDispatchToProps)(UserCreate)
