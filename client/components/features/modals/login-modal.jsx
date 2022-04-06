import React, { useState, useEffect } from "react";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import Modal from "react-modal";

import { setCookies, getCookie, removeCookies } from "cookies-next";
import { SIGN_IN, SIGN_UP, SIGN_OUT, USER_LOADED } from "../../../constants/actionTypes";

import { useQuery, gql, useMutation } from "@apollo/client";
import jwt from "jsonwebtoken";
import ALink from "~/components/features/custom-link";
import { setAuthUser, updateLoadUser } from "../../../store/actions/authActions";

import { connect, useDispatch, useSelector } from "react-redux";

var CommanFunctions = require("../../commanFunc/commanFunctions");


const ADD_USER = gql`
  mutation Mutation(
    $email: String
    $firstName: String
    $lastName: String
    $password: String
  ) {
    createUser(
      email: $email
      firstName: $firstName
      lastName: $lastName
      password: $password
    ) {
      email
      firstName
      lastName
      password
      token
    }
  }
`;

const LOGIN_CHECK = gql`
  mutation LoginUser($email: String, $password: String) {
    LoginUser(email: $email, password: $password) {
      email
      firstName
      lastName
      password
      token
    }
  }
`;

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0,0,0,0.4)",
    display: "flex",
  },
};

let index = 0;

Modal.setAppElement("#__next");

