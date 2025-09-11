// @mui
import { createTheme, ThemeProvider, useTheme } from '@mui/material';
// hooks
import useLocales from '../../hooks/useLocales';
// ----------------------------------------------------------------------
export default function ThemeLocalization({ children }) {
  const defaultTheme = useTheme();

  const { currentLang } = useLocales();

  const theme = createTheme(defaultTheme, currentLang.systemValue);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
