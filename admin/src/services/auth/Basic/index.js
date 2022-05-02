//import { take, put, select } from 'redux-saga/effects';
//import uuid from 'uuid';
import axios from 'axios';
import { fetchError, fetchStart, fetchSuccess } from '../../../redux/actions';
import { setAuthUser, setForgetPassMailSent, updateLoadUser } from '../../../redux/actions/Auth';
import React from 'react';
//import { history } from '../../../redux/store/history'
//import * as mutations from '../../../redux/store/mutations';
const url = process.env.NODE_ENV === 'production' ? `` : `http://localhost:8888`;

const BasicAuth = {
  onRegister: ({ name, email, password }) => {
    return dispatch => {
      dispatch(fetchStart());

      setTimeout(() => {
        dispatch(fetchSuccess());
        const user = { name: name, email: email, password: password };
        localStorage.setItem('user', JSON.stringify(user));
        dispatch(setAuthUser(user));
      }, 300);
    };
  },

  onLogin: ({ username, password }) => {
    console.log('In here')
    return dispatch => {
      try {
        dispatch(fetchStart());
        console.log('-PP-')
        console.log(username)
        console.log(password)
        setTimeout(() => {
          const user = { username: username, password: password };
          dispatch(fetchSuccess());
          //localStorage.setItem('user', JSON.stringify(user));
          let result = axios.post(
              url  + `/authenticate`, 
              JSON.stringify(user), 
              {headers : { "Content-Type" : "application/json" }
            }).then((result) => {
              localStorage.setItem('isLogin', JSON.stringify({isOperationSuccess : true}));
              console.log('**********************************');
              console.log(result.data.state.users[0].resetPassword);
              console.log(result.data.state.users);
              console.log('**********************************');
              localStorage.setItem('isResetOk', JSON.stringify({isOperationSuccess : !result.data.state.users[0].resetPassword}));

              console.log('Reslut found');
              console.log(result);
              localStorage.setItem('user', JSON.stringify(user));
              dispatch(setAuthUser(result.data.state.users[0]));

            })
            .catch((error) => {
              console.log('catch');
              console.log(error);

              if(typeof error.message == "string" && error.message.includes("499", 12)){
                dispatch(fetchError("Invalid credentials. Please enter valid credentials."));
              }
              else{
                dispatch(fetchError("Unable to login. Please try again."));
              }
              localStorage.setItem('isLogin', JSON.stringify({isOperationSuccess : false}));
            })
            .finally(() => {
              console.log('finally');
            });

          
        }, 300);
      } catch (error) {
        dispatch(fetchError(error.message));
        localStorage.setItem('isLogin', JSON.stringify({isOperationSuccess : false}));
      }
    };
  },
  onLogout: () => {
    return dispatch => {
      dispatch(fetchStart());
      setTimeout(() => {
        dispatch(fetchSuccess());
        localStorage.removeItem('user');
        dispatch(setAuthUser(null));
      }, 300);
    };
  },
  onSimplyGetOut: () => {
    console.log("LOG-OUT");
    return dispatch => {
      dispatch(fetchStart());
      setTimeout(() => {
        dispatch(fetchSuccess());
        localStorage.removeItem('user');
        dispatch(setAuthUser(null));
      }, 300);
    };
  },

  getAuthUser: (loaded = false) => {
    return dispatch => {
      dispatch(fetchStart());
      dispatch(updateLoadUser(loaded));

      setTimeout(() => {
        dispatch(fetchSuccess());
        dispatch(setAuthUser(JSON.parse(localStorage.getItem('user'))));
      }, 300);
    };
  },

  onForgotPassword: (username) => {
    return dispatch => {
      dispatch(fetchStart());

      setTimeout(() => {
        console.log('------------------------------')
        console.log(username)
        console.log('------------------------------')
      const user = username;
      let result = axios.post(
          url  + `/forgetpassword`, 
          JSON.stringify(user), 
          {headers : { "Content-Type" : "application/json" }
        }).then((result) => {

          console.log('Result found');
          console.log(result);
          dispatch(setForgetPassMailSent(true));
          dispatch(fetchSuccess("Please check your email"));

        })
        .catch((error) => {
          console.log('catch');
          console.log(error);
          if(typeof error.message == "string" && error.message.includes("499", 12)){
            dispatch(fetchError("Request failed!!"));
          }
          else{
            dispatch(fetchError("Request failed! Try again."));
          }
        })
        .finally(() => {
          console.log('finally');
        });
        
        //dispatch(fetchSuccess());
      }, 300);
    };
  },
  onSetPassword: ({ username, password, newpassword }) => {
    console.log('In here')
    return dispatch => {
      try {
        dispatch(fetchStart());
        console.log('-PP-')
        console.log(username)
        console.log(password)
        setTimeout(() => {
          const user = { username: username, password: password, newpassword: newpassword };
          //localStorage.setItem('isResetOk', null);
          dispatch(fetchSuccess());
          //localStorage.setItem('user', JSON.stringify(user));
          let result = axios.post(
              url  + `/setpassword`, 
              JSON.stringify(user), 
              {headers : { "Content-Type" : "application/json" }
            }).then((result) => {
              localStorage.removeItem('isResetOk');
              localStorage.setItem('isResetOk', JSON.stringify({isOperationSuccess : true}));
              console.log(result);
              dispatch(fetchSuccess("Password has been changed. Please login again with the new credentials"));
              dispatch(fetchStart());
              dispatch(fetchSuccess());
              ///localStorage.removeItem('user');
              //dispatch(setAuthUser(null));
              //localStorage.setItem('user', JSON.stringify(user));
              //dispatch(setAuthUser(result.data.state.users[0]));


            })
            .catch((error) => {

              console.log('catch');
              console.log(error);
              if(typeof error.message == "string" && error.message.includes("499", 12)){
                dispatch(fetchError("Invalid credentials. Please enter valid credentials."));
              }
              else{
                dispatch(fetchError("Unable to set password. Please try again."));
              }
              localStorage.setItem('isResetOk', JSON.stringify({isOperationSuccess : false}));
            })
            .finally(() => {
              console.log('finally');
            });

          
        }, 300);
      } catch (error) {
        dispatch(fetchError(error.message));
        localStorage.setItem('isResetOk', JSON.stringify({isOperationSuccess : false}));
      }
    };
  },


  getSocialMediaIcons: () => {
    return <React.Fragment> </React.Fragment>;
  },

  
};
//BasicAuth.onLogout();
export default BasicAuth;

