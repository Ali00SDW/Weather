import "./App.css";
import Weather from "./Weather";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: "ui-serif",
          fontWeight: "bold",
        },
      },
    },
  },
});
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Weather/>
    </ThemeProvider>
  );
}

export default App;
