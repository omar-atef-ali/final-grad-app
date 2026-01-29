import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import UserContextProvider from "./context/userContext.jsx";

import "bootstrap/dist/css/bootstrap.min.css";

import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="161944913172-r0bverum3lr3mp4pe3k77mqbq0ehgatg.apps.googleusercontent.com">
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
);
