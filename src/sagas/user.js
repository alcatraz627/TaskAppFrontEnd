import { put, takeEvery } from 'redux-saga/effects'
import apiCall from '../services/api'
import { HTTP_METHODS } from '../constants'
// Fetch->Axios module
// import 

import { ACTION_TYPES, action } from '../constants/actions'

export function* attempt_login({type, payload}) {
    console.log('In saga', payload)
    let resp = yield apiCall({ url: 'auth/login', method: HTTP_METHODS.POST, payload })
    if(resp.status == 200) {
        console.log('token', resp.data.token)
    } else {
        console.log("Error", resp.data.message)
    }
    // yield put(action(ACTION_TYPES.LOGIN_SUCCESS, { a: 1 }))
}

export default function* userSaga() {
    yield takeEvery(ACTION_TYPES.ATTEMPT_LOGIN, attempt_login)
}