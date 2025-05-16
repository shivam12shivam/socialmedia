import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import store from "./redux/store.js";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "@material-tailwind/react";
import { CssBaseline } from "@mui/material";
import DrawerAppBar from "../src/scenes/Navbar.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ThemeProvider>
      <BrowserRouter>
        <CssBaseline />
        <div className="app-layout">
          <DrawerAppBar />
          <div className="app-content" style={{ marginTop: "66px" }}>
            <App />
          </div>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  </Provider>
);
