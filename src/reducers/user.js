import initialState from '../constants/initialState'
import { ACTION_TYPES } from '../constants/actions'

export default function userReducer(state = initialState.user, action) {
    console.log(action)
    switch (action) {
        case ACTION_TYPES.ATTEMPT_LOGIN:
            return state;

            case ACTION_TYPES.LOGIN_FAIL:
            console.log(action.payload);
            return state;

        case ACTION_TYPES.LOGIN_SUCCESS:
            console.log(action.payload);
            return state;
    }
    return (state)
}