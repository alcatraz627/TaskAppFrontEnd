const apiRoutes = {
    LOGIN: 'auth/login/',
    LOGOUT: 'auth/logout/',
    USER_ME: `auth/me/`,
    USER_LIST: 'user/',
    USER_ID: id => `user/${id}/`,
    
    REGISTER: 'auth/register/',
    VERIFY_EMAIL_TOKEN: token => `auth/verify/${token}/`
}

export default apiRoutes