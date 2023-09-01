import React, { useCallback, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Box, Grid, Typography, useTheme } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import M from '../../messages';
import stylesCallback from "./styles";
import { routes } from '../../configs';
import RegistrationForm from './components/RegistrationForm';
import { FormProvider, useForm } from 'react-hook-form';
import { useCreateUserMutation } from '../../hooks/service/mutation/useCreateUserMutation';
import SystemMessage from '../../components/systemMessage';
import { useSnackbar } from 'notistack';
import { getMessage } from '../../helpers/helper';

const DEFAULT_VALUES_REGISTRATION = {
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  password: ''
}

const RegistrationPage = () => {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();

  const styles = stylesCallback(theme);
  const navigate = useNavigate();
  // const location = useLocation();

  const methods = useForm({
    defaultValues: DEFAULT_VALUES_REGISTRATION,
    mode: 'onChange'
  });

  const { handleSubmit, reset } = methods;

  const { mutateAsync: mutateRegister, isLoading } = useCreateUserMutation();

  const handleCloseModal = () => {
    reset(DEFAULT_VALUES_REGISTRATION, { keepErrors: false, keepDirty: false });
  }

  const handleSubmitRegistration = useCallback(() => handleSubmit(async (data) => {
    try {
      console.log('handleSubmitRegistration = ', data)
      const res = await mutateRegister({
        ...data
      });
      SystemMessage(enqueueSnackbar, getMessage('', 'success'), { variant: 'success' });
      navigate(routes.login.path)
    } catch (error: any) {
      SystemMessage(enqueueSnackbar, getMessage(error?.response?.data || error.message), { variant: 'error' });
    }
    return true
  }), []);

  return (
    <Box sx={styles.container} p={4}>
      <FormProvider {...methods}>
        <form noValidate autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography color="primary" variant="h5"> {M.get('register.title')} </Typography>
                </Grid>
                <RegistrationForm handleSubmit={handleSubmitRegistration} />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Box component={Link} sx={styles.link} to={routes.login.path}> {"<"} {M.get('register.backToLogin')} </Box>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </Box>
  );
};

export default RegistrationPage;
