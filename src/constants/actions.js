// const _actions = ['ATTEMPT_LOGIN', 'LOGIN_FAIL', 'LOGIN_SUCCESS']

// const actions = Object.assign({}, ..._actions.map(action => ({ [action]: action })))

export const ACTION_TYPES = {
    // Auth
    ATTEMPT_LOGIN: 'ATTEMPT_LOGIN',
    // LOGIN_FAIL: 'LOGIN_FAIL',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',

    ATTEMPT_LOGOUT: 'ATTEMPT_LOGOUT',
    LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',

    FETCH_AUTH_USER: 'FETCH_AUTH_USER', // For trying to log in on app boot
    LOGIN_ATTEMPTED: 'LOGIN_ATTEMPTED', // Has the login be attempted on boot

    ATTEMPT_REGISTER: 'ATTEMPT_REGISTER',
    REGISTER_SUCCESS: 'REGISTER_SUCCESS',

    ATTEMPT_EMAIL_VERIF: 'ATTEMPT_EMAIL_VERIF',
    
    FORGOTPASS_REQUEST: 'FORGOTPASS_REQUEST',
    FORGOTPASS_VERIFY: 'FORGOTPASS_VERIFY',
    FORGOTPASS_RESET: 'FORGOTPASS_RESET',
    
    // User
    FETCH_USER_LIST: 'FETCH_USER_LIST',
    FETCH_USER_ITEM: 'FETCH_USER_ITEM',
    UPDATE_USER_LIST: 'UPDATE_USER_LIST',
    
    FETCH_USER_TASKS: 'FETCH_USER_LIST',
    

    ATTEMPT_USER_CREATE: 'ATTEMPT_USER_CREATE',
    ATTEMPT_USER_EDIT: 'ATTEMPT_USER_EDIT',
    UPDATE_USER_ITEM: 'UPDATE_USER_ITEM',

    ATTEMPT_USER_DELETE: 'ATTEMPT_USER_DELETE',
    UPDATE_USER_DELETE: 'UPDATE_USER_DELETE',
    
    // Task
    FETCH_TASK_LIST: 'FETCH_TASK_LIST',
    FETCH_TASK_ITEM: 'FETCH_TASK_ITEM',
    UPDATE_TASK_LIST: 'UPDATE_TASK_LIST',    

    ATTEMPT_TASK_CREATE: 'ATTEMPT_TASK_CREATE',
    ATTEMPT_TASK_EDIT: 'ATTEMPT_TASK_EDIT',
    UPDATE_TASK_ITEM: 'UPDATE_TASK_ITEM',

    ATTEMPT_TASK_DELETE: 'ATTEMPT_TASK_DELETE',
    UPDATE_TASK_DELETE: 'UPDATE_TASK_DELETE',

    // Message screen
    SET_MESSAGE: 'SET_MESSAGE', // Sets a message and redirects to thet screen
    CLEAR_MESSAGE: 'CLEAR_MESSAGE', // Clears and redirects away

    // Notif
    PUSH_NOTIF: 'PUSH_NOTIF',
    CLEAR_NOTIF: 'CLEAR_NOTIF',
    CLEAR_NOTIF_HISTORY: 'CLEAR_NOTIF_HISTORY',
    DISMISS_NOTIF: 'DISMISS_NOTIF',

    // Set Fetch Status
    SET_FETCH_STATUS: 'SET_FETCH_STATUS',
    // Clear Fetch Status on page change if needed
    CLEAR_FETCH_STATUS: 'CLEAR_FETCH_STATUS',

    // Set query params for resx type to be used for sync and polling
    SET_QUERY_PARAMS: 'SET_QUERY_PARAMS',
    // Run sync task, either manually or periodically
    RUN_SYNC: 'RUN_SYNC',
    
    // TODO: Rename for better intuitive understanding
    SHOULD_RENDER: 'SHOULD_RENDER',
    PAUSE_RENDER: 'PAUSE_RENDER',

    // To set if the application can connect to the backend or not
    SET_ONLINE_STATUS: 'SET_ONLINE_STATUS', 
}

export function createAction(action_type, payload) {
    try {
        return ({
            type: ACTION_TYPES[action_type],
            payload: payload || {}
        })
    } catch {
        console.error("Invalid action ", action_type)
    }
}