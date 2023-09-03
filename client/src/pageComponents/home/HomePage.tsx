import React from 'react';
import { isLoggedIn, logOut } from '../../services/lsService';
import CustomButton from '../../components/button';
import M from '../../messages';
import { Box, Grid, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../configs';
import { useGetUsersQuery, UsersData } from '../../hooks/service/query/useGetUsersQuery';
import PageTitle from '../../components/pageTitle';
import { stylesWithTheme } from './styles';
import CardItem from './card/CardItem';

function HomePage() {
  const currentUser = isLoggedIn();
  const navigate = useNavigate();
  const theme = useTheme();
  const styles = stylesWithTheme(theme);

  const logout = () => {
    logOut();
    navigate(routes.login.path);
  }

  const { data, isLoading } = useGetUsersQuery({});
  const users = data?.list ?? [];
  console.log('users = ', typeof users)
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2, alignItems: 'center' }}>
        <Box> Home Page </Box>
        <CustomButton label={M.get('actions.signOut')} size='small' variant='outlined' color='primary' btnType='secondary' onClick={logout} />
      </Box>
      {currentUser.login.user.fullName}

      <Box sx={styles.content}>
        <PageTitle>{M.get('pages.users')}</PageTitle>

        {isLoading ? <>Loading...</> : (
          <Grid mt={2} spacing={3} container sx={styles.itemsContent}>
            {users.map((item: UsersData) => (
              <Grid key={item.id} item xs={12} sm={6} md={4} lg={3}>
                <CardItem item={item} />
              </Grid>
            ))}
          </Grid>)}
      </Box>
    </>
  )
}

export default HomePage;