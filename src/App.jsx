import { useEffect } from "react";
import "./App.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import Login from "./Components/Login/Login";
import Layout from "./Components/Layout/Layout";
import { Toaster } from "react-hot-toast";
import Protected from './Components/Protected/Protected'
import { userContext } from "./context/userContext";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import Register from "./Components/Register/Register";
import ChangePassword from "./Components/ChangePassword/ChangePassword";
import Home from "./Components/Home/Home";
import Features from "./Components/Features/Features";
import GoogleCallback from "./Components/GoogleCallback/GoogleCallback";

import { useContext } from "react";
import ProfileLayout from "./Components/ProfileLayout/ProfileLayout";
import ProfileInfo from "./Components/ProfileInfo/ProfileInfo";
import ProfileSecurity from "./Components/ProfileSecurity/ProfileSecurity";
import ProfileSubscription from "./Components/ProfileSubscription/ProfileSubscription";
import ProfileBilling from "./Components/ProfileBilling/ProfileBilling";
import CheckEmail from "./Components/CheckEmail/CheckEmail";
import ConfirmEmail from "./Components/ConfirmEmail/ConfirmEmail";
import FeatureDetails from "./Components/FeatureDetails/FeatureDetails";
import Cart from "./Components/Cart/Cart";
import Demo from "./Components/Demo/Demo";
import Pricing from "./Components/Pricing/Pricing";

let routers = createBrowserRouter([
  { index: true, element: <Navigate to="/home" replace /> },
  { path: "/check-email", element: <CheckEmail /> },
  { path: "/confirm-email", element: <ConfirmEmail /> },
  { path: "/reset-password", element: <ResetPassword /> },
  { path: "/change-password", element: <ChangePassword /> },

  { path: "google/callback", element: <GoogleCallback /> },


  { path: "login", element: <Login /> },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "home", element: <Home /> },
      { path: "demo", element: <Demo /> },
      { path: "pricing", element: <Pricing /> },
      { path: "features", element: <Features /> },
      { path: "feature-details/:id", element: <FeatureDetails /> },
      { path: "/cart", element: <Cart /> },

      {
        path: "profile",
        element: <Protected><ProfileLayout /></Protected>,
        children: [
          { index: true, element: <Protected><ProfileInfo /></Protected> }, // /profile
          { path: "info", element:<Protected> <ProfileInfo /> </Protected>}, // /profile/info
          { path: "security", element: <Protected><ProfileSecurity /></Protected> }, // /profile/security
          { path: "subscription", element:<Protected> <ProfileSubscription /> </Protected>}, // /profile/subscription
          { path: "billing", element:<Protected> <ProfileBilling /> </Protected> }, // /profile/billing
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
