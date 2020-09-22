const routes = {
    ROOT: {
        url: '/',
        protected: false,
    },
    LOGIN: {
        url: '/login',
        protected: false,
    },
    LOGOUT: {
        url: '/logout',
        protected: true,
    },
    REGISTER: {
        url: '/register',
        protected: false,
    },
    USER_LIST: {
        url: '/user',
        protected: true,
    },
    PROFILE: {
        url: '/user/me',
        protected: false,
    },
    DASHBOARD: {
        url: '/dashboard',
        protected: true,
        role: 'admin',
    },
    FORGOTPASS_REQUEST: {
        url: '/forgotpass/request',
        guest: true,
    },
    FORGOTPASS_VERIFY: {
        url: '/forgotpass/verify',
        guest: true,
    },
    FORGOTPASS_SUCCESS: {
        url: '/forgotpass/success',
        guest: true,
    },
}

export default routes;