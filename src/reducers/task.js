import initialState from '../constants/initialState'
import { ACTION_TYPES } from '../constants/actions'

export default function taskReducer(state = initialState.user, { type, payload = {} }) {
    switch (type) {

        case ACTION_TYPES.UPDATE_TASK_LIST:
            const taskList = payload.map(t => ({ [t.id]: {...t, assigned_to: t.assigned_to || ""} }))
            return { ...state, ...Object.assign({}, ...taskList) };

        case ACTION_TYPES.UPDATE_TASK_ITEM:
            return { ...state, [payload.id]: { ...payload, assigned_to: payload.assigned_to || "" } };

        case ACTION_TYPES.UPDATE_TASK_DELETE:
            const { [payload.id]: value, ...newState } = state
            return newState

        default:
            return state;
    }
}
