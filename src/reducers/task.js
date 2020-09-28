import initialState from '../constants/initialState'
import { ACTION_TYPES } from '../constants/actions'

export default function taskReducer(state = initialState.user, { type, payload = {} }) {
    switch(type) {

        default:
            return state;
    }
}