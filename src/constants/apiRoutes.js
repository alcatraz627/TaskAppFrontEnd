const apiRoutes = {
    LOGIN: 'auth/login/',
    LOGOUT: 'auth/logout/',
    USER_ME: `auth/me/`,

    USER_LIST: 'users/',
    USER_ID: id => `users/${id}/`,

    TASK_LIST: 'tasks/',
    TASK_ID: id => `tasks/${id}/`,
    
    REGISTER: 'auth/register/',
    VERIFY_EMAIL_TOKEN: token => `auth/verify/${token}/`
}

export default apiRoutes