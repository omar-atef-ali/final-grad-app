import React, { useContext, useState } from "react";
import style from "./GoogleCallback.module.css";
import { useEffect } from "react";
import { data, useNavigate } from "react-router-dom";
import api from "../../api";
import { userContext } from "../../context/userContext";
import toast from "react-hot-toast";

export default function GoogleCallback() {
  const navigate = useNavigate();
  const { setUserToken } = useContext(userContext);

  const [pageLoading, setPageLaoding] = useState(false);

  useEffect(() => {
    const handleGoogleCallback = async () => {
      const code = new URLSearchParams(window.location.search).get("code");
      const from = new URLSearchParams(window.location.search).get("state");
      if (!code) return;

      console.log(code);

      try {
        setPageLaoding(true);
        const endpoint =
          from === "register" ? "/Auth/google/register" : "/Auth/google/login";
        const res = await api.post(endpoint, {
          code,
          redirectUri: "http://localhost:5173/google/callback",
        });

        const data = res.data;
        console.log(data);

        if (data.token) {
          localStorage.setItem("token", data.token);
          if (data.refreshToken) {
            localStorage.setItem("refreshToken", data.refreshToken);
          }
          console.log(data.token);

          setUserToken(data.token);
          navigate("/home");
          // setPageLaoding(false)
        }
      } catch (error) {
        // console.error("Google login error:", error.response?.data?.errors[1]);
        toast.error(
          error.response?.data?.errors[1] ||
            "Something went wrong.",
          {
            position: "top-center",
            duration: 4000,
            style: {
              background:
                "linear-gradient(to right, rgba(121, 5, 5, 0.9), rgba(171, 0, 0, 0.85))",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              padding: "16px 20px",
              color: "#ffffff",
              fontSize: "0.95rem",
              borderRadius: "5px",
              width: "300px",
              height: "60px",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",
            },
            iconTheme: {
              primary: "#FF4D4F",
              secondary: "#ffffff",
            },
          },
          { id: "google-login-error" },
        );
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    };

    handleGoogleCallback();
  }, [navigate]);

  return (
    <>
      {/* {pageLoading ? (
          <div className={style.overlay}>
            <div className={style.spinner}></div>
          </div>
        ) : ("")} */}

      <div className={style.callback}>
        <p>loading....</p>
      </div>
    </>
  );
}
//
