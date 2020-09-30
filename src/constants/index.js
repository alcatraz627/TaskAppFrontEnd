export const HTTP_METHODS = {
    GET: 'GET',
    POST: 'POST',
    PATCH: 'PATCH',
    DELETE: 'DELETE'
}

export const baseURL = 'http://localhost:8000/api/'

export const NOTIF_DELAY = 2000 // in ms

export const MESSAGES = {
    REGISTRATION_SUCCESS: {
        title: "Email Confirmation",
        body: "A link has been mailed to your email address. Please click the link to continue."
    },
    EMAIL_VERIF_SUCCESS: {
        title: "Email Verified!",
        body: "You can now proceed to login",
    },
    EMAIL_VERIF_FAILED: {
        title: "Invalid token",
        body: "Invalid or expired token, no associated email was found.",
    },
    NOT_FOUND: {
        title: "Not found",
        body: "The page you are looking for is unavailable. "
    },
    UNAUTHORIZED: {
        title: "Unauthorized",
        body: "Your account does not have sufficient permissions for that action."
    },
}

export const ROLES = {
    ADMIN: 'admin',
    USER: 'user',
}

export const FETCH_RESOURCES = {
    USER_LIST: 'USER_LIST',
    USER_ITEM: 'USER_ITEM',
    TASK_LIST: 'TASK_LIST',
    TASK_ITEM: 'TASK_ITEM',
}

export const FETCH_STATUS = {
    NOT_FETCHED: 'NOT_FETCHED',
    FETCHING: 'FETCHING',
    FETCHED: 'FETCHED',
    NOT_FOUND: 'NOT_FOUND',
    FETCH_ERROR: 'FETCH_ERROR',
}

export const TASK_STATUS = {
    PENDING: "PENDING",
    IN_PROGRESS: "IN_PROGRESS",
    COMPLETE: "COMPLETE"
}