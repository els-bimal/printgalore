import { SIGN_IN, SIGN_UP, SIGN_OUT, USER_LOADED, GET_USER1, UPDATE_LOAD_USER, UPDATE_AUTH_USER } from "../../constants/actionTypes";
export const signUp = (user) => {
  return (dispatch) => {
  };
};


export const setAuthUser = user => {
  return dispatch => {
    dispatch({
      type: SIGN_IN,
      payload: user,
    });
  };
};

export const updateLoadUser = loading => {
  return dispatch => {
    dispatch({
      type: UPDATE_LOAD_USER,
      payload: loading,
    });
  };
};



export const getUser = () => {
  return (dispatch) => {
    console.log('here------>');
        dispatch({
          type: GET_USER1,
          payload: {
            token: null,
            user1:null,
            _id: null,

          },
        });

    };
};



export const signIn = (email, password) => {
  return (dispatch) => {
    };
};

export const signOut = () => {
  return (dispatch) => {
    dispatch({
      type: "CLEAR_TODOS",
    });
    
    dispatch({
      type: SIGN_OUT,
    });

  };
};

export const loadUser = () => {
  return (dispatch, getState) => {
    const user = getState().auth.getUser();
    if (user) {
      dispatch({
        type: USER_LOADED,
        payload : user,
      });
    } else return null;
  };
};