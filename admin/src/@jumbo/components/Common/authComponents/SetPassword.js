import { connect, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import React, { useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import IntlMessages from '../../../utils/IntlMessages';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import { Box } from '@material-ui/core';
import { AuhMethods } from '../../../../services/auth';
//import * as mutations from '../../../../redux/store/mutations';
import ContentLoader from '../../ContentLoader';
import { alpha, makeStyles } from '@material-ui/core/styles';
import CmtImage from '../../../../@coremat/CmtImage';
import { fetchError, fetchStart, fetchSuccess } from '../../../../redux/actions';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { useQuery, gql, useMutation } from "@apollo/client";
import jwt from "jsonwebtoken";
//import { useNavigate } from "react-router-dom";

import { CurrentAuthMethod } from '../../../constants/AppConstants';
import { NavLink } from 'react-router-dom';
import AuthWrapper from './AuthWrapper';
import usePrevious from './usePrevious';
import { setAuthUser } from '../../../../redux/actions/Auth';
import { setForgetPassMailSent } from '../../../../redux/actions/Auth';




const SET_PASSWORD = gql`
  mutation ResetAdminUser($username : String, $password : String, $newpassword : String) {
    ResetAdminUser(username: $username, password: $password, newpassword: $newpassword) {
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
const SetPassword = ({ method = CurrentAuthMethod, variant = 'default', wrapperVariant = 'default' }) => {
  //const [email, setEmail] = useState('demo@example.com');
  const { send_forget_password_email } = useSelector(({ auth }) => auth);
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [newPassword, setnewPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles({ variant });
  //const navigate = useNavigate();

  useEffect(() => {
    let timeOutStopper = null;
    if (send_forget_password_email) {
      setOpen(true);

      timeOutStopper = setTimeout(() => {
        dispatch(setForgetPassMailSent(false));
        history.push('/');
      }, 1500);
    }

    return () => {
      if (timeOutStopper) clearTimeout(timeOutStopper);
    };
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [send_forget_password_email]);



  const [resetAdminPassword, { user_loding }] = useMutation(SET_PASSWORD, {
    onCompleted(result) {
      if (result.ResetAdminUser.username) {
          dispatch(setAuthUser(null))
          dispatch(fetchSuccess("Password Change Successfull"))
          dispatch(setForgetPassMailSent(true));        
      }
    },
    onError(error) {
      dispatch(fetchError(error.message));
    },
    variables: { 
      username: username,
      password: password,
      newpassword: newPassword,
    },
  });

  if (user_loding) {
    dispatch(fetchError("Please Wait...."));
  }


  const onSubmit = () => {
    if(username === undefined || username === null || username.trim() === ''){
        dispatch(fetchError("Please enter User Name"));
        return;
    }
    if(password.trim() === ''){
        dispatch(fetchError("Please enter current password"));
        return;
    }
    if(newPassword.trim() === ''){
        dispatch(fetchError("Please enter new password"));
        return;
    }
    if(newPassword !== confirmPassword){
        dispatch(fetchError("Please makesure new password and confirm match"));
        return;
    }
    resetAdminPassword(username, password, newPassword);
  
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
              onChange={event => setpassword(event.target.value)}
              defaultValue={password}
              margin="normal"
              variant="outlined"
              className={classes.textFieldRoot}
            />
          </Box>
          <div>
            <Box mb={2}>
              <TextField
                type="password"
                label={<IntlMessages id="appModule.new_password" />}
                fullWidth
                onChange={event => setnewPassword(event.target.value)}
                defaultValue={newPassword}
                margin="normal"
                variant="outlined"
                className={classes.textFieldRoot}
              />
            </Box>
            <Box mb={2}>
              <TextField
                type="password"
                label={<IntlMessages id="appModule.confirm_password" />}
                fullWidth
                onChange={event => setconfirmPassword(event.target.value)}
                defaultValue={confirmPassword}
                margin="normal"
                variant="outlined"
                className={classes.textFieldRoot}
              />
            </Box>

          </div>


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

export default SetPassword;
