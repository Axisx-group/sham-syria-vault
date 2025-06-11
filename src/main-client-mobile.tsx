
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppClientMobile from "./AppClientMobile.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppClientMobile />
  </StrictMode>,
);
