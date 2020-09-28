import React, { useState, useEffect } from 'react'

import { connect } from 'react-redux'
import { push } from 'connected-react-router'

import { Link } from 'react-router-dom'

import { ROLES } from '../../constants'
import ROUTES from '../../constants/routes'

function Profile({ userList, id, userId, resolveSelf, taskList }) {

    useEffect(() => {
        if (id == 'me') {
            resolveSelf(userId);
        }
    })

    const [activeTab, setActiveTab] = useState(0)

    let user;
    const idToGet = parseInt((id == 'me') ? userId : id)
    if (!Object.keys(userList).includes(idToGet.toString())) {
        // TODO: Make a request to try to fetch the user & show Loading...
        // TODO: Redirect -> 404
        return <div>Not found</div>
    } else {
        user = userList[idToGet]
    }

    const getUser = id =>
        (userList.hasOwnProperty(id)) ? userList[id] : ({
            name: "DELETED"
        })


    return (
        <div className="userProfileContainer">
            <div className="userProfileSidebar">
                <img className="profilePic" />
                <h5 className="userName">{user.name}</h5>
                <div className="userEmail"><i className="fa fa-envelope"></i> {user.email}</div>
                {user.role == ROLES.ADMIN && <div className="label">{user.role}</div>}
            </div>
            <div className="userProfileDashboard">
                <div className="taskPanel">
                    <div className="tabPanel">
                        <div className={`tab ${activeTab == 0 && 'tab-active'}`} onClick={() => setActiveTab(0)}>Assigned Task</div>
                        <div className={`tab ${activeTab == 1 && 'tab-active'}`} onClick={() => setActiveTab(1)}>Created Task</div>
                    </div>
                    <hr />
                    <div className="detailedList">
                        {Object.values(taskList)
                            .filter(t => activeTab == 1 ? t.created_by == id : t.assigned_to == id)
                            .map(task =>
                                <div className="detailedListItemContainer" key={task.id}>
                                    <Link to={ROUTES.TASK_ITEM.getUrl(task.id)} className="textPrimary">{task.title}</Link>
                                    <div className="textSecondary">{JSON.stringify(user[task.created_by])}</div>
                                </div>
                            )}
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => ({
    id: ownProps.match.params.id,
    userList: state.user.userList,
    userId: state.user.id,

    taskList: state.task
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    resolveSelf: (userId) => dispatch(push(ROUTES.USER_PROFILE.getUrl(userId)))
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile);