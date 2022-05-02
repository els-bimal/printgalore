import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Box } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { setForgetPassMailSent } from '../../../../redux/actions/Auth';

import IntlMessages from '../../../utils/IntlMessages';
import Button from '@material-ui/core/Button';
import { AuhMethods } from '../../../../services/auth';
import ContentLoader from '../../ContentLoader';
import { alpha, makeStyles } from '@material-ui/core/styles';
import CmtImage from '../../../../@coremat/CmtImage';
import Typography from '@material-ui/core/Typography';
import { CurrentAuthMethod } from '../../../constants/AppConstants';
import AuthWrapper from './AuthWrapper';

import { fetchError, fetchStart, fetchSuccess } from '../../../../redux/actions';

import { useQuery, gql, useMutation } from "@apollo/client";
import { Email } from '@mui/icons-material';

const CREATE_ADMIN = gql`
  mutation createAdminUser($username : String, $firstName : String, $lastName : String, $emailAddress : String, $contactNumber : String) {
    createAdminUser(username: $username, firstName: $firstName, lastName: $lastName, emailAddress: $emailAddress, contactNumber: $contactNumber ) {
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
  textCapital: {
    textTransform: 'capitalize',
  },
  textAcc: {
    textAlign: 'center',
    '& a': {
      marginLeft: 4,
    },
  },
  alrTextRoot: {
    textAlign: 'center',
    [theme.breakpoints.up('sm')]: {
      textAlign: 'right',
    },
  },
}));

//variant = 'default', 'standard', 'bgColor'
const SignUp = ({ method = CurrentAuthMethod, variant = 'default', wrapperVariant = 'default' }) => {
  const { send_forget_password_email } = useSelector(({ auth }) => auth);
  const [username, setusername] = useState('');
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [email, setemail] = useState('');
  const [Phone, setPhone] = useState('');
  const [open, setOpen] = React.useState(false);

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


  const [CreateAdmin, { user_loding }] = useMutation(CREATE_ADMIN, {
    onCompleted(result) {
      if (result.createAdminUser.username) {
        dispatch(fetchSuccess("Admin User Successfully Created"))
        dispatch(setForgetPassMailSent(true));
        
      } 
    },
    onError(error) {
      dispatch(fetchError(error.message))
    },
    variables: { 
      username: username, 
      firstName: firstName, 
      lastName: lastName, 
      emailAddress: email, 
      contactNumber: Phone   
    },
  });

  if (user_loding) {
    dispatch(fetchError("Please Wait...."))
  }




  const onSubmit = () => {
    if(
      username.trim() === '' || 
      firstName.trim() === '' ||
      lastName.trim() === '' || 
      email.trim() === '' || 
      Phone.trim() === ''   

    ){
      dispatch(fetchError("Please enter all the details"));

    }
    else{
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(username)){
        CreateAdmin();
      }
      else{
        dispatch(fetchError("You have entered an invalid username, it should be an email address!"));
      }

    }

    //dispatch(AuhMethods[method].onRegister({ name, email, password }));
  };

  return (
    <AuthWrapper variant={wrapperVariant}>
      {variant === 'default' ? (
        <Box className={classes.authThumb}>
          <CmtImage src={'/images/auth/sign-up-img.png'} />
        </Box>
      ) : null}
      <Box className={classes.authContent}>
        <Box mb={7}>
          <CmtImage src={'/images/logo.png'} />
        </Box>
        <Typography component="div" variant="h1" className={classes.titleRoot}>
          Create an account
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
              label={<IntlMessages id="appModule.firstname" />}
              fullWidth
              onChange={event => setfirstName(event.target.value)}
              defaultValue={firstName}
              margin="normal"
              variant="outlined"
              className={classes.textFieldRoot}
            />
          </Box>
          <Box mb={2}>
            <TextField
              label={<IntlMessages id="appModule.lastname" />}
              fullWidth
              onChange={event => setlastName(event.target.value)}
              defaultValue={lastName}
              margin="normal"
              variant="outlined"
              className={classes.textFieldRoot}
            />
          </Box>
          <Box mb={2}>
            <TextField
              label={<IntlMessages id="appModule.email" />}
              fullWidth
              onChange={event => setemail(event.target.value)}
              defaultValue={email}
              margin="normal"
              variant="outlined"
              className={classes.textFieldRoot}
            />
          </Box>
          <Box mb={2}>
            <TextField
              label={<IntlMessages id="appModule.phone" />}
              fullWidth
              onChange={event => setPhone(event.target.value)}
              defaultValue={Phone}
              margin="normal"
              variant="outlined"
              className={classes.textFieldRoot}
            />
          </Box>
 
          <Box
            display="flex"
            flexDirection={{ xs: 'column', sm: 'row' }}
            alignItems={{ sm: 'center' }}
            justifyContent={{ sm: 'space-between' }}
            mb={3}>
            <Box mb={{ xs: 2, sm: 0 }}>
              <Button onClick={onSubmit} variant="contained" color="primary">
                <IntlMessages id="appModule.regsiter" />
              </Button>
            </Box>

            <Box component="p" fontSize={{ xs: 12, sm: 16 }}>
              <NavLink to="/">
                <IntlMessages id="appModule.Cancel" />
              </NavLink>
            </Box>
          </Box>
        </form>

        <ContentLoader />
      </Box>
    </AuthWrapper>
  );
};

export default SignUp;
