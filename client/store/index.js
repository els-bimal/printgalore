import { combineReducers, createStore, applyMiddleware, compose  } from 'redux';
import { createWrapper } from 'next-redux-wrapper';
import createSagaMiddleWare from 'redux-saga';
import { persistStore } from 'redux-persist';

import rootSaga from '~/store/root-saga';

import cartReducer from '~/store/cart';
import modalReducer from '~/store/modal';
import wishlistReducer from '~/store/wishlist';
import demoReducer from '~/store/demo';
import userReducer from '~/store/user';


const sagaMiddleware = createSagaMiddleWare();

const rootReducers = combineReducers({
    cart: cartReducer,
    user: userReducer,
    modal: modalReducer,
    wishlist: wishlistReducer,
    demo: demoReducer,
    
})

export const makeStore = (context) => {
    // const composeEnhancers = __REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    // const composeEnhancers = ['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;
    // const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
    // const composeEnhancers = compose((typeof window !== 'undefined' && window.devToolsExtension) ? window.devToolsExtension() : f => f);
    // const store = createStore(rootReducers, composeEnhancers(applyMiddleware(sagaMiddleware)));
    const store = createStore(rootReducers,applyMiddleware(sagaMiddleware));
    


    store.sagaTask = sagaMiddleware.run(rootSaga);
    store.__persistor = persistStore(store);
    // store.compose = composeEnhancers

    return store;
};

export const wrapper = createWrapper(makeStore);