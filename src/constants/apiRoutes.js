const apiRoutes = {
    LOGIN: 'auth/login/',
    LOGOUT: 'auth/logout/',
    USER_ME: `auth/me/`,

    USER_LIST: (offset, limit, search, isVerified) => `users/?limit=${limit || parseInt(process.env.PAGE_LEN)}&offset=${offset || 0}&search=${search || ""}&isVerified=${isVerified || null}`,
    USER_ID: id => `users/${id}/`,
    USER_TASKS: (id, offset, limit, search, taskStatus) => `users/${id}/tasks/?limit=${limit || parseInt(process.env.PAGE_LEN)}&offset=${offset || 0}&search=${search || ""}&taskStatus=${taskStatus || ""}`,

    TASK_LIST: (offset, limit, search, taskStatus) => `tasks/?limit=${limit || parseInt(process.env.PAGE_LEN)}&offset=${offset || 0}&search=${search || ""}&taskStatus=${taskStatus || ""}`,
    TASK_CREATE: `tasks/`,
    TASK_ID: id => `tasks/${id}/`,

    REGISTER: 'auth/register/',
    VERIFY_EMAIL_TOKEN: token => `auth/verify/${token}/`,

    FORGOTPASS_REQUEST: 'auth/forgotpass/request',
    FORGOTPASS_VERIFY: 'auth/forgotpass/verify',
    FORGOTPASS_RESET: 'auth/forgotpass/reset',
}

export default apiRoutes