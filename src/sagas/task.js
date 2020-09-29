import { put, takeEvery, call, all } from 'redux-saga/effects'

import apiCall from '../services/api'
import { getToken, setToken, deleteToken } from '../services/localstorage'

import { HTTP_METHODS, MESSAGES, FETCH_STATUS, FETCH_RESOURCES } from '../constants'
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



export default function* taskSaga() {
    yield takeEvery(ACTION_TYPES.FETCH_TASK_LIST, fetch_task_list)
}