import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Box, Grid, Typography, useTheme } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import M from '../../messages';
import stylesCallback from "./styles";
import { routes } from '../../configs';

const RegistrationPage = () => {
  const theme = useTheme();

  const styles = stylesCallback(theme);
  const navigate = useNavigate();
  const location = useLocation();

  const [switchGuest, setSwitchGuest] = useState(false);

  const asGuest = location?.pathname?.includes('/guest');
  const initialValues = asGuest ? {nickName: '', password: ''} : switchGuest ? { firstName: '', lastName: '', nickName: '', password: '' } : { firstName: '', lastName: '', email: '', password: '' };


  const handleSwitchGuest = () => {
    setSwitchGuest((prev) => !prev);
  }

  return (
    <Box sx={styles.container} p={4}>
      <form autoComplete="off">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography color="primary" variant="h5"> {M.get('register.title')} </Typography>
              </Grid>
              {!asGuest && <Grid item xs={12}>
                <FormControlLabel name="switchGuestAccount" checked={switchGuest} onClick={handleSwitchGuest} control={<Switch />} label={M.get('register.switchGuest')} />
              </Grid>}
              FORM
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Button color="primary" variant="contained" fullWidth type="submit" sx={styles.submit}>
              {M.get('register.submit')}
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Box sx={styles.description}>
              <Box component={Link} sx={styles.link} to={routes.login.path}> {"<"} {M.get('register.backToLogin')} </Box>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default RegistrationPage;
