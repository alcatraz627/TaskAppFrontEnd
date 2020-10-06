import { put, takeEvery, call, all, delay } from 'redux-saga/effects'

import { push } from 'connected-react-router'

import apiCall from '../services/api'
import { getToken, setToken, deleteToken } from '../services/localstorage'

import { HTTP_METHODS, MESSAGES, FETCH_STATUS, FETCH_RESOURCES, NOTIF_TYPE } from '../constants'
import API_ROUTES from '../constants/apiRoutes'
import ROUTES from '../constants/routes'
import { ACTION_TYPES, createAction } from '../constants/actions'

export function* attempt_login({ type, payload }) {
    // console.log('In saga', payload)
    let { status, data, error } = yield call(apiCall, ({ url: API_ROUTES.LOGIN, method: HTTP_METHODS.POST, payload }))
    if (status == 200) {
        yield put(createAction(ACTION_TYPES.LOGIN_SUCCESS, data))
        yield put(createAction(ACTION_TYPES.PUSH_NOTIF, { id: 'login', type: NOTIF_TYPE.SUCCESS, message: "Logged in successfully as " + data.user.name }))
    } else if (status == 401) {
        yield put(createAction(ACTION_TYPES.PUSH_NOTIF, { id: 'login', type: NOTIF_TYPE.ERROR, ...data }))
    } else {
        yield put(createAction(ACTION_TYPES.PUSH_NOTIF, { id: 'login', type: NOTIF_TYPE.ERROR, ...error }))
        console.log("Error", error, data)
    }
}

export function* attempt_logout() {
    yield call(apiCall, ({ url: API_ROUTES.LOGOUT, method: HTTP_METHODS.POST }))
    yield put(createAction(ACTION_TYPES.LOGOUT_SUCCESS))
}

export function* login_success({ type, payload }) {
    yield call(setToken, payload.token)
    yield put(createAction(ACTION_TYPES.FETCH_USER_LIST));
    yield put(createAction(ACTION_TYPES.FETCH_TASK_LIST));
}

export function* logout_success() {
    yield call(deleteToken)
}

export function* fetch_auth_user() {
    let { status, data, error } = yield call(apiCall, ({ url: API_ROUTES.USER_ME }))
    if (status == 200) {
        yield put(createAction(ACTION_TYPES.PUSH_NOTIF, { id: 'login', type: NOTIF_TYPE.SUCCESS, message: "Logged in successfully as " + data.name }))
        yield put(createAction(ACTION_TYPES.LOGIN_SUCCESS, { user: data, token: getToken() }))
    } else {
        yield call(deleteToken)
    }

    // yield put(createAction(ACTION_TYPES.FETCH_USER_LIST))
    // yield put(createAction(ACTION_TYPES.FETCH_TASK_LIST))
    yield delay(1000)
    yield put(createAction(ACTION_TYPES.SHOULD_RENDER))
}

export function* attempt_register({ payload }) {
    let { status, data, error } = yield call(apiCall, ({ url: API_ROUTES.REGISTER, method: HTTP_METHODS.POST, payload }))
    if (status == 201) {
        yield put(createAction(ACTION_TYPES.SET_MESSAGE, MESSAGES.REGISTRATION_SUCCESS))
        // yield put(createAction(ACTION_TYPES.REGISTER_SUCCESS, data))
    } else if (status == 422) {
        console.log("Error", data)
        yield all(Object.values(data).map(message => put(createAction(ACTION_TYPES.PUSH_NOTIF, { message, type: NOTIF_TYPE.ERROR }))))
    } else {
        console.log("Error", data, error)
    }
}

export function* attempt_email_verif({ payload }) {
    let { status, data, error } = yield call(apiCall, ({ url: API_ROUTES.VERIFY_EMAIL_TOKEN(payload.token), method: HTTP_METHODS.POST }))
    if (status == 201) {
        yield put(createAction(ACTION_TYPES.SET_MESSAGE, MESSAGES.EMAIL_VERIF_SUCCESS))
    } else if (status == 400) {
        yield put(createAction(ACTION_TYPES.SET_MESSAGE, MESSAGES.EMAIL_VERIF_FAILED))
    } else {
        console.log("Error", data, error)
    }
}

export function* fetch_user_list(action) {
    yield put(createAction(ACTION_TYPES.PAUSE_RENDER))
    yield put(createAction(ACTION_TYPES.SET_FETCH_STATUS, { [FETCH_RESOURCES.USER_LIST]: FETCH_STATUS.FETCHING }))
    let { status, data, error } = yield call(apiCall, ({ url: API_ROUTES.USER_LIST }))
    if (status == 200) {
        yield put(createAction(ACTION_TYPES.UPDATE_USER_LIST, data))
        yield put(createAction(ACTION_TYPES.SET_FETCH_STATUS, { [FETCH_RESOURCES.USER_LIST]: FETCH_STATUS.FETCHED }))
    } else {
        yield put(createAction(ACTION_TYPES.SET_FETCH_STATUS, { [FETCH_RESOURCES.USER_LIST]: FETCH_STATUS.FETCH_ERROR }))
        console.log("Error", data, error)
    }
    yield put(createAction(ACTION_TYPES.SHOULD_RENDER))
}

