import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import { toast } from 'react-toastify';
import { takeEvery } from 'redux-saga/effects';

const actionTypes = {
    SET_USER: 'SET_USER',
    REM_USER:'REM_USER'
}

const initialState = {
    data: {}
}

function userReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.REM_USER:
            //var data = action.data;
            return { ...state, data:initialState };
        case actionTypes.SET_USER:
            /*let data = {
                uid:"dgsdg",
                pass:"sdgdg"
            }*/
            
            var data = action.data;
            return { ...state,  data };

        default:
            return state;
    }
}

/*
export const userActions = {
    
    //getUser: user => {console.log("STORE GOT USER"); console.log(user); ({ type: actionTypes.GET_USER, payload: { user } })},
    
    addUser: user => ({ type: actionTypes.SET_USER, payload: { user } }),
    getUser: user => ({ type: actionTypes.GET_USER}),
    

};
*/


const persistConfig = {
    keyPrefix: "printgalore-",
    key: "user",
    storage
}

export default persistReducer(persistConfig, userReducer);