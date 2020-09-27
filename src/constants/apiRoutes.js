const apiRoutes = {
    LOGIN: 'auth/login/',
    LOGOUT: 'auth/logout/',
    USER_ME: `auth/me/`,
    USER_LIST: 'users/',
    USER_ID: id => `users/${id}/`,
    
    REGISTER: 'auth/register/',
    VERIFY_EMAIL_TOKEN: token => `auth/verify/${token}/`
}

export default apiRoutes