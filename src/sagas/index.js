import { fork, all, put } from 'redux-saga/effects'

import user from './user'

export default function* rootSaga() {
    console.log("Loaded root saga!");
    yield fork(user);
}

// export function* boot() {
//     console.log("Saga loaded!");
// }
