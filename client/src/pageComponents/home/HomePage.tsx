import React from 'react';
import { isLoggedIn, logOut } from '../../services/lsService';
import CustomButton from '../../components/button';
import M from '../../messages';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../configs';

function HomePage() {
  const currentUser = isLoggedIn();
  const navigate = useNavigate();

  console.log('currentUser = ', currentUser)
  const logout = () => {
    logOut();
    navigate(routes.login.path);
  }
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2, alignItems: 'center'}}>
        <Box> Home Page </Box>
        <CustomButton label={M.get('actions.signOut')} size='small' variant='outlined' color='primary' btnType='secondary' onClick={logout} />
      </Box>
      {currentUser.login.user.fullName}
    </>
  )
}

export default HomePage;