import React from 'react'

import { connect } from 'react-redux'

import { ROLES } from '../../constants'
import { Link } from 'react-router-dom'
import { push } from 'connected-react-router'
import ROUTES from '../../constants/routes'

function TaskItem({ task, userList, openEditModal, userId }) {
    if (!task) {
        // 404 not found
        return <div>Not found</div>
    }

    return <div className="taskContainer">
        {userId == task.created_by &&
            <div className="editButton" onClick={openEditModal}>
                <i className="fa fa-pencil fa fa-2x"></i>
            </div>
        }
        <h4 className="noSpacing">{task.title}</h4>
        <div className="taskMeta">
            <Link to={ROUTES.USER_PROFILE.getUrl(task.created_by)} className="createdBy">{userList[task.created_by].name}</Link>
            assigned this to
            {task.assigned_to ? <Link to={ROUTES.USER_PROFILE.getUrl(task.assigned_to)} className="assignedTo">{userList[task.assigned_to].name}</Link> : " no one currently"}
            <div className="grow" />
            <div className={`taskStatus ${task.status.toLowerCase()}`}>{task.status}</div>
            {/* <div className={`taskStatus in_progress`}>{task.status}</div>
            <div className={`taskStatus complete`}>{task.status}</div> */}
        </div>
        <div className="taskMeta">
            {task.due_date ? `Due by ${task.due_date}` : "No due date assigned"} <div className="grow" /> Created on {task.created_at}
        </div>
        <div className="taskDesc">
            {task.description}
        </div>
        <hr />
        {/* <hr />
        {JSON.stringify(userList)}  {JSON.stringify(userList)[task.created_by]}
        <hr />
        {JSON.stringify(task)} */}
    </div>
}

const mapStateToProps = (state, ownProps) => ({
    task: state.task[ownProps.match.params.id],
    userList: state.user.userList,
    userId: state.user.id,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    openEditModal: () => dispatch(push(ROUTES.TASK_EDIT.getUrl(ownProps.match.params.id)))
});


export default connect(mapStateToProps, mapDispatchToProps)(TaskItem)