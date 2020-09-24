const apiRoutes = {
    LOGIN: 'auth/login/',
    LOGOUT: 'auth/logout/',
    USER_ME: `auth/me/`,
    USER_LIST: 'user/',
    USER_ID: `user/:id/`,
    
    REGISTER: 'auth/register/',
    VERIFY_EMAIL_TOKEN: 'auth/verify/:token/'
}

export default apiRoutes