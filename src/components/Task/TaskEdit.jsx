import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'

import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

import { ACTION_TYPES, createAction } from '../../constants/actions'
import ROUTES from '../../constants/routes'

function TaskEdit({ task, userList, updateTaskItem, closeModal }) {

    const [formData, setFormData] = useState(null)

    // Refs don't trigger an update when assigned, so can't use them on mount
    // https://medium.com/@teh_builder/ref-objects-inside-useeffect-hooks-eb7c15198780
    // The current fix is to use the body-scroll-lock method after a timeout but this is not ideal.
    useEffect(() => {
        var targetElement
        setTimeout(() => {
            targetElement = document.getElementById('editTaskModal')
            disableBodyScroll(targetElement)
            window.scrollTo(0, 0)
        }, 800)
        return () => enableBodyScroll(targetElement)
    }, [])

    useEffect(() => {
        if (task && !formData) {
            // Picking out only values needed for editing
            const { title, description, due_date, assigned_to } = task;
            setFormData({ title, description, due_date, assigned_to })
            setFormData(task => ({ ...task, created_by: task.created_by || "", assigned_to: task.assigned_to || "" }))
        }
    }, [task])

    if (!task) {
        // 404 not found
        return <div>Not found</div>
    }

    const isDirty = field => ((formData[field] != task[field]) ? "*" : "")

    const updateForm = ({ target: { name, value } }) => { setFormData(data => ({ ...data, [name]: value })) }

    const saveForm = () => {
        // TODO: Validate
        updateTaskItem(formData)
    }

    return (
        <div className="modal" id="editTaskModal">
            {!formData ? "Loading..." :
                <div className="taskContainer">
                    <div className="modalLabel">Title{isDirty('title')}</div>
                    <input type="text" name="title" value={formData.title} onChange={updateForm} className="modalTextField heading" />
                    {/* {JSON.stringify(Object.keys(task))} */}
                    <div className="taskMeta">
                        Created on {task.created_at}
                        <div className="grow" />
                        <div className={`taskStatus ${task.status.toLowerCase()}`}>{task.status}</div>
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
                    <textarea className="taskDesc" name="description" rows="16" value={formData.description} onChange={updateForm} />
                    <div className="modalActions">
                        <button className="primary contained" onClick={saveForm}>Save</button>
                        <button name="outlined" onClick={closeModal}>Close</button>
                    </div>
                </div>
            }

        </div>

    )
}

const mapStateToProps = (state, ownProps) => ({
    task: state.task[ownProps.match.params.id],
    userList: state.user.userList
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    updateTaskItem: (formData) => dispatch(createAction(ACTION_TYPES.TASK_EDIT, { formData, id: ownProps.match.params.id })),
    closeModal: () => dispatch(push(ROUTES.TASK_ITEM.getUrl(ownProps.match.params.id))),
})

export default connect(mapStateToProps, mapDispatchToProps)(TaskEdit)
