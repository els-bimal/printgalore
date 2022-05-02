import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { Box } from '@material-ui/core';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Collapse, IconButton, Link } from '@material-ui/core';
import { alpha } from '@material-ui/core/styles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import { Alert } from '@material-ui/lab';
import CloseIcon from '@material-ui/icons/Close';

import CmtImage from '../../../../@coremat/CmtImage';

import IntlMessages from '../../../utils/IntlMessages';
import { AuhMethods } from '../../../../services/auth';
import ContentLoader from '../../ContentLoader';
import { CurrentAuthMethod } from '../../../constants/AppConstants';
import AuthWrapper from './AuthWrapper';
import { setForgetPassMailSent } from '../../../../redux/actions/Auth';

import { fetchError, fetchStart, fetchSuccess } from '../../../../redux/actions';
import { useQuery, gql, useMutation } from "@apollo/client";


const FOGET_PASSWORD = gql`
  mutation FogotAdminPassword($username : String) {
    FogotAdminPassword(username: $username) {
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
    [theme.breakpoints.up('md')]: {
      width: '50%',
      order: 2,
    },
  },
  authContent: {
    padding: 30,
    [theme.breakpoints.up('md')]: {
      order: 1,
      width: props => (props.variant === 'default' ? '50%' : '100%'),
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
  alertRoot: {
    marginBottom: 10,
  },
}));

//variant = 'default', 'standard', 'bgColor'
const ForgotPassword = ({ method = CurrentAuthMethod, variant = 'default', wrapperVariant = 'default' }) => {
  const { send_forget_password_email } = useSelector(({ auth }) => auth);
  const [open, setOpen] = React.useState(false);
  const [username, setusername] = useState('');
  const dispatch = useDispatch();
  const classes = useStyles({ variant });
  const history = useHistory();

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

  const [fogetAdminPassword, { user_loding }] = useMutation(FOGET_PASSWORD, {
    onCompleted(result) {
      if (result.FogotAdminPassword.username) {
          dispatch(fetchSuccess("Reset passoerd sent to user"))
          //dispatch(AuhMethods[method].onForgotPassword({ username : result.FogotAdminPassword.username }));
          dispatch(setForgetPassMailSent(true));
          //dispatch(fetchSuccess("Please check your email"));

      }
    },
    onError(error) {
      dispatch(fetchError(error.message));
    },
    variables: { 
      username: username,
    },
  });

  if (user_loding) {
    dispatch(fetchError("Please Wait...."));
  }



  const onSubmit = () => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(username)){
      dispatch(fetchStart());
      fogetAdminPassword();
    } 
    else{
      dispatch(fetchError("You have entered an invalid user name!"));
    }

  };

  return (
    <AuthWrapper variant={wrapperVariant}>
      {variant === 'default' ? (
        <div className={classes.authThumb}>
          <CmtImage src={'/images/auth/forgot-img.png'} />
        </div>
      ) : null}
      <div className={classes.authContent}>
        <div className={'mb-7'}>
          <CmtImage src={'/images/logo.png'} />
        </div>
        <Typography component="div" variant="h1" className={classes.titleRoot}>
          ForgotPassword
        </Typography>
        <Collapse in={open}>
          <Alert
            variant="outlined"
            severity="success"
            className={classes.alertRoot}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}>
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }>
            A mail has been sent on your email address with reset password link.
          </Alert>
        </Collapse>
        <form>
          <div className={'mb-5'}>
            <TextField
              label={<IntlMessages id="appModule.email" />}
              fullWidth
              onChange={event => setusername(event.target.value)}
              defaultValue={username}
              margin="normal"
              variant="outlined"
              className={classes.textFieldRoot}
            />
          </div>

          <Box
            display="flex"
            flexDirection={{ xs: 'column', sm: 'row' }}
            alignItems={{ sm: 'center' }}
            justifyContent={{ sm: 'space-between' }}
            mb={3}>
            <Box mb={{ xs: 2, sm: 0 }}>
              <Button onClick={onSubmit} variant="contained" color="primary">
                <IntlMessages id="appModule.resetPassword" />
              </Button>
            </Box>

            <Box component="p" fontSize={{ xs: 12, sm: 16 }}>
              <NavLink to="/">
                <IntlMessages id="appModule.Cancel" />
              </NavLink>
            </Box>
          </Box>


          <div className={'mb-5'}>
          </div>




          <div>
            <Typography>
            </Typography>
          </div>
        </form>
        <ContentLoader />
      </div>
    </AuthWrapper>
  );
};

export default ForgotPassword;
