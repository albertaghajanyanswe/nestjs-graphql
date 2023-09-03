import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Button,
  useTheme,
  Box,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { stylesWithTheme } from './styles';
import { UsersData } from '../../../hooks/service/query/useGetUsersQuery';

function CardItem<T extends UsersData>({ item }: { item: T }) {
  const theme = useTheme();
  const styles = stylesWithTheme(theme);


  return (
    <Card sx={styles.root}>
      {/* {item.image && (
        <CardMedia
          sx={styles.media}
          image={item.image}
          title={item.fullName}
        />
      )} */}
      <CardContent>
        <Box sx={styles.cardContent}>
          <Typography variant="h6"> {item.id}</Typography>
          <Typography variant="h6"> {item.fullName}</Typography>
          <Typography variant="h6" sx={{ fontSize: '10px'}}> {item.email}</Typography>
          <Typography variant="h6" sx={{ fontSize: '10px'}}> {item.role}</Typography>
        </Box>
      </CardContent>
      <CardActions disableSpacing sx={styles.cardActions}>
      </CardActions>
    </Card>
  );
};

export default CardItem;
