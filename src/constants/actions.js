// const _actions = ['ATTEMPT_LOGIN', 'LOGIN_FAIL', 'LOGIN_SUCCESS']

// const actions = Object.assign({}, ..._actions.map(action => ({ [action]: action })))

export const ACTION_TYPES = {
    ATTEMPT_LOGIN: 'ATTEMPT_LOGIN', 
    LOGIN_FAIL: 'LOGIN_FAIL', 
    LOGIN_SUCCESS: 'LOGIN_SUCCESS'
}

export function action(action_type, payload) {
    try {
        return ({
            type: ACTION_TYPES[action_type],
            payload: payload || null
        })
    } catch {
        console.error("Invalid action ", action_type)
    }
}