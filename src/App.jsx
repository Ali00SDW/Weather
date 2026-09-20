import "./App.css";
import Weather from "./Weather";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: "ui-serif",
          color: "black",
          textShadow: ` 0.5px 0.5px 20px white`,
          fontWeight: "bold"
        },
      },
    },
  },
});
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Weather />
    </ThemeProvider>
  );
}

export default App;
