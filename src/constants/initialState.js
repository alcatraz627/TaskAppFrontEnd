import { FETCH_RESOURCES, FETCH_STATUS } from './index'

export default {
    user: {
        token: null,

        id: null,
        name: null,
        email: null,
        role: null,

        userList: {},
        count: null,
    },

    task: {
        taskList: {},
        count: null,
    },

    utils: {
        // Count of pending jobs that need to be completed before 
        // rendering the view can happen, will render only when > 0
        shouldRender: 1,

        // Keeps track of if the app has connection to the backend
        isOnline: false,

        // List of notifs at the bottom right
        notifList: {},
        // History of notifs in the bell icon dropdown
        notifHistory: [],

        // Fetch statuses of various resource types
        fetchStatus: Object.assign({},
            ...Object.keys(FETCH_RESOURCES)
                .map(r => ({ [r]: FETCH_STATUS.NOT_FETCHED }))),

        // Data for the message page
        message: {
            title: null,
            body: null,
            // TODO: Add an optional link functionality.
        }
    }
}
