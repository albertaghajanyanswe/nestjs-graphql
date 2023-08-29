import React, { useCallback } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

import { Button, Box, Grid, Typography } from '@mui/material';

import M from '../../messages';
import { getMessage } from "../../helpers/helper";
import { stylesWithTheme } from "./styles";
import { routes } from '../../configs';
import { useTheme } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import SystemMessage from '../../components/systemMessage';
import { useSnackbar } from 'notistack';
import LoginForm from './LoginForm';
import { useLoginMutation } from '../../hooks/service/mutation/useLoginMutation';

const DEFAULT_VALUES_LOGIN = {
  email: '',
  password: ''
}

const LoginPage = () => {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();

  const styles = stylesWithTheme(theme);
  const navigate = useNavigate();
  const location = useLocation();

  const asGuest = location.pathname.includes('/guest');

  const methods = useForm({
    defaultValues: DEFAULT_VALUES_LOGIN,
    mode: 'onChange'
  });

  const { handleSubmit, reset } = methods;

  const { mutateAsync: mutateLogin, isLoading } = useLoginMutation();

  const handleCloseModal = () => {
    reset(DEFAULT_VALUES_LOGIN, { keepErrors: false, keepDirty: false });
  }

  const handleSubmitLogin = useCallback(() => handleSubmit(async (data) => {
    try {
      console.log('handleSubmitLogin = ', data)
      const res = await mutateLogin({
         ...data
      });
      console.log('res = ', res)
      SystemMessage(enqueueSnackbar, getMessage('', 'success'), { variant: 'success' });
    } catch (error: any) {
      SystemMessage(enqueueSnackbar, getMessage(error?.response?.data || error.message), { variant: 'error' });
    }
    return true
  }), []);

  return (
    <Box sx={styles.container} p={4}>
      <FormProvider {...methods}>
        <form noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography color="primary" variant="h5">{M.get('login.title')}</Typography>
            </Grid>
            <LoginForm handleSubmit={handleSubmitLogin} />
            <Grid item xs={12}>
              <Box component={Link} sx={styles.link} to={routes.loginGuest.path}> {M.get('login.signInGuest')}</Box>
            </Grid>
            <Grid item xs={12}>
              {M.get('login.createAccount')}
              <Box component={Link} sx={styles.link} to={routes.registration.path}> {M.get('login.register')}</Box>
            </Grid>
            <Grid item xs={12}>
              <Box component={Link} sx={styles.link} to={routes.registrationGuest.path}> {M.get('login.registerGuest')} </Box>
            </Grid>
          </Grid>
        </form>
      </FormProvider>

    </Box>
  );
};

export default LoginPage;