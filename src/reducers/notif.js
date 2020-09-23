import initialState from '../constants/initialState'
import { ACTION_TYPES } from '../constants/actions'

export default function notifReducer(state = initialState.notif, { type, payload = {} }) {
    switch (type) {
        case ACTION_TYPES.PUSH_NOTIF:
            return [...state, payload]
        case ACTION_TYPES.CLEAR_NOTIF:
            return state.splice(1)
        case ACTION_TYPES.CLEAR_NOTIF_QUEUE:
            return []
        default:
            return state
    }
}
