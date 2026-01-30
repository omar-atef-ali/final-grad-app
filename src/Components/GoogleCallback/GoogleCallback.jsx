import React, { useContext } from "react";
import style from "./GoogleCallback.module.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import { userContext } from "../../context/userContext";

export default function GoogleCallback() {
  const navigate = useNavigate();
  const { setUserToken } = useContext(userContext);

  useEffect(() => {
    const handleGoogleCallback = async () => {
      const code = new URLSearchParams(window.location.search).get("code");

      if (!code) return;

      console.log(code);

      try {
        const res = await api.post("/Auth/google", {
          code,
          redirectUri: "https://finalgradapp.netlify.app/google/callback",
        });

        const data = res.data;
        console.log(data);
        
        // if (data.token) {
        //   localStorage.setItem("token", data.token);
        //   if (data.refreshToken) {
        //     localStorage.setItem("refreshToken", data.refreshToken);
        //   }
        //   console.log(data.token);
          
        //   setUserToken(data.token);
        //   navigate("/home");
        // }
      } catch (error) {
        console.error("Google login error:", error);
      }
    };

    handleGoogleCallback();
  }, [navigate]);

  return <p>Signing in with Google...</p>;
}
