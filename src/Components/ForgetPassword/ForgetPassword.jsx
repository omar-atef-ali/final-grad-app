import React, { useState } from "react";
import style from "./ForgetPassword.module.css";
import { Link } from "react-router-dom";
import sideImage from "../../assets/images/ChatGPT Image Oct 6, 2025, 05_20_40 PM.png";
import { useFormik } from "formik";
import * as yup from "yup";
import api from "../../api";

export default function ForgetPassword() {

  

  async function submit(values) {
      try {
        const response = await api.post("/Auth/forget-password", values);
        console.log(response);
        
      } catch (error) {
        console.error("forgetPassword Error:", error);
        
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
    initialValues : {
      email : ""
    } ,
    validationSchema : validationforget ,
    onSubmit : submit
  })

  return (
    <>
      <div className="container-fluid p-0 vh-100 ">
        <div className="row g-0 h-100">
          <div className="col-md-6 d-none d-md-block h-100 ">
            <img
              src={sideImage}
              alt="side illustration"
              className="w-100 h-100 object-fit-cover"
            />
          </div>

          <div className="col-md-6 d-flex align-items-center justify-content-center bg-body h-100">
            <div className="w-75">
              <div className="mb-4">
                <Link
                  to="/login"
                  className="d-inline-flex align-items-center  text-decoration-none mb-4 small"
                  style={{ color: "var(--accent)" }}
                >
                  <i className="fa-solid fa-arrow-left mx-1" style={{fontSize : "10px" , marginTop: "3px"}}></i> Back to Login
                </Link>
                <h2
                  className="h2 fw-bold mb-2"
                  style={{ color: "var(--secondary)" }}
                >
                  Reset Your Password
                </h2>
                <p className="text-secondary">
                  Enter your email address and we'll send you a link to reset
                  your password.
                </p>
              </div>
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-3">
                  <label
                    className="form-label fw-medium"
                    style={{ color: "var(--secondary)" }}
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="you@Example.com"
                    className="form-control"
                  />
                </div>

                <button type="submit" className="btn-deeb w-100">
                  Send Email
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
