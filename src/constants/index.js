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
}

export const ROLES = {
    ADMIN: 'admin',
    USER: 'user',
}