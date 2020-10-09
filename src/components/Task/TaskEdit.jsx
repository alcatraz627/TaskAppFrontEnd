import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { push, replace } from 'connected-react-router'

import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

import { FETCH_RESOURCES, MESSAGES } from '../../constants'
import { ACTION_TYPES, createAction } from '../../constants/actions'
import ROUTES from '../../constants/routes'

import { getDate } from '../../services/helpers'

function TaskEdit(props) {
    const { task, userList, userId, path } = props
    const { updateTaskItem, createTaskItem, deleteAction, closeModal, unauthorized, notFound } = props

    const [formData, setFormData] = useState(null)

    const isCreateModal = path == ROUTES.TASK_CREATE.url // Is the modal opened for task creation or editing?
    // Refs don't trigger an update when assigned, so can't use them on mount
    // https://medium.com/@teh_builder/ref-objects-inside-useeffect-hooks-eb7c15198780
    // The current fix is to use the body-scroll-lock method after a timeout but this is not ideal.
    useEffect(() => {

        if (!isCreateModal) {
            // 404 not found
            if (!task) notFound()
            else if (task.created_by != userId) unauthorized()
        }

        var targetElement
        setTimeout(() => {
            targetElement = document.getElementById('editTaskModal')
            if (targetElement) disableBodyScroll(targetElement)
            window.scrollTo(0, 0)
        }, 800)
        if (targetElement) {
            return () => enableBodyScroll(targetElement)
        }
        else {
            return clearAllBodyScrollLocks
        }
    }, [])

    useEffect(() => {
        if (isCreateModal) {
            setFormData({ title: "", description: "", due_date: new Date(), assigned_to: "" })
        } else {
            if (task && !formData) {
                // Picking out only values needed for editing
                const { title, description, due_date, assigned_to } = task;
                setFormData({ title, description, due_date, assigned_to })
                setFormData(task => ({ ...task, created_by: task.created_by || "", assigned_to: task.assigned_to || "" }))
            }
        }

    }, [task])

    const isDirty = field => isCreateModal ? "" : ((formData[field] == task[field]) ? "" : "*")

    const updateForm = ({ target: { name, value } }) => { setFormData(data => ({ ...data, [name]: value })) }

    const saveForm = () => {
        // TODO: Validate
        isCreateModal ? createTaskItem(formData) : updateTaskItem(formData)
    }


    return (
        <div className="modal" id="editTaskModal">
            {!formData ? <div className="loader" /> :
                <div className="taskContainer">
                    <div className="modalLabel">Title{isDirty('title')}</div>
                    <input type="text" name="title" placeholder="Enter task title" value={formData.title} onChange={updateForm} className="modalTextField heading" />
                    {/* {JSON.stringify(Object.keys(task))} */}
                    <div className="taskMeta">
                        {!isCreateModal && `Created on ${getDate(task.created_at)}`}
                        <div className="grow" />
                        {!isCreateModal && <div className={`taskStatus ${task.status.toLowerCase()}`}>{task.status}</div>}
                    </div>

                    <div className="modalForm">
                        <div className="modalFormData">
                            <div className="modalLabel">Assigned to{isDirty('assigned_to')}</div>
                            <select name="assigned_to" value={formData.assigned_to} onChange={updateForm}>
                                <option value="">None</option>
                                {Object.values(userList).map(user => <option key={user.id} value={user.id}>{user.name}</option>)}
                            </select>
                        </div>
                        <div className="modalFormData">
                            <div className="modalLabel">Due Date{isDirty('due_date')}</div>
                            <input type="datetime-local" name="due_date" value={formData.due_date} onChange={updateForm} />
                        </div>
                    </div>

                    <div className="modalLabel">Description{isDirty('description')}</div>
                    <textarea className="taskDesc" name="description" placeholder="Enter task description" rows="16" value={formData.description} onChange={updateForm} />
                    <div className="modalActions">
                        <button className="primary contained" onClick={saveForm}>{isCreateModal ? "Create New" : "Save Changes"}</button>
                        {!isCreateModal && <button className="secondary outlined" onClick={() => deleteAction(task.id)}>Delete</button>}
                        <button className="outlined" onClick={closeModal}>Close</button>
                    </div>
                </div>
            }
        </div>

    )
}

const mapStateToProps = (state, ownProps) => ({
    task: state.task[ownProps.match.params.id],
    // fetchStatus: state.utils.fetchStatus[FETCH_RESOURCES.TASK_LIST],

    userList: state.user.userList,
    userId: state.user.id,
    path: ownProps.match.path
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    createTaskItem: (formData) => dispatch(createAction(ACTION_TYPES.ATTEMPT_TASK_CREATE, { formData })),
    updateTaskItem: (formData) => dispatch(createAction(ACTION_TYPES.ATTEMPT_TASK_EDIT, { formData, id: ownProps.match.params.id })),
    deleteAction: (id) => dispatch(createAction(ACTION_TYPES.ATTEMPT_TASK_DELETE, { id })),
    closeModal: () => dispatch(push(ownProps.match.params.id ? ROUTES.TASK_ITEM.getUrl(ownProps.match.params.id) : ROUTES.TASK_LIST.url)),

    unauthorized: (message) => dispatch(createAction(ACTION_TYPES.SET_MESSAGE, MESSAGES.UNAUTHORIZED)),
    notFound: () => dispatch(replace(ROUTES.NOT_FOUND.url)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TaskEdit)
