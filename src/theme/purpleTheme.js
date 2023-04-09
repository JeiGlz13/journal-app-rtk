import { createTheme } from "@mui/material";
import { red, blue, orange } from "@mui/material/colors";

export const purpleTheme = createTheme({
  palette: {
    primary: {
      main: blue[700],
      light: blue[500],
      dark: blue[900],
    },
    secondary: {
      main: orange[400],
      light: orange[200],
      dark: orange[600],
    },
    error: {
      main: red.A400,
    },
  },
});
