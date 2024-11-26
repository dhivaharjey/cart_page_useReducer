import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import Context from "./Context/Context.jsx";
createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <Context>
    <App />
  </Context>
  // </StrictMode>,
);
