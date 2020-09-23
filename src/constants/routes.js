import Home from '../components/Home'
import Login from '../components/Pages/Login'
import Logout from '../components/Pages/Logout'
import Profile from '../components/Pages/Profile'

const routes = {
    LOGIN: {
        url: '/login',
        auth: false,
        Component: Login,
    },
    LOGOUT: {
        url: '/logout',
        auth: true,
        Component: Logout,
    },
    REGISTER: {
        url: '/register',
        auth: false,
    },
    USER_LIST: {
        url: '/user',
        auth: true,
    },
    PROFILE: {
        url: '/user/me',
        auth: false,
        Component: Profile,
    },
    DASHBOARD: {
        url: '/dashboard',
        auth: true,
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

    // Placed at the last otherwise it will override all other routes because of
    // the `/` in front of every route
    ROOT: {
        url: '/',
        auth: false,
        Component: Home
    },

}

export default routes;