import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { Link } from 'react-router-dom'
import { push } from 'connected-react-router'

import { FETCH_RESOURCES, ROLES } from '../../constants'
import ROUTES from '../../constants/routes'
import { ACTION_TYPES, createAction } from '../../constants/actions'

import ResxRender from '../Utils/ResxRender'

const UserList = (props) => {

    const [search, setSearch] = useState("")

    const { userList } = props
    const { fetchUserList, openCreateModal, fetchStatus } = props

    const searchUsers = users => users
        .filter(user => (search.trim() == "") ||
            (user.name.toLowerCase().includes(search.toLowerCase()) ||
                user.email.toLowerCase().includes(search.toLowerCase())))


    const usersToShow = searchUsers(Object.values(userList))

    function render() {

        return (
            <div className="container">

                <div className="listControlPanel">
                    <div className="listTitleBar">
                        <div>
                            <div className="descTitle">List of Users</div>
                            <div className="descText">All the users currently using this application</div>
                        </div>
                        <div className="grow" />
                        <button className="button primary contained sm" onClick={openCreateModal}><i className="fa fa-plus" />&nbsp;&nbsp;Create User</button>
                    </div>
                    <div className="searchContainer">
                        <input type="text" className="searchBar" placeholder="Type here to search" value={search} onChange={({ target: { value } }) => setSearch(value)} />
                        <button type="submit" className="searchButton"><i className="fa fa-search" /></button>
                    </div>
                </div>
                <hr />
                <div className="detailedList">
                    {usersToShow.map(user =>
                        <div key={user.id} className="detailedListItemContainer">
                            <div className="flex align-center">
                                <Link to={ROUTES.USER_PROFILE.getUrl(user.id)} className="textPrimary highlight">{user.name}</Link>
                                <div className="grow" />
                                {user.role == ROLES.ADMIN && <div className="label">{user.role}</div>}
                            </div>
                            <div className="flex">
                                <div className="textSecondary"><i className="fa fa-envelope" /> {user.email}</div>
                                <div className="grow" />
                                {!user.verified && <div className="userVerified"><i className="fa fa-exclamation-triangle" /> User verification pending</div>}

                            </div>
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
    fetchUserList: () => dispatch(createAction(ACTION_TYPES.FETCH_USER_LIST)),
    openCreateModal: () => dispatch(push(ROUTES.USER_CREATE.url)),
})

export default connect(mapStateToProps, mapDispatchToProps)(UserList)
