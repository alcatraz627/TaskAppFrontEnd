import { applyMiddleware, compose, createStore, } from 'redux'

import createSagaMiddleware from 'redux-saga'

import { routerMiddleware } from 'connected-react-router'

import createRootReducer from '../reducers'
import rootSaga from '../sagas'
import { fetch_auth_user } from '../sagas/user'

import { createBrowserHistory } from 'history'

import initialState from '../constants/initialState'

export const history = createBrowserHistory()

const sagaMiddleware = createSagaMiddleware()

const middleware = [sagaMiddleware, routerMiddleware(history)];

const composeEnhancers = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose)

const store = createStore(createRootReducer(history), initialState, composeEnhancers(applyMiddleware(...middleware),))

sagaMiddleware.run(rootSaga);
sagaMiddleware.run(fetch_auth_user);

export default store