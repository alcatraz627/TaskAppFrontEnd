import { applyMiddleware, compose, createStore, } from 'redux'

import createSagaMiddleware from 'redux-saga'

import rootReducer from '../reducers'
import rootSaga from '../sagas'
import {fetch_auth_user} from '../sagas/user'

// import initialState from './constants/initialState'

const sagaMiddleware = createSagaMiddleware()

const middleware = [sagaMiddleware];

const composeEnhancers = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose)

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middleware)))

sagaMiddleware.run(rootSaga);
sagaMiddleware.run(fetch_auth_user);

export default store