// import the render function
import { render } from "react-dom";

// the actual App component
import App from "./App";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("app")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
