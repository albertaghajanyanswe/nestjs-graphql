import { createTheme, PaletteOptions, SimplePaletteColorOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
  // eslint-disable-next-line no-unused-vars
  interface SimplePaletteColorOptions {
    error?: string;
    warning?: string;
    success?: string;
    info?: string;
  }

  // eslint-disable-next-line no-unused-vars
  interface PaletteColor {
    error?: string;
    warning?: string;
    success?: string;
    info?: string;
  }
}

interface DefaultPaletteOptions extends PaletteOptions {
  primary?: SimplePaletteColorOptions;
  secondary?: SimplePaletteColorOptions;
}

const Default = (): DefaultPaletteOptions => {
  return {
    primary: {
      main: '#72A0C0',
      error: '#f44336',
      warning: '#E99800',
      success: '#21a900',
      info: '#096C7C',
    },
    secondary: {
      main: '#72A0C0',
      error: '#f44336',
      warning: '#E99800',
      success: '#21a900',
      info: '#096C7C',
    },
  };
};

const defaultColors = Default();
const palette: PaletteOptions = {
  mode: 'dark',
  ...defaultColors,
};

// Note: example how to customize default theme values
// Default theme
const theme = createTheme({
  palette,
  typography: {
    button: {
      textTransform: 'none',
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          border: '1px solid #32302F',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '16px',
          fontWeight: 600,
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontSize: 24,
          fontWeight: 700,
          color: '#646681',
        },
      },
    },
  },
});

export default theme;
