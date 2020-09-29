import { put, takeEvery, call, all } from 'redux-saga/effects'

import { push } from 'connected-react-router'
import apiCall from '../services/api'
import { getToken, setToken, deleteToken } from '../services/localstorage'

import { HTTP_METHODS, MESSAGES, FETCH_STATUS, FETCH_RESOURCES } from '../constants'
import ROUTES from '../constants/routes'
import API_ROUTES from '../constants/apiRoutes'
import { ACTION_TYPES, createAction } from '../constants/actions'

export function* fetch_task_list(action) {
    yield put(createAction(ACTION_TYPES.SET_FETCH_STATUS, { [FETCH_RESOURCES.TASK_LIST]: FETCH_STATUS.FETCHING }))
    let { status, data, error } = yield call(apiCall, ({ url: API_ROUTES.TASK_LIST }))
    if (status == 200) {
        console.log(data)
        yield put(createAction(ACTION_TYPES.SET_FETCH_STATUS, { [FETCH_RESOURCES.TASK_LIST]: FETCH_STATUS.FETCHED }))
        yield put(createAction(ACTION_TYPES.UPDATE_TASK_LIST, data))
    } else {
        yield put(createAction(ACTION_TYPES.SET_FETCH_STATUS, { [FETCH_RESOURCES.TASK_LIST]: FETCH_STATUS.FETCH_ERROR }))
        console.log("Error", data, error)
    }
}

export function* edit_task({ payload: { formData, id } }) {
    console.log(formData, id)
    console.log("Calling")
    let { status, data, error } = yield call(apiCall, ({ url: API_ROUTES.TASK_ID(id), payload: formData, method: HTTP_METHODS.PATCH }))
    console.log("Called")
    if (status == 201) {
        yield put(createAction(ACTION_TYPES.PUSH_NOTIF, { message: "Task updated!" }))
        yield put(createAction(ACTION_TYPES.UPDATE_TASK_ITEM, data.task))
        // ?TODO: Task item re-render
        yield put(push(ROUTES.TASK_ITEM.getUrl(data.task.id)))
    } else {
        yield put(createAction(ACTION_TYPES.PUSH_NOTIF, { message: "An error occured." }))
        console.log("Error", data, error)
    }
    // TODO: Nav to item and run a a fetch from API
}


export default function* taskSaga() {
    yield takeEvery(ACTION_TYPES.FETCH_TASK_LIST, fetch_task_list)
    yield takeEvery(ACTION_TYPES.TASK_EDIT, edit_task)
}