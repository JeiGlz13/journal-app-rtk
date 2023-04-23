import { createTheme } from "@mui/material";
import { red, green, deepOrange } from "@mui/material/colors";

export const purpleTheme = createTheme({
  palette: {
    primary: {
      main: green[400],
      light: green[200],
      dark: green[600],
    },
    secondary: {
      main: deepOrange[400],
      light: deepOrange[200],
      dark: deepOrange[600],
    },
    error: {
      main: red[500],
      light: red[300],
      dark: red[700],
    },
  },
});
