import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { Link } from 'react-router-dom'

import { FETCH_RESOURCES, FETCH_STATUS } from '../../constants'
import ROUTES from '../../constants/routes'
import { ACTION_TYPES, createAction } from '../../constants/actions'

import ResxRender from '../Utils/ResxRender'

const UserList = ({ fetchUserList, userList, fetchStatus }) => {
    // useEffect(() => {
    //     if (fetchStatus == FETCH_STATUS.NOT_FETCHED) fetchUserList()
    // }, []);

    // switch (fetchStatus) {
    //     case FETCH_STATUS.NOT_FETCHED:
    //     // return <div>Not Fetched</div>
    //     case FETCH_STATUS.FETCHING:
    //         <div className="loader" />
    //     case FETCH_STATUS.FETCHED:
    function render() {

        return (
            <div className="container">
                <h3>User List</h3>
                <div className="detailedList">
                    {Object.values(userList).map(user =>
                        <div key={user.id} className="detailedListItemContainer">
                            <Link to={ROUTES.USER_PROFILE.getUrl(user.id)} className="textPrimary">{user.name}</Link>
                            <div className="textSecondary">{user.email}</div>
                        </div>)}
                </div>
            </div>
        )
    }

    return <ResxRender render={render} fetchStatus={fetchStatus} fetchMethod={fetchUserList} />

    //     case FETCH_STATUS.FETCH_ERROR:
    //     default:
    //         return <div>An error has occured. Please try later.</div>
    // }

}

const mapStateToProps = (state) => ({
    userList: state.user.userList,
    fetchStatus: state.utils.fetchStatus[FETCH_RESOURCES.USER_LIST]
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    fetchUserList: () => dispatch(createAction(ACTION_TYPES.FETCH_USER_LIST))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserList)
