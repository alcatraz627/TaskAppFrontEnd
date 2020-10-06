import Home from '../components/Home'
import Login from '../components/Auth/Login'
import Logout from '../components/Auth/Logout'
import Register from '../components/Auth/Register'
import ForgotPass from '../components/Auth/ForgotPass'

import Profile from '../components/User/Profile'
import UserList from '../components/User/UserList'

import TaskList from '../components/Task/TaskList'
import TaskItem from '../components/Task/TaskItem'
import TaskEdit from '../components/Task/TaskEdit'

import Message from '../components/Utils/Message'
import NotFound from '../components/Utils/NotFound'

/**
 * Convention:
 * - url: relative route of the component in-app with a slash in the beginning.
 * - auth: whether the user must be logged in to access.
 * - guestOnly: whether to prevent logged in users from accessing the route(eg: login). Overrides the auth condition.
 * - Component: The React Component to render. The 'C' must be capitalized as per react component naming convention.
 * - extraProps: Any extra props to be passed to the component.
 * - exact: Is the route match exact.
 * - onlineReq: Does the app needs to be online to allow that route
 */

const routes = {
    LOGIN: {
        url: '/login',
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
    EMAIL_VERIF: {
        url: '/register/verif/:token',
        getUrl: token => `/register/verif/${token}`,
        guestOnly: true,
        Component: Register,
    },
    REGISTER: {
        url: '/register',
        guestOnly: true,
        Component: Register,
        redirect: '/',
    },
    // PROFILE: {
    //     url: "/user/:id",
    //     // getUrl: id => `/user/${id}`,
    //     auth: true,
    //     Component: Profile,
    // },
    USER_PROFILE: {
        url: "/user/:id",
        getUrl: id => `/user/${id}`,
        auth: true,
        Component: Profile,
    },
    USER_LIST: {
        url: '/user',
        Component: UserList,
        auth: true,
    },
    DASHBOARD: {
        url: '/dashboard',
        auth: true,
        role: 'admin',
    },
    FORGOTPASS_REQUEST: {
        url: '/forgotpass/request',
        guestOnly: true,
        Component: ForgotPass,
    },
    FORGOTPASS_RESET: {
        url: '/forgotpass/reset/:token',
        guestOnly: true,
        Component: ForgotPass,
    },

    TASK_CREATE: {
        url: '/task/create',
        Component: TaskEdit,
        auth: true,
    },
    TASK_EDIT: {
        url: '/task/:id/edit',
        getUrl: id => `/task/${id}/edit`,
        Component: TaskEdit,
        auth: true,
        isModal: true,
    },
    TASK_ITEM: {
        url: '/task/:id',
        getUrl: id => `/task/${id}`,
        Component: TaskItem,
        auth: true,
    },

    TASK_LIST: {
        url: '/task',
        Component: TaskList,
        auth: true,
    },

    MESSAGE: {
        url: '/message',
        Component: Message,
        onlineReq: false,
    },
    ROOT: {
        // Placed at the last otherwise it will override all other 
        // routes because of the `/` in front of every route
        url: '/',
        Component: Home,
        exact: true,
        onlineReq: false,
    },

    NOT_FOUND: {
        // And placed this AFTER the root for a *default* case
        url: '/oops',
        Component: NotFound,
        onlineReq: false,
    },


}

export default routes;