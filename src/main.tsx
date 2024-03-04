// import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "./shadcn/theme-provider.tsx";
import { Provider } from "react-redux";
import store from "./redux/store.ts";
import {Toaster} from 'react-hot-toast'
ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
    <Router>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Provider store={store}>
          <Toaster position="top-center"/>
          <App />
        </Provider>
      </ThemeProvider>
    </Router>
  // </React.StrictMode>
);