export function* delete_user({ payload: { id, toRedir = true } }) {
    if (confirm("Are you sure you want to delete this task?")) {
        let { status, data, error } = yield call(apiCall, ({ url: API_ROUTES.USER_ID(id), method: HTTP_METHODS.DELETE }))
        if (status == 200) {
            yield put(createAction(ACTION_TYPES.PUSH_NOTIF, data))
            if (toRedir) {
                yield put(push(ROUTES.USER_LIST.url))
            }
            yield put(createAction(ACTION_TYPES.UPDATE_USER_DELETE, { id }))
        } else {
            yield put(createAction(ACTION_TYPES.PUSH_NOTIF, data))
            console.log("Error", data, error)
        }
    }
}

export function* forgotpass_request({ payload }) {
    let { status, data, error } = yield call(apiCall, ({ url: API_ROUTES.FORGOTPASS_REQUEST, payload, method: HTTP_METHODS.POST }))
    switch (status) {

        case 201:
            yield put(createAction(ACTION_TYPES.SET_MESSAGE, MESSAGES.FORGOTPASS_REQ_SUCCESS))
            break;
        case 401:
        case 404:
            yield put(createAction(ACTION_TYPES.PUSH_NOTIF, data))
            break;

        default:
            console.log("Error", data, error)
    }
}

export function* forgotpass_verify({ payload }) {
    let { status, data, error } = yield call(apiCall, ({ url: API_ROUTES.FORGOTPASS_VERIFY, payload, method: HTTP_METHODS.POST }))
    switch (status) {
        // case 202:
        //     yield put(createAction(ACTION_TYPES.PUSH_NOTIF, data))
        //     break;
        case 400:
            yield put(createAction(ACTION_TYPES.SET_MESSAGE, MESSAGES.FORGOTPASS_VEFIF_FAIL))
            break;

        default:
            console.log("Error", data, error)
    }
}

export function* forgotpass_reset({ payload }) {
    let { status, data, error } = yield call(apiCall, ({ url: API_ROUTES.FORGOTPASS_RESET, payload, method: HTTP_METHODS.POST }))

    switch (status) {
        case 200:
            yield put(createAction(ACTION_TYPES.SET_MESSAGE, MESSAGES.FORGOTPASS_RESET_SUCCESS))
            break;
        case 422:
            yield all(data.password.map(message => put(createAction(ACTION_TYPES.PUSH_NOTIF, { message, type: NOTIF_TYPE.ERROR }))))
            break;

        default:
            if (error) {
                console.log("Error", data, error)
            }
    }
}


// export function* fetch_user_item(action) {
//     yield put(createAction(ACTION_TYPES.SET_FETCH_STATUS, { [FETCH_RESOURCES.USER_ITEM]: FETCH_STATUS.FETCHING }))
//     let { status, data, error } = yield call(apiCall, ({ url: API_ROUTES.USER_ID(1) }))
//     if (status == 200) {
//         console.log(data)
//         yield put(createAction(ACTION_TYPES.SET_FETCH_STATUS, { [FETCH_RESOURCES.USER_LIST]: FETCH_STATUS.FETCHED }))
//         yield put(createAction(ACTION_TYPES.UPDATE_USER_LIST, data))
//     } else {
//         yield put(createAction(ACTION_TYPES.SET_FETCH_STATUS, { [FETCH_RESOURCES.USER_LIST]: FETCH_STATUS.FETCH_ERROR }))
//         console.log("Error", data, error)
//     }
// }


export default function* userSaga() {
    yield takeEvery(ACTION_TYPES.ATTEMPT_LOGIN, attempt_login)
    yield takeEvery(ACTION_TYPES.ATTEMPT_LOGOUT, attempt_logout)

    yield takeEvery(ACTION_TYPES.LOGIN_SUCCESS, login_success)
    yield takeEvery(ACTION_TYPES.LOGOUT_SUCCESS, logout_success)

    yield takeEvery(ACTION_TYPES.FETCH_USER_LIST, fetch_user_list)
    yield takeEvery(ACTION_TYPES.FETCH_AUTH_USER, fetch_auth_user)

    yield takeEvery(ACTION_TYPES.ATTEMPT_REGISTER, attempt_register)
    // yield takeEvery(ACTION_TYPES.REGISTER_SUCCESS, register_success)
    yield takeEvery(ACTION_TYPES.ATTEMPT_EMAIL_VERIF, attempt_email_verif)
    yield takeEvery(ACTION_TYPES.ATTEMPT_USER_DELETE, delete_user)

    yield takeEvery(ACTION_TYPES.FORGOTPASS_REQUEST, forgotpass_request)
    yield takeEvery(ACTION_TYPES.FORGOTPASS_VERIFY, forgotpass_verify)
    yield takeEvery(ACTION_TYPES.FORGOTPASS_RESET, forgotpass_reset)

}