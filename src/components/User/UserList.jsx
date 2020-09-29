import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { Link } from 'react-router-dom'

import { FETCH_RESOURCES, FETCH_STATUS } from '../../constants'
import ROUTES from '../../constants/routes'
import { ACTION_TYPES, createAction } from '../../constants/actions'

import ResxRender from '../Utils/ResxRender'

const UserList = ({ fetchUserList, userList, fetchStatus }) => {
    function render() {

        return (
            <div className="container">
                <h3>User List</h3>
                <div className="detailedList">
                    {Object.values(userList).map(user =>
                        <div key={user.id} className="detailedListItemContainer">
                            <Link to={ROUTES.USER_PROFILE.getUrl(user.id)} className="textPrimary highlight">{user.name}</Link>
                            <div className="textSecondary"><i className="fa fa-envelope" /> {user.email}</div>
                        </div>)}
                </div>
            </div>
        )
    }

    return <ResxRender render={render} fetchStatus={fetchStatus} fetchMethod={fetchUserList} />

}

const mapStateToProps = (state) => ({
    userList: state.user.userList,
    fetchStatus: state.utils.fetchStatus[FETCH_RESOURCES.USER_LIST]
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    fetchUserList: () => dispatch(createAction(ACTION_TYPES.FETCH_USER_LIST))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserList)
