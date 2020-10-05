import React, { useState, useEffect } from 'react'

import { connect } from 'react-redux'
import { push, replace } from 'connected-react-router'

import { Link } from 'react-router-dom'

import { ROLES } from '../../constants'
import ROUTES from '../../constants/routes'
import { ACTION_TYPES, createAction } from '../../constants/actions'
import { getUser, DELETED } from '../../services/helpers'

function Profile(props) {

    const { userList, userRole, id, userId, taskList } = props
    const { resolveSelf, openEditModal, deleteTask, notFound, deleteUser, openCreateModal } = props

    useEffect(() => {
        if (id == 'me') {
            resolveSelf(userId);
        }
        if (!Object.keys(userList).includes(id.toString())) {
            notFound()
        }
    })

    const [activeTab, setActiveTab] = useState(0)

    const user = userList[id]

    const getUserName = (id, className = "", showIsDeleted) =>
        (userList.hasOwnProperty(id)) ? <Link className={className} to={ROUTES.USER_PROFILE.getUrl(id)}>{userList[id].name}</Link> : (showIsDeleted ? DELETED : "no one currently")

    const getTasks = (getAssigned = true) => Object.values(taskList)
        .filter(t => getAssigned ? t.assigned_to == id : t.created_by == id)

    if (!user) {
        return <div className="loader" />
    }
    return (
        <div className="userProfileContainer">
            <div className="userProfileSidebar">
                <img className="profilePic" />
                <h5 className="userName">{user.name}</h5>
                <div className="userEmail"><i className="fa fa-envelope"></i> {user.email}</div>
                {user.role == ROLES.ADMIN && <div className="label">{user.role}</div>}
                {user.id == userId && <div className="button yellow outlined"><i className="fa fa-pencil" />&nbsp;&nbsp;Edit User</div>}
                {userRole == ROLES.ADMIN && user.id != userId && <div className="button secondary contained" onClick={() => { deleteUser(user.id) }}><i className="fa fa-trash fa" />&nbsp;&nbsp;Delete User</div>}
            </div>
            <div className="userProfileDashboard">
                <div className="taskPanel">
                    <div className="tabPanel">
                        <div className={`tab ${activeTab == 0 && 'tab-active'}`} onClick={() => setActiveTab(0)}>Assigned Tasks <div className="label sm">{getTasks().length}</div></div>
                        <div className={`tab ${activeTab == 1 && 'tab-active'}`} onClick={() => setActiveTab(1)}>Created Tasks <div className="label purple sm">{getTasks(false).length}</div></div>
                    </div>
                    <hr />
                    <div className="detailedList">
                        {!getTasks(!activeTab).length &&
                            <div className="emptyList">
                                <h3>Oops</h3>
                                <div>No Tasks found</div>
                                <hr />
                                {!activeTab && <button className="primary contained" onClick={openCreateModal}><i className="fa fa-plus" /> &nbsp;Create Task</button>}
                            </div>}
                        {getTasks(!activeTab).map(task =>
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
                                        <>Created by&nbsp;{getUserName(task.created_by, "createdBy", true)}</>
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
    userRole: state.user.role,

    taskList: state.task
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    openCreateModal: () => dispatch(push(ROUTES.TASK_CREATE.url)),
    openEditModal: (taskId) => dispatch(push(ROUTES.TASK_EDIT.getUrl(taskId))),
    deleteTask: (id) => dispatch(createAction(ACTION_TYPES.ATTEMPT_TASK_DELETE, { id, toRedir: false })),
    resolveSelf: (userId) => dispatch(push(ROUTES.USER_PROFILE.getUrl(userId))),
    notFound: () => dispatch(replace(ROUTES.NOT_FOUND.url)),

    deleteUser: (id) => dispatch(createAction(ACTION_TYPES.ATTEMPT_USER_DELETE, { id }))
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile);