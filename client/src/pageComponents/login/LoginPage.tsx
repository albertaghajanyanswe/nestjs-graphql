import React from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

import { Button, Box, Grid, Typography } from '@mui/material';

import M from '../../messages';
import { getMessage } from "../../helpers/helper";
import stylesCallback from "./styles";
import { routes } from '../../configs';
import { useTheme } from '@mui/material';

const LoginPage = () => {
  const theme = useTheme();

  const styles = stylesCallback(theme);
  const navigate = useNavigate();
  const location = useLocation();

  const asGuest = location.pathname.includes('/guest');
  const initialValues = asGuest ? {nickName: '', password: ''} : { email: '', password: '' };


  return (
    <Box sx={styles.container} p={4}>
      <form>
      <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography color="primary" variant="h5">{M.get('login.title')}</Typography>
              </Grid>
              Form
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Button color="primary" variant="contained" fullWidth type="submit" sx={styles.submit}>
              {M.get('login.signIn')}
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Box sx={styles.description}>
              <Box component={Link} sx={styles.link} to={routes.loginGuest.path}> {M.get('login.signInGuest')}</Box>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box sx={styles.description}>
              {M.get('login.createAccount')}
              <Box component={Link} sx={styles.link} to={routes.registration.path}> {M.get('login.register')}</Box>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box sx={styles.description}>
              <Box component={Link} sx={styles.link} to={routes.registrationGuest.path}> {M.get('login.registerGuest')} </Box>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default LoginPage;