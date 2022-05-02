import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';

const actionTypes = {
    GET_TXN_STATUS: 'GET_TXN_STATUS',

}

const initialState = {
    data: []
}

function paymentReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_TXN_STATUS:

            return state;


        default:
            return state;
    }
}

export const paymentActions = {



};



const persistConfig = {
    keyPrefix: "pg-",
    key: "payment",
    storage
}

export default persistReducer(persistConfig, paymentReducer);