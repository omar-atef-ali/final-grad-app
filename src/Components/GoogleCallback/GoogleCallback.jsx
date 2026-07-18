import React, { useContext, useRef, useState } from "react";
import style from "./GoogleCallback.module.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import { userContext } from "../../context/userContext";
import toast from "react-hot-toast";
import imghero from "../../assets/images/heroimage.jpeg";
import logo from "../../assets/images/logo.png";

export default function GoogleCallback() {
  const navigate = useNavigate();
  const { setUserToken } = useContext(userContext);

  const [loading, setLoading] = useState(true);
  const isProcessed = useRef(false);

  useEffect(() => {
    if (isProcessed.current) return;

    const handleGoogleCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");
      const stateParam = urlParams.get("state") || "";
      const isRegister = stateParam.startsWith("register");
      const from = isRegister ? "register" : "login";

      const splitState = stateParam.split(':');
      const redirectPath = splitState.length > 1 ? splitState[1] : "/home";

      const error = urlParams.get("error");

      if (error || !code) {
        if (error) {
          toast.error("Google login was cancelled", {
            position: "top-center",
            duration: 4000,
            style: {
              background: "linear-gradient(to right, rgba(121, 5, 5, 0.9), rgba(171, 0, 0, 0.85))",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              padding: "16px 20px",
              color: "#ffffff",
              fontSize: "0.95rem",
              borderRadius: "5px",
              width: "300px",
              height: "60px",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",
            },
            iconTheme: { primary: "#FF4D4F", secondary: "#ffffff" },
          });
        }

        isProcessed.current = true;
        setTimeout(() => navigate(isRegister ? "/register" : "/login"), 1000);
        setLoading(false);
        return;
      }

      isProcessed.current = true;
      // console.log("Processing code:", code);

      try {
        const endpoint = isRegister ? "/Auth/google/register" : "/Auth/google/login";
        const res = await api.post(endpoint, {
          code,
          // redirectUri: "http://localhost:5173/google/callback",
          redirectUri: `https://final-grad-app.vercel.app/google/callback`,
        }, {
          withCredentials: true,
        });

        const responseData = res.data;
        if (responseData && responseData.token) {
          localStorage.setItem("token", responseData.token);
          setUserToken(responseData.token);
          navigate(redirectPath);
        } else {
          // If the request succeeds but there's no token
          if (isRegister) {
            toast.success("Registration successful! Please login.");
            navigate("/login");
          } else {
            toast.error("Authentication failed. No token received.");
            navigate("/login");
          }
        }
      } catch (error) {
        console.error("Google auth error:", error);
        const errorMessage = error.response?.data?.message ||
          error.response?.data?.errors?.[1] ||
          error.response?.data?.errors?.[0] ||
          "Something went wrong during authentication.";

        toast.error(errorMessage, {
          position: "top-center",
          duration: 4000,
          style: {
            background: "linear-gradient(to right, rgba(121, 5, 5, 0.9), rgba(171, 0, 0, 0.85))",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            padding: "16px 20px",
            color: "#ffffff",
            fontSize: "0.95rem",
            borderRadius: "5px",
            width: "300px",
            height: "60px",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",
          },
          iconTheme: { primary: "#FF4D4F", secondary: "#ffffff" },
        });
        setTimeout(() => navigate(isRegister ? "/register" : "/login"), 1000);
      } finally {
        setLoading(false);
      }
    };

    handleGoogleCallback();
  }, [navigate, setUserToken]);

  return (
    <>
      <div className={style.page_container}>
        <div className={style.hero_section}>
          <div className={style.hero_background}>
            <img src={imghero} alt="" />
          </div>

          {loading && (
            <div className={style.loader_overlay}>
              <div className={style.spinner}></div>
            </div>
          )}

          <div className={`${style.header_logo}`}>
            <img src={logo} alt="Namaa Logo" className={style.logo_icon} />
            <span className={`${style.logo_text}`}>Namaa</span>
          </div>
        </div>
      </div>
    </>
  );
}
//
