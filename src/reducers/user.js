import initialState from '../constants/initialState'
import { ACTION_TYPES } from '../constants/actions'

export default function userReducer(state = initialState.user, action) {
    console.log('In reducer', action)
    switch (action) {
        case ACTION_TYPES.ATTEMPT_LOGIN:
            return state;

            case ACTION_TYPES.LOGIN_FAIL:
            return state;

        case ACTION_TYPES.LOGIN_SUCCESS:
            return state;
    }
    return (state)
}