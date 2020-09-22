import { applyMiddleware, compose, createStore, } from 'redux'

import createSagaMiddleware from 'redux-saga'

import rootReducer from './reducers'
// import initialState from './constants/initialState'

console.log(rootReducer);

const middleware = [createSagaMiddleware()];

const composeEnhancers = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose)

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middleware)))

export default store