import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";
import { SIGN_IN, SIGN_UP, SIGN_OUT, USER_LOADED, GET_USER1 } from "../../constants/actionTypes";

const initialState = {
  token: typeof window !== 'undefined'? localStorage.getItem("token"): null,
  user1 : null,
  _id: null,
};


const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER1:
      console.log('Mam');
      console.log(state);
        return { ...state };


    case SIGN_IN:
    case SIGN_UP:
    case USER_LOADED:
      console.log('_____0000_____')
      console.log(action.payload)
      toast("Welcome...", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
     // const user = jwtDecode(action.payload.token); 
      return {
        ...initialState,
        //token: action.payload.token,
        user1: action.payload.LoginUser,
        _id: action.payload.LoginUser.email,
      };
    case SIGN_OUT:
      console.log('_____1111_____')
      localStorage.removeItem("token");
      //toast("Goodbye...", {
      //  position: toast.POSITION.BOTTOM_RIGHT,
      //});
      return {
        token: null,
        user1: null,
        _id: null,
      };
    default:
      return state;
  }
};


const persistConfig = {
    keyPrefix: "printgalore-",
    key: "user",
    storage
}

export default persistReducer(persistConfig, authReducer);
