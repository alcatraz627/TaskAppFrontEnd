import Home from '../components/Home'
import Login from '../components/Auth/Login'
import Logout from '../components/Auth/Logout'
import Profile from '../components/User/Profile'

import Message from '../components/Utils/Message'

/**
 * Convention:
 * - url: relative route of the component in-app with a slash in the beginning.
 * - auth: whether the user must be logged in to access.
 * - guestOnly: whether to prevent logged in users from accessing the route(eg: login). Overrides the auth condition.
 * - Component: The React Component to render. The 'C' must be capitalized as per react component naming convention.
 */

const routes = {
    LOGIN: {
        url: '/login',
        auth: false,
        guestOnly: true,
        Component: Login,
        redirect: '/',
    },
    LOGOUT: {
        url: '/logout',
        auth: true,
        Component: Logout,
        redirect: '/',
    },
    REGISTER: {
        url: '/register',
        guestOnly: true,
        auth: false,
    },
    USER_LIST: {
        url: '/user',
        auth: true,
    },
    PROFILE: {
        url: '/user/me',
        auth: true,
        Component: Profile,
    },
    DASHBOARD: {
        url: '/dashboard',
        auth: true,
        role: 'admin',
    },
    FORGOTPASS_REQUEST: {
        url: '/forgotpass/request',
        guestOnly: true,
    },
    FORGOTPASS_VERIFY: {
        url: '/forgotpass/verify',
        guestOnly: true,
    },
    FORGOTPASS_SUCCESS: {
        url: '/forgotpass/success',
        guestOnly: true,
    },

    MESSAGE: {
        url: '/message',
        Component: Message,
        redirect: "/x"
    },

    // Placed at the last otherwise it will override all other routes because of
    // the `/` in front of every route
    ROOT: {
        url: '/',
        Component: Home,
        exact: true,
    },

}

export default routes;