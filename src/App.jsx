import "./App.css";
import Weather from "./Weather";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      // إسناد التدرج اللوني كخلفية رسمية لـ MUI
      default: `radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.25) 0%, transparent 60%),
                radial-gradient(circle at 80% 80%, rgba(192, 192, 192, 0.15) 0%, transparent 50%),
                radial-gradient(circle at 50% 50%, #2a2d34 0%, #121316 100%)`,
    },
  },
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
      {/* CssBaseline يقوم بإعادة ضبط أنماط المتصفح الافتراضية بشكل ممتاز */}
      <CssBaseline /> 
      <Weather />
    </ThemeProvider>
  );
}

export default App;