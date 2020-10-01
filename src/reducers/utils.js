import initialState from '../constants/initialState'
import { ACTION_TYPES } from '../constants/actions'

export default function utilsReducer(state = initialState.utils, { type, payload = {} }) {
    switch (type) {

        case ACTION_TYPES.PUSH_NOTIF:
            return {
                ...state,
                notifList: {
                    ...state.notifList,
                    [payload.id]: { ...payload }
                }
            }

        case ACTION_TYPES.CLEAR_NOTIF:
            const { [Object.keys(state.notifList)[0]]: clearedNotif, ...restNotifListCleared } = state.notifList
            return {
                ...state,
                notifHistory: [...state.notifHistory, clearedNotif],
                notifList: restNotifListCleared,
            }

        case ACTION_TYPES.CLEAR_NOTIF_HISTORY:
            return {
                ...state,
                notifHistory: [],
            }

        case ACTION_TYPES.DISMISS_NOTIF:
            const { [payload.id]: dismissedNotif, ...restNotifListDismissed } = state.notifList
            return {
                ...state,
                notifList: restNotifListDismissed,
                notifHistory: [...state.notifHistory, dismissedNotif],
            }

        case ACTION_TYPES.SET_MESSAGE:
            return { ...state, message: { ...payload } }
        case ACTION_TYPES.CLEAR_MESSAGE:
            return { ...state, message: { title: null, body: null } }

        case ACTION_TYPES.SET_FETCH_STATUS:
            return { ...state, fetchStatus: { ...state.fetchStatus, ...payload } }

        case ACTION_TYPES.PAUSE_RENDER:
            return { ...state, shouldRender: state.shouldRender + 1 }

        case ACTION_TYPES.SHOULD_RENDER:
            return { ...state, shouldRender: state.shouldRender - 1 }

        default:
            return state
    }
}
