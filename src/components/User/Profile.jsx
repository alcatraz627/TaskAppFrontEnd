import React, { useState, useEffect } from 'react'

import { connect } from 'react-redux'
import { push, replace } from 'connected-react-router'

import { Link } from 'react-router-dom'

import { ROLES, TASK_STATUS, FETCH_STATUS, FETCH_RESOURCES } from '../../constants'
import ROUTES from '../../constants/routes'
import { ACTION_TYPES, createAction } from '../../constants/actions'

import { getDate, DELETED, hasDatePassed } from '../../services/helpers'
import ResxRender from '../Utils/ResxRender'

function Profile(props) {

    const [activeTab, setActiveTab] = useState(0)
    const [isEditingUser, setEditingUser] = useState(false)
    const [formData, setFormData] = useState({ name: null, email: null })

    const { userList, userRole, id, authId, taskList, fetchTaskListStatus, fetchUserItemStatus } = props
    const { resolveSelf, openEditModal, deleteTask, notFound, deleteUser,
        openCreateModal, editUser, fetchUserItem, fetchUserTasks, } = props

    useEffect(() => {
        if (id == 'me') {
            resolveSelf(authId);
        }
    }, [])

    const user = userList[id]

    if (user && formData.name === null) {
        setFormData({
            name: user.name,
            email: user.email,
        })
    }

    const getUserName = (id, className = "", showIsDeleted) =>
        (userList.hasOwnProperty(id)) ? <Link className={className} to={ROUTES.USER_PROFILE.getUrl(id)}>{userList[id].name}</Link> : (showIsDeleted ? DELETED : "no one currently")

    const getTasks = (getAssigned = true) => Object.values(taskList)
        .filter(t => getAssigned ? t.assigned_to == id : t.created_by == id)

    const getTaskType = (filterType, tasks) => {
        if (!filterType) return tasks
        return tasks.filter(t => t.status == filterType)
    }

    const getIncompleteTasks = (tasks) => [...getTaskType(TASK_STATUS.PENDING, tasks), ...getTaskType(TASK_STATUS.IN_PROGRESS, tasks)]

    const updateForm = ({ target: { name, value } }) => { setFormData(data => ({ ...data, [name]: value })) }

    const updateUser = () => {
        // TODO: Validate
        editUser({
            ...((formData.name != user.name) && { name: formData.name }),
            ...((formData.email != user.email) && { email: formData.email }),
        })
        setEditingUser(false)
    }

    // if (!user) {
    //     return <div className="loader" />
    // }

    function renderDashboard() {
        return <div className="userProfileDashboard">
            <div className="taskPanel">
                <div className="taskStatTitle">Performance Statistics</div>
                <div className="taskRatioBar">
                    {(getTasks(true).length == 0) ?
                        <div className="taskRatioItem default" style={{ flexGrow: 1 }}>No tasks assigned</div>
                        :
                        Object.keys(TASK_STATUS)
                            .map(t => ({ type: t, count: getTaskType(t, getTasks(true)).length }))
                            .map(({ type, count }, i) => <div key={i} className={`taskRatioItem ${type.toLowerCase()}`} style={{ flexGrow: Math.floor(count) }}>{count}</div>)}
                </div>

                <div className="taskStatTextBox">

                    {(getTasks(true).length == 0) ?
                        <div className="taskStatText">
                            <div className="noPending">This user has had no tasks!</div>
                        </div>
                        :
                        <>
                            <div className="taskStatText">
                                <div className="legendBox">
                                    {Object.keys(TASK_STATUS).map(t => <div key={t} className={`legend ${t.toLowerCase()}`}> {(t[0] + t.slice(1).toLowerCase()).replace("_", " ")} </div>)}
                                </div>
                            </div>
                            <div className="grow" />

                            {getIncompleteTasks(getTasks(true)).length == 0 ?
                                <div className="taskStatText">
                                    <div className="noPending">No pending tasks!</div>
                                </div>
                                :
                                <div className="taskStatText">
                                    <div className="fraction">
                                        <div className="numerator">{getIncompleteTasks(getTasks(true)).filter(t => hasDatePassed(t.due_date)).length}</div>
                                        <div className="divider"></div>
                                        <div className="denominator">{getIncompleteTasks(getTasks(true)).length}</div>
                                    </div>
                        incomplete tasks are overdue.
                    </div>
                            }
                        </>
                    }
                </div>
            </div>

            <br />

            <div className="taskPanel">
                <div className="tabPanel">
                    <div className={`tab ${activeTab == 0 && 'tab-active'}`} onClick={() => setActiveTab(0)}>Assigned Tasks <div className="label sm">{getTasks().length}</div></div>
                    <div className={`tab ${activeTab == 1 && 'tab-active'}`} onClick={() => setActiveTab(1)}>Created Tasks <div className="label purple sm">{getTasks(false).length}</div></div>
                </div>
                <hr />
                <div className="detailedList scroll">
                    {!getTasks(!activeTab).length &&
                        <div className="emptyList">
                            <h3>Oops</h3>
                            <div>No Tasks found</div>
                            {((user.id == authId) ? activeTab : !activeTab) ? <button className="primary contained" onClick={openCreateModal}><i className="fa fa-plus" /> &nbsp;Create Task</button> : ""}
                        </div>}
                    {getTasks(!activeTab).map(task =>
                        <div className="detailedListItemContainer" key={task.id}>
                            <div className="flex">
                                <Link to={ROUTES.TASK_ITEM.getUrl(task.id)} className="textPrimary">{task.title}</Link>
                                <div className="grow" />
                                {authId == task.created_by &&
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

                            <div className="taskMeta">
                                <div>
                                    <div className={(task.status != TASK_STATUS.COMPLETE && hasDatePassed(task.due_date)) ? "overdueTask" : ""}>{task.due_date ? `Due ${hasDatePassed(task.due_date) ? "on" : "by"} ${getDate(task.due_date)}` : "No due date"}</div>
                                    {activeTab == 1 ?
                                        <>Assigned to&nbsp;{getUserName(task.assigned_to, "assignedTo")}</> :
                                        <>Created by&nbsp;{getUserName(task.created_by, "createdBy", true)}</>
                                    }
                                </div>
                                <div className="grow" />
                                <div className={`taskStatus ${task.status.toLowerCase()}`}>{task.status}</div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

        </div>

    }

    function render() {

        return (
            <div className="userProfileContainer">
                <div className="userProfileSidebar">
                    <img className="profilePic" />
                    {isEditingUser
                        ?
                        <div className="userEditingForm">
                            {/* <h5 className="userName">{user.name}</h5>
                        <div className="userEmail"><i className="fa fa-envelope" /> {user.email}</div> */}
                            <input type="text" name="name" className="userEditingFormInput text" value={formData.name} onChange={updateForm} />
                            <input type="email" name="email" className="userEditingFormInput email" value={formData.email} onChange={updateForm} />
                        </div>
                        :
                        <>
                            <h5 className="userName">{user.name}</h5>
                            <div className="userEmail"><i className="fa fa-envelope" /> {user.email}</div>
                            {!user.verified && <div className="userVerified"><i className="fa fa-exclamation-triangle" /> User verification pending</div>}
                            {user.role == ROLES.ADMIN && <div className="label">{user.role}</div>}
                        </>
                    }


                    {isEditingUser ?
                        <div className="userEdtingControls">

                            <div onClick={updateUser} className="button green contained">
                                <i className="fa fa-floppy-o" />&nbsp;&nbsp;Save Changes</div>

                            <div onClick={() => setEditingUser(false)} className="button secondary outlined">
                                <i className="fa fa-ban" />&nbsp;&nbsp;Cancel</div>
                        </div> :

                        (user.id == authId &&
                            <div onClick={() => setEditingUser(true)} className="button yellow outlined">
                                <i className="fa fa-pencil" />&nbsp;&nbsp;Edit User</div>)}


                    {userRole == ROLES.ADMIN && user.id != authId && <div className="button secondary contained" onClick={() => { deleteUser(user.id) }}><i className="fa fa-trash fa" />&nbsp;&nbsp;Delete User</div>}
                </div>

                <ResxRender render={renderDashboard} fetchStatus={fetchTaskListStatus} fetchMethod={fetchUserTasks} fetchType={FETCH_RESOURCES.TASK_LIST} />

            </div>
        )
    }

    return <ResxRender render={render} fetchStatus={fetchUserItemStatus} fetchMethod={fetchUserItem} fetchType={FETCH_RESOURCES.USER_ITEM} />
}

const mapStateToProps = (state, ownProps) => ({
    id: ownProps.match.params.id,
    userList: state.user.userList,
    authId: state.user.id,
    userRole: state.user.role,
    taskList: state.task.taskList,

    fetchUserItemStatus: state.utils.fetchStatus[FETCH_RESOURCES.USER_ITEM],
    fetchTaskListStatus: state.utils.fetchStatus[FETCH_RESOURCES.TASK_LIST],

})

const mapDispatchToProps = (dispatch, ownProps) => ({
    fetchUserItem: () => dispatch(createAction(ACTION_TYPES.FETCH_USER_ITEM, { id: ownProps.match.params.id })),
    fetchUserTasks: () => dispatch(createAction(ACTION_TYPES.FETCH_USER_TASKS, { id: ownProps.match.params.id })),

    openCreateModal: () => dispatch(push(ROUTES.TASK_CREATE.url)),
    openEditModal: (taskId) => dispatch(push(ROUTES.TASK_EDIT.getUrl(taskId))),
    deleteTask: (id) => dispatch(createAction(ACTION_TYPES.ATTEMPT_TASK_DELETE, { id, toRedir: false })),

    editUser: (formData) => dispatch(createAction(ACTION_TYPES.ATTEMPT_USER_EDIT, { id: ownProps.match.params.id, formData })),

    resolveSelf: (authId) => dispatch(push(ROUTES.USER_PROFILE.getUrl(authId))),
    notFound: () => dispatch(replace(ROUTES.NOT_FOUND.url)),

    deleteUser: (id) => dispatch(createAction(ACTION_TYPES.ATTEMPT_USER_DELETE, { id }))
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile);