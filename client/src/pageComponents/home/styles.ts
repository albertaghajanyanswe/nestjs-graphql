import { Theme } from '@mui/system';

const stylesWithTheme = (theme: Theme) => ({
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 20
  },
  itemsContent: {
    display: 'flex',
    justifyContent: 'center',
  },
})

export { stylesWithTheme };