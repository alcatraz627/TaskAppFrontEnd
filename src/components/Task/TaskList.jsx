import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { Link } from 'react-router-dom'

import { FETCH_RESOURCES, FETCH_STATUS } from '../../constants'
import ROUTES from '../../constants/routes'
import { ACTION_TYPES, createAction } from '../../constants/actions'

import ResxRender from '../Utils/ResxRender'

const TaskList = ({ fetchTaskList, taskList, fetchStatus, userList }) => {
    function render() {

        return (
            <div className="container">
                <h3>Task List</h3>
                <div className="detailedList">
                    {Object.values(taskList).map(task =>
                        <div key={task.id} className="detailedListItemContainer">
                            <Link to={ROUTES.TASK_ITEM.getUrl(task.id)} className="textPrimary">{task.title}</Link>
                            <div className="textSecondary">Created by
                                <Link to={ROUTES.USER_PROFILE.getUrl(task.created_by)}> {userList[task.created_by].name}</Link>
                            {/* </div>
                            <div className="textSecondary"> */}
                               <br /> Assigned to
                            {task.assigned_to ?
                                    <Link to={ROUTES.USER_PROFILE.getUrl(task.assigned_to)}> {userList[task.assigned_to].name}</Link>
                                    : " no one currently"}
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
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    fetchTaskList: () => dispatch(createAction(ACTION_TYPES.FETCH_TASK_LIST))
})

export default connect(mapStateToProps, mapDispatchToProps)(TaskList)