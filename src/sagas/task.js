import { put, takeEvery, call, all } from 'redux-saga/effects'

import { push, replace } from 'connected-react-router'
import apiCall from '../services/api'

import { HTTP_METHODS, MESSAGES, FETCH_STATUS, FETCH_RESOURCES } from '../constants'
import ROUTES from '../constants/routes'
import API_ROUTES from '../constants/apiRoutes'
import { ACTION_TYPES, createAction } from '../constants/actions'

export function* fetch_task_list({ payload: { limit, offset, search, taskStatus } }) {
    yield put(createAction(ACTION_TYPES.SET_FETCH_STATUS, { [FETCH_RESOURCES.TASK_LIST]: FETCH_STATUS.FETCHING }))
    let { status, data, error } = yield call(apiCall, ({ url: API_ROUTES.TASK_LIST(offset, limit, search, taskStatus) }))
    if (status == 200) {
        yield put(createAction(ACTION_TYPES.UPDATE_TASK_LIST, data))
        yield put(createAction(ACTION_TYPES.SET_FETCH_STATUS, { [FETCH_RESOURCES.TASK_LIST]: FETCH_STATUS.FETCHED }))
    } else {
        yield put(createAction(ACTION_TYPES.SET_FETCH_STATUS, { [FETCH_RESOURCES.TASK_LIST]: FETCH_STATUS.FETCH_ERROR }))
        console.log("Error", data, error)
    }
}
export function* fetch_user_tasks({ payload: { id, limit, offset, search, taskStatus } }) {
    yield put(createAction(ACTION_TYPES.SET_FETCH_STATUS, { [FETCH_RESOURCES.TASK_LIST]: FETCH_STATUS.FETCHING }))
    let { status, data, error } = yield call(apiCall, ({ url: API_ROUTES.USER_TASKS(id, offset, limit, search, taskStatus) }))
    if (status == 200) {
        yield put(createAction(ACTION_TYPES.UPDATE_TASK_LIST, data))
        yield put(createAction(ACTION_TYPES.SET_FETCH_STATUS, { [FETCH_RESOURCES.TASK_LIST]: FETCH_STATUS.FETCHED }))
    } else {
        yield put(createAction(ACTION_TYPES.SET_FETCH_STATUS, { [FETCH_RESOURCES.TASK_LIST]: FETCH_STATUS.FETCH_ERROR }))
        console.log("Error", data, error)
    }
}

export function* fetch_task_item({ payload: { id } }) {
    // yield put(createAction(ACTION_TYPES.PAUSE_RENDER))
    yield put(createAction(ACTION_TYPES.SET_FETCH_STATUS, { [FETCH_RESOURCES.TASK_ITEM]: FETCH_STATUS.FETCHING }))
    let { status, data, error } = yield call(apiCall, ({ url: API_ROUTES.TASK_ID(id) }))
    if (status == 200) {
        yield put(createAction(ACTION_TYPES.UPDATE_TASK_ITEM, data))
        yield put(createAction(ACTION_TYPES.SET_FETCH_STATUS, { [FETCH_RESOURCES.TASK_ITEM]: FETCH_STATUS.FETCHED }))
    } else if (status == 404) {
        yield put(replace(ROUTES.NOT_FOUND.url))
        yield put(createAction(ACTION_TYPES.SET_FETCH_STATUS, { [FETCH_RESOURCES.TASK_ITEM]: FETCH_STATUS.NOT_FOUND }))

    } else {
        yield put(createAction(ACTION_TYPES.SET_FETCH_STATUS, { [FETCH_RESOURCES.TASK_ITEM]: FETCH_STATUS.FETCH_ERROR }))
        console.log("Error", data, error)
    }
    // yield put(createAction(ACTION_TYPES.SHOULD_RENDER))
}

export function* create_task({ payload: { formData } }) {
    let { status, data, error } = yield call(apiCall, ({ url: API_ROUTES.TASK_CREATE, payload: formData, method: HTTP_METHODS.POST }))
    if (status == 201) {
        yield put(createAction(ACTION_TYPES.PUSH_NOTIF, { message: "Task created!" }))
        yield put(createAction(ACTION_TYPES.UPDATE_TASK_ITEM, data.task))
        // ?TODO: Task item re-render
        yield put(push(ROUTES.TASK_ITEM.getUrl(data.task.id)))
    } else if (status == 422) {
        yield all(Object.values(data).map(message => put(createAction(ACTION_TYPES.PUSH_NOTIF, { message }))))
    } else {
        yield put(createAction(ACTION_TYPES.PUSH_NOTIF, { message: "An error occured." }))
        console.log("Error", data, error)
    }
}

export function* edit_task({ payload: { formData, id } }) {
    let { status, data, error } = yield call(apiCall, ({ url: API_ROUTES.TASK_ID(id), payload: formData, method: HTTP_METHODS.PATCH }))
    if (status == 201) {
        // yield put(createAction(ACTION_TYPES.PUSH_NOTIF, { message: "Task updated!" }))
        yield put(createAction(ACTION_TYPES.UPDATE_TASK_ITEM, data.task))
        // ?TODO: Task item re-render
        yield put(push(ROUTES.TASK_ITEM.getUrl(data.task.id)))
    } else {
        yield put(createAction(ACTION_TYPES.PUSH_NOTIF, { message: "An error occured." }))
        console.log("Error", data, error)
    }
}

export function* delete_task({ payload: { id, toRedir = true } }) {
    if (confirm("Are you sure you want to delete this task?")) {
        let { status, data, error } = yield call(apiCall, ({ url: API_ROUTES.TASK_ID(id), method: HTTP_METHODS.DELETE }))
        if (status == 200) {
            yield put(createAction(ACTION_TYPES.PUSH_NOTIF, data))
            if (toRedir) {
                yield put(push(ROUTES.TASK_LIST.url))
            }
            yield put(createAction(ACTION_TYPES.UPDATE_TASK_DELETE, { id }))
        } else {
            yield put(createAction(ACTION_TYPES.PUSH_NOTIF, data))
            console.log("Error", data, error)
        }
    }
}


export default function* taskSaga() {
    yield takeEvery(ACTION_TYPES.FETCH_TASK_ITEM, fetch_task_item)
    yield takeEvery(ACTION_TYPES.FETCH_TASK_LIST, fetch_task_list)
    yield takeEvery(ACTION_TYPES.FETCH_USER_TASKS, fetch_user_tasks)
    yield takeEvery(ACTION_TYPES.ATTEMPT_TASK_CREATE, create_task)
    yield takeEvery(ACTION_TYPES.ATTEMPT_TASK_EDIT, edit_task)
    yield takeEvery(ACTION_TYPES.ATTEMPT_TASK_DELETE, delete_task)
}