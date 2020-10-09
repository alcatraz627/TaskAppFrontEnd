import initialState from '../constants/initialState'
import { ACTION_TYPES } from '../constants/actions'

export default function userReducer(state = initialState.user, { type, payload = {} }) {
    switch (type) {
        case ACTION_TYPES.LOGIN_ATTEMPTED:
            return { ...state, shouldRender: true }

        case ACTION_TYPES.LOGIN_SUCCESS:
            return ({
                ...state,
                ...payload.user,
                token: payload.token,
                userList: {
                    ...state.userList,
                    [payload.user.id]: { ...payload.user }
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

        case ACTION_TYPES.UPDATE_USER_LIST:
            const userList = payload.map((u) => ({ [u.id]: u }))
            return { ...state, userList: Object.assign({}, ...userList) };

        case ACTION_TYPES.UPDATE_USER_ITEM:
            return { ...state, userList: { ...state.userList, [payload.id]: { ...payload } } }

        case ACTION_TYPES.UPDATE_USER_DELETE:
            const { [payload.id]: value, ...newList } = state.userList
            return { ...state, userList: { ...newList } }

        default:
            return state
    }
}