import React, { useState, useEffect } from 'react'

import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { Link } from 'react-router-dom'

import { FETCH_RESOURCES, TASK_STATUS } from '../../constants'
import ROUTES from '../../constants/routes'
import { ACTION_TYPES, createAction } from '../../constants/actions'
import { getDate, getUser, DELETED, hasDatePassed } from '../../services/helpers'

import ResxRender from '../Utils/ResxRender'
import Pagniator from '../Utils/Pagniator'

function TaskList(props) {

    const { fetchTaskList, openEditModal, openCreateModal, deleteTask } = props
    const { taskCount, taskList, fetchStatus, userList, userId } = props

    const [taskFilter, setTaskFilter] = useState(null)
    const [search, setSearch] = useState("")

    const [page, setPage] = useState(0)
    const [pageLen, setPageLen] = useState(parseInt(process.env.PAGE_LEN) || 5)


    // Dispatches the action to perform fetch with params 
    const updateList = () => {
        fetchTaskList({
            offset: page * pageLen, limit: pageLen,
            search: search || null, taskStatus: taskFilter
        })
    }

    // Fetch new results on page nav, page len change or filter change
    useEffect(() => {
        // Check if the page has initialized state before making any requests
        if (Number.isInteger(page) || Number.isInteger(pageLen)) {
            updateList()
        }
    }, [page, pageLen, taskFilter])

    // Update pagination page len and count on new data
    useEffect(() => {
        if (typeof (taskList) == 'object') {
            setPage(Math.max(0, Math.min(page, Math.floor((taskCount - 1) / pageLen))))
        }
    }, [taskList])

    // Handler when search query is submitted
    const performSearch = (e) => {
        e.preventDefault()
        updateList()
    }

    const tasksToList = Object.values(taskList)

    function render() {
        return (
            <div className="detailedList">
                {tasksToList.length == 0 &&
                    <div className="emptyList">
                        <h3>Oops</h3>
                        <div>No Tasks found</div>
                    </div>
                }
                {tasksToList.map(task =>
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
                            <div className="bigText">Created by&nbsp;
                                    <Link className="createdBy" to={ROUTES.USER_PROFILE.getUrl(task.created_by)}>{getUser(userList, task.created_by).name}</Link>
                            </div>
                            <div className="grow" />
                            <div className={(task.status != TASK_STATUS.COMPLETE) && hasDatePassed(task.due_date) ? "overdueTask" : ""}>{task.due_date ? `Due ${hasDatePassed(task.due_date) ? "on" : "by"} ${getDate(task.due_date)}` : "No due date"}</div>
                        </div>

                        <div className="taskMeta">
                            <div className="bigText">
                                Assigned to {task.assigned_to ?
                                    <Link className="assignedTo" to={ROUTES.USER_PROFILE.getUrl(task.assigned_to)}> {getUser(userList, task.assigned_to).name}</Link>
                                    : " no one currently"}
                            </div>
                            <div className="grow" />
                            <div className={`taskStatus ${task.status.toLowerCase()}`}>{task.status}</div>
                        </div>

                    </div>)}
                <Pagniator page={page} setPage={setPage} count={taskCount} pageLen={pageLen} setPageLen={setPageLen} />
            </div>
        )
    }

    return <div className="container narrowContainer">
        <div className="listControlPanel">
            <div className="listTitleBar">
                <div>
                    <div className="descTitle">List of Tasks</div>
                    <div className="descText">Filter through tasks at different stages of progression, or just search with a keyword </div>
                </div>
                <div className="grow" />
                <button className="button primary contained sm" onClick={openCreateModal}><i className="fa fa-plus" />&nbsp;&nbsp;Create Task</button>
            </div>
            <Pagniator page={page} setPage={setPage} count={taskCount} pageLen={pageLen} setPageLen={setPageLen} />
            <form className="searchContainer" onSubmit={performSearch}>
                <input name="search" type="text" className="searchBar" placeholder="Enter search query here" value={search} onChange={({ target: { value } }) => setSearch(value)} />
                <button type="submit" className="searchButton"><i className="fa fa-search" /></button>
            </form>
            <div className="tabPanel">
                <div className={`tab ${taskFilter == null ? 'tab-active' : ""}`} onClick={() => setTaskFilter(null)}>All</div>
                <div className={`tab ${TASK_STATUS.PENDING.toLowerCase()} ${taskFilter == TASK_STATUS.PENDING ? 'tab-active' : ""}`} onClick={() => setTaskFilter(TASK_STATUS.PENDING)}>Pending</div>
                <div className={`tab ${TASK_STATUS.IN_PROGRESS.toLowerCase()} ${taskFilter == TASK_STATUS.IN_PROGRESS ? 'tab-active' : ""}`} onClick={() => setTaskFilter(TASK_STATUS.IN_PROGRESS)}>In Progress</div>
                <div className={`tab ${TASK_STATUS.COMPLETE.toLowerCase()} ${taskFilter == TASK_STATUS.COMPLETE ? 'tab-active' : ""}`} onClick={() => setTaskFilter(TASK_STATUS.COMPLETE)}>Completed</div>
            </div>
        </div>
        <hr />
        <ResxRender render={render} fetchStatus={fetchStatus} fetchType={FETCH_RESOURCES.TASK_LIST} />
    </div>

}

const mapStateToProps = (state) => ({
    taskList: state.task.taskList,
    taskCount: state.task.count,
    fetchStatus: state.utils.fetchStatus[FETCH_RESOURCES.TASK_LIST],

    userList: state.user.userList,
    userId: state.user.id,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    fetchTaskList: (params) => dispatch(createAction(ACTION_TYPES.FETCH_TASK_LIST, params)),
    deleteTask: (id) => dispatch(createAction(ACTION_TYPES.ATTEMPT_TASK_DELETE, { id, toRedir: false })),
    openEditModal: (taskId) => dispatch(push(ROUTES.TASK_EDIT.getUrl(taskId))),
    openCreateModal: () => dispatch(push(ROUTES.TASK_CREATE.url))
})

export default connect(mapStateToProps, mapDispatchToProps)(TaskList)
