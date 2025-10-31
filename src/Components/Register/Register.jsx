import { useFormik } from "formik";
import * as yup from "yup";
import api from "../../api";
import style from "./Register.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";


export default function Register() {
  let [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  async function handleRegisterSubmit(values) {
    try {
      let response = await api.post(`/Auth/register`, values);
      console.log(response);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }

  let validationRegister = yup.object({
    firstName: yup
      .string()
      .required("First Name required")
      .matches(
        /^[A-Za-z][A-Za-z0-9]*$/,
        "First Name must start with a letter and contain only letters and numbers"
      ),

    lastName: yup
      .string()
      .required("Last Name required")
      .matches(
        /^[A-Za-z][A-Za-z0-9]*$/,
        "Last Name must start with a letter and contain only letters and numbers"
      ),

    email: yup
      .string()
      .required("Email is required")
      .email("Please enter a valid email address")
      .min(5, "Email must be at least 5 characters long"),

    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      ),
    businessName: yup
      .string()
      .notRequired()
      .trim()
      .min(3, "Business name must be at least 3 characters long")
      .max(50, "Business name must be at most 50 characters long")
      .matches(
        /^[a-zA-Z0-9\s]*$/,
        "Business name can only contain letters and numbers"
      ),
  });
  let formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      businessName: "",
    },
    onSubmit: handleRegisterSubmit,
    validationSchema: validationRegister,
  });

  return (
    <>
      <div className={`container-fluid p-0  ${style.Registerpage} `}>
        <div
          className="px-4 py-5 m-3 shadow-lg d-flex flex-column justify-content-center"
          style={{
            width: "100%",
            maxWidth: "470px",
            minHeight: "420px",
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
            borderRadius: "24px",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            boxShadow: "0 0 35px rgba(0, 0, 0, 0.6)",
          }}
        >
          <div className="text-center mb-3">
            <h3
              className="fw-bold mb-1"
              style={{
                fontSize: "2rem",
                
                background: "linear-gradient(to right, white, #bcbcbcff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Create an account
            </h3>
            <p className="text-white-50 mb-2" style={{ fontSize: ".7rem" }}>
              Sign Up Now
            </p>
          </div>

          <form onSubmit={formik.handleSubmit}>
            <div className="mb-2">
              <label
                htmlFor="firstName"
                className="form-label fw-medium text-white"
                style={{ fontSize: "0.9rem" }}
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                placeholder="First name"
                className={` ${style.customBorder} form-control bg-transparent text-light py-1 ${style.custominput} `}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.firstName}
              />
              {formik.touched.firstName && formik.errors.firstName && (
                <div
                  className="text-danger mt-1"
                  style={{ fontSize: "0.8rem" }}
                >
                  {formik.errors.firstName}
                </div>
              )}
            </div>

            <div className="mb-2">
              <label
                htmlFor="lastName"
                className="form-label fw-medium text-white"
                style={{ fontSize: "0.9rem" }}
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                placeholder="Last name"
                className={`${style.customBorder2} ${style.custominput} form-control bg-transparent text-light py-1`}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.lastName}
              />
              {formik.touched.lastName && formik.errors.lastName && (
                <div
                  className="text-danger mt-1"
                  style={{ fontSize: "0.8rem" }}
                >
                  {formik.errors.lastName}
                </div>
              )}
            </div>

            <div className="mb-2">
              <label
                htmlFor="email"
                className="form-label fw-medium text-white"
                style={{ fontSize: "0.9rem" }}
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                placeholder="email"
                className={`${style.customBorder3} ${style.custominput} form-control bg-transparent text-light py-1`}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email && (
                <div
                  className="text-danger mt-1"
                  style={{ fontSize: "0.8rem" }}
                >
                  {formik.errors.email}
                </div>
              )}
            </div>

            <div className="mb-2">
              <label
                htmlFor="password"
                className="form-label fw-medium text-white"
                style={{ fontSize: "0.9rem" }}
              >
                Password
              </label>
              <div className="position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Enter your password"
                  className={`${style.customBorder2} ${style.custominput} form-control bg-transparent text-light py-1`}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.password}
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

            <div className="mb-3">
              <label
                htmlFor="businessName"
                className="form-label fw-medium text-white"
                style={{ fontSize: "0.9rem" }}
              >
                Business Name
              </label>
              <input
                type="text"
                id="businessName"
                placeholder="business name"
                className={`${style.customBorder3} ${style.custominput} form-control bg-transparent text-light py-1`}
                style={{ fontSize: "0.9rem" }}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.businessName}
              />
              {formik.touched.businessName && formik.errors.businessName && (
                <div
                  className="text-danger mt-1"
                  style={{ fontSize: "0.8rem" }}
                >
                  {formik.errors.businessName}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="btn-deeb w-100 mt-2 py-1"
              style={{ fontSize: "0.95rem" }}
            >
              Create
            </button>

            <p className="mt-2 text-center" style={{ fontSize: "0.85rem" }}>
              Already have an account?
              <Link className="ms-1" to={"/login"}>
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
