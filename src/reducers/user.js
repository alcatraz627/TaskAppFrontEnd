import initialState from '../constants/initialState'
import { ACTION_TYPES } from '../constants/actions'

export default function userReducer(state = initialState.user, { type, payload = {} }) {
    switch (type) {
        // case ACTION_TYPES.ATTEMPT_LOGIN:
        // case ACTION_TYPES.ATTEMPT_LOGOUT:
        // case ACTION_TYPES.ATTEMPT_REGISTER:
        // case ACTION_TYPES.REGISTER_SUCCESS:
        //     return state

        case ACTION_TYPES.LOGIN_SUCCESS:
            return ({ ...payload.user, 'token': payload.token })

        case ACTION_TYPES.LOGOUT_SUCCESS:
            return { ...initialState.user }

        // case ACTION_TYPES.ATTEMPT_EMAIL_VERIF
        //     return state

        default:
            return state
    }
    return (state)
}