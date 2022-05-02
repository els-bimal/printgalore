import React,  { useState, connect, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import IntlMessages from '../../../utils/IntlMessages';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';
import { Box } from '@material-ui/core';
import jwt from "jsonwebtoken";


//import * as mutations from '../../../../redux/store/mutations';
import ContentLoader from '../../ContentLoader';
import { alpha, makeStyles } from '@material-ui/core/styles';
import CmtImage from '../../../../@coremat/CmtImage';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { CurrentAuthMethod } from '../../../constants/AppConstants';
import AuthWrapper from './AuthWrapper';

import { AuhMethods } from '../../../../services/auth';

import { setAuthUser } from '../../../../redux/actions/Auth'
import { fetchError, fetchStart, fetchSuccess } from '../../../../redux/actions';

import { useQuery, gql, useMutation } from "@apollo/client";


const SIGN_IN = gql`
  mutation LoginAdminUser($username : String, $password : String) {
    LoginAdminUser(username: $username, password: $password) {
      username
      firstName
      lastName
      contactNumber
      emailAddress
      roleId
      password
      resetPassword
      active
      homeStore
      dateCreated
      token
     }
  }
`;


const useStyles = makeStyles(theme => ({
  authThumb: {
    backgroundColor: alpha(theme.palette.primary.main, 0.12),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '50%',
      order: 2,
    },
  },
  authContent: {
    padding: 30,
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: props => (props.variant === 'default' ? '50%' : '100%'),
      order: 1,
    },
    [theme.breakpoints.up('xl')]: {
      padding: 50,
    },
  },
  titleRoot: {
    marginBottom: 14,
    color: theme.palette.text.primary,
  },
  textFieldRoot: {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: alpha(theme.palette.common.dark, 0.12),
    },
  },
  formcontrolLabelRoot: {
    '& .MuiFormControlLabel-label': {
      [theme.breakpoints.down('xs')]: {
        fontSize: 12,
      },
    },
  },
}));
//variant = 'default', 'standard'
const SignIn = ({ method = CurrentAuthMethod, variant = 'default', wrapperVariant = 'default' }) => {
  //const [email, setEmail] = useState('demo@example.com');
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const classes = useStyles({ variant });

  const [AdminSignIn, { user_loding }] = useMutation(SIGN_IN, {
    onCompleted(result) {
      if (result.LoginAdminUser.username) {
        //setLogError("User Login Success");
        var token = result.LoginAdminUser.token;
        jwt.verify(token, "jhsjkfhwkldgladgunlfvdghjygdgjdgjawgdagoasdn", (err, verifiedJwt) => {
          if (err) {
            console.log(err.message);
          } else {

            localStorage.setItem('isResetOk', JSON.stringify({isOperationSuccess : !result.LoginAdminUser.resetPassword}));
            dispatch(setAuthUser(result.LoginAdminUser))
            console.log('------3------')
            dispatch(fetchSuccess("Login Successfull"))
         }
        });
      } 
    },
    onError(error) {
      dispatch(fetchError(error.message))
    },
    variables: { 
      username: username,
      password: password,
    },
  });

  if (user_loding) {
    dispatch(fetchError("Please Wait...."))
  }



  const onSubmit = () => {
    if (username != "" && password != ""){
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(username)){
        dispatch(fetchStart());
        AdminSignIn();
      } 
      else{
        dispatch(fetchError("You have entered an invalid username, it should be an email address!"));
      }
    } 
    else{
      dispatch(fetchError("plaase Enter Username and Password"));
    }

  };

  return (
    <AuthWrapper variant={wrapperVariant}>
      {variant === 'default' ? (
        <Box className={classes.authThumb}>
          <CmtImage src={'/images/auth/login-img.png'} />
        </Box>
      ) : null}
      <Box className={classes.authContent}>
        <Box mb={7}>
          <CmtImage src={'/images/logo.png'} />
        </Box>
        <Typography component="div" variant="h1" className={classes.titleRoot}>
          Login
        </Typography>
        <form>
          <Box mb={2}>
            <TextField
              label={<IntlMessages id="appModule.name" />}
              fullWidth
              onChange={event => setusername(event.target.value)}
              defaultValue={username}
              margin="normal"
              variant="outlined"
              className={classes.textFieldRoot}
            />
          </Box>
          <Box mb={2}>
            <TextField
              type="password"
              label={<IntlMessages id="appModule.password" />}
              fullWidth
              onChange={event => setPassword(event.target.value)}
              defaultValue={password}
              margin="normal"
              variant="outlined"
              className={classes.textFieldRoot}
            />
          </Box>
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={5}>
            <FormControlLabel
              className={classes.formcontrolLabelRoot}
              control={<Checkbox name="checkedA" />}
              label="Remember me"
            />
            <Box component="p" fontSize={{ xs: 12, sm: 16 }}>
              <NavLink to="/forgot-password">
                <IntlMessages id="appModule.forgotPassword" />
              </NavLink>
            </Box>
          </Box>

          <Box display="flex" alignItems="center" justifyContent="space-between" mb={5}>
            <Button onClick={onSubmit} variant="contained" color="primary">
              <IntlMessages id="appModule.signIn" />
            </Button>

          </Box>
        </form>

        {dispatch(AuhMethods[method].getSocialMediaIcons())}

        <ContentLoader />
      </Box>
    </AuthWrapper>
  );
};

export default SignIn;
