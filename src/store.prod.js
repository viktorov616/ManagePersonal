import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';

import rootReducer from './reducers/index';
import rootSaga from './sagas/index';

const sagaMiddleware = createSagaMiddleware();
export const history = createHistory();
const router = routerMiddleware(history);
const enhancers = applyMiddleware(sagaMiddleware, thunk, router);
const defaultState = {};
const store = createStore(rootReducer, defaultState, enhancers);

sagaMiddleware.run(rootSaga);

export default store;

