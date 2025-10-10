import React, { useContext, useState } from "react";
import style from "./Login.module.css";
import sideImage from "../../assets/images/ChatGPT Image Oct 6, 2025, 05_20_40 PM.png";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import api from "../../api";
import toast from "react-hot-toast";
import { userContext } from "../../context/userContext";

export default function Login() {
  let navigate = useNavigate();

  let { setUserToken } = useContext(userContext);

  let [showPassword, setShowPassword] = useState(false);

  async function submit(values) {
    try {
      const { data } = await api.post("/api/Auth", values);
      localStorage.setItem("token", data.token);
      setUserToken(data.token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login Error:", error);
      toast.error(error.response?.data?.message || "Invalid email or password");
    }
  }

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: submit,
  });

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
              <div className="text-center">
                <h2 className=" fw-bold" style={{ color: "var(--secondary)" }}>
                  Welcome Back
                </h2>
                <p className=" text-muted-foreground">
                  Sign in to your account to continue
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
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="email"
                    placeholder="you@Example.com"
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <label
                      htmlFor="password"
                      className="form-label mb-0 fw-medium"
                      style={{ color: "var(--secondary)" }}
                    >
                      Password
                    </label>

                    <Link
                      to={"/forget-password"}
                      className="text-decoration-none"
                      style={{ color: "var(--secondary)" }}
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
                      className="form-control pe-5"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="btn btn-link position-absolute top-50 end-0 translate-middle-y me-2 p-0 border-0 shadow-none"
                      style={{ color: "var(--muted-foreground)" }}
                    >
                      {showPassword ? (
                        <i className="fa-solid fa-eye-slash"></i>
                      ) : (
                        <i className="fa-solid fa-eye"></i>
                      )}
                    </button>
                  </div>
                </div>

                <button type="submit" className="btn-deeb w-100">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
