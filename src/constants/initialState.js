import { FETCH_RESOURCES, FETCH_STATUS } from './index'

export default {
    user: {
        isLoginAttempted: false, // If the login attempt has been made
        token: null,

        id: null,
        name: null,
        email: null,
        role: null,

        userList: {},
        isFetchingUsers: false,
    },

    task: {

    },

    utils: {
        notifList: [],
        notifHistory: [],

        fetchStatus: Object.assign({},
            ...Object.keys(FETCH_RESOURCES)
                .map(r => ({ [r]: FETCH_STATUS.NOT_FETCHED }))),

        message: {
            title: null,
            body: null,
        }
    }
}
