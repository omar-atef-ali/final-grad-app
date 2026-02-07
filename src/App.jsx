import { useEffect } from "react";
import "./App.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Login from "./Components/Login/Login";
import Layout from "./Components/Layout/Layout";
import { Toaster } from "react-hot-toast";
// import Protected from './Components/Protected/Protected'
import { userContext } from "./context/userContext";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import Register from "./Components/Register/Register";
import ChangePassword from "./Components/ChangePassword/ChangePassword";
import Home from "./Components/Home/Home";

import GoogleCallback from "./Components/GoogleCallback/GoogleCallback";

import { useContext } from "react";
import ProfileLayout from "./Components/ProfileLayout/ProfileLayout";
import ProfileInfo from "./Components/ProfileInfo/ProfileInfo";
import ProfileSecurity from "./Components/ProfileSecurity/ProfileSecurity";
import ProfileSubscription from "./Components/ProfileSubscription/ProfileSubscription";
import ProfileBilling from "./Components/ProfileBilling/ProfileBilling";
import CheckEmail from "./Components/CheckEmail/CheckEmail";
import ConfirmEmail from "./Components/ConfirmEmail/ConfirmEmail";

let routers = createBrowserRouter([
  { index: true, element: <Register /> },
  { path: "/check-email", element: <CheckEmail /> },
  { path: "/confirm-email", element: <ConfirmEmail /> },
  { path: "reset-password", element: <ResetPassword /> },

  { path: "google/callback", element: <GoogleCallback /> },

  { path: "login", element: <Login /> },
  {
    path: "register",
    element: <Navigate to="/" replace />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "home", element: <Home /> },

      { path: "change-password", element: <ChangePassword /> },

      {
        path: "profile",
        element: <ProfileLayout />,
        children: [
          { index: true, element: <ProfileInfo /> }, // /profile
          { path: "info", element: <ProfileInfo /> }, // /profile/info
          { path: "security", element: <ProfileSecurity /> }, // /profile/security
          { path: "subscription", element: <ProfileSubscription /> }, // /profile/subscription
          { path: "billing", element: <ProfileBilling /> }, // /profile/billing
        ],
      },
    ],
  },
]);

function App() {
  let { setUserToken } = useContext(userContext);
  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      setUserToken(localStorage.getItem("token"));
    }
  }, []);

  return (
    <>
      <RouterProvider router={routers}></RouterProvider>
      <Toaster />
    </>
  );
}

export default App;
