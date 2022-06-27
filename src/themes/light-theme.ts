import { blue, blueGrey, grey } from "@mui/material/colors";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: blue[500],
      dark: blue[700],
      light: blue[300],
    },
    secondary: {
      main: blueGrey[500],
      dark: blueGrey[800],
      light: blueGrey[100],
    },
    background: {
      default: grey[100],
    },
  },
});

lightTheme = responsiveFontSizes(lightTheme);

export default lightTheme;
