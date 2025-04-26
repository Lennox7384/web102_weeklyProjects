import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css"; // Correct path to src/styles/index.css
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);