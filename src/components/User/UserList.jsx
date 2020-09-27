import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { Link } from 'react-router-dom'

import ROUTES from '../../constants/routes'
import { ACTION_TYPES, createAction } from '../../constants/actions'

const UserList = ({ fetchUserList, userList, isFetchingUsers }) => {

    useEffect(() => {
        fetchUserList()
    }, [])

    return (
        <div className="container">
            <h3>User List</h3>
            {isFetchingUsers ? <div>Loading...</div> :
                <div className="detailedList">
                    {Object.values(userList).map(user =>
                        <div key={user.id} className="detailedListItemContainer">
                            <Link to={ROUTES.USER_PROFILE.getUrl(user.id)} className="textPrimary">{user.name}</Link>
                            <div className="textSecondary">{user.email}</div>
                        </div>)}
                </div>}
        </div>
    )
}

const mapStateToProps = (state) => ({
    userList: state.user.userList,
    isFetchingUsers: state.user.isFetchingUsers,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    fetchUserList: () => dispatch(createAction(ACTION_TYPES.FETCH_USER_LIST))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserList)
