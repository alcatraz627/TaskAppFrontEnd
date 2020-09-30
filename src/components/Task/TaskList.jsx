import React, { useState, useEffect } from 'react'

import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { Link } from 'react-router-dom'

import { FETCH_RESOURCES, TASK_STATUS } from '../../constants'
import ROUTES from '../../constants/routes'
import { ACTION_TYPES, createAction } from '../../constants/actions'
import { getDate } from '../../services/helpers'

import ResxRender from '../Utils/ResxRender'

const TaskList = ({ fetchTaskList, taskList, fetchStatus, openEditModal, userList, userId, openCreateModal, deleteTask }) => {

    const [taskFilter, setTaskFilter] = useState(null)
    const [search, setSearch] = useState("")

    const getFilterCount = (filterType, tasks) => {
        if (!filterType) return tasks.length
        return tasks.filter(t => t.status == filterType).length
    }

    const searchTasks = (tasks) => Object.values(tasks)
        .filter(task => (search.trim() == "") ||
            (task.title.toLowerCase().includes(search.toLowerCase()) ||
                task.description.toLowerCase().includes(search.toLowerCase())))

    const filterTasks = (tasks, filter) => filter ? tasks.filter(t => t.status == taskFilter) : tasks

    const tasksToList = searchTasks(taskList)


    function render() {
        return (
            <div className="container">
                <div className="listControlPanel">
                    <div className="listTitleBar">
                        <div>
                            <div className="descTitle">List of Tasks</div>
                            <div className="descText">Filter through tasks at different stages of progression, or just search with a keyword </div>
                        </div>
                        <div className="grow" />
                        <button className="button primary contained sm" onClick={openCreateModal}><i className="fa fa-plus" />&nbsp;&nbsp;Create Task</button>
                    </div>
                    <div className="searchContainer">
                        <input type="text" className="searchBar" placeholder="Type here to search" value={search} onChange={({ target: { value } }) => setSearch(value)} />
                        <button type="submit" className="searchButton"><i className="fa fa-search" /></button>
                    </div>
                    <div className="tabPanel">
                        <div className={`tab ${taskFilter == null && 'tab-active'}`} onClick={() => setTaskFilter(null)}>All <div className="label sm">{getFilterCount(null, tasksToList)} </div></div>
                        <div className={`tab ${taskFilter == TASK_STATUS.PENDING && 'tab-active'}`} onClick={() => setTaskFilter(TASK_STATUS.PENDING)}>Pending <div className="label sm orange">{getFilterCount(TASK_STATUS.PENDING, tasksToList)}</div> </div>
                        <div className={`tab ${taskFilter == TASK_STATUS.IN_PROGRESS && 'tab-active'}`} onClick={() => setTaskFilter(TASK_STATUS.IN_PROGRESS)}>In Progress <div className="label sm purple">{getFilterCount(TASK_STATUS.IN_PROGRESS, tasksToList)}</div></div>
                        <div className={`tab ${taskFilter == TASK_STATUS.COMPLETE && 'tab-active'}`} onClick={() => setTaskFilter(TASK_STATUS.COMPLETE)}>Completed <div className="label sm green">{getFilterCount(TASK_STATUS.COMPLETE, tasksToList)}</div></div>
                    </div>
                </div>
                <hr />
                <div className="detailedList">
                    {filterTasks(tasksToList, taskFilter).map(task =>
                        <div key={task.id} className="detailedListItemContainer">
                            <div className="flex">
                                <Link to={ROUTES.TASK_ITEM.getUrl(task.id)} className="textPrimary highlight">{task.title}</Link>
                                <div className="grow"></div>
                                {userId == task.created_by &&
                                    <div>
                                        <div className="listActionButton edit" onClick={() => openEditModal(task.id)}>
                                            <i className="fa fa-pencil fa fa-2x" />
                                        </div>
                                        <div className="listActionButton delete" onClick={() => deleteTask(task.id)}>
                                            <i className="fa fa-trash fa fa-2x" />
                                        </div>
                                    </div>}
                            </div>
                            <div className="taskMeta">
                                <div className="bigText">Created by
                                    <Link className="createdBy" to={ROUTES.USER_PROFILE.getUrl(task.created_by)}> {userList[task.created_by].name}</Link>
                                </div>
                                <div className="grow" />
                                <div className="bigText">{task.due_date ? `Due by ${getDate(task.due_date)}` : "No due date"}</div>
                                {/* <div className={`taskStatus ${task.status.toLowerCase()}`}>{task.status}</div> */}
                            </div>

                            <div className="taskMeta">
                                <div className="bigText">
                                    Assigned to {task.assigned_to ?
                                        <Link className="assignedTo" to={ROUTES.USER_PROFILE.getUrl(task.assigned_to)}> {userList[task.assigned_to].name}</Link>
                                        : " no one currently"}
                                </div>
                                <div className="grow" />
                                <div className={`taskStatus ${task.status.toLowerCase()}`}>{task.status}</div>
                            </div>

                        </div>)}
                </div>
            </div>
        )
    }

    return <ResxRender render={render} fetchStatus={fetchStatus} fetchMethod={fetchTaskList} />

}

const mapStateToProps = (state) => ({
    taskList: state.task,
    fetchStatus: state.utils.fetchStatus[FETCH_RESOURCES.TASK_LIST],

    userList: state.user.userList,
    userId: state.user.id,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    fetchTaskList: () => dispatch(createAction(ACTION_TYPES.FETCH_TASK_LIST)),
    deleteTask: (id) => dispatch(createAction(ACTION_TYPES.ATTEMPT_TASK_DELETE, { id })),
    openEditModal: (taskId) => dispatch(push(ROUTES.TASK_EDIT.getUrl(taskId))),
    openCreateModal: () => dispatch(push(ROUTES.TASK_CREATE.url))
})

export default connect(mapStateToProps, mapDispatchToProps)(TaskList)
