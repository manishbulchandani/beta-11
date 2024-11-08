import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import theme from "./theme.ts";
import { Provider } from "react-redux";
import store from "./features/store.ts";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <Router>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Router>
  </Provider>
);
