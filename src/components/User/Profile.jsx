import React, { useState, useEffect } from 'react'

import { connect } from 'react-redux'
import { push } from 'connected-react-router'

import { Link } from 'react-router-dom'

import { ROLES } from '../../constants'
import ROUTES from '../../constants/routes'
import { ACTION_TYPES, createAction } from '../../constants/actions'

function Profile({ userList, id, userId, resolveSelf, taskList, openEditModal, deleteTask }) {

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

    const getUserName = (id, className = "") =>
        (userList.hasOwnProperty(id)) ? <Link className={className} to={ROUTES.USER_PROFILE.getUrl(id)}>{userList[id].name}</Link> : "no one"

    const getTasks = (getAssigned = true) => Object.values(taskList)
        .filter(t => getAssigned ? t.assigned_to == id : t.created_by == id)

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
                        <div className={`tab ${activeTab == 0 && 'tab-active'}`} onClick={() => setActiveTab(0)}>Assigned Tasks <div className="label sm">{getTasks().length}</div></div>
                        <div className={`tab ${activeTab == 1 && 'tab-active'}`} onClick={() => setActiveTab(1)}>Created Tasks <div className="label purple sm">{getTasks(false).length}</div></div>
                    </div>
                    <hr />
                    <div className="detailedList">
                        {Object.values(taskList)
                            .filter(t => activeTab == 1 ? t.created_by == id : t.assigned_to == id)
                            .map(task =>
                                <div className="detailedListItemContainer" key={task.id}>
                                    <div className="flex">
                                        <Link to={ROUTES.TASK_ITEM.getUrl(task.id)} className="textPrimary">{task.title}</Link>
                                        <div className="grow" />
                                        {userId == task.created_by &&
                                            <>
                                                <div className="listActionButton edit" onClick={() => openEditModal(task.id)}>
                                                    <i className="fa fa-pencil fa fa-2x"></i>
                                                </div>
                                                <div className="listActionButton delete" onClick={() => deleteTask(task.id)}>
                                                    <i className="fa fa-trash fa fa-2x" />
                                                </div>
                                            </>
                                        }

                                    </div>

                                    <div className="taskMeta">{
                                        activeTab == 1 ?
                                            // userList[task.assigned_to].name :
                                            // userList[task.created_by].name
                                            <>Assigned to&nbsp;{getUserName(task.assigned_to, "assignedTo")}</> :
                                            <>Created by&nbsp;{getUserName(task.created_by, "createdBy")}</>
                                    }</div>
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
    openEditModal: (taskId) => dispatch(push(ROUTES.TASK_EDIT.getUrl(taskId))),
    deleteTask: (id) => dispatch(createAction(ACTION_TYPES.ATTEMPT_TASK_DELETE, { id })),
    resolveSelf: (userId) => dispatch(push(ROUTES.USER_PROFILE.getUrl(userId))),
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile);