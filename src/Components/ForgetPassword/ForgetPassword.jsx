import React, { useState } from "react";
import style from "./ForgetPassword.module.css";
import { Link } from "react-router-dom";
import sideImage from "../../assets/images/ChatGPT Image Oct 6, 2025, 05_20_40 PM.png";
import { useFormik } from "formik";
import * as yup from "yup";
import api from "../../api";
import Swal from "sweetalert2";

export default function ForgetPassword() {
  async function submit(values) {
    try {
      const response = await api.post("/Auth/forget-password", values);
      // console.log(response);
      Swal.fire({
        icon: "success",
        title: "Email Sent!",
        text: "We've sent you a link to reset your password. Please check your inbox.",
        background: "#0d1117", 
        color: "#ffffff", 
        confirmButtonColor: "rgba(0, 71, 171, 0.2)",
        customClass: {
          popup: "custom-popup",
          title: "custom-title",
          confirmButton: "custom-btn",
          htmlContainer: "custom-text", 
        },
      });
    } catch (error) {
      // console.error("forgetPassword Error:", error);
      Swal.fire({
        icon: "error",
        title: "Email Not Confirmed!",
        text: "You need to register or confirm your email address before performing any actions on your account.",
        background: "#0d1117", 
        color: "#ffffff", 
        confirmButtonColor: "rgba(0, 71, 171, 0.2)", 
        customClass: {
          popup: "custom-popup",
          title: "custom-title",
          confirmButton: "custom-btn",
          htmlContainer: "custom-text", 
        },
      });
    }
  }

  let validationforget = yup.object({
    email: yup
      .string()
      .required("Email is required")
      .email("Please enter a valid email address")
      .min(5, "Email must be at least 5 characters long"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationforget,
    onSubmit: submit,
  });

  return (
    <>
      <div className={`container-fluid p-0  ${style.loginpage} `}>
        <div
          className="px-4 shadow-lg my-5 py-5 d-flex flex-column  "
          style={{
            width: "100%",
            maxWidth: "450px",
            minHeight: "400px",
            maxHeight: "470px",
            overflow: "hidden",
            background: `
                          radial-gradient(
                            circle at 2% 50%,       
                            rgba(5, 53, 121, 0.6) 0%, 
                            rgba(0, 71, 171, 0.2) 20%, 
                            rgba(0, 0, 0, 0.9) 70%,    
                            rgba(13, 13, 13, 1) 100%        
                          )
                        `,
            backdropFilter: "blur(15px)",
            borderRadius: "28px",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            boxShadow: "0 0 50px rgba(0, 0, 0, 0.7)",
          }}
        >
          <div className="mb-4">
            <Link
              to="/login"
              className="d-inline-flex align-items-center  text-decoration-none mb-4 small"
              style={{ color: "var(--accent)" }}
            >
              <i
                className="fa-solid fa-arrow-left mb-1 mx-1"
                style={{ fontSize: "10px", marginTop: "3px" }}
              ></i>{" "}
              Back to Login
            </Link>
          </div>
          <div className="text-center mb-4">
            <h2
              className="fw-bold"
              style={{
                color: "white",
                fontSize: "2rem",
                background: "linear-gradient(to right, white, #bcbcbcff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Forgot Your Password
            </h2>
            <p className="text-white-50" style={{ fontSize: ".7rem" }}>
              Enter your email address and we'll send you a link to reset your
              password.
            </p>
          </div>

          <form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
              <label
                className="form-label fw-medium"
                style={{ color: "white", fontSize: "0.9rem" }}
              >
                Email address
              </label>
              <input
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="email"
                placeholder="you@Example.com"
                className={` ${style.customBorder} ${style.custominput} form-control bg-transparent text-light py-1`}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-danger small mt-1">
                  {formik.errors.email}
                </div>
              ) : null}
            </div>

            <button type="submit" className="btn-deeb w-100 mt-3">
              Send Email
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
