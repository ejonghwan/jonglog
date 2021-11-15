import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';


import rootReducer from './redux/reducers/index.js';
import rootSaga from './redux/sagas/index.js';


export const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();


const initialState = {}

const middlewares = [sagaMiddleware, routerMiddleware(history)];
const devtools = window.__REDUX_DEVTOOLS_EXTENSIONS_COMPOSE__;

const composeEnhancer = process.env.NODE_ENV === "production" ? compose : devtools || compose;


// store
const store = createStore(
    rootReducer(history),
    initialState,
    composeEnhancer(applyMiddleware(...middlewares))
);
sagaMiddleware.run(rootSaga);




export default store;

