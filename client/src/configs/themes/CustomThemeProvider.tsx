import React, { useState, useMemo } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { ThemeProvider as ThemeProviderLegacy } from "@mui/material";
import getTheme from './base';

const CustomThemeContext = React.createContext({
  currentTheme: 'light',
  // eslint-disable-next-line no-unused-vars
  setTheme: (name: string) => { },
});

function CustomThemeProvider(props: any) {
  const { children } = props;

  let currentTheme = 'light';
  // Prevents SSR issues
  if (typeof window !== "undefined") {
    currentTheme = window.localStorage.getItem('appTheme') || 'light';
  }
  const [themeName, _setThemeName] = useState(currentTheme);
  const theme = getTheme(themeName);

  const setThemeName = (name: string) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem('appTheme', name);
    }
    _setThemeName(name);
  };

  const contextValue = useMemo(
    () => ({
      currentTheme: themeName,
      setTheme: setThemeName,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <CustomThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>
        <ThemeProviderLegacy theme={theme}>
          {children}
        </ThemeProviderLegacy>
      </ThemeProvider>
    </CustomThemeContext.Provider>
  );
}

export default CustomThemeProvider;
