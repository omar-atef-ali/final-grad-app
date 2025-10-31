import React, { useContext, useState } from "react";
import style from "./Login.module.css";
import sideImage from "../../assets/images/ChatGPT Image Oct 6, 2025, 05_20_40 PM.png";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import api from "../../api";
import toast from "react-hot-toast";
import { userContext } from "../../context/userContext";
import * as yup from "yup";

export default function Login() {
  let navigate = useNavigate();

  let { setUserToken } = useContext(userContext);

  let [showPassword, setShowPassword] = useState(false);

  async function submit(values) {
    try {
      const { data } = await api.post("/Auth", values);
      localStorage.setItem("token", data.token);
      setUserToken(data.token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login Error:", error);
      toast.error(error.response?.data?.message || "Invalid email or password");
    }
  }

  let validationLogin = yup.object({
    email: yup
      .string()
      .required("Email is required")
      .email("Please enter a valid email address")
      .min(5, "Email must be at least 5 characters long"),

    password: yup
      .string()
      .required("Password is required")
      .min(4, "Password must be at least 4 characters long"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationLogin,
    onSubmit: submit,
  });

  return (
    <>
      <div className={`container-fluid p-0 vh-100 ${style.loginpage} `}>
        <div
          className="px-4 shadow-lg my-5 py-5 d-flex flex-column"
          style={{
            width: "100%", 
            maxWidth: "470px", 
            minHeight: "400px",
            maxHeight: "490px",
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
          <div className="text-center mb-4">
            <h2
              className="fw-bold"
              style={{ color: "white", fontSize: "2rem" , background: "linear-gradient(to right, white, #bcbcbcff)", 
                WebkitBackgroundClip: "text", 
                WebkitTextFillColor: "transparent",  }}
              
            >
              Welcome Back
            </h2>
            <p className="text-white-50" style={{ fontSize: ".7rem" }}>
              Please sign in to continue
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

            <div className="mb-3">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <label
                  htmlFor="password"
                  className="form-label mb-0 fw-medium"
                  style={{ color: "white", fontSize: "0.9rem" }}
                >
                  Password
                </label>

                <Link
                  to={"/forget-password"}
                  className="text-decoration-none"
                  style={{ color: "white" }}
                >
                  Forget password?
                </Link>
              </div>

              <div className="position-relative">
                <input
                  id="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type={showPassword ? "text" : "password"}
                  className={`${style.customBorder2} ${style.custominput} form-control pe-5 bg-transparent text-light`}
                  placeholder="Enter your password"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="btn btn-link position-absolute top-50 end-0 translate-middle-y me-2 p-0 border-0 shadow-none"
                  style={{ color: "#aaa" }}
                >
                  {showPassword ? (
                    <i className="fa-solid fa-eye-slash"></i>
                  ) : (
                    <i className="fa-solid fa-eye"></i>
                  )}
                </button>
              </div>
              {formik.touched.password && formik.errors.password ? (
                <div className="text-danger small mt-1">
                  {formik.errors.password}
                </div>
              ) : null}
            </div>

            <button type="submit" className="btn-deeb w-100 mt-3">
              Login
            </button>

            <p className="mt-2 text-center" style={{ fontSize: "0.85rem" }}>
              Don't have an account?
              <Link className="ms-1" to={"/register"}>
                SignUp
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
