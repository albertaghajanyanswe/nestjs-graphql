import { Theme } from '@mui/system';

const stylesWithTheme = (theme: Theme | undefined) => ({
  root: {
    maxWidth: '100%',
  },
  media: {
    width: '100%',
    height: 250
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column'
  },
});

export { stylesWithTheme };