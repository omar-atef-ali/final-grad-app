import React from "react";
import style from "./GoogleCallback.module.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function GoogleCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleGoogleCallback = async () => {
      const code = new URLSearchParams(window.location.search).get("code");

      if (!code) return;

      console.log(code);
      
      // const res = await fetch("https://deebai.runasp.net/api/auth/google", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     code,
      //     redirectUri: "https://finalgradapp.netlify.app/auth/google/callback",
      //   }),
      // });

      // const data = await res.json();

      // if (data.token) {
      //   localStorage.setItem("jwt", data.token);
      //   navigate("/home");
      // }
    };

    handleGoogleCallback();
  }, [navigate]);

  return <p>Signing in with Google...</p>;
}
