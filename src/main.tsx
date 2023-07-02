import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ThemeContextProvider } from "./context/ThemeContext.tsx";
import "./index.scss";
import { TodoContextProvider } from "./context/TodoContext.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeContextProvider>
      <TodoContextProvider>
        <App />
      </TodoContextProvider>
    </ThemeContextProvider>
  </React.StrictMode>
);
