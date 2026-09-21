import "./App.css";
import Weather from "./Weather";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "dark", // <--- هذا السطر يمنع MUI من فرض خلفية فاتحة تغطي على التدرج
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: "ui-serif",
          fontWeight: 700,
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