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

    utils: {
        notifList: [],
        notifHistory: [],

        message: {
            title: null,
            body: null,
        }
    }
}
