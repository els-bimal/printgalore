import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';

import { history } from './history';

import { reducers } from '../reducers';

let defaultState = {
  session: {},
  users: [],
  items: [],
};

const devMode = process.env.NODE_ENV === 'development';
//const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();
const routeMiddleware = routerMiddleware(history);

const middlewares = [thunk, routeMiddleware, sagaMiddleware];

if (devMode) {
  middlewares.push(logger);
}

const bindMiddleware = middleware => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

function configureStore(initialState = {}) {
  const store = createStore(reducers(history), initialState, bindMiddleware(middlewares));
  return store;
}
export default configureStore;
export { history };