function LoginModal(props) {

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

  const [logErrors, setLogError] = useState("");
  const [regErrors, setRegError] = useState("");
  const [userSession, setUserSesstion] = useState([]);
  const [isloged, setIsloged] = useState(false);
  const [user1, setuser1] = useState(null)

  useEffect(() => {
   
    const returnval = CommanFunctions.checkUserLoged();
    //console.log("---*"+JSON.stringify(returnval))
    //console.log(returnval);
    if (returnval.success == true){
      setIsloged(true);
      setUserSesstion("Welcome "+ returnval.username +" !");
    }else{
      setIsloged(false)
    }
    console.log('props ---->')
    console.log(props)
    console.log('state.user1')
    //if(props.token!== undefined && props.token !== null){
      //alert(props.token)
    //}  

  },[props]);

  const [registerUser, { reg_loding }] = useMutation(ADD_USER, {
    update(proxy, result) {
      console.log(result);
      setRegError("User Registation Success");
      setEmail("");
      setFirstName("");
      setLastName("");
      setPassword("");
      setConfPassword("");
      setRegError("");
      closeModal();
    },
    onError(error) {
      console.log(error.message);
      setRegError(error.message);
      //setError(error.graphQLErrors[0].extensions.expection.error)
    },
    variables: {
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: password,
    },
  });

  
  if (log_loding){
    setLogError("Please Wait....")
  }


  const [LoginCheck, { log_loding }] = useMutation(LOGIN_CHECK, {

    onCompleted(result) {
      console.log('found')
      console.log(result)
      if (result.LoginUser.email) {
        setLogError("User Login Success");
        console.log('______________________________________')
        console.log(result.LoginUser);
        var token = result.LoginUser.token;
        
       
        jwt.verify(token,"jhsjkfhwkldgladgunlfvdghjygdgjdgjawgdagoasdn", (err, verifiedJwt) => {
          if (err) {
            console.log(err.message);
          } else {
            console.log(result.LoginUser)
            localStorage.setItem("token", token);
            console.log('here - 2')
            setAuthUser(result)
            //dispatch({
            //  type: SIGN_IN,
            //  payload: result});
            console.log('here - 3')




            //console.log("dd", verifiedJwt);
            
            //setCookies("u_det", JSON.stringify(result.LoginUser), {
            //  path: "/",
            //  maxAge: 3600,
            //  sameSite: true,
            //});
            //console.log("---***"+result.LoginUser);
          
            setIsloged(true);

            setLogError("");
            setEmail("");
            setPassword("");
            closeModal();
            
          }
        });
      }
      
    },
    onError(error) {
      console.log(error);
      setLogError(error.message);
    },
    variables: { email: email, password: password },
  });
  

//  const handleSubmit = (e) => {
//    e.preventDefault();
//    dispatch(signIn(creds.email, creds.password));
//    setCreds({ email: "", password: "" });
//  };
  

  function closeModal() {
    document.querySelector(".ReactModal__Overlay").classList.add("removed");
    document
      .querySelector(".login-popup.ReactModal__Content")
      .classList.remove("ReactModal__Content--after-open");
    document
      .querySelector(".login-popup-overlay.ReactModal__Overlay")
      .classList.remove("ReactModal__Overlay--after-open");
    setTimeout(() => {
      setOpen(false);
    }, 330);
  }

  const makeRegister = async (e) => {
    e.preventDefault();
    console.log("pa" + confPassword);
    console.log("pa" + password);

    if (email == "") {
      setRegError("Plaase Enter email Address");
    }
    if (firstName == "") {
      setRegError("Plaase Enter Firstname");
      return;
    }
    if (lastName == "") {
      setRegError("Plaase Enter Lastname");
      return;
    }
    if (password == "") {
      setRegError("Plaase Enter Password");
      return;
    }

    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      if (password != confPassword) {
        setRegError("Password does not match");
        return;
      } else {
        registerUser();
      }
    } else {
      setRegError("You have entered an invalid email address!");
    }
  };

  const logout = async (e) => {
    e.preventDefault();
    CommanFunctions.logout();
    setIsloged(false)
  };

  const makelogin =  (e) => {
    e.preventDefault();

    console.log('8888999')
    if (email != "" && password != "") {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        //dispatch({
        //  type: SIGN_IN,
        //  payload: {
        //  token: null,
        //  user1: null,
        //  _id: null,

        //}});
        
        LoginCheck();
        console.log('8888')
        //dispatch(signIn(email, password));
        //setCreds({ email: "", password: "" });
        //LoginCheck();
      } else {
        setLogError("You have entered an invalid email address!");
      }
    } else {
      setLogError("plaase Enter Username and Password");
    }
  };

  function openModal(e, loginIndex = 0) {
    e.preventDefault();
    index = loginIndex;
    setOpen(true);
  }

  return (
    <>
      {isloged ? (
        <a className="login-link d-lg-show" href="#" onClick={logout}>
          <i className="d-icon-user"></i>{userSession} Logout
        </a>
      ) : (
        <>
          <a className="login-link d-lg-show" href="#" onClick={openModal}>
            <i className="d-icon-user"></i>Sign in
          </a>
          <span className="delimiter">/</span>
          <a
            className="register-link ml-0"
            onClick={(e) => openModal(e, 1)}
            href="#"
          >
            Register
          </a>
        </>
      )}

      {open ? (
        <Modal
          isOpen={open}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Login Modal"
          className="login-popup"
          overlayClassName="login-popup-overlay"
          shouldReturnFocusAfterClose={false}
          id="login-modal"
        >
          <div className="form-box">
            <div className="tab tab-nav-simple tab-nav-boxed form-tab">
              <Tabs
                selectedTabClassName="active"
                selectedTabPanelClassName="active"
                defaultIndex={index}
              >
                <TabList className="nav nav-tabs nav-fill align-items-center border-no justify-content-center mb-5">
                  <Tab className="nav-item">
                    <span className="nav-link border-no lh-1 ls-normal">
                      Sign in-X
                    </span>
                  </Tab>
                  <li className="delimiter">or</li>
                  <Tab className="nav-item">
                    <span className="nav-link border-no lh-1 ls-normal">
                      Register
                    </span>
                  </Tab>
                </TabList>

                <div className="tab-content">
                  <TabPanel className="tab-pane">
                    <div>
                      <font color="red">{logErrors}</font>
                    </div>
                    <form onSubmit={(e) => makelogin(e)} action="#">
                      <div className="form-group mb-3">
                        <input
                          onChange={(e) => setEmail(e.target.value)}
                          type="text"
                          className="form-control"
                          id="singin-email"
                          name="singin-email"
                          placeholder="Username or Email Address *"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <input
                          onChange={(e) => setPassword(e.target.value)}
                          type="password"
                          className="form-control"
                          id="singin-password"
                          placeholder="Password *"
                          name="singin-password"
                          required
                        />
                      </div>
                      <div className="form-footer">
                        <div className="form-checkbox">
                          <input
                            type="checkbox"
                            className="custom-checkbox"
                            id="signin-remember"
                            name="signin-remember"
                          />
                          <label
                            className="form-control-label"
                            htmlFor="signin-remember"
                          >
                            Remember me
                          </label>
                        </div>
                        <ALink href="#" className="lost-link">
                          Lost your password?
                        </ALink>
                      </div>
                      <button
                        className="btn btn-dark btn-block btn-rounded"
                        type="button" onClick={(e) => makelogin(e)} 
                      >
                        Login
                      </button>
                    </form>
                    <div className="form-choice text-center">
                      <label className="ls-m">or Login With</label>
                      <div className="social-links">
                        <ALink
                          href="#"
                          className="social-link social-google fab fa-google border-no"
                        ></ALink>
                        <ALink
                          href="#"
                          className="social-link social-facebook fab fa-facebook-f border-no"
                        ></ALink>
                        <ALink
                          href="#"
                          className="social-link social-twitter fab fa-twitter border-no"
                        ></ALink>
                      </div>
                    </div>
                  </TabPanel>

                  <TabPanel className="tab-pane">
                    <div>
                      <font color="red">{regErrors}</font>
                    </div>
                    <form action="#">
                      <div className="form-group">
                        <label htmlFor="singin-email">
                          Your email address:
                        </label>
                        <input
                          onChange={(e) => setEmail(e.target.value)}
                          type="email"
                          className="form-control"
                          id="register-email"
                          name="register-email"
                          placeholder="Your Email address *"
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="singin-password">First Name:</label>
                        <input
                          onChange={(e) => setFirstName(e.target.value)}
                          type="text"
                          className="form-control"
                          id="first-name"
                          name="first-name"
                          placeholder="First Name"
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="singin-password">Last Name:</label>
                        <input
                          onChange={(e) => setLastName(e.target.value)}
                          type="text"
                          className="form-control"
                          id="lastname"
                          name="lastname"
                          placeholder="Last Name"
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="singin-password">Password:</label>
                        <input
                          onChange={(e) => setPassword(e.target.value)}
                          type="password"
                          className="form-control"
                          id="register-password"
                          name="register-password"
                          placeholder="Password *"
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="singin-password">
                          Confirm Password:
                        </label>
                        <input
                          onChange={(e) => setConfPassword(e.target.value)}
                          type="password"
                          className="form-control"
                          id="register-conf-password"
                          name="register-conf-password"
                          placeholder="Confirm Password *"
                          required
                        />
                      </div>

                      <div className="form-footer">
                        <div className="form-checkbox">
                          <input
                            type="checkbox"
                            className="custom-checkbox"
                            id="register-agree"
                            name="register-agree"
                            required
                          />
                          <label
                            className="form-control-label"
                            htmlFor="register-agree"
                          >
                            I agree to the privacy policy
                          </label>
                        </div>
                      </div>
                      <button
                        onClick={makeRegister}
                        className="btn btn-dark btn-block btn-rounded"
                        type="button"
                      >
                        Register
                      </button>
                    </form>

                    <div className="form-choice text-center">
                      <label className="ls-m">or Register With </label>
                      <div className="social-links">
                        <ALink
                          href="#"
                          className="social-link social-google fab fa-google border-no"
                        ></ALink>
                        <ALink
                          href="#"
                          className="social-link social-facebook fab fa-facebook-f border-no"
                        ></ALink>
                        <ALink
                          href="#"
                          className="social-link social-twitter fab fa-twitter border-no"
                        ></ALink>
                      </div>
                    </div>
                  </TabPanel>
                  <div></div>
                </div>
              </Tabs>
            </div>
          </div>

          <button
            title="Close (Esc)"
            type="button"
            className="mfp-close"
            onClick={closeModal}
          >
            <span>×</span>
          </button>
        </Modal>
      ) : (
        ""
      )}
    </>
  );
}


const mapStateToProps = (state) => {
  console.log('_____=>')
  console.log(state)
  return {
    user1: state.auth.user1
  }
}


const mapDispatchToProps = (dispatch) => {
  return{
    //setUser: (user) => dispatch({type:"SET_USER", data:user }),
  }
}





export default connect( mapStateToProps,mapDispatchToProps )(LoginModal)
