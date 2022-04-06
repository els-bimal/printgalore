import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import { toast } from 'react-toastify';
import { takeEvery } from 'redux-saga/effects';

const actionTypes = {
    GET_USER: 'GET_USER',
}

const initialState = {
    data: {},
    token: typeof window !== 'undefined'? localStorage.getItem("token"): null,
    user1 : null,
    _id: null,

}

function userReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_USER:
            let user = { ...action.payload.user };
            return { ...state, data: {user} };

        default:
            return state;
    }
}

export const userActions = {
    
    getUser: user => {console.log("STORE GOT USER"); console.log(user); ({ type: actionTypes.GET_USER, payload: { user } })},

};


const persistConfig = {
    keyPrefix: "printgalore-",
    key: "user",
    storage
}

export default persistReducer(persistConfig, userReducer);