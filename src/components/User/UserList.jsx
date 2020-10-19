import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { Link } from 'react-router-dom'
import { push } from 'connected-react-router'

import { FETCH_RESOURCES, ROLES } from '../../constants'
import ROUTES from '../../constants/routes'
import { ACTION_TYPES, createAction } from '../../constants/actions'

import ResxRender from '../Utils/ResxRender'
import Pagniator from '../Utils/Pagniator'

const VERIF_FILTER = {
    UNSET: { key: "UNSET", label: "Filter based on verification status" },
    NOT_VERIFIED: { key: "NOT_VERIFIED", label: "Show users who are not verified" },
    VERIFIED: { key: "VERIFIED", label: "Show users who are verified" },
}

const UserList = (props) => {

    const { userList, userCount, isAdmin } = props
    const { fetchUserList, openCreateModal, fetchStatus } = props

    const [verifFilter, setVerifFilter] = useState(VERIF_FILTER.UNSET.key)
    const [search, setSearch] = useState("")

    const [page, setPage] = useState(0)
    const [pageLen, setPageLen] = useState(parseInt(process.env.PAGE_LEN) || 5)


    const updateList = () => {
        console.log('Update user list called', search)
        fetchUserList({
            offset: page * pageLen, limit: pageLen,
            search: search || null, isVerified: verifFilter
        })
    }

    // Fetch new results on page nav, page len change or filter change
    useEffect(() => {
        // Check if the page has initialized state before making any requests
        if (Number.isInteger(page) || Number.isInteger(pageLen)) {
            updateList()
        }
    }, [page, pageLen, verifFilter])

    // Update pagination page len and count on new data
    useEffect(() => {
        if (typeof (userList) == 'object') {
            setPage(Math.max(0, Math.min(page, Math.floor((userCount - 1) / pageLen))))
        }
    }, [userList])


    // Handler when search query is submitted
    const performSearch = (e) => {
        e.preventDefault()
        updateList()
    }

    const usersToShow = Object.values(userList)

    return (
        <div className="container">
            <div className="listControlPanel">
                <div className="listTitleBar">
                    <div>
                        <div className="descTitle">List of Users</div>
                        <div className="descText">All the users currently using this application</div>
                    </div>
                    <div className="grow" />
                    {isAdmin && <button onClick={openCreateModal}
                        className="button primary contained sm">
                        <i className="fa fa-plus" />&nbsp;&nbsp;Create User</button>}
                </div>
                <form className="searchContainer" onSubmit={performSearch}>
                    <input type="text" className="searchBar" placeholder="Type here to search" value={search} onChange={({ target: { value } }) => setSearch(value)} />
                    <button type="submit" className="searchButton"><i className="fa fa-search" /></button>
                </form>
                <select name="verifFilter" value={verifFilter} onChange={({ target: { value } }) => setVerifFilter(value)}
                    className={"filterDropDown" + (verifFilter == Object.keys(VERIF_FILTER)[0] ? " default" : "")}>
                    {Object.values(VERIF_FILTER).map(({ key, label }, i) => <option key={key} value={key}>{label}</option>)}
                </select>
            </div>
            <Pagniator page={page} setPage={setPage} count={userCount} pageLen={pageLen} setPageLen={setPageLen} />

            <hr />
            <ResxRender render={render} fetchStatus={fetchStatus} fetchMethod={fetchUserList} fetchType={FETCH_RESOURCES.USER_LIST} />
        </div>
    )

    function render() {
        return <div className="detailedList">
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
    }

    // return <div>User List</div>
}

const mapStateToProps = (state) => ({
    userList: state.user.userList,
    userCount: state.user.count,

    fetchStatus: state.utils.fetchStatus[FETCH_RESOURCES.USER_LIST],
    isAdmin: state.user.role == ROLES.ADMIN,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    fetchUserList: (params) => dispatch(createAction(ACTION_TYPES.FETCH_USER_LIST, params)),
    openCreateModal: () => dispatch(push(ROUTES.USER_CREATE.url)),
})

export default connect(mapStateToProps, mapDispatchToProps)(UserList)
