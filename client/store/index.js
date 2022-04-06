import { combineReducers, createStore, applyMiddleware, compose  } from 'redux';
import { createWrapper } from 'next-redux-wrapper';
import createSagaMiddleWare from 'redux-saga';
import { persistStore } from 'redux-persist';

import rootSaga from '~/store/root-saga';
import thunk from 'redux-thunk'
import cartReducer from '~/store/cart';
import modalReducer from '~/store/modal';
import wishlistReducer from '~/store/wishlist';
import demoReducer from '~/store/demo';
//import userReducer from '~/store/user';
import authReducer from './reducers/authReducer'
import { forwardRef } from 'react';

const initialState = {
  token: typeof window !== 'undefined'? localStorage.getItem("token"): null,
  user1 : null,
  _id: null,
};

const sagaMiddleware = createSagaMiddleWare();

const rootReducers = combineReducers({
    cart: cartReducer,
    auth: authReducer,
    //ueser: userReducer,
    modal: modalReducer,
    wishlist: wishlistReducer,
    demo: demoReducer,
    
})

//const sagaMiddleware = createSagaMiddleware();
//const routeMiddleware = routerMiddleware(history);

const middlewares = [thunk, sagaMiddleware];


export const makeStore = (context) => {
    // const composeEnhancers = __REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    // const composeEnhancers = ['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;
    // const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
    // const composeEnhancers = compose((typeof window !== 'undefined' && window.devToolsExtension) ? window.devToolsExtension() : f => f);
    // const store = createStore(rootReducers, composeEnhancers(applyMiddleware(sagaMiddleware)));
    const store = createStore(rootReducers,applyMiddleware(...middlewares));
    


    store.sagaTask = sagaMiddleware.run(rootSaga);
    store.__persistor = persistStore(store);
    // store.compose = composeEnhancers

    return store;
};
/*

const bindMiddleware = middleware => {
  //if (process.env.NODE_ENV !== 'production') {
  //  const { composeWithDevTools } = require('redux-devtools-extension');
  //  return composeWithDevTools(applyMiddleware(...middleware));
  //}
  return applyMiddleware(...middleware);
};

function configureStore(initialState = {}) {
  const store = createStore(rootReducers, initialState, bindMiddleware(middlewares));
  for (let saga in rootSaga) {
    sagaMiddleware.run(rootSaga[saga]);
  }
  return store;
}
export default configureStore;
//export { history };

*/
export const wrapper = createWrapper(makeStore);