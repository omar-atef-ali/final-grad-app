import React, { useState } from "react";
import style from "./ResetPassword.module.css";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

export default function ResetPassword() {
  let [showPassword, setShowPassword] = useState(false);
  let [showPassword2, setShowPassword2] = useState(false);

  async function submit(values) {
    console.log(values);
    const { confirmNewPassword, ...dataToSend } = values;    /*   ناقص الكود  */
    try {
      let response = await api.put(
        `/Auth/reset-password`,
        dataToSend,

        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      //   console.log(response.data);
      Swal.fire({
        icon: "success",
        title: "Password changed!",
        text: "Your password has been updated successfully.",
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

      navigate("/login");
    } catch (error) {
      //   console.log(error);

      Swal.fire({
        icon: "error",
        title: "Password change failed!",
        text:
          error.response?.data?.message ||
          "Something went wrong while changing your password.",
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

  let validationChangePass = yup.object({
    email: yup
      .string()
      .required("Email is required")
      .email("Please enter a valid email address")
      .min(5, "Email must be at least 5 characters long"),
    newPassword: yup
      .string()
      .required("New Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(
        /[@$!%*?&]/,
        "Password must contain at least one special character"
      ),
    confirmNewPassword: yup
      .string()
      .required("Confirm Password is required")
      .oneOf([yup.ref("newPassword"), null], "Passwords must match"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema: validationChangePass,
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
            maxHeight: "600px",
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
          <div className="text-center mt-2 mb-4">
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
              Create New Password
            </h2>
            <p className="text-white-50" style={{ fontSize: ".7rem" }}>
              Enter a new password below to change your password.
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
                  className={` ${style.customBorder2} ${style.custominput} form-control bg-transparent text-light py-1`}
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
                  className={` ${style.customBorder3} ${style.custominput} form-control bg-transparent text-light py-1`}
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
              {formik.touched.confirmNewPassword &&
                formik.errors.confirmNewPassword && (
                  <div className="text-danger mt-1">
                    {formik.errors.confirmNewPassword}
                  </div>
                )}
            </div>

            <button type="submit" className="btn-deeb w-100 mt-3">
              Send Email
            </button>
          </form>
        </div>
      </div>

      {/* <div className="mb-4">


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
                  {formik.touched.confirmNewPassword &&
                    formik.errors.confirmNewPassword && (
                      <div className="text-danger mt-1">
                        {formik.errors.confirmNewPassword}
                      </div>
                    )}
                </div>
      </div> */}
    </>
  );
}
