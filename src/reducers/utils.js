import initialState from '../constants/initialState'
import { ACTION_TYPES } from '../constants/actions'
import { NOTIF_TYPE, FETCH_STATUS, FETCH_RESOURCES } from '../constants'

/** I know that implementing this directly in the reducer makes it impure and is a sacreligious to the principles of 
 * functional programming, but I just wanted this as a fallback for now rather than have to add it everywhere. In the 
 * future I plan to have an appropriate ID generated everywhere for the notifs so this should not be needed. I guess. 
*/
const generateID = () => Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8);

export default function utilsReducer(state = initialState.utils, { type, payload = {} }) {
    switch (type) {

        case ACTION_TYPES.PUSH_NOTIF:
            const id = payload.id || generateID()
            return {
                ...state,
                notifList: {
                    ...state.notifList,
                    [id]: {
                        ...payload, // This is just payload.message for now
                        type: payload.type || NOTIF_TYPE.INFO,
                        id,
                    }
                }
            }

        case ACTION_TYPES.CLEAR_NOTIF:
            if (Object.keys(state.notifList).length > 0) {
                const { [Object.keys(state.notifList)[0]]: clearedNotif, ...restNotifListCleared } = state.notifList
                return {
                    ...state,
                    notifHistory: [...state.notifHistory, clearedNotif],
                    notifList: restNotifListCleared,
                }
            } else return state;

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

            case ACTION_TYPES.CLEAR_FETCH_STATUS:
            return { ...state, fetchStatus: { ...state.fetchStatus, [FETCH_RESOURCES[payload.fetchType]]: FETCH_STATUS.NOT_FETCHED } }

        case ACTION_TYPES.PAUSE_RENDER:
            return { ...state, shouldRender: state.shouldRender + 1 }

        case ACTION_TYPES.SHOULD_RENDER:
            return { ...state, shouldRender: state.shouldRender - 1 }

        case ACTION_TYPES.SET_ONLINE_STATUS:
            return { ...state, isOnline: payload.isOnline || false }


        default:
            return state
    }
}
