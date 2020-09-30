import { FETCH_RESOURCES, FETCH_STATUS } from './index'

export default {
    user: {
        token: null,

        id: null,
        name: null,
        email: null,
        role: null,

        userList: {},
    },

    task: {

    },

    utils: {
        shouldRender: 1, // Count of pending tasks, will render only when >0

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
