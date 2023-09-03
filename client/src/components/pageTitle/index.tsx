import React, {memo} from 'react';
import { useTheme } from '@mui/system';
import { Box } from '@mui/material';
import { stylesWithTheme } from './styles';

function PageTitle({ children, ...rest }: { children: React.ReactNode, rest?: any}) {
  const theme = useTheme();
  const styles = stylesWithTheme(theme);
  return (
    <Box sx={styles.pageTitle} {...rest}>
      {children}
    </Box>
  );
}

export default memo(PageTitle);
