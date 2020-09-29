import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';


function TaskEdit({ task, userList }) {

    const [formData, setFormData] = useState(null)

    // Refs don't trigger an update when assigned, so can't use them on mount
    // https://medium.com/@teh_builder/ref-objects-inside-useeffect-hooks-eb7c15198780
    // The current fix is to use the body-scroll-lock method after a timeout but this is not ideal.
    useEffect(() => {
        setTimeout(() => {
            const targetElement = document.getElementById('editTaskModal')
            disableBodyScroll(targetElement)
            return () => enableBodyScroll(targetElement)
        }, 1000)
    }, [])

    useEffect(() => {
        if (task && !formData) {
            // Picking out only values needed for editing
            const { title, description, due_date, assigned_to } = task;
            setFormData({ title, description, due_date, assigned_to })
            setFormData(task => ({ ...task, created_by: task.created_by || "", assigned_to: task.assigned_to || "" }))
            console.log("Updated!")
        }
    }, [task])

    if (!task) {
        // 404 not found
        return <div>Not found</div>
    }

    const updateForm = ({ target: { name, value } }) => { setFormData(data => ({ ...data, [name]: value })); console.log(name, value) }

    const saveForm = () => {
        console.log(formData);
    }

    return (
        <div className="modal" id="editTaskModal">
            {!formData ? "Loading..." :
                <div className="taskContainer">
                    <div className="modalLabel">Title</div>
                    <input type="text" name="title" value={formData.title} onChange={updateForm} className="modalTextField heading" />
                    {/* {JSON.stringify(Object.keys(task))} */}
                    <div className="taskMeta">
                        Created on {task.created_at}
                        <div className="grow" />
                        <div className={`taskStatus ${task.status.toLowerCase()}`}>{task.status}</div>
                    </div>

                    <div className="modalForm">
                        <div className="modalFormData">
                            <div className="modalLabel">Assigned to</div>
                            <select name="assigned_to" value={formData.assigned_to} onChange={updateForm}>
                                <option value="">None</option>
                                {Object.values(userList).map(user => <option key={user.id} value={user.id}>{user.name}</option>)}
                            </select>
                        </div>
                        <div className="modalFormData">
                            <div className="modalLabel">Due Date</div>
                            <input type="datetime-local" name="due_date" value={formData.due_date} onChange={updateForm} />
                        </div>
                    </div>

                    <div className="modalLabel">Description</div>
                    <textarea className="taskDesc" name="description" rows="16" value={formData.description} onChange={updateForm} />
                    <div className="modalActions">
                        <button className="primary contained" onClick={saveForm}>Save</button>
                        <button name="outlined">Close</button>
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

})

export default connect(mapStateToProps, mapDispatchToProps)(TaskEdit)
