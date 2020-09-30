import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { Link } from 'react-router-dom'

import { FETCH_RESOURCES, FETCH_STATUS } from '../../constants'
import ROUTES from '../../constants/routes'
import { ACTION_TYPES, createAction } from '../../constants/actions'

import ResxRender from '../Utils/ResxRender'

const UserList = (props) => {

    const [search, setSearch] = useState("")

    const { userList } = props
    const { fetchUserList, openCreateModal, fetchStatus } = props

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
                    {/* <div className="tabPanel">
                        <div className={`tab ${taskFilter == null && 'tab-active'}`} onClick={() => setTaskFilter(null)}>All <div className="label sm">{getFilterCount(null, tasksToList)} </div></div>
                        <div className={`tab ${taskFilter == TASK_STATUS.PENDING && 'tab-active'}`} onClick={() => setTaskFilter(TASK_STATUS.PENDING)}>Pending <div className="label sm orange">{getFilterCount(TASK_STATUS.PENDING, tasksToList)}</div> </div>
                        <div className={`tab ${taskFilter == TASK_STATUS.IN_PROGRESS && 'tab-active'}`} onClick={() => setTaskFilter(TASK_STATUS.IN_PROGRESS)}>In Progress <div className="label sm purple">{getFilterCount(TASK_STATUS.IN_PROGRESS, tasksToList)}</div></div>
                        <div className={`tab ${taskFilter == TASK_STATUS.COMPLETE && 'tab-active'}`} onClick={() => setTaskFilter(TASK_STATUS.COMPLETE)}>Completed <div className="label sm green">{getFilterCount(TASK_STATUS.COMPLETE, tasksToList)}</div></div>
                    </div> */}
                </div>
                <hr />


                <div className="detailedList">
                    {Object.values(userList).map(user =>
                        <div key={user.id} className="detailedListItemContainer">
                            <Link to={ROUTES.USER_PROFILE.getUrl(user.id)} className="textPrimary highlight">{user.name}</Link>
                            <br />
                            <br />
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
