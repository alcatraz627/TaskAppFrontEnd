import initialState from '../constants/initialState'
import { ACTION_TYPES } from '../constants/actions'

export default function utilsReducer(state = initialState.utils, { type, payload = {} }) {
    switch (type) {

        case ACTION_TYPES.PUSH_NOTIF:
            return { ...state, notifList: [...state.notifList, payload] }
        case ACTION_TYPES.CLEAR_NOTIF:
            return {
                ...state,
                notifHistory: [...state.notifHistory, Object.assign({}, state.notifList[0])],
                notifList: state.notifList.splice(1)
            }
        case ACTION_TYPES.CLEAR_NOTIF_QUEUE:
            return {
                ...state,
                notifHistory: [...notifList],
                notifList: []
            }

        case ACTION_TYPES.SET_MESSAGE:
            return { ...state, message: { ...payload } }
        case ACTION_TYPES.CLEAR_MESSAGE:
            return { ...state, message: { title: null, body: null } }

        case ACTION_TYPES.SET_FETCH_STATUS:
            return { ...state, fetchStatus: { ...state.fetchStatus, ...payload } }

        default:
            return state
    }
}
