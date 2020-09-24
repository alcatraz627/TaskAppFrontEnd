// const _actions = ['ATTEMPT_LOGIN', 'LOGIN_FAIL', 'LOGIN_SUCCESS']

// const actions = Object.assign({}, ..._actions.map(action => ({ [action]: action })))

export const ACTION_TYPES = {
    // Auth
    ATTEMPT_LOGIN: 'ATTEMPT_LOGIN',
    // LOGIN_FAIL: 'LOGIN_FAIL',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',

    ATTEMPT_LOGOUT: 'ATTEMPT_LOGOUT',
    LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',

    FETCH_AUTH_USER: 'FETCH_AUTH_USER',

    ATTEMPT_REGISTER: 'ATTEMPT_REGISTER',
    // REGISTER_FAIL: 'REGISTER_FAIL',
    REGISTER_SUCCESS: 'REGISTER_SUCCESS',

    ATTEMPT_EMAIL_VERIF: 'ATTEMPT_EMAIL_VERIF',
    // EMAIL_VERIF_FAIL: 'EMAIL_VERIF_FAIL',
    // EMAIL_VERIF_SUCCESS: 'EMAIL_VERIF_SUCCESS',

    // Util
    SET_MESSAGE: 'SET_MESSAGE',
    CLEAR_MESSAGE: 'CLEAR_MESSAGE',

    // Notif
    PUSH_NOTIF: 'PUSH_NOTIF',
    CLEAR_NOTIF: 'CLEAR_NOTIF',
    CLEAR_NOTIF_QUEUE: 'CLEAR_NOTIF_QUEUE',
}

export function createAction(action_type, payload = null) {
    try {
        return ({
            type: ACTION_TYPES[action_type],
            payload: payload || null
        })
    } catch {
        console.error("Invalid action ", action_type)
    }
}