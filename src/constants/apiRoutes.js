const apiRoutes = {
    LOGIN: 'auth/login/',
    LOGOUT: 'auth/logout/',
    USER_LIST: 'user/',
    USER_ID: id => `user/${id}/`
}

export default apiRoutes