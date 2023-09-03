import { Theme } from "@mui/system";

// todo: add and using all variables from theme
const stylesWithTheme = (theme: Theme) => ({
  pageTitle: {
    display: 'inline-block',
    width: '100%',
    fontFamily: 'auto',
    fontSize: 32,
    fontWeight: 700,
    textTransform: 'uppercase',
    textAlign: 'center',
    margin: '36px 0',
    color: theme.palette.primary.titleColor,
  }
});

export { stylesWithTheme };