import { SEND_FORGET_PASSWORD_EMAIL, UPDATE_AUTH_USER, UPDATE_LOAD_USER, GET_AUTH_USER } from '../../@jumbo/constants/ActionTypes';
//import * as mutations from '../actions/User';

const INIT_STATE = {
  authUser: null,
  loadUser: false,
  send_forget_password_email: false,
  session: {},
  users: [],
  authenticated: false,
  id : ''
};

export default (state = INIT_STATE, action) => {
  //const returnedTarget = Object.assign(target, source);
  console.log('here-->')
  console.log(action);
  switch (action.type) {
    case UPDATE_AUTH_USER: {
      return {
        ...state,
        authUser: action.payload,
        loadUser: true,
      };
    }
    case UPDATE_LOAD_USER: {
      return {
        ...state,
        loadUser: action.payload,
      };
    }
    case SEND_FORGET_PASSWORD_EMAIL: {
      return {
        ...state,
        send_forget_password_email: action.payload,
      };
    }
    default:
      return state;
  }
};
