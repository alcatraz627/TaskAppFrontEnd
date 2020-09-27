import initialState from '../constants/initialState'
import { ACTION_TYPES } from '../constants/actions'

export default function userReducer(state = initialState.user, { type, payload = {} }) {
    switch (type) {
        case ACTION_TYPES.LOGIN_SUCCESS:
            return ({
                ...state,
                ...payload.user,
                'token': payload.token,
                userList: {
                    ...state.userList,
                    [payload.user.id]: {...payload.user}
                }
            })

        case ACTION_TYPES.LOGOUT_SUCCESS:
            return {
                ...state,
                token: null,
                email: null,
                name: null,
                id: null,
                role: null
            }

        case ACTION_TYPES.FETCH_USER_LIST:
            return { ...state, isFetchingUsers: true };

        case ACTION_TYPES.UPDATE_USER_LIST:
            const userList = payload.map((u) => ({ [u.id]: u }))
            return { ...state, isFetchingUsers: false, userList: Object.assign({}, ...userList) };

        case ACTION_TYPES.LOGIN_ATTEMPTED:
            return { ...state, isLoginAttempted: true }

        default:
            return state
    }
    return (state)
}