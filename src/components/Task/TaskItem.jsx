import React, { useState, useEffect } from 'react'

import { connect } from 'react-redux'

import { Link } from 'react-router-dom'
import { push } from 'connected-react-router'

import { TASK_STATUS, FETCH_RESOURCES } from '../../constants'
import ROUTES from '../../constants/routes'
import { ACTION_TYPES, createAction } from '../../constants/actions'

import { getDate } from '../../services/helpers'
import ResxRender from '../Utils/ResxRender'

function TaskItem(props) {

    const { task, userList, userId, fetchStatus } = props
    const { openEditModal, updateStatus, deleteTask, fetchTaskItem } = props

    const [isUpdatingStatus, setUpdateStatus] = useState(false)
    const [taskStatus, setTaskStatus] = useState("")

    useEffect(() => {
        if (task) {
            // Since the API update of status fires on the change of isUpdatingStatus from true->false, 
            // it also needs to ensure that it's not firing with an empty value on initialization
            if (!isUpdatingStatus && (taskStatus != "") && (taskStatus != task.status)) {
                // If it has turned to false, then save the value
                updateStatus(taskStatus.toUpperCase())
            }
        }
    }, [isUpdatingStatus])

    useEffect(() => {
        // Filling in the initial value. taskStatus is also used for view to show the most recent value
        if (task && taskStatus == "")
            setTaskStatus(task.status.toUpperCase())
    }, [task])

    const updateTaskStatus = ({ target: { value } }) => { setTaskStatus(value.toUpperCase()) }

    function render() {

        return <div className="taskContainer">
            <div className="taskItemTitle">
                <h4 className="noSpacing">{task.title}</h4>
                <div className="grow" />
                {userId == task.created_by &&
                    <>
                        <div className="listActionButton delete" onClick={() => deleteTask(task.id)}>
                            <i className="fa fa-trash fa fa-2x" />
                        </div>
                        <div className="listActionButton edits" onClick={openEditModal}>
                            <i className="fa fa-pencil fa fa-2x"></i>
                        </div>
                    </>
                }
            </div>

            <div className="taskMeta">
                <Link to={ROUTES.USER_PROFILE.getUrl(task.created_by)} className="createdBy">{userList[task.created_by].name}</Link>
            assigned this to
            {task.assigned_to ? <Link to={ROUTES.USER_PROFILE.getUrl(task.assigned_to)} className="assignedTo">{userList[task.assigned_to].name}</Link> : " no one currently"}
                <div className="grow" />
                {((userId == task.assigned_to) && isUpdatingStatus) ?
                    <select value={taskStatus} onChange={updateTaskStatus}>
                        {Object.values(TASK_STATUS).map(status => <option key={status} value={status}>{(status[0] + status.slice(1).toLowerCase()).replace("_", " ")}</option>)}
                    </select> :
                    <div className={`taskStatus ${taskStatus.toLowerCase()}`}>{taskStatus}</div>
                }
                {userId == task.assigned_to &&
                    <div className="changeStatusButton" onClick={() => setUpdateStatus(s => !s)}>{isUpdatingStatus ? <i className="fa fa-floppy-o" /> : <i className="fa fa-pencil" />}</div>
                }

            </div>

            <div className="taskMeta">
                {task.due_date ? `Due by ${getDate(task.due_date)}` : "No due date assigned"} <div className="grow" /> Created on {getDate(task.created_at)}
            </div>
            <div className="taskDesc">
                {task.description}
            </div>
        </div>
    }
    return <ResxRender render={render} fetchStatus={fetchStatus} fetchMethod={fetchTaskItem} fetchType={FETCH_RESOURCES.TASK_ITEM}  />

}

const mapStateToProps = (state, ownProps) => ({
    task: state.task.taskList[ownProps.match.params.id],
    userList: state.user.userList,
    userId: state.user.id,

    fetchStatus: state.utils.fetchStatus[FETCH_RESOURCES.TASK_ITEM],

});

const mapDispatchToProps = (dispatch, ownProps) => ({
    openEditModal: () => dispatch(push(ROUTES.TASK_EDIT.getUrl(ownProps.match.params.id))),
    updateStatus: (status) => dispatch(createAction(ACTION_TYPES.ATTEMPT_TASK_EDIT, { formData: { status }, id: ownProps.match.params.id })),
    deleteTask: (id) => dispatch(createAction(ACTION_TYPES.ATTEMPT_TASK_DELETE, { id })),

    fetchTaskItem: () => dispatch(createAction(ACTION_TYPES.FETCH_TASK_ITEM, { id: ownProps.match.params.id })),
});


export default connect(mapStateToProps, mapDispatchToProps)(TaskItem)