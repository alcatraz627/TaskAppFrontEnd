const apiRoutes = {
    LOGIN: 'auth/login/',
    LOGOUT: 'auth/logout/',
    USER_ME: `auth/me/`,

    USER_LIST: 'users/',
    USER_ID: id => `users/${id}/`,

    TASK_LIST: (offset, limit, search) => `tasks/?limit=${limit || 2}&offset=${offset || 0}&search=${search || ""}`,
    TASK_CREATE: `tasks/`,
    TASK_ID: id => `tasks/${id}/`,

    REGISTER: 'auth/register/',
    VERIFY_EMAIL_TOKEN: token => `auth/verify/${token}/`,

    FORGOTPASS_REQUEST: 'auth/forgotpass/request',
    FORGOTPASS_VERIFY: 'auth/forgotpass/verify',
    FORGOTPASS_RESET: 'auth/forgotpass/reset',
}

export default apiRoutes