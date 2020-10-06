import { applyMiddleware, compose, createStore, } from 'redux'

import createSagaMiddleware from 'redux-saga'

import { routerMiddleware } from 'connected-react-router'

import createRootReducer from '../reducers'
import rootSaga from '../sagas'

import { createBrowserHistory } from 'history'

import initialState from '../constants/initialState'

export const history = createBrowserHistory()

const sagaMiddleware = createSagaMiddleware()

const middleware = [sagaMiddleware, routerMiddleware(history)];

const composeEnhancers = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose)

const store = createStore(createRootReducer(history), initialState, composeEnhancers(applyMiddleware(...middleware),))

sagaMiddleware.run(rootSaga);

if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
        const nextRootReducer = require('../reducers/index');
        store.replaceReducer(nextRootReducer);
    });
    module.hot.accept('../sagas', () => {
        const getNewSagas = require('../sagas');
        sagaTask.cancel()
        sagaTask.done.then(() => {
            sagaTask = sagaMiddleware.run(function* replacedSaga(action) {
                yield getNewSagas()
            })
        })
    })
}


export default store