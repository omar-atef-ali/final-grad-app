import React, { useState } from "react";
import style from "./ResetPassword.module.css";
import sideImage from "../../assets/images/ChatGPT Image Oct 6, 2025, 05_20_40 PM.png";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

export default function ResetPassword() {
  let [showPassword, setShowPassword] = useState(false);
  let [showPassword2, setShowPassword2] = useState(false);

  async function submit(values) {
    console.log(values);
  }

  let validationChangePass = yup.object({
    newPassword: yup
      .string()
      .required("New Password is required")
      .min(4, "Password must be at least 4 characters")
      ,
    confirmNewPassword: yup
      .string()
      .required("Confirm Password is required")
      .oneOf([yup.ref("newPassword"), null], "Passwords must match"),
  });

  let formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema: validationChangePass,
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
              <div className="mb-4">
                <Link
                  to="/forget-password"
                  className="d-inline-flex align-items-center  text-decoration-none mb-4 small"
                  style={{ color: "var(--accent)" }}
                >
                  <i
                    className="fa-solid fa-arrow-left mx-1"
                    style={{ fontSize: "10px", marginTop: "3px" }}
                  ></i>{" "}
                  Back 
                </Link>
                <h2
                  className="h2 fw-bold mb-2"
                  style={{ color: "var(--secondary)" }}
                >
                  Create New Password
                </h2>
                <p className="text-secondary">Enter your new password</p>
              </div>
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <label
                      htmlFor="newPassword"
                      className="form-label mb-0 fw-medium"
                      style={{ color: "var(--secondary)" }}
                    >
                      New Password
                    </label>
                  </div>

                  <div className="position-relative">
                    <input
                      id="newPassword"
                      name="newPassword"
                      value={formik.values.newPassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      type={showPassword ? "text" : "password"}
                      className="form-control pe-5"
                      placeholder="Enter your new password"
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
                  {formik.touched.newPassword && formik.errors.newPassword && (
                    <div className="text-danger mt-1">
                      {formik.errors.newPassword}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <label
                      htmlFor="confirmNewPassword"
                      className="form-label mb-0 fw-medium"
                      style={{ color: "var(--secondary)" }}
                    >
                      confirm New Password
                    </label>
                  </div>

                  <div className="position-relative">
                    <input
                      id="confirmNewPassword"
                      name="confirmNewPassword"
                      value={formik.values.confirmNewPassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      type={showPassword2 ? "text" : "password"}
                      className="form-control pe-5"
                      placeholder="Enter your new password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword2(!showPassword2)}
                      className="btn btn-link position-absolute top-50 end-0 translate-middle-y me-2 p-0 border-0 shadow-none"
                      style={{ color: "var(--muted-foreground)" }}
                    >
                      {showPassword2 ? (
                        <i className="fa-solid fa-eye-slash"></i>
                      ) : (
                        <i className="fa-solid fa-eye"></i>
                      )}
                    </button>
                  </div>
                  {formik.touched.confirmNewPassword && formik.errors.confirmNewPassword && (
                    <div className="text-danger mt-1">
                      {formik.errors.confirmNewPassword}
                    </div>
                  )}
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
